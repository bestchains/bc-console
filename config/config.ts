/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * default config
 *
 * @author Vsion
 * @date 2022-12-19
 */

import { defineConfig } from '@umijs/max';
import routes from './routes';
import { execSync } from 'child_process';
import theme from './theme';

/**
 * get last commit hash
 */
const getLastCommitHash = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch (error) {
    console.warn('Get last commit hash faild =>', error);
    return '-';
  }
};

const site = 'tenxcloud.com';
const bannerFlag = `@Licensed Materials - Property of ${site}`;
const banner = `${bannerFlag}
(C) Copyright 2022~2023 ${site}. All Rights Reserved.
@date ${Date.now()}
@hash ${getLastCommitHash()}
http://${site}`;

export default defineConfig({
  historyWithQuery: {},
  history: {
    type: 'browser',
  },
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  antd: {
    import: false,
    theme,
  },
  layout: {},
  lessLoader: {
    modifyVars: {
      '@ant-prefix': 'ant',
    },
    javascriptEnabled: true,
    strictMath: false,
    math: 'parens-division',
  },
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  routes,
  targets: {
    chrome: 49,
    firefox: 64,
    safari: 10,
    edge: 13,
    ios: 10,
    // ie: 11,
  },
  ignoreMomentLocale: true,
  favicons: ['/favicon.ico'],
  base: '/',
  publicPath: '/',
  define: {
    'process.env.PUBLIC_DIR': '/',
  },
  chainWebpack() {
    const [memo, { env, webpack }]: any = arguments;
    // add copyright banner
    memo.plugin('banner').use(webpack.BannerPlugin, [
      {
        banner,
        exclude: /\.svg$/,
      },
    ]);
    if (env === 'production') {
      memo.optimization.minimizer('js-terser').tap((args: any) => {
        args[0].terserOptions.format.comments = new RegExp(bannerFlag);
        return args;
      });
    }
    // console.log('webpack config: \n', memo.toString())
  },
});
