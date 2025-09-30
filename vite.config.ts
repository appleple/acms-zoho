import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'acms-zoho',
      fileName: 'build'
    },
    outDir: 'app/dist/',
    rollupOptions: {
      output: {
        entryFileNames: `acms-zoho.js`,
        // assetFileNames: ({ name }) => {
        //   if (name && name.endsWith('.css')) {
        //     return 'acms-ai.css'; // 固定ファイル名
        //   }
        //   return '[name].[ext]';
        // },
        globals: {}
      },
      external: [],
    }
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    'process.env': {}
  }
})