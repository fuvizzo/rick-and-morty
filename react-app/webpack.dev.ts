import path from 'path';
import { Configuration as WebpackConfiguration, DefinePlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import dotenv from 'dotenv';
import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config({ path: `${__dirname}/.env` }).parsed),
    }),
  ],
  devServer: {
    port: Number(process.env.LISTENING_PORT),
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'build'),
    open: true,
    openPage: '',
    proxy: {
      '/auth-service-api': {
        target: process.env.REACT_APP_AUTH_SERVICE_URL,
        pathRewrite: { '^/auth-service-api': '' },
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
        /*  onProxyReq: (proxyReq) => {
          if (proxyReq.getHeader('origin')) {
            proxyReq.setHeader('origin', process.env.REACT_APP_AUTH_SERVICE_URL as string);
          }
        }, */
      },
      '/character-service-api': {
        target: process.env.REACT_APP_CHARACTER_SERVICE_URL,
        pathRewrite: { '^/character-service-api': '' },
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
    },

  },
}) as Configuration;
