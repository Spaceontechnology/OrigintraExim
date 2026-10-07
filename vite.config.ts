import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { apiPlugin } from './server/apiPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 5173,
    host: true,
  }
});

