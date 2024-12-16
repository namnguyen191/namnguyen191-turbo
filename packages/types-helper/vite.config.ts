import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineViteConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.lib.json',
      outDir: 'dist/types',
      afterDiagnostic: (diagnostics) => {
        if (diagnostics.length) {
          throw new Error('Type error in build. Please run typecheck for more info');
        }
      },
    }),
  ],
  build: {
    lib: {
      entry: ['src/index.ts', 'src/zod-types/custom-zod-types.ts', 'src/zod-types/utils.ts'],
      formats: ['es'],
    },
    emptyOutDir: true,
    sourcemap: true,
    outDir: 'dist',
    reportCompressedSize: true,
    minify: true,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: 'coverage', provider: 'v8' },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
