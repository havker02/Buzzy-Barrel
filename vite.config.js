import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ["42b74ad0-940e-4f1a-a09b-20a656c4c5ee-00-3typcrhrr43ps.pike.replit.dev"]
  }
})
