import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://wanderingastronomer.github.io',
  integrations: [svelte()],
});
