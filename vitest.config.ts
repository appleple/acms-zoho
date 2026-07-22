import { defineConfig } from 'vitest/config';

// 純粋関数（src/utils）の単体テスト用。DOM 非依存なので node 環境で十分。
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
