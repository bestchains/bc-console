/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * prod config
 *
 * @author Vsion
 * @date 2022-12-19
 */

import { defineConfig } from '@umijs/max';

const publicPath = '/';

export default defineConfig({
  hash: true,
  publicPath,
  outputPath: './dist' + publicPath,
  define: {
    'process.env.PUBLIC_DIR': publicPath,
  },
  jsMinifier: 'terser',
  jsMinifierOptions: {},
  base: '/bc/',
  extraBabelPlugins: ['transform-react-remove-prop-types'],
  theme: {},
  metas: [
    {
      name: 'keywords',
      content: 'Hyperledger,Fabric,Kubernetes,Operator',
    },
    {
      name: 'description',
      content: 'Console for best chain',
    },
  ],
  scripts: [],
  links: [{ rel: 'shortcut icon', type: 'image/x-icon', href: '/profile/img/favicon.ico' }],
});
