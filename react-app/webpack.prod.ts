import { DefinePlugin, Configuration } from 'webpack';

import merge from 'webpack-merge';
import common from './webpack.common';

export default merge(common, {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}) as Configuration;
