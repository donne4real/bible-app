/**
 * Sync API endpoints for Cloudflare D1
 * Handles user auth and data sync (highlights, notes, bookmarks)
 */

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

const PBKDF2_ITERATIONS = 100_000;

function bytesToBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(b64: string): Uint8Array {
  const normalized = b64.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// JWT implementation for Cloudflare Workers using Web Crypto HMAC verification
async function createToken(userId: string, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId,
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
  }));
  const signature = await sign(`${header}.${payload}`, secret);
  return `${header}.${payload}.${signature}`;
}

async function verifyToken(token: string, secret: string): Promise<string | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;

    const encoder = new TextEncoder();
    const key = await importHmacKey(secret);
    const sigBytes = base64ToBytes(signature);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      encoder.encode(`${header}.${payload}`)
    );
    if (!valid) return null;

    const { userId, exp } = JSON.parse(atob(payload));
    if (typeof exp !== 'number' || exp < Math.floor(Date.now() / 1000)) return null;

    return userId;
  } catch {
    return null;
  }
}

async function sign(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return bytesToBase64(new Uint8Array(signature));
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );
  return `pbkdf2$${bytesToBase64(salt)}$${bytesToBase64(new Uint8Array(derivedBits))}`;
}

async function hashLegacyPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(password + 'bible-app-salt'));
  return bytesToBase64(new Uint8Array(hash));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function verifyPassword(
  password: string,
  storedHash: string
): Promise<{ valid: boolean; needsUpgrade: boolean }> {
  if (storedHash.startsWith('pbkdf2$')) {
    const parts = storedHash.split('$');
    if (parts.length !== 3) return { valid: false, needsUpgrade: false };
    const salt = base64ToBytes(parts[1]);
    const expectedHash = base64ToBytes(parts[2]);

    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );
    return {
      valid: timingSafeEqual(new Uint8Array(derivedBits), expectedHash),
      needsUpgrade: false,
    };
  }

  // Fallback for accounts created with legacy SHA-256 hash
  const legacyHash = await hashLegacyPassword(password);
  const encoder = new TextEncoder();
  const valid = timingSafeEqual(encoder.encode(legacyHash), encoder.encode(storedHash));
  return { valid, needsUpgrade: valid };
}

function generateId(): string {
  return crypto.randomUUID();
}

/** Namespaces a client entity ID with userId so D1 primary keys never collide across users. */
function toScopedId(userId: string, rawId: string | undefined): string {
  const cleanId = rawId
    ? rawId.startsWith(`${userId}:`)
      ? rawId.slice(userId.length + 1)
      : rawId
    : generateId();
  return `${userId}:${cleanId}`;
}

/** Strips the `{userId}:` prefix when returning records to the client. */
function toClientId(userId: string, scopedId: string): string {
  return scopedId.startsWith(`${userId}:`) ? scopedId.slice(userId.length + 1) : scopedId;
}

