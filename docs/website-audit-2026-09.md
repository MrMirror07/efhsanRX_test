# shewellrx.com sweep, 2026-09-01

Scope: the live site on Cloudflare Pages (project `efhsanrx`, custom domains shewellrx.com and www), the Astro source, and the OptiMantra handoff. Method: read every page and component, curl the production headers, inspect the Cloudflare Pages and zone settings, and walk the OptiMantra admin.

## Findings and what changed

| # | Finding | Severity | Status |
| --- | --- | --- | --- |
| 1 | The booking page was an interim form that collected a "reason for visit" and submitted nowhere; "Book a visit" buttons dead ended. | High | Replaced by the guided start (`/book`): concern, two fit questions, goals, safety check, pregnancy, New Jersey location, age, visit type with price and Good Faith Estimate, then a per service OptiMantra deep link. Runs entirely in the browser, stores nothing. Deep links `?concern=` and `?type=followup` supported. |
| 2 | Site copy called the team "our doctors" while one clinician is a certified nurse midwife who is not yet seeing patients; "board certified" never named the board; "four decades" overstated 37 years. | High (NJ advertising rule, FTC) | Renamed to clinicians, ABOG and ABMS named, "more than 35 years", midwife marked "joining soon" and "not a physician". |
| 3 | Privacy Policy claimed to double as the HIPAA Notice of Privacy Practices; no standalone NPP, no acknowledgment path. | High | New `/notice-of-privacy-practices` with the required header, rights, and complaint route; Privacy Policy scoped to the website. |
| 4 | No Good Faith Estimate notice (No Surprises Act) and no out of network statement (NJ transparency act). | High | New `/good-faith-estimate`; notices on pricing, booking, footer, and consent. |
| 5 | Consent page routed midwifery complaints to the wrong board, lacked the non physician notice, the "no prescription from a questionnaire" rule, and the e signature statement NJ requires. | High | Rewritten sections 1, 2, 5, 6, 9, and the acknowledgment. |
| 6 | No security headers (no HSTS, CSP, X-Frame-Options, Permissions-Policy). | Medium | `public/_headers` adds them plus long cache for build assets and film frames. |
| 7 | Home page loaded all 96 film frames (1.9 MB) on every visit. | Medium | Frames now load only when the film section is within one viewport. |
| 8 | No patient portal link anywhere. | Medium | "Patient portal" in the header, footer, booking flow, and confirmation page. |
| 9 | No accessibility statement or skip link. | Medium | `/accessibility` and a skip to content link. |
| 10 | Live reviews function returns 503 because `GOOGLE_PLACES_API_KEY` is not set in Cloudflare Pages; the page silently keeps the snapshot. | Low | Not changed; see Cloudflare to do. |
| 11 | `/booked` page did not mention the portal or the GFE. | Low | Updated. |
| 12 | How it works and FAQ promised "we ask nothing about your health before you book", which the new flow contradicts. | Low | Copy now says answers are never stored or sent; history is collected only in the portal. |
| 13 | Review quotes describe deliveries and an in office ultrasound. | Low | Kept (genuine, unedited) with a caption that they concern the in person practice and that results vary. Consider swapping for consult focused quotes. |
| 14 | Schema.org clinic markup lacked services, price range, and the physician's credential. | Low | Added. |

## Cloudflare (dashboard changes for the account owner; none were made)

- SSL/TLS > Edge Certificates: set Minimum TLS Version to 1.2 and enable HSTS (the `_headers` file now sends HSTS from Pages, but the zone toggle also covers redirects). "Always Use HTTPS" already redirects http to https.
- Workers & Pages > efhsanrx > Settings > Variables: add `GOOGLE_PLACES_API_KEY` (and optionally `GOOGLE_PLACE_ID`) per `docs/live-reviews-setup.md` so `/api/reviews` stops returning 503. Enable Build cache.
- Consider Cloudflare Web Analytics (cookieless) if traffic numbers are wanted; keep every pixel off the site (see compliance checklist).
- The zone also holds hewellrx.com, youwellrx.com, and zinrx.com; add Bulk Redirects from those to shewellrx.com if they are meant as typo domains.

## Still recommended (not done)

