import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    open: true,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@Components': resolve(__dirname, 'src/Components'),
      '@Pages': resolve(__dirname, 'src/Pages'),
      '@Utils': resolve(__dirname, 'src/Utils'),
      '@Store': resolve(__dirname, 'src/Store'),
      '@Hooks': resolve(__dirname, 'src/Hooks'),
      '@Types': resolve(__dirname, 'src/Types'),
      '@Game': resolve(__dirname, 'src/GameEngine'),
      '@Constants': resolve(__dirname, 'src/Constants'),
      '@RenderFunctions': resolve(__dirname, 'src/RenderFunctions'),
      '@ServiceWorker': resolve(__dirname, 'src/ServiceWorker'),
      // Добавим другие по мере необходимости
    },
  },
});
