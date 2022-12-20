/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * routes config
 *
 * @author Vsion
 * @date 2022-12-19
 */

const routes: any[] = [
  {
    path: '/',
    name: '某模块',
    exact: true,
    component: '@/pages',
    wrappers: ['@/layouts/PageLayout'],
    routes: [
      {
        path: 'test1',
        name: '测试',
        routes: [
          {
            name: 'test11',
            path: 'test11',
            component: '@/pages',
          },
        ],
      },
      {
        path: 'test2',
        name: '测试',
        routes: [
          {
            name: 'test22',
            path: 'test22',
            component: '@/pages',
          },
        ],
      },
      // ...
    ],
  },
];
export default routes;
