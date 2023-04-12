import { useQiankunGlobalState } from '@/utils/helper';
import { useModel } from '@@/exports';
import { Outlet } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import themeConfig from '../../config/theme';
import { getLocale } from '../i18n';

const Layout: React.FC = () => {
  // 调用一次即可
  useQiankunGlobalState();
  // 获取 dock-app 数据使用 useModel('qiankun')
  const { qiankun } = useModel('qiankun');
  const locale = getLocale().toLowerCase();

  return (
    <ConfigProvider
      theme={{
        token: {
          ...themeConfig.token,
          colorPrimary: qiankun?.theme?.colorPrimary || themeConfig.token.colorPrimary,
        },
        algorithm: qiankun?.theme?.isDark ? theme.darkAlgorithm : undefined,
      }}
      locale={locale === 'zh-cn' ? zhCN : enUS}
    >
      <Outlet />
    </ConfigProvider>
  );
};

export default Layout;
