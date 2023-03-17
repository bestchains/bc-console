import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, history } from '@umijs/max';
import utils from '../utils';
import { IS_PROD, IS_QIAN_KUN } from '../constants';
import { getLocale } from '../i18n';
import Request from '@tenx-ui/utils/es/request';
import queryString from '@tenx-ui/utils/es/queryString';
import PageLoading from '@/components/PageLoading';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { useQiankunGlobalState } from '@/utils/helper';
import { useModel } from '@@/exports';

const request = Request('');

const Layout: React.FC = () => {
  // 调用一次即可
  useQiankunGlobalState();
  // 获取 dock-app 数据使用 useModel('qiankun')
  const { qiankun } = useModel('qiankun');

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const query = useMemo(() => queryString.parse(location.search), [location.search]);
  const locale = getLocale().toLowerCase();

  let redirect_uri = window.location.origin;
  // @Todo: workaround
  if (!redirect_uri.includes('localhost:')) {
    redirect_uri += '/bc';
  }
  const getToken = useCallback(async (code: string) => {
    const token = await request({
      url: '/token',
      options: { method: 'POST', body: { code, redirect_uri } },
    });
    const parsedToken = utils.parseToken(token.id_token);
    utils.setAuthData({
      token,
      user: { name: parsedToken.preferred_username, email: parsedToken.email },
    });
    history.replace('/organization');
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!IS_PROD || !IS_QIAN_KUN) {
      if (query.code) {
        getToken(query.code);
        return;
      }
      if (utils.isTokenExpired()) {
        window.location.href = `/login?redirect_uri=${redirect_uri}`;
        // window.location.href = `https://bc.172.22.50.142.nip.io/login?redirect_uri=${redirect_uri}`;
        return;
      }
    }
    setLoading(false);
    if (location.pathname === '/') {
      history.replace('/organization');
    }
    // set local
    if (locale === 'zh-cn') {
      dayjs.locale('zh-cn');
    } else {
      dayjs.locale('en');
    }
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: qiankun?.theme?.colorPrimary,
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
