/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2022 TenxCloud. All Rights Reserved.
 */

/**
 * model of app
 *
 * @author Vsion
 * @date 2022-12-20
 */

import { Effect, ImmerReducer } from 'umi';

export interface AppStateType {}

export interface AppModelType {
  namespace: 'app';
  state: AppStateType;
  effects: {
    getData: Effect;
  };
  reducers: {
    saveData: ImmerReducer<AppStateType>;
  };
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    //
  },
  effects: {
    *getData(_, { call, put }) {},
  },
  reducers: {
    // 启用 immer 之后
    saveData(state, action) {
      const { data } = action.payload;
      state.oemInfo = data;
    },
  },
};

export default AppModel;
