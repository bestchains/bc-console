/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2023 TenxCloud. All Rights Reserved.
 */

/**
 * hooks
 * @author songsz
 * @date 2023-03-16
 */
import * as React from 'react';
import { useModel } from '@umijs/max';

export let _qiankunData = {};
const useQiankunGlobalState = () => {
  const u = useModel('@@qiankunStateFromMaster');
  const { setQiankun } = useModel('qiankun');
  React.useEffect(() => {
    u?.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      setQiankun(state);
      // 给 app.tsx layout 使用
      _qiankunData?.setInitialState?.(state);
    }, true);
  }, [setQiankun]);
};
export { useQiankunGlobalState };
