export const AUTH_DATA = 'authData';
export const removeAuthData = (): void => {
  window.localStorage.removeItem(AUTH_DATA);
  window.sessionStorage.removeItem(AUTH_DATA);
};
