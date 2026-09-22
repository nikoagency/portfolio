import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  publicDir: './public',
  site: 'https://nikoagency.github.io',
  base: '/portfolio',
});
