import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   host: true, // needed for the Docker Container port mapping to work
  //   strictPort: true, // not necessary
  //   port: 3001, // you can replace this port with any port
  // },
  // preview: {
  //   port: 3001,
  // },
  server: {
    proxy: {
      '/program': {
        target: 'http://54.179.56.107:9999',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/program/, '/program'),
      },
    },
  },
});
