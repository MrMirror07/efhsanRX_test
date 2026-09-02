// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: switch to the final custom domain when it's connected in Cloudflare
  site: 'https://shewellrx.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
