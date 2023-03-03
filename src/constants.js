export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_QIAN_KUN = window.__POWERED_BY_QIANKUN__;
export const basename = IS_PROD || IS_QIAN_KUN ? '/bc' : '/';

export default { IS_PROD, IS_QIAN_KUN, basename };
