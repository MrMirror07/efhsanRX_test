# SheWellRX Virtual Care Clinic Website

Marketing site for SheWellRX, a telehealth business. Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), deployed on Cloudflare Pages.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, services overview, how it works, FAQ |
| `/services` | Detailed care programs |
| `/how-it-works` | Visit flow and patient promises |
| `/about` | Mission and values |
| `/book` | Visit request form (booking backend not yet connected) |
| `/pricing` | Flat fee pricing, comparison, and pricing FAQ |
| `/doctor` | Clinician bios, credentials, and independent ratings |

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

## TODO

- Connect the `/book` form to a real scheduling/CRM backend (Cloudflare Worker, Formspree, or similar)
- Replace placeholder copy and stats with final, legally reviewed content
- Add real brand imagery/photography
- Custom domain setup in Cloudflare
