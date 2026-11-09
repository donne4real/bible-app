/**
 * Sync API endpoints for Cloudflare D1
 * Handles user auth and data sync (highlights, notes, bookmarks)
 */

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

// Simple JWT implementation for Cloudflare Workers
async function createToken(userId: string, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    userId, 
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
  }));
  const signature = await sign(`${header}.${payload}`, secret);
  return `${header}.${payload}.${signature}`;
}

async function verifyToken(token: string, secret: string): Promise<string | null> {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSig = await sign(`${header}.${payload}`, secret);
    if (signature !== expectedSig) return null;
    
    const { userId, exp } = JSON.parse(atob(payload));
    if (exp < Math.floor(Date.now() / 1000)) return null;
    
    return userId;
  } catch {
    return null;
  }
}

async function sign(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(password + 'bible-app-salt'));
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

function generateId(): string {
  return crypto.randomUUID();
}

// Auth handlers
async function handleRegister(request: Request, env: Env): Promise<Response> {
  const { email, password } = await request.json();
  
  if (!email || !password || password.length < 6) {
    return new Response(JSON.stringify({ error: 'Invalid email or password (min 6 chars)' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check if user exists
  const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) {
    return new Response(JSON.stringify({ error: 'Email already registered' }), { 
      status: 409,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Create user
  const userId = generateId();
  const passwordHash = await hashPassword(password);
  const now = Date.now();

  await env.DB.prepare(
    'INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)'
  ).bind(userId, email, passwordHash, now).run();

  const token = await createToken(userId, env.JWT_SECRET);

  return new Response(JSON.stringify({ token, userId, email }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  const { email, password } = await request.json();
  
  const user = await env.DB.prepare(
    'SELECT id, email, password_hash FROM users WHERE email = ?'
  ).bind(email).first<{ id: string; email: string; password_hash: string }>();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const passwordHash = await hashPassword(password);
  if (user.password_hash !== passwordHash) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Update last login
  await env.DB.prepare('UPDATE users SET last_login = ? WHERE id = ?')
    .bind(Date.now(), user.id).run();

  const token = await createToken(user.id, env.JWT_SECRET);

  return new Response(JSON.stringify({ token, userId: user.id, email: user.email }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Sync handlers
async function handleGetAll(request: Request, env: Env, userId: string): Promise<Response> {
  const highlights = await env.DB.prepare(
    'SELECT * FROM highlights WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all();

  const notes = await env.DB.prepare(
    'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all();

  const bookmarks = await env.DB.prepare(
    'SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(userId).all();

  const settings = await env.DB.prepare(
    'SELECT settings_json FROM user_settings WHERE user_id = ?'
  ).bind(userId).first<{ settings_json: string }>();

  return new Response(JSON.stringify({
    highlights: highlights.results,
    notes: notes.results,
    bookmarks: bookmarks.results,
    settings: settings ? JSON.parse(settings.settings_json) : null
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handlePush(request: Request, env: Env, userId: string): Promise<Response> {
  const { highlights, notes, bookmarks, settings } = await request.json();
  const now = Date.now();

  // Sync highlights (upsert)
  if (highlights && Array.isArray(highlights)) {
    for (const hl of highlights) {
      await env.DB.prepare(`
        INSERT INTO highlights (id, user_id, book_id, book_name, chapter, verse, color, style, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET 
          color = excluded.color, style = excluded.style, updated_at = excluded.updated_at
      `).bind(
        hl.id || generateId(), userId, hl.book_id, hl.book_name, hl.chapter, hl.verse,
        hl.color, hl.style || 'background', hl.createdAt || now, now
      ).run();
    }
  }

  // Sync notes (upsert)
  if (notes && Array.isArray(notes)) {
    for (const note of notes) {
      await env.DB.prepare(`
        INSERT INTO notes (id, user_id, book_id, book_name, chapter, verse, text, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET 
          text = excluded.text, updated_at = excluded.updated_at
      `).bind(
        note.id || generateId(), userId, note.book_id, note.book_name, note.chapter, note.verse,
        note.text, note.createdAt || now, now
      ).run();
    }
  }

  // Sync bookmarks (upsert)
  if (bookmarks && Array.isArray(bookmarks)) {
    for (const bm of bookmarks) {
      await env.DB.prepare(`
        INSERT INTO bookmarks (id, user_id, book_id, book_name, chapter, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET updated_at = excluded.updated_at
      `).bind(
        bm.id || generateId(), userId, bm.book_id, bm.book_name, bm.chapter,
        bm.createdAt || now, now
      ).run();
    }
  }

  // Sync settings
  if (settings) {
    await env.DB.prepare(`
      INSERT INTO user_settings (user_id, settings_json, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET settings_json = excluded.settings_json, updated_at = excluded.updated_at
    `).bind(userId, JSON.stringify(settings), now).run();
  }

  return new Response(JSON.stringify({ success: true, syncedAt: now }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleDelete(request: Request, env: Env, userId: string): Promise<Response> {
  const { type, id } = await request.json();

  const table = type === 'highlight' ? 'highlights' : type === 'note' ? 'notes' : 'bookmarks';
  await env.DB.prepare(`DELETE FROM ${table} WHERE id = ? AND user_id = ?`).bind(id, userId).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Main sync router
export async function handleSyncRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/sync/', '');

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
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.slice(7);
  const userId = await verifyToken(token, env.JWT_SECRET);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
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
