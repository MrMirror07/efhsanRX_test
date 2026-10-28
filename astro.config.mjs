// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// Pages that carry a noindex tag stay out of the sitemap.
const NOINDEX = ['/booked/', '/404/'];

// Search priority by page type: the home page, then the care pages people
// search for, then the supporting and legal pages.
const priorityFor = (/** @type {string} */ path) => {
  if (path === '/') return 1.0;
  if (path.startsWith('/conditions/') || path === '/online-gynecologist-new-jersey/') return 0.9;
  if (['/doctor/', '/services/', '/pricing/', '/book/', '/how-it-works/', '/about/'].includes(path)) return 0.8;
  return 0.3;
};

// https://astro.build/config
export default defineConfig({
  site: 'https://shewellrx.com',
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.includes(new URL(page).pathname),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const priority = priorityFor(path);
        return {
          ...item,
          lastmod: new Date().toISOString(),
          priority,
          changefreq: priority >= 0.8 ? 'weekly' : 'monthly',
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
