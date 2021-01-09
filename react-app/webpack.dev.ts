import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

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
