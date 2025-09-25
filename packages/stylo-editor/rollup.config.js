import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";
import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import postcssImport from "postcss-import";

export default [
  // Main build
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.js", format: "cjs", sourcemap: true },
      { file: "dist/index.esm.js", format: "esm", sourcemap: true },
    ],
    external: ["react", "react-dom"],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"], // 👈 importante
      }),
      commonjs(),
      // 👇 Babel transforma JSX de .jsx (y puede manejar .tsx si quieres)
      babel({
        presets: ["@babel/preset-react"],
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"], // 👈 importante
        exclude: /node_modules/,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false,
      }),
      postcss({
          plugins: [postcssImport(), postcssNested(), autoprefixer()],

        config: { path: "./postcss.config.cjs" }, // 👈 importante
        modules: true,
        extract: "styles.css",
        minimize: true,
        extensions: [".css"],
      }),
    ],
  },
  // Type definitions
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "es" },
    plugins: [dts()],
  },
];
