import { message } from 'antd';

import { notification } from '@tenx-ui/materials';

import { createRef } from 'react';
import { sdk as bff } from '../../bff-sdk';

const utils = {};

utils.bff = bff;

utils.message = message;

utils.notification = notification;

/** 本地存储中认证数据保存的 key */
utils.AUTH_DATA = function __AUTH_DATA() {
  return 'authData';
}.apply(utils);
export const AUTH_DATA = utils.AUTH_DATA;

/** 获取认证数据 */
utils.getAuthData = function __getAuthData() {
  return () => {
    try {
      const authData = JSON.parse(
        window.localStorage.getItem(this.AUTH_DATA) || '{}'
      );
      return authData;
    } catch (error) {
      console.warn('getAuthData failed', error);
      return {};
    }
  };
}.apply(utils);
export const getAuthData = utils.getAuthData;

/** 设置认证数据 */
utils.setAuthData = function __setAuthData() {
  return (data) => {
    window.localStorage.setItem(this.AUTH_DATA, JSON.stringify(data));
  };
}.apply(utils);
export const setAuthData = utils.setAuthData;

/** 移除认证数据 */
utils.removeAuthData = function __removeAuthData() {
  return () => {
    window.localStorage.removeItem(this.AUTH_DATA);
    window.sessionStorage.removeItem(this.AUTH_DATA);
  };
}.apply(utils);
export const removeAuthData = utils.removeAuthData;

/** 解析 token */
utils.parseToken = function parseToken(token) {
  return token
    .split('.')
    .map((str) => {
      try {
        return JSON.parse(atob(str));
      } catch (e) {
        // do sth
      }
      return {};
    })
    .reduce(
      (pr, cu) => ({
        ...pr,
        ...cu,
      }),
      {}
    );
}.bind(utils);
export const parseToken = utils.parseToken;

/** 判断 token 是否有效 */
utils.isTokenExpired = function isTokenExpired(token) {
  token = token || this.getAuthData()?.token?.id_token;
  if (!token) {
    return true;
  }
  const expiredTimestampInMs = this.parseToken(token).exp * 1000;
  return new Date().getTime() >= expiredTimestampInMs;
}.bind(utils);
export const isTokenExpired = utils.isTokenExpired;

/** 获取 Authorization header */
utils.getAuthorization = function __getAuthorization() {
  return () => {
    const authData = this.getAuthData();
    const { token_type, id_token } = authData.token || {};
    const Authorization = token_type && id_token && `${token_type} ${id_token}`;
    return Authorization;
  };
}.apply(utils);
export const getAuthorization = utils.getAuthorization;

/** 获取 axios 默认配置，也可在配置中指定拦截器，用于数据源初始化 axios handler */
utils.getAxiosHanlderConfig = function __getAxiosHanlderConfig() {
  return () => ({
    // 详细配置见：http://dev-npm.tenxcloud.net/-/web/detail/@yunti/lowcode-datasource-axios-handler
    interceptors: {
      request: [
        {
          onFulfilled: (config) => {
            if (!config.headers.get('Authorization')) {
              config.headers.set('Authorization', this.getAuthorization());
            }
            return config;
          },
        },
      ],
    },
  });
}.apply(utils);
export const getAxiosHanlderConfig = utils.getAxiosHanlderConfig;

/** 共计 xx 条 */
utils.paginationShowTotal = function paginationShowTotal(total, range, props) {
  return `${props.i18n('i18n-5xl7aihzcuy')} ${total} ${props.i18n(
    'i18n-v7xu122b9o'
  )}`;
}.bind(utils);
export const paginationShowTotal = utils.paginationShowTotal;

/** 格式化 cpu */
utils.formatCpu = function __formatCpu() {
  return (v) => {
    if (v.includes('m')) {
      return parseFloat(v) / 1000;
    }
    return parseFloat(v);
  };
}.apply(utils);
export const formatCpu = utils.formatCpu;

/** 下载文件 */
utils.downloadFile = function __downloadFile() {
  return (data, filename = 'profile.json', type = 'text/json') => {
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4);
    }
    const blob = new Blob([data], { type }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click');
    a.dispatchEvent(e);
  };
}.apply(utils);
export const downloadFile = utils.downloadFile;

/** 长度校验 */
utils.getLengthReg = function __getLengthReg() {
  return (min = 0, max = 200) => `^.{${min},${max}}$`;
}.apply(utils);
export const getLengthReg = utils.getLengthReg;

/** Base64 解码 */
utils.decodeBase64 = function __decodeBase64() {
  return (str) => decodeURIComponent(atob(str));
}.apply(utils);
export const decodeBase64 = utils.decodeBase64;

/** Base64 加密 */
utils.encodeBase64 = function __encodeBase64() {
  return (str) => btoa(encodeURIComponent(str));
}.apply(utils);
export const encodeBase64 = utils.encodeBase64;

/** 字节单位格式化 */
utils.formatBitUnit = function __formatBitUnit() {
  return (bit = 0, fixed = 2) => {
    if (bit > 1024) {
      return {
        unit: 'KB',
        size: (bit / 1024).toFixed(fixed),
      };
    }
    if (bit > 1024 * 1024) {
      return {
        unit: 'MB',
        size: (bit / 1024 / 1024).toFixed(fixed),
      };
    }
    if (bit > 1024 * 1024 * 1024) {
      return {
        unit: 'GB',
        size: (bit / 1024 / 1024 / 1024).toFixed(fixed),
      };
    }
    if (bit > 1024 * 1024 * 1024 * 1024) {
      return {
        unit: 'TB',
        size: (bit / 1024 / 1024 / 1024 / 1024).toFixed(fixed),
      };
    }
    return {
      unit: 'B',
      size: (bit || 0).toFixed(fixed),
    };
  };
}.apply(utils);
export const formatBitUnit = utils.formatBitUnit;

export class RefsManager {
  constructor() {
    this.refInsStore = {};
  }

  clearNullRefs() {
    Object.keys(this.refInsStore).forEach((refName) => {
      const filteredInsList = this.refInsStore[refName].filter(
        (insRef) => !!insRef.current
      );
      if (filteredInsList.length > 0) {
        this.refInsStore[refName] = filteredInsList;
      } else {
        delete this.refInsStore[refName];
      }
    });
  }

  get(refName) {
    this.clearNullRefs();
    if (this.refInsStore[refName] && this.refInsStore[refName].length > 0) {
      return this.refInsStore[refName][0].current;
    }

    return null;
  }

  getAll(refName) {
    this.clearNullRefs();
    if (this.refInsStore[refName] && this.refInsStore[refName].length > 0) {
      return this.refInsStore[refName].map((i) => i.current);
    }

    return [];
  }

  linkRef(refName) {
    const refIns = createRef();
    this.refInsStore[refName] = this.refInsStore[refName] || [];
    this.refInsStore[refName].push(refIns);
    return refIns;
  }
}
utils.RefsManager = RefsManager;

export default {
  bff,

  message,

  notification,

  AUTH_DATA,

  getAuthData,

  setAuthData,

  removeAuthData,

  parseToken,

  isTokenExpired,

  getAuthorization,

  getAxiosHanlderConfig,

  paginationShowTotal,

  formatCpu,

  downloadFile,

  getLengthReg,

  decodeBase64,

  encodeBase64,

  formatBitUnit,
};
