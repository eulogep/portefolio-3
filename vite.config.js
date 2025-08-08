/**
 * Configuration Vite pour le Portfolio Personnel
 * Créé par MABIALA EULOGE - Étudiant Ingénieur Informatique ESIEA
 * 
 * @author MABIALA EULOGE
 * @version 1.0.0
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 5550,
    host: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
