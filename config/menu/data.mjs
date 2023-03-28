import * as React from 'react'
// ⚠️ import 时候需要指定扩展名，即加上 .js
import BaasMain from "@tenx-ui/icon/lib/BaasMain.js";
import BaasOrganization from "@tenx-ui/icon/lib/BaasOrganization.js";
import BaasFederation from "@tenx-ui/icon/lib/BaasFederation.js";
import BaasProposal from "@tenx-ui/icon/lib/BaasProposal.js";
import BaasNetwork from "@tenx-ui/icon/lib/BaasNetwork.js";
import {ChromeFilled} from  '@ant-design/icons'
export const User = 'User'
export const TENANT_ADMIN = 'TenantAdmin'
export const PlatformAdmin = 'PlatformAdmin' // 3
export const SystemAdmin = 'SystemAdmin' // 2

const data = [
  {
    id: 'baas',
    type: 'all-product',
    text: 'BestChain',
    textEn: 'BestChain',
    icon: BaasMain,
    column: 1,
    children: [
      {
        id: 'baas-index',
        text: '区块链服务平台',
        textEn: 'BaaS',
        children: [
          {
            id: 'baas-organization',
            text: '组织管理',
            textEn: 'Organization',
            icon: BaasOrganization,
            pathname: '/organization',
            tenant: false,
          },
          {
            id: 'baas-federation',
            text: '联盟管理',
            textEn: 'Federation',
            icon: BaasFederation,
            pathname: '/federation',
            tenant: false,
          },
          {
            id: 'baas-proposal',
            text: '提议管理',
            textEn: 'Proposal',
            icon: BaasProposal,
            pathname: '/proposal',
            tenant: false,
          },
          {
            id: 'baas-network',
            text: '网络管理',
            textEn: 'Network',
            icon: BaasNetwork,
            pathname: '/network',
            tenant: false,
          },
          {
            id: 'baas-browser',
            text: '区块链浏览器',
            textEn: 'Browser',
            icon: ChromeFilled,
            pathname: '/browser',
            tenant: false,
          },
        ]
      }
    ]
  },
]

export default data;
