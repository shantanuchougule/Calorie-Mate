import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure correct base path for production 
  build: {
    outDir: "dist", // Ensure Vite is outputting to `dist`
    assetsDir: 'assets',
  }
});
