/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import pkg from '../package.json';

const ROOT_PATH = path.normalize(path.join(__dirname, '..'));
const SRC_PATH = path.join(ROOT_PATH, 'src');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

const isDevelopment = process.env.NODE_ENV !== 'production';

const sourceMap = isDevelopment ? '&sourceMap' : '';
const styleFileName = `style-${pkg.version}.css`;
const sassLoader = [
  `css-loader?${sourceMap}&modules&importLoaders=1&localIdentName=_[hash:base64:4]`,
  'postcss-loader',
  'resolve-url-loader',
  `sass-loader?outputStyle=compressed${sourceMap}`,
].join('!');
const extractCSS = new ExtractTextWebpackPlugin({ filename: styleFileName, allChunks: true });

const config = {
  entry: ['babel-polyfill', path.join(SRC_PATH, 'index.js')],
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
    chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                'es2017',
                'react',
                'stage-3',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      (() => {
        const loader = {
          test: /\.scss$/,
        };

        if (isDevelopment) {
          loader.use = [
            'style-loader',
            sassLoader,
          ];
        } else {
          loader.use = extractCSS.extract({
            fallback: 'style-loader',
            use: sassLoader,
          });
        }
        return loader;
      })(),
    ],
  },
  plugins: (() => {
    const plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
        },
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'src', 'scss')],
          },
          postcss: [
            precss(),
            autoprefixer({
              browsers: ['last 2 version'],
            }),
          ],
          context: path.join(__dirname, 'src'),
          output: {
            path: path.join(__dirname, 'www'),
          },
        },
      }),
      new ExtractTextWebpackPlugin('styles.css'),
      new HtmlWebpackPlugin({
        hash: true,
        filename: path.join(BUILD_PATH, 'index.html'),
        template: path.join(SRC_PATH, 'views/index.html'),
        title: 'ES6 Frontend Boilerplate (2017)',
      }),
    ];
    if (!isDevelopment) {
      plugins.push(
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: '[name]-[hash].js',
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          output: {
            comments: false,
          },
          compress: {
            screw_ie8: true,
            warnings: false,
          },
        }),
      );
    }
    return plugins;
  })(),
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};

export default config;
