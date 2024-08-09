import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import dotenv from 'dotenv';


// run package config
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true, rewrite: (path) => path.replace(/^\/api/, "/api")
      }
    }
  },
  // define process env
  define: {
    'process.env': process.env
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
