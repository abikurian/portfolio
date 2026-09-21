import { defineConfig } from 'astro/config';
import { searchForWorkspaceRoot } from 'vite';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          'E:/Project/node_modules'
        ]
      }
    }
  }
});