import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  entry: {
    main: "./src/index",
  },
  devtool: false,
  plugins: [
    (compiler) => {
      new compiler.webpack.SourceMapDevToolPlugin({
        filename: "[file].map[query]",
        moduleFilenameTemplate: "[absolute-resource-path]",
        fallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]",
        append: undefined,
        module: true,
        columns: true,
        noSources: false,
        namespace: undefined,
        publicPath: "/",
      }).apply(compiler);
    },
  ],
  module: {
    rules: [
      {
        loader: './test-loader.mjs'
      }
    ]
  },
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
};

export default config;
