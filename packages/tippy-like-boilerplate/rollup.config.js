import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import cssOnly from 'rollup-plugin-css-only';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json'; // ← ajustado a la raíz

const NAMESPACE_PREFIX = process.env.NAMESPACE || 'tippy';

const plugins = {
  babel: babel({ 
    extensions: ['.js', '.ts', '.tsx'],
    exclude: 'node_modules/**',
    presets: [
      ['@babel/preset-env', { modules: false }],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ]
  }),
  replaceNamespace: replace({
    __NAMESPACE_PREFIX__: NAMESPACE_PREFIX,
  }),
  replaceEnvProduction: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  replaceEnvDevelopment: replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  minify: terser(),
  resolve: resolve({ 
    extensions: ['.js', '.ts', '.tsx'],
    preferBuiltins: false
  }),
  // Nota: cssOnly no compila SCSS. Usamos SASS para compilar y además extraer a archivo.
  css: cssOnly({ output: false }),
  json: json(),
};

// Plugins comunes prod (sin CSS)
const prodCommonPlugins = [
  plugins.replaceNamespace,
  plugins.resolve,
  plugins.json,
];

// ⚠️ Cambiamos: para "bundle" usamos SASS con output a archivo
const pluginConfigs = {
  base: [plugins.babel, ...prodCommonPlugins],
  bundle: [
    plugins.babel,
    ...prodCommonPlugins,
    // compila SCSS importado desde entradas "bundle"
    sass({ output: 'dist/tippy.css' }),
  ],
  umdBase: [plugins.babel, plugins.replaceEnvDevelopment, ...prodCommonPlugins],
  umdBaseMin: [
    plugins.babel,
    plugins.replaceEnvProduction,
    ...prodCommonPlugins,
    plugins.minify,
  ],
  umdBundle: [
    plugins.babel,
    plugins.replaceEnvDevelopment,
    ...prodCommonPlugins,
    sass({ output: 'dist/tippy.css' }),
  ],
  umdBundleMin: [
    plugins.babel,
    plugins.replaceEnvProduction,
    ...prodCommonPlugins,
    plugins.minify,
    sass({ output: 'dist/tippy.css' }),
  ],
};

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 * Licensed ${pkg.license}
 */`;

const commonUMDOutputOptions = {
  globals: { 
    '@popperjs/core': 'Popper',
    '@floating-ui/dom': 'FloatingUIDOM',
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  format: 'umd',
  name: 'tippy',
  sourcemap: true,
};

const prodConfig = [
  {
    input: 'build/base-umd.js',
    plugins: pluginConfigs.umdBase,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'dist/tippy.umd.js',
      banner,
    },
  },
  {
    input: 'build/bundle-umd.js',
    plugins: pluginConfigs.umdBundle,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'dist/tippy-bundle.umd.js',
      banner,
    },
  },
  {
    input: 'build/base-umd.js',
    plugins: pluginConfigs.umdBaseMin,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'dist/tippy.umd.min.js',
    },
  },
  {
    input: 'build/bundle-umd.js',
    plugins: pluginConfigs.umdBundleMin,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'dist/tippy-bundle.umd.min.js',
    },
  },
  {
    input: 'build/base.js',
    plugins: pluginConfigs.bundle, // ← genera dist/tippy.css
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      file: 'dist/tippy.esm.js',
      format: 'esm',
      banner,
      sourcemap: true,
    },
  },
  {
    input: 'build/headless.js',
    plugins: pluginConfigs.base,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      file: 'headless/dist/tippy-headless.esm.js',
      format: 'esm',
      banner,
      sourcemap: true,
    },
  },
  {
    input: 'build/base.js',
    plugins: pluginConfigs.bundle, // ← genera dist/tippy.css
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      file: 'dist/tippy.cjs.js',
      format: 'cjs',
      exports: 'named',
      banner,
      sourcemap: true,
    },
  },
  {
    input: 'build/headless.js',
    plugins: pluginConfigs.base,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      file: 'headless/dist/tippy-headless.cjs.js',
      format: 'cjs',
      exports: 'named',
      banner,
      sourcemap: true,
    },
  },
  {
    input: 'build/headless-umd.js',
    plugins: pluginConfigs.umdBase,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'headless/dist/tippy-headless.umd.js',
    },
  },
  {
    input: 'build/headless-umd.js',
    plugins: pluginConfigs.umdBaseMin,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'headless/dist/tippy-headless.umd.min.js',
    },
  },
];

const devConfig = () => [
  {
    input: 'build/base.js',
    plugins: [
      plugins.babel,
      plugins.replaceEnvDevelopment,
      plugins.resolve,
      plugins.json,
      sass({ output: 'dist/tippy.css' }),
      serve({
        open: true,
        contentBase: ['dist', 'example-cdn'],
        port: 3000,
      }),
      livereload(),
    ],
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      file: 'dist/tippy.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  },
];

const testConfig = () => [
  {
    input: 'build/bundle-umd.js',
    plugins: pluginConfigs.umdBundle,
    external: ['@popperjs/core', '@floating-ui/dom', 'react', 'react-dom'],
    output: {
      ...commonUMDOutputOptions,
      file: 'dist/tippy-bundle.umd.js',
    },
  },
];

const configs = {
  production: () => prodConfig,
  dev: devConfig,
  test: testConfig,
};

const func = configs[process.env.NODE_ENV];
export default func ? func() : prodConfig;
