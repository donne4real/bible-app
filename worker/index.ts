/**
 * Cloudflare Worker — proxies chapter requests for licensed translations (NLT, AMP, NIV)
 * to api.bible, keeping the API key server-side. Static assets (the built SPA) are served
 * directly by the assets binding for every other route (see wrangler.jsonc run_worker_first).
 *
 * Licensed content is fetched live per-chapter rather than bulk-downloaded, in line with
 * api.bible's terms for these translations. Responses are cached at the edge for a day to
 * stay well within the plan's daily request quota.
 *
 * The parsing/validation core is shared with the Netlify Edge Function equivalent —
 * see shared/apiBibleProxy.ts.
 */

import { BIBLE_IDS, buildUpstreamUrl, extractVerses, parseChapterPath } from '../shared/apiBibleProxy';

interface Env {
  ASSETS: Fetcher;
  API_BIBLE_KEY: string;
}

async function handleChapterRequest(
  translationId: string,
  bookId: string,
  chapter: number,
  env: Env
): Promise<Response> {
  const bibleId = BIBLE_IDS[translationId];
  if (!bibleId) return new Response('Unknown translation', { status: 404 });

  const upstream = await fetch(buildUpstreamUrl(bibleId, bookId, chapter), {
    headers: { 'api-key': env.API_BIBLE_KEY },
  });
  if (!upstream.ok) {
    return new Response('Chapter not available', { status: upstream.status === 404 ? 404 : 502 });
  }

  const json = await upstream.json<{ data?: { content?: any[] } }>();
  const content = json.data?.content;
  if (!Array.isArray(content)) return new Response('Chapter not available', { status: 502 });

  const verses = extractVerses(content);
  return new Response(JSON.stringify(verses), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

    const parsed = parseChapterPath(url.pathname);
    if (!parsed) return new Response('Not found', { status: 404 });

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const response = await handleChapterRequest(parsed.translationId, parsed.bookId, parsed.chapter, env);
    if (response.ok) ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
};