// Auth handlers
async function handleRegister(request: Request, env: Env): Promise<Response> {
  const { email, password } = await request.json<{ email?: string; password?: string }>();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !password || password.length < 6) {
    return new Response(JSON.stringify({ error: 'Invalid email or password (min 6 chars)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if user exists
  const existing = await env.DB.prepare('SELECT id FROM users WHERE lower(email) = ?')
    .bind(normalizedEmail)
    .first();
  if (existing) {
    return new Response(JSON.stringify({ error: 'Email already registered' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create user
  const userId = generateId();
  const passwordHash = await hashPassword(password);
  const now = Date.now();

  await env.DB.prepare(
    'INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)'
  )
    .bind(userId, normalizedEmail, passwordHash, now)
    .run();

  const token = await createToken(userId, env.JWT_SECRET);

  return new Response(JSON.stringify({ token, userId, email: normalizedEmail }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  const { email, password } = await request.json<{ email?: string; password?: string }>();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await env.DB.prepare(
    'SELECT id, email, password_hash FROM users WHERE lower(email) = ?'
  )
    .bind(normalizedEmail)
    .first<{ id: string; email: string; password_hash: string }>();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { valid, needsUpgrade } = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Update last login (and transparently upgrade legacy password hashes to PBKDF2)
  if (needsUpgrade) {
    const upgradedHash = await hashPassword(password);
    await env.DB.prepare('UPDATE users SET last_login = ?, password_hash = ? WHERE id = ?')
      .bind(Date.now(), upgradedHash, user.id)
      .run();
  } else {
    await env.DB.prepare('UPDATE users SET last_login = ? WHERE id = ?')
      .bind(Date.now(), user.id)
      .run();
  }

  const token = await createToken(user.id, env.JWT_SECRET);

  return new Response(JSON.stringify({ token, userId: user.id, email: user.email }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// Sync handlers
async function handleGetAll(_request: Request, env: Env, userId: string): Promise<Response> {
  const [highlightsRes, notesRes, bookmarksRes, settings] = await Promise.all([
    env.DB.prepare('SELECT * FROM highlights WHERE user_id = ? ORDER BY created_at DESC')
      .bind(userId)
      .all<Record<string, any>>(),
    env.DB.prepare('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC')
      .bind(userId)
      .all<Record<string, any>>(),
    env.DB.prepare('SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC')
      .bind(userId)
      .all<Record<string, any>>(),
    env.DB.prepare('SELECT settings_json FROM user_settings WHERE user_id = ?')
      .bind(userId)
      .first<{ settings_json: string }>(),
  ]);

  const highlights = (highlightsRes.results || []).map(row => ({
    id: toClientId(userId, String(row.id)),
    book_id: row.book_id,
    book_name: row.book_name,
    chapter: Number(row.chapter),
    verse: Number(row.verse),
    color: row.color,
    style: row.style || 'background',
    createdAt: Number(row.created_at),
  }));

  const notes = (notesRes.results || []).map(row => ({
    id: toClientId(userId, String(row.id)),
    book_id: row.book_id,
    book_name: row.book_name,
    chapter: Number(row.chapter),
    verse: Number(row.verse),
    text: row.text,
    createdAt: Number(row.created_at),
  }));

  const bookmarks = (bookmarksRes.results || []).map(row => ({
    id: toClientId(userId, String(row.id)),
    book_id: row.book_id,
    book_name: row.book_name,
    chapter: Number(row.chapter),
    createdAt: Number(row.created_at),
  }));

  return new Response(
    JSON.stringify({
      highlights,
      notes,
      bookmarks,
      settings: settings ? JSON.parse(settings.settings_json) : null,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

async function handlePush(request: Request, env: Env, userId: string): Promise<Response> {
  const { highlights, notes, bookmarks, settings } = await request.json<{
    highlights?: any[];
    notes?: any[];
    bookmarks?: any[];
    settings?: any;
  }>();
  const now = Date.now();
  const statements: D1PreparedStatement[] = [];

  // Sync highlights (batched upsert with user-scoped ID)
  if (highlights && Array.isArray(highlights)) {
    for (const hl of highlights) {
      const scopedId = toScopedId(userId, hl.id);
      statements.push(
        env.DB.prepare(`
          INSERT INTO highlights (id, user_id, book_id, book_name, chapter, verse, color, style, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            color = excluded.color,
            style = excluded.style,
            updated_at = excluded.updated_at
          WHERE highlights.user_id = excluded.user_id
        `).bind(
          scopedId,
          userId,
          hl.book_id,
          hl.book_name,
          hl.chapter,
          hl.verse,
          hl.color,
          hl.style || 'background',
          hl.createdAt ?? hl.created_at ?? now,
          now
        )
      );
      if (hl.id && hl.id !== scopedId) {
        statements.push(
          env.DB.prepare('DELETE FROM highlights WHERE id = ? AND user_id = ?').bind(hl.id, userId)
        );
      }
    }
  }

  // Sync notes (batched upsert with user-scoped ID)
  if (notes && Array.isArray(notes)) {
    for (const note of notes) {
      const scopedId = toScopedId(userId, note.id);
      statements.push(
        env.DB.prepare(`
          INSERT INTO notes (id, user_id, book_id, book_name, chapter, verse, text, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            text = excluded.text,
            updated_at = excluded.updated_at
          WHERE notes.user_id = excluded.user_id
        `).bind(
          scopedId,
          userId,
          note.book_id,
          note.book_name,
          note.chapter,
          note.verse,
          note.text,
          note.createdAt ?? note.created_at ?? now,
          now
        )
      );
      if (note.id && note.id !== scopedId) {
        statements.push(
          env.DB.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').bind(note.id, userId)
        );
      }
    }
  }

  // Sync bookmarks (batched upsert with user-scoped ID)
  if (bookmarks && Array.isArray(bookmarks)) {
    for (const bm of bookmarks) {
      const scopedId = toScopedId(userId, bm.id);
      statements.push(
        env.DB.prepare(`
          INSERT INTO bookmarks (id, user_id, book_id, book_name, chapter, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            updated_at = excluded.updated_at
          WHERE bookmarks.user_id = excluded.user_id
        `).bind(
          scopedId,
          userId,
          bm.book_id,
          bm.book_name,
          bm.chapter,
          bm.createdAt ?? bm.created_at ?? now,
          now
        )
      );
      if (bm.id && bm.id !== scopedId) {
        statements.push(
          env.DB.prepare('DELETE FROM bookmarks WHERE id = ? AND user_id = ?').bind(bm.id, userId)
        );
      }
    }
  }

  // Sync settings
  if (settings) {
    statements.push(
      env.DB.prepare(`
        INSERT INTO user_settings (user_id, settings_json, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
          settings_json = excluded.settings_json,
          updated_at = excluded.updated_at
      `).bind(userId, JSON.stringify(settings), now)
    );
  }

  if (statements.length > 0) {
    await env.DB.batch(statements);
  }

  return new Response(JSON.stringify({ success: true, syncedAt: now }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleDelete(request: Request, env: Env, userId: string): Promise<Response> {
  const { type, id } = await request.json<{ type?: string; id?: string }>();
  if (!id || (type !== 'highlight' && type !== 'note' && type !== 'bookmark')) {
    return new Response(JSON.stringify({ error: 'Invalid delete request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const table = type === 'highlight' ? 'highlights' : type === 'note' ? 'notes' : 'bookmarks';
  const scopedId = toScopedId(userId, id);
  await env.DB.prepare(`DELETE FROM ${table} WHERE (id = ? OR id = ?) AND user_id = ?`)
    .bind(scopedId, id, userId)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// Main sync router
export async function handleSyncRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  // Handle both /api/sync and /api/sync/ (with or without trailing slash)
  let path = url.pathname.replace('/api/sync', '');
  if (path.startsWith('/')) path = path.slice(1);
  if (path.endsWith('/')) path = path.slice(0, -1);

  // Auth routes (no token required)
  if (path === 'register' && request.method === 'POST') {
    return handleRegister(request, env);
  }
  if (path === 'login' && request.method === 'POST') {
    return handleLogin(request, env);
  }

  // Protected routes (require token)
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.slice(7);
  const userId = await verifyToken(token, env.JWT_SECRET);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Sync routes
  if (path === '' && request.method === 'GET') {
    return handleGetAll(request, env, userId);
  }
  if (path === 'push' && request.method === 'POST') {
    return handlePush(request, env, userId);
  }
  if (path === 'delete' && request.method === 'POST') {
    return handleDelete(request, env, userId);
  }

  return new Response('Not found', { status: 404 });
}
