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
import logo from '@/assets/img/logo.png';
import theme from '../config/theme';
import { initUnifiedLinkHistory } from '@tenx-ui/utils/es/UnifiedLink';
import utils from './utils';

// const IS_PROD = process.env.NODE_ENV === 'production';
const qiankunState = Object.create({
  slave: {},
});

export const modifyContextOpts = {
  historyOpts: {},
};

const Title = ({ icon }: any) => {
  const authData = utils.getAuthData();
  const userName = authData?.user?.name || 'N/A';
  if (icon) {
    return <div style={{ lineHeight: '30px' }}>{userName.split('')?.[0]}</div>;
  }
  return <div>{userName}</div>;
};

export const layout: RunTimeLayoutConfig = () => {
  initUnifiedLinkHistory({
    goBack: history.back,
    ...history,
  });

  return {
    title: 'devops-manager-portal',
    logo: <img src={logo} />,
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
      ];
    },
    headerRender: (_, HeaderView) => {
      // return !IS_PROD ? HeaderView : null;
      return HeaderView;
    },
    menuRender: (_, menuView) => {
      // return !IS_PROD ? menuView : null;
      return menuView;
    },
    menuHeaderRender: (logo: React.ReactNode) => {
      return null;
    },
    // layout: !IS_PROD ? 'mix' : 'side',
    layout: 'mix',
    headerTitleRender: () => {
      return <img style={{ height: '32px' }} src={logo} />;
    },
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
    navTheme: 'dark',
    headerTheme: 'dark',
    settings: {
      navTheme: 'dark',
      primaryColor: theme?.token?.colorPrimary,
    },
    footerRender: () => {
      return null;
    },
    menuProps: {
      // theme: 'dark',
    },
    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};
