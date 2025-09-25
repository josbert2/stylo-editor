import { readFileSync } from 'fs';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

const packageJson = JSON.parse(readFileSync('./package.json'));

export default defineConfig({
  input: './src/html-bundle/index.ts',
  output: [
    {
      file: 'dist/html-bundle.js',
      format: 'iife',
      name: 'ReactComponents',
      sourcemap: false,
    },
    {
      file: 'dist/html-bundle.min.js',
      format: 'iife',
      name: 'ReactComponents',
      sourcemap: false,
      plugins: [terser()],
    }
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        'coverage',
        '.storybook',
        'storybook-static',
        'config',
        'dist',
        'node_modules/**',
        '*.cjs',
        '*.mjs',
        '**/__snapshots__/*',
        '**/.storybook/*',
        '**/__tests__',
        '**/*.test.js+(|x)',
        '**/*.test.ts+(|x)',
        '**/*.mdx',
        '**/*.story.ts+(|x)',
        '**/*.story.js+(|x)',
        '**/*.stories.ts+(|x)',
        '**/*.stories.js+(|x)',
        'setupTests.ts',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    }),
    postcss({
      extract: 'html-bundle.css',
      minimize: true,
    }),
  ],
  external: [],
});