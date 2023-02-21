const __$$constants = {};

export default __$$constants;

export const IS_PROD = process.env.NODE_ENV === 'production';
export const isQiankun = window.__POWERED_BY_QIANKUN__;
export const basename = IS_PROD || isQiankun ? '/bc/' : '/';
