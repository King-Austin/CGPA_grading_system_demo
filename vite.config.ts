import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and React DOM into their own chunk
          react: ['react', 'react-dom'],
          // Split React Router into its own chunk
          router: ['react-router-dom'],
          // Split UI components into their own chunk
          ui: ['@radix-ui/react-slot', '@radix-ui/react-select', '@radix-ui/react-dialog', '@radix-ui/react-progress'],
          // Split PDF and chart libraries
          charts: ['recharts'],
          pdf: ['jspdf', 'html2canvas'],
          // Split form libraries
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Split utility libraries
          utils: ['clsx', 'tailwind-merge', 'date-fns', 'lucide-react']
        }
      }
    },
    // Increase chunk size warning limit since we're splitting chunks
    chunkSizeWarningLimit: 600,
    // Enable source maps for better debugging
    sourcemap: mode === "development"
  }
}));
