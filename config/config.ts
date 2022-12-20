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
import theme from './theme';
import { execSync } from 'child_process';

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
  },
  layout: {},
  dva: {
    immer: {},
  },
  lessLoader: {
    modifyVars: theme,
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
  theme,
  base: '/',
  publicPath: '/',
  define: {
    'process.env.PUBLIC_DIR': '/',
  },
  chainWebpack() {
    const [memo, { env, webpack }]: any = arguments;
    // node_modules => vendors
    if (env === 'production') {
      memo.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            automaticNameDelimiter: '.',
            cacheGroups: {
              common: {
                name: 'vendors',
                test({ resource }: any) {
                  return /[\\/]node_modules[\\/]/.test(resource);
                },
                priority: 10,
              },
              // 比较大的依赖且首屏（/tenant_manage/overview 页面）不需要的单独打成一个 vendor，按需加载
              large: {
                name: 'vendors-large',
                test({ resource }: any) {
                  const largeModules = [
                    '/node_modules/monaco-editor',
                    '/node_modules/jointjs',
                    '/node_modules/bizcharts',
                    '/node_modules/@antv/data-set',
                    '/node_modules/brace',
                    '/node_modules/jquery',
                  ];
                  return largeModules.some(m => resource && resource.includes(m));
                },
                priority: 20,
              },
            },
          },
        },
      });
    }
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
    // return memo;
    // console.log('webpack config: \n', memo.toString())
  },
});
