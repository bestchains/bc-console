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

const publicPath = '/oidc-public/';

export default defineConfig({
  hash: true,
  publicPath,
  outputPath: './dist' + publicPath,
  define: {
    'process.env.PUBLIC_DIR': publicPath,
  },
  jsMinifier: 'terser',
  jsMinifierOptions: {},
  base: '/oidc/',
  extraBabelPlugins: ['transform-react-remove-prop-types'],
  theme: {},
  metas: [
    {
      name: 'keywords',
      content:
        'Docker,Kubernetes,devops,开发运维一体化,敏捷开发,容器云部署,容器云厂商,容器云技术,容器云平台,数字化转型,微服务架构,微服务平台,云原生应用、数据平台、数据中台、服务网格,云原生Paas，云原生数据中台,ServiceMesh,kubedata',
    },
    {
      name: 'description',
      content:
        '时速云是一家领先的全栈云原生技术服务提供商。公司围绕云原生技术和企业数字化转型需求，推出了容器云 PaaS、云原生数据平台、 DevOps、微服务、服务网格、API网关等产品，致力于通过云原生技术帮助企业实现数字化转型。',
    },
  ],
  scripts: [],
  links: [{ rel: 'shortcut icon', type: 'image/x-icon', href: '/profile/img/favicon.ico' }],
});
