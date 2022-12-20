/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2018 TenxCloud. All Rights Reserved.
 */

/**
 * helper
 *
 * @author Vsion
 * @date 2022-12-19
 */

/**
 * Generate random string with specified length, default is 6, max is 64
 */

export function genRandomString(mytoken?: string, len?: any) {
  const DEFAULT_TOKEN = '0123456789qwertyuioplkjhgfdsazxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ@#$'; // %&
  const DEFAULT_LEN = 6;
  const MAX_LEN = 64;
  if (!mytoken) {
    mytoken = DEFAULT_TOKEN;
    len = DEFAULT_LEN;
  } else if (!len) {
    if (typeof mytoken === 'number') {
      len = mytoken;
      mytoken = DEFAULT_TOKEN;
    } else {
      len = DEFAULT_LEN;
    }
  }
  len = len > MAX_LEN ? MAX_LEN : len;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += mytoken.charAt(Math.ceil(Math.random() * 100000000) % mytoken.length);
  }
  return randomStr;
}

export const encodeBase64 = (str: string) => btoa(encodeURIComponent(str));
export const decodeBase64 = (str: string) => decodeURIComponent(atob(str));

export const getCookie = cookie_name => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(cookie_name + '=');
    if (start !== -1) {
      start = start + cookie_name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};
