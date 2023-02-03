/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
 *
 * @author Vsion
 * @date 2022-01-15
 */
import React from 'react';
import { RunTimeLayoutConfig } from '@umijs/max';
import { Typography, Modal } from 'antd';
import { history } from '@umijs/max';
import logo from '@/assets/img/logo-title-white.png';
import theme from '../config/theme';
import { initUnifiedLinkHistory } from '@tenx-ui/utils/es/UnifiedLink';
import utils from './utils';
import { getLocale, setLocale } from './i18n';
import { Tooltip } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const LOCALE_MAP = {
  'en-US': {
    key: 'en-US', // 低代码编译器
    tooltip: '切换为中文',
    change: 'zh-CN',
  },
  'zh-CN': {
    key: 'zh-CN',
    tooltip: 'Chang to English',
    change: 'en-US',
  },
};
const locale = getLocale();
const langInfo = LOCALE_MAP[locale];

// const IS_PROD = process.env.NODE_ENV === 'production';
// const qiankunState = Object.create({
//   slave: {},
// });

// export const modifyContextOpts = {
//   historyOpts: {},
// };

const Title = ({ icon }: any) => {
  const authData = utils.getAuthData();
  const userName = authData?.user?.name || 'N/A';
  if (icon) {
    return <div style={{ lineHeight: '28px' }}>{userName.split('')?.[0]}</div>;
  }
  return <div style={{ color: '#fff' }}>{userName}</div>;
};

export const layout: RunTimeLayoutConfig = () => {
  initUnifiedLinkHistory({
    goBack: history.back,
    ...history,
  });

  return {
    title: false,
    logo: <img alt="logo" src={logo} style={{ height: '36px' }} />,
    siderWidth: 200,
    fixedHeader: true,
    fixSiderbar: true,
    rightContentRender: false, // umi !!!
    avatarProps: {
      title: <Title />,
      icon: <Title icon />,
      size: 'default',
    },
    actionsRender: () => {
      return [
        <Typography.Link
          key="logout"
          onClick={() => {
            utils.removeAuthData();
            Modal.info({
              title: '退出成功',
              content: '点击确定重新登录',
              okText: '确定',
              onOk: () => window.location.reload(),
            });
          }}
        >
          退出
        </Typography.Link>,
        <Tooltip key="locale" title={langInfo.tooltip}>
          <GlobalOutlined
            style={{ color: '#fff' }}
            onClick={() => {
              setLocale(langInfo.change);
              window.location.reload();
            }}
          />
        </Tooltip>,
      ];
    },
    menuHeaderRender: false,
    // layout: !IS_PROD ? 'mix' : 'side',
    layout: 'mix',
    menu: {
      flatMenu: true,
      hideMenuWhenCollapsed: true,
      collapsedShowTitle: false,
      collapsedShowGroupTitle: true,
      defaultOpenAll: true,
      ignoreFlatMenu: true,
      type: 'group', // 'sub' | 'group';
      autoClose: false,
    },
    settings: {
      //
    },
    footerRender: false,
    token: {
      colorPrimary: theme.token.colorPrimary,
      bgLayout: '#ffffff',
      header: {
        colorBgHeader: '#272a32',
        colorHeaderTitle: '#fff',
        colorTextMenu: '#fff',
      },
      sider: {
        // #ffffff
      },
      pageContainer: {
        colorBgPageContainer: '#f6f6f6',
        paddingInlinePageContainerContent: 0,
        paddingBlockPageContainerContent: 0,
      },
    },
    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};
