import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: 'spa',
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          utils: ['clsx', 'tailwind-merge'],
          supabase: ['@supabase/supabase-js'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react'],
        },
      },
    },
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@supabase/supabase-js',
      'lucide-react',
      '@tanstack/react-query',
      'react-router-dom',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@vercel/analytics', '@vercel/speed-insights'],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __DEV__: mode === 'development',
  },
}));
