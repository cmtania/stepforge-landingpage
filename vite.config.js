import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps every URL relative, so the build works at
// https://cmtania.github.io/stepforge-landingpage/ (or a custom domain)
// without hard-coding the repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
});
