/**
 * Netlify Edge Function — mirrors worker/index.ts (the Cloudflare Worker) so NLT/AMP/NIV
 * behave identically on both hosts. Static assets need no handling here: Netlify serves
 * dist/ directly and only invokes this function for paths matching netlify.toml's
 * edge_functions "path" pattern (/api/bible/*).
 *
 * Shares its parsing/validation core with the Cloudflare version — see
 * shared/apiBibleProxy.ts. Declare `Netlify` as ambient since Deno Deploy's edge runtime
 * (not Node/DOM) provides it as a global, with no published type declarations to import.
 */

import { BIBLE_IDS, buildUpstreamUrl, extractVerses, parseChapterPath } from '../../shared/apiBibleProxy.ts';

declare const Netlify: { env: { get(name: string): string | undefined } };

export default async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const parsed = parseChapterPath(url.pathname);
  if (!parsed) return new Response('Not found', { status: 404 });

  const bibleId = BIBLE_IDS[parsed.translationId];
  if (!bibleId) return new Response('Unknown translation', { status: 404 });

  const apiKey = Netlify.env.get('API_BIBLE_KEY');
  if (!apiKey) return new Response('Server misconfigured', { status: 500 });

  const upstream = await fetch(buildUpstreamUrl(bibleId, parsed.bookId, parsed.chapter), {
    headers: { 'api-key': apiKey },
  });
  if (!upstream.ok) {
    return new Response('Chapter not available', { status: upstream.status === 404 ? 404 : 502 });
  }

  const json = await upstream.json();
  const content = json?.data?.content;
  if (!Array.isArray(content)) return new Response('Chapter not available', { status: 502 });

  const verses = extractVerses(content);
  return new Response(JSON.stringify(verses), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
