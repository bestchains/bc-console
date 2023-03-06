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
      target: 'https://portal.172.22.96.209.nip.io/bc-apis',
      changeOrigin: true,
      secure: false,
    },
  },
});
