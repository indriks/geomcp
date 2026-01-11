import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/*.test.ts', 'packages/**/*.spec.ts', 'apps/**/*.test.ts', 'apps/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/*.test.ts', '**/*.spec.ts'],
    },
  },
  resolve: {
    alias: {
      '@geomcp/shared': './packages/shared/src',
    },
  },
});
