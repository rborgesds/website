import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages serves this repo at https://rborgesds.github.io/website/.
  // If you later move to a custom domain, drop `base` and update `site`.
  site: 'https://rborgesds.github.io',
  base: '/website',
});
