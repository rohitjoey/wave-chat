/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  test: { environment: 'jsdom' },
  plugins: [
    react(),
    checker({
      typescript: true
    })
  ]
});
