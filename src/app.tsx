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
import { basename, IS_PROD, isQiankun } from './constants';
import { getLocale, setLocale } from './i18n';
import { Tooltip } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

// TODO：qiankun umi 子应用 window.routerBase 问题，目前需要手动设置一下 routerBase 的值
window.routerBase = basename;

let qiankunHistory: any;
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    // console.info('app bootstrap:', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    setTimeout(() => {
      props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        qiankunHistory = state.history;
      }, true);
    }, 50);
  },
  // 应用卸载之后触发
  async unmount(props) {
    // console.info('app unmount', props);
  },
};

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

const Title = ({ icon }: any) => {
  const authData = utils.getAuthData();
  const userName = authData?.user?.name || 'N/A';
  if (icon) {
    return <div style={{ lineHeight: '28px' }}>{userName.split('')?.[0]}</div>;
  }
  return <div style={{ color: '#fff' }}>{userName}</div>;
};

export const layout: RunTimeLayoutConfig = () => {
  initUnifiedLinkHistory(
    qiankunHistory || {
      goBack: history.back,
      ...history,
    }
  );

  const notProdOrQiankun = !IS_PROD && !isQiankun;

  return {
    title: false,
    logo: <img alt="logo" src={logo} style={{ height: '36px' }} />,
    siderWidth: 200,
    fixedHeader: true,
    fixSiderbar: true,
    rightContentRender: false, // umi !!!
    headerRender: notProdOrQiankun ? undefined : false,
    menuRender: notProdOrQiankun ? undefined : false,
    footerRender: false,
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
    layout: notProdOrQiankun ? 'mix' : 'side',
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
