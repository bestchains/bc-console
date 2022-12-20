/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * PageLayout
 *
 * @author rensiwei
 * @date 2022-12-19
 */

import React, { useEffect } from 'react';
import { history, Outlet, useLocation } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_US';
import { IS_PROD } from '@/utils/constants';
import { getCookie } from '@/utils/helper';
import styles from './index.less';

const Wrapper = (props: any) => {
  return (
    <div
      className={styles.layout}
      id="test-pro-layout"
      style={
        IS_PROD
          ? {
              minHeight: '100vh',
            }
          : {}
      }
    >
      {props.children}
    </div>
  );
};

const PageLayout: React.FC = props => {
  const location = useLocation();
  const intlLocale = getCookie('intl_locale') || 'zh';
  const locale = intlLocale === 'en' ? enUS : zhCN;
  useEffect(() => {}, []);
  return (
    <ConfigProvider locale={locale}>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ConfigProvider>
  );
};

export default PageLayout;
