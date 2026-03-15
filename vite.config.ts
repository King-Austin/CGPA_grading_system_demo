import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      includeAssets: ['icon-192.svg', 'icon-512.svg', 'robots.txt'],
      manifest: {
        name: "Scoring Scribe | ECE GPA Tracker",
        short_name: "Scoring Scribe",
        description: "Professional GPA calculator for ECE students. Track semester progress and calculate CGPA with precision.",
        theme_color: "#2563eb",
        background_color: "#f8fafc",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "maskable"
          },
          {
            src: "/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ],
        categories: ["education", "productivity", "utilities"],
        lang: "en-US",
        dir: "ltr",
        shortcuts: [
          {
            name: "Calculate GPA",
            short_name: "GPA",
            description: "Go straight to GPA calculator",
            url: "/",
            icons: [{ src: "/icon-192.svg", sizes: "192x192" }]
          },
          {
            name: "Export Data",
            short_name: "Export",
            description: "Export/Import academic data",
            url: "/?action=export",
            icons: [{ src: "/icon-192.svg", sizes: "192x192" }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,csv}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
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
