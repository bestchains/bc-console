import { message } from 'antd';

import { notification } from '@tenx-ui/materials';

import { createRef } from 'react';
import { sdk as bff } from '../../bff-sdk';

const utils = {};

utils.bff = bff;

utils.message = message;

utils.notification = notification;

/** 本地存储中认证数据保存的 key */
const __AUTH_DATA = 'authData';
utils.AUTH_DATA = __AUTH_DATA;
export const AUTH_DATA = __AUTH_DATA;

/** 获取认证数据 */
const __getAuthData = () => {
  try {
    const authData = JSON.parse(window.localStorage.getItem(AUTH_DATA) || '{}');
    return authData;
  } catch (error) {
    console.warn('getAuthData failed', error);
    return {};
  }
};
utils.getAuthData = __getAuthData;
export const getAuthData = __getAuthData;

/** 设置认证数据 */
const __setAuthData = (data) => {
  window.localStorage.setItem(AUTH_DATA, JSON.stringify(data));
};
utils.setAuthData = __setAuthData;
export const setAuthData = __setAuthData;

/** 移除认证数据 */
const __removeAuthData = () => {
  window.localStorage.removeItem(AUTH_DATA);
  window.sessionStorage.removeItem(AUTH_DATA);
};
utils.removeAuthData = __removeAuthData;
export const removeAuthData = __removeAuthData;

/** 解析 token */
const __parseToken = function parseToken(token) {
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
utils.parseToken = __parseToken;
export const parseToken = __parseToken;

/** 判断 token 是否有效 */
const __isTokenExpired = function isTokenExpired(token) {
  token = token || getAuthData()?.token?.id_token;
  if (!token) {
    return true;
  }
  const expiredTimestampInMs = parseToken(token).exp * 1000;
  return new Date().getTime() >= expiredTimestampInMs;
}.bind(utils);
utils.isTokenExpired = __isTokenExpired;
export const isTokenExpired = __isTokenExpired;

/** 共计 xx 条 */
const __paginationShowTotal = function paginationShowTotal(
  total,
  range,
  props
) {
  return `${props.i18n('i18n-5xl7aihzcuy')} ${total} ${props.i18n(
    'i18n-v7xu122b9o'
  )}`;
}.bind(utils);
utils.paginationShowTotal = __paginationShowTotal;
export const paginationShowTotal = __paginationShowTotal;

/** 格式化 cpu */
const __formatCpu = (v) => {
  if (v.includes('m')) {
    return parseFloat(v) / 1000;
  }
  return parseFloat(v);
};
utils.formatCpu = __formatCpu;
export const formatCpu = __formatCpu;

/** 下载文件 */
const __downloadFile = (
  data,
  filename = 'profile.json',
  type = 'text/json'
) => {
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
utils.downloadFile = __downloadFile;
export const downloadFile = __downloadFile;

/** 长度校验 */
const __getLengthReg = (min = 0, max = 200) => `^.{${min},${max}}$`;
utils.getLengthReg = __getLengthReg;
export const getLengthReg = __getLengthReg;

/** Base64 解码 */
const __decodeBase64 = (str) => decodeURIComponent(atob(str));
utils.decodeBase64 = __decodeBase64;
export const decodeBase64 = __decodeBase64;

/** Base64 加密 */
const __encodeBase64 = (str) => btoa(encodeURIComponent(str));
utils.encodeBase64 = __encodeBase64;
export const encodeBase64 = __encodeBase64;

/** header 认证信息 */
const __getAuthorization = () => {
  const AUTH_DATA = 'authData';
  const getAuthData = () => {
    try {
      const authData = JSON.parse(
        window.localStorage.getItem(AUTH_DATA) || '{}'
      );
      return authData;
    } catch (error) {
      console.warn('getAuthData failed', error);
      return {};
    }
  };
  const authData = getAuthData();
  const { token_type, id_token } = authData.token || {};
  const Authorization = token_type && id_token && `${token_type} ${id_token}`;
  return Authorization;
};
utils.getAuthorization = __getAuthorization;
export const getAuthorization = __getAuthorization;

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

  paginationShowTotal,

  formatCpu,

  downloadFile,

  getLengthReg,

  decodeBase64,

  encodeBase64,

  getAuthorization,
};
