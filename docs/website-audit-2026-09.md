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
