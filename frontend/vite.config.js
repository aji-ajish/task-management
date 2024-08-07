import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:8080,
    proxy:{
      "/api":{
        target:"https://task-management-server-q1ezbet0o-aji-ajishs-projects.vercel.app",
        changeOrigin:true,rewrite:(path)=>path.replace(/^\/api/,"/api")
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
