/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * local config
 *
 * @author Vsion
 * @date 2022-12-19
 */

import { defineConfig } from '@umijs/max';

export default defineConfig({
  proxy: {
    '/bff': {
      target: 'https://bc.172.22.96.209.nip.io',
      changeOrigin: true,
      secure: false,
    },
    '/token': {
      target: 'https://bc.172.22.96.209.nip.io',
      changeOrigin: true,
      secure: false,
    },
  },
});
