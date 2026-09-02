# SheWellRX Virtual Care Clinic Website

Marketing site for SheWellRX, a telehealth business. Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), deployed on Cloudflare Pages.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, services overview, how it works, FAQ |
| `/services` | Detailed care programs |
| `/how-it-works` | Visit flow and patient promises |
| `/about` | Mission and values |
| `/book` | Guided start: concern, fit questions, safety and eligibility check, price, then the matching OptiMantra service (stores nothing) |
| `/booked` | Confirmation page OptiMantra redirects to after payment |
| `/pricing` | Flat fee pricing, Good Faith Estimate notice, and pricing FAQ |
| `/doctor` | Clinician bios, credentials, and independent ratings |
| `/good-faith-estimate`, `/notice-of-privacy-practices`, `/telehealth-consent`, `/privacy`, `/terms`, `/accessibility` | Legal and patient rights pages |

## Development

```sh
npm install
npm run dev      # dev server at localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Deployment (Cloudflare Pages)

Connected to this GitHub repo. Every push to `main` deploys automatically.

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

## OptiMantra

Booking, consents, intake, payment, video, and the chart live in OptiMantra under a BAA. `src/config.ts` holds the verified deep links (`OPTIMANTRA`), and `PORTAL_LIVE` switches the final step of `/book` from the interim email path to the live scheduler once availability and a payment processor exist. See `docs/optimantra-setup-runbook.md`, `docs/intake-questionnaires.md`, `docs/data-migration-plan.md`, `docs/compliance-checklist.md`, and `docs/website-audit-2026-09.md`.

## TODO

- Set `PORTAL_LIVE = true` after OptiMantra availability and payments are configured
- Real clinician photography
- Per condition landing pages for search
