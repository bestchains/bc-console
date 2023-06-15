const routes = [
  {
    name: 'BaaS',
    path: '/',
    component: '@/layouts',
    routes: [
      {
        name: '总览',
        path: '/overview',
        component: '@/pages/Overview',
      },
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
      {
        name: '区块链浏览器',
        path: '/browser',
        component: '@/pages/Browser',
      },
      {
        name: '合约商店',
        path: '/contract',
        component: '@/pages/Contract',
      },
      {
        // name: "合约商店-详情",
        path: '/contract/:id',
        component: '@/pages/ContractDetail',
      },
      {
        name: '可信存证平台-总览',
        path: '/depository/overview',
        component: '@/pages/DepositoryOverview',
      },
      {
        name: '可信存证平台-存证管理',
        path: '/depository/management',
        component: '@/pages/DepositoryManagement',
      },
      {
        path: '/depository/management/create',
        component: '@/pages/DepositoryManagementCreate',
      },
      {
        path: '/depository/management/detail/:id',
        component: '@/pages/DepositoryManagementDetail',
      },
      {
        name: '可信存证平台-验证中心',
        path: '/depository/verification',
        component: '@/pages/DepositoryVerification',
      },
    ],
  },
];

export default routes;
