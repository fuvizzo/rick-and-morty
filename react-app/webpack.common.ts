import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { Configuration, EnvironmentPlugin } from 'webpack';

const paths = {
  DEPLOY: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src'),
};
const configuration: Configuration = {
  entry: {
    app: './src/index.tsx',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, 'public/index.html')),
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new EnvironmentPlugin([
      'NODE_ENV',
      'REACT_APP_AUTH_SERVICE_URL',
      'REACT_APP_CHARACTER_SERVICE_URL',
    ]),
  ],
  output: {
    filename: 'bundle.js',
    path: paths.DEPLOY,
    publicPath: '/',
  },
};

export default configuration;
