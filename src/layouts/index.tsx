import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, history } from '@umijs/max';
import utils from '../utils';
import { IS_PROD, isQiankun } from '../constants';
import { getLocale } from '../i18n';
import Request from '@tenx-ui/utils/es/request';
import queryString from '@tenx-ui/utils/es/queryString';
import PageLoading from '@/components/PageLoading';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

const request = Request('');

const Layout: React.FC = () => {
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
    if (!IS_PROD || !isQiankun) {
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
    <ConfigProvider locale={locale === 'zh-cn' ? zhCN : enUS}>
      <Outlet />
    </ConfigProvider>
  );
};

export default Layout;
