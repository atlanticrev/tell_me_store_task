const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const
  rootDir = path.resolve(__dirname),
  outputDir = path.resolve(rootDir, 'dist');

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, outputDir)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          },
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  watch: true,
  watchOptions: {
    ignored: [
      /node_modules/, /dist/,
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
};
