import { createRef } from 'react';
import { sdk as bff } from '../bff-sdk';
import { message } from 'antd';
import { notification } from '@tenx-ui/materials';

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

export const AUTH_DATA = 'authData';

export const getAuthData = () => {
  try {
    const authData = JSON.parse(window.localStorage.getItem(AUTH_DATA) || '{}');
    return authData;
  } catch (error) {
    console.warn('getAuthData failed', error);
    return {};
  }
};

export const setAuthData = (data) => {
  window.localStorage.setItem(AUTH_DATA, JSON.stringify(data));
};

export const removeAuthData = () => {
  window.localStorage.removeItem(AUTH_DATA);
  window.sessionStorage.removeItem(AUTH_DATA);
};

export function parseToken(token) {
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
}

export function isTokenExpired(token) {
  token = token || getAuthData()?.token?.id_token;
  if (!token) {
    return true;
  }
  const expiredTimestampInMs = parseToken(token).exp * 1000;
  return new Date().getTime() >= expiredTimestampInMs;
}

export default {
  bff,
  AUTH_DATA,
  getAuthData,
  setAuthData,
  removeAuthData,
  message,
  isTokenExpired,
  parseToken,
  notification,
};
