import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base keeps asset paths working on both Vercel (served at /)
// and GitHub Pages (served at /<repo>/). Override with --base if needed.
export default defineConfig({
  plugins: [react()],
  base: './',
});
