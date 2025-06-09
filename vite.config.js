// vite.config.js - Configuração do Vite para Psiando Global

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Diretório raiz dos arquivos fonte
  root: '.',
  
  // Diretório público para assets estáticos
  publicDir: 'public',
  
  // Configuração do servidor de desenvolvimento
  server: {
    port: 3000,
    host: '0.0.0.0', // Permite acesso de qualquer IP
    open: true,
    cors: true,
    strictPort: true, // Falha se a porta estiver ocupada
    allowedHosts: ['localhost', '127.0.0.1', '.ngrok-free.app', '.ngrok.app'], // Permite ngrok
    hmr: {
      overlay: true,
      port: 3001 // Porta separada para HMR
    }
  },
  
  // Configuração de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // Separar vendor chunks para melhor cache
          vendor: ['axios', 'date-fns', 'lodash'],
          // Removido: utils (não existe a pasta)
          themes: ['src/themes/ThemeProvider.js']
        }
      }
    }
  },
  
  // Aliases para imports absolutos
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@themes': resolve(__dirname, 'src/themes'),
      '@contexts': resolve(__dirname, 'src/contexts'),
      '@routes': resolve(__dirname, 'src/routes')
    }
  },
  
  // Plugins
  plugins: [],
  
  // Configuração CSS
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true
  },
  
  // Configuração de preview
  preview: {
    port: 3000,
    host: '0.0.0.0', // Permite acesso externo também no preview
    open: true,
    strictPort: true
  },
  
  // Configuração para desenvolvimento
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    __VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  
  // Otimizações
  optimizeDeps: {
    include: ['axios', 'date-fns', 'lodash']
  }
});