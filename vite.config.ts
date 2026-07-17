import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// ライブラリビルド（build.lib）では、Vite は通常アプリビルドと違い process.env.NODE_ENV を
// 自動置換しない（ライブラリ側で環境を決め打ちしないのが本来の設計のため）。
// 本プラグインはビルド成果物を <script> で直接読み込むため、置換しないとバンドルした React の
// dev 分岐が残り、ブラウザに process が無いことで「process is not defined」で実行時エラーになる。
// そこでビルド時に実文字列へ明示置換する（'process.env' を {} に置換する旧方式では NODE_ENV が
// 置換されず dev ビルドが混入していた）。
export default defineConfig(({ mode }) => ({
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
    'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production'),
  }
}))
