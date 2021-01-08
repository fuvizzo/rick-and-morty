import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 5000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'build'),
    open: true,
    openPage: '',
  },
}) as Configuration;
