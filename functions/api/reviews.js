/**
 * Cloudflare Pages Function: GET /api/reviews
 *
 * Returns the practice's live Google rating and review count so the site can
 * show current numbers instead of a stale snapshot. The response is cached at
 * the edge for six hours, so Google is queried a handful of times per day no
 * matter how much traffic the site gets.
 *
 * Setup (Cloudflare Pages dashboard -> Settings -> Environment variables):
 *   GOOGLE_PLACES_API_KEY  an API key with "Places API (New)" enabled,
 *                          restricted to that API. See docs/live-reviews-setup.md
 *   GOOGLE_PLACE_ID        optional override; defaults to the practice listing
 *
 * If the key is missing or Google errors, the endpoint returns a non 200 and
 * the site silently keeps its built in verified snapshot. Nothing breaks.
 */

// FirstChoice ObGyn LLC: Copur Huseyin MD, 1115 Clifton Ave STE 104, Clifton NJ.
// Verified against the live Google Maps listing on 2026-08-24. Override with
// the GOOGLE_PLACE_ID env var if the listing ever changes.
const DEFAULT_PLACE_ID = "ChIJkxAbtCH6wokR_D9rgBZEMKQ";

const CACHE_URL = "https://shewellrx-cache.internal/api/reviews";

export async function onRequestGet({ env, waitUntil }) {
  const key = env.GOOGLE_PLACES_API_KEY;
  const placeId = env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;
  if (!key || !placeId) return json({ error: "not_configured" }, 503);

  const cache = caches.default;
  const cacheKey = new Request(CACHE_URL);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const upstream = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount",
      },
    },
  );
  if (!upstream.ok) return json({ error: `upstream_${upstream.status}` }, 502);

  const data = await upstream.json();
  if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
    return json({ error: "malformed_upstream" }, 502);
  }

  const response = json(
    {
      rating: data.rating,
      count: data.userRatingCount,
      fetchedAt: new Date().toISOString(),
    },
    200,
    { "Cache-Control": "public, max-age=3600, s-maxage=21600" },
  );
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
