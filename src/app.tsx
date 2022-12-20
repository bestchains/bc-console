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
import { setAutoFreeze } from 'immer';
import { IS_PROD } from './utils/constants';
import { getDvaApp, setCreateHistoryOptions, useSelector, getS } from 'umi';
import logo from '@/assets/img/logo.png';
import theme from '../config/theme';

// 默认禁用冻结对象
setAutoFreeze(false);

const qiankunState = Object.create({
  slave: {},
});

export const modifyContextOpts = {
  historyOpts: {},
};

// 自定义 dva 配置
let alertHasBeenDisplayed = false;
export const dva = {
  config: {
    initialState: {
      app: undefined,
    },
    // handle global error here
    onError(e) {
      // 必须有 onError 这个配置，否则无法捕获 dispatch 中的报错
    },
  },
  plugins: [
    //
  ],
};

const Title = ({ icon }: any) => {
  const store: any = useSelector((store: any) => store);
  const { app } = store;
  if (icon) {
    return <div style={{ lineHeight: '30px' }}>{app?.user?.userName?.split('')?.[0]}</div>;
  }
  return <div>{app?.user?.userName}</div>;
};

export const layout: RunTimeLayoutConfig = () => {
  return {
    title: 'devops-manager-portal',
    logo: <img src={logo} />,
    rightContentRender: false, // umi !!!
    avatarProps: {
      title: <Title />,
      icon: <Title icon />,
      size: 'default',
    },
    headerRender: (_, HeaderView) => {
      return !IS_PROD ? HeaderView : null;
    },
    menuRender: (_, menuView) => {
      return !IS_PROD ? menuView : null;
    },
    menuHeaderRender: (logo: React.ReactNode) => {
      return null;
    },
    layout: !IS_PROD ? 'mix' : 'side',
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
      primaryColor: theme['@primary-color'],
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
