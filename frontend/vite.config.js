import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist" // Ensure Vite is outputting to `dist`
  },
  base: "./" // Ensures relative paths for assets
});
