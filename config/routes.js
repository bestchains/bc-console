const routes = [
  {
    name: 'BaaS',
    path: '/',
    component: '@/layouts',
    routes: [
      {
        name: '组织管理',
        path: '/organization',
        component: '@/pages/Organization',
      },
      {
        // name: "组织管理-详情",
        path: '/organization/:id',
        component: '@/pages/OrganizationDetail',
      },
      {
        name: '联盟管理',
        path: '/federation',
        component: '@/pages/Federation',
      },
      {
        // name: "联盟管理-详情",
        path: '/federation/:id',
        component: '@/pages/FederationDetail',
      },
      {
        name: '提议管理',
        path: '/proposal',
        component: '@/pages/Proposal',
      },
      {
        // name: "提议管理-详情",
        path: '/proposal/:id',
        component: '@/pages/ProposalDetail',
      },
      {
        name: '网络管理',
        path: '/network',
        component: '@/pages/Network',
      },
      {
        // name: '网络管理-创建网络',
        path: '/network/create',
        component: '@/pages/NetworkCreate',
      },
      {
        // name: "网络管理-详情",
        path: '/network/detail/:id',
        component: '@/pages/NetworkDetail',
      },
      {
        path: '/network/detail/:id/channel/:channelId',
        component: '@/pages/NetworkChannelDetail',
      },
      {
        path: '/network/detail/:id/contract/:contractId',
        component: '@/pages/NetworkContractDetail',
      },
    ],
  },
];

export default routes;
