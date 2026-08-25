# Live Google Reviews Setup

The site ships with a verified snapshot of the practice's Google rating baked into `src/config.ts`. Once the steps below are done, every page refreshes those numbers automatically from Google, cached at the Cloudflare edge for six hours. If anything fails, the snapshot simply remains, so the site never shows an empty rating.

## How it works

1. `functions/api/reviews.js` is a Cloudflare Pages Function served at `/api/reviews`. It calls the Google Places API (New) for the practice listing and returns `{ rating, count }`.
2. A small script in `src/layouts/Layout.astro` fetches `/api/reviews` on every page load and rewrites any element marked `data-google-rating` or `data-google-count`.
3. Responses are cached at the edge for six hours, so Google is called at most a few times per day. Cost stays around one dollar per month even with heavy traffic.

## One time setup (about 10 minutes)

1. Go to [console.cloud.google.com](https://console.cloud.google.com), create a project (any name, e.g. `efhsanrx-site`).
2. In "APIs and Services", enable **Places API (New)**.
3. Create an API key under "Credentials". Restrict it: API restriction to Places API (New) only. Do not add a website restriction, because the key is used server side.
4. Find the practice's Place ID with Google's [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder). Search for "FirstChoice ObGyn LLC Clifton NJ" and copy the ID that starts with `ChIJ`.
5. In the Cloudflare Pages project, open Settings, then Environment variables, and add for Production:
   - `GOOGLE_PLACES_API_KEY` = the key from step 3
   - `GOOGLE_PLACE_ID` = the ID from step 4
6. Redeploy. Visit `/api/reviews` on the live site; you should see JSON with the current rating.

## Keeping the snapshot honest

The snapshot in `src/config.ts` is the fallback and the value search engines see first. Update it every month or two so it never drifts far from reality. The review quotes on the site are real quotes from the public Google listing; refresh those occasionally too and keep the "as of" date accurate.