1. Real photographs of Dr. Copur for the clinician page and the OptiMantra booking profile (monograms are placeholders).
2. Per condition landing pages (`/menopause`, `/birth-control`, ...) for search; the services page anchors carry the content today.
3. Replace the four film frame captions and hero portrait with brand photography.
4. Once availability exists in OptiMantra, set `PORTAL_LIVE = true` in `src/config.ts`; test the iframe option (`&hideHeaderInFrame=1&hideFooterInFrame=1`) if an embedded scheduler is wanted; today the site links out, which OptiMantra recommends.
5. Add a short "Insurance and Medicare" FAQ once the Medicare opt out decision is made.


## Design refresh, 2026-09-02

Why: the previous look (cream ground, Fraunces serif, terracotta accent, Inter body) is the stock generated-site palette and read as templated. The refresh keeps every page's class names and swaps the tokens underneath, so all fifteen pages changed at once.

- Tokens (`src/styles/global.css`): porcelain ground #fafaf8 with a cool bias, ink #14202a, deep sea teal-navy scale under the `pine-*` names, one orchid accent scale under `apricot-*` (primary action and italic emphasis only), gold reserved for stars.
- Type: Newsreader (display, weights 400 to 600, italic used for the accent word in each headline) and Figtree (text and UI). Loaded from Google Fonts with display swap.
- Motion (`src/scripts/motion.ts`, GSAP 3.15): hero entrance timeline, gentle hero parallax, intersection based reveals with stagger, number counters, magnetic primary buttons, cursor spotlight on cards. Everything is off under prefers-reduced-motion and the page reads fully without JavaScript.
- Home page (`src/pages/index.astro`): new hero with a floating doctor card and a live-availability chip, a slow conditions marquee, hover-reveal treatment tiles, a numbers band, a three step "how it works" beside a lifestyle photo, the concern picker, the doctor section with the real portrait, pricing with a "most patients start here" tag, a Splide 4 reviews carousel, FAQ with animated plus, and a closing call to action.
- Logo (`src/components/Logo.astro`): serif S ribbon in a deep sea disc with one orchid point; wordmark SheWell + RX. Favicon, Apple touch icon, and the social image are rendered from the same mark by `scripts/build-brand.mjs` (run `node scripts/build-brand.mjs` after editing the mark).
- Imagery: two editorial photos generated on Higgsfield (Soul 2.0) for the hero and the how-it-works section; Dr. Copur's portrait from his OptiMantra profile, cropped 4:5 so the hospital logo on the coat stays out of frame.
- Header: condensed glass bar with a dot under the current page; full screen mobile menu with large serif links. Footer: dark editorial with a serif line and a "Your rights" column.

## Round 3 (2026-09-02): SEO pages, symptom explorer, diversity, smoothness

- Five condition landing pages under `/conditions/<slug>/` (menopause, hormone therapy, birth control, PCOS/periods, dryness/painful sex) built from `src/data/conditions.ts`, each with symptom chips, "how Dr. Copur treats this by video", prescribe / in-person lists, FAQ, medically-reviewed author box, MedicalWebPage + FAQPage + BreadcrumbList schema.
- Hub page `/online-gynecologist-new-jersey/` explaining NJ telehealth rules in plain language, listing all 21 counties, linking every condition page.
- `/services` rebuilt as a symptom explorer (sticky area list on desktop, horizontal snap strip on phones); old `/services#hash` links still resolve.
- Four editorial portraits (hijab, Black, Asian, South Asian women) in a new "Every woman" home section and across the explorer.
- Layout schema: MedicalClinic with areaServed (NJ + counties), priceRange, availableService, Physician credentials and sameAs profiles; geo meta; unique titles under 60 chars and descriptions under 160 chars on every page.
- Motion: reveal catch-up on fast scroll or anchor jumps so no section stays hidden; film scroll uses svh on phones; sections get 4rem padding on phones and 8rem on wide screens; `overflow-x: clip` on html/body; `scroll-margin-top` for anchors under the sticky header.
- Still to do: Nurefsan Copur portrait (waiting on a usable photo), Google Business Profile and Search Console setup, real backlinks (NJ directories, Healthgrades/Zocdoc profile links pointing at shewellrx.com).
