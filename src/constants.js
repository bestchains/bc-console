export const BC_CONSOLE_API_URL = '/bc-apis';
export const BC_EXPLORER_API_PREFIX = '/bc-explorer';
export const DESCRIPTION_LENGTH_REG = '^.{0,200}$';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_QIAN_KUN = window.__POWERED_BY_QIANKUN__;
export const NAME_K8S_REG =
  '^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$';
export const NAME_LENGTH_REG = '^.{3,20}$';
export const basename = IS_PROD || IS_QIAN_KUN ? '/bc' : '/';
export const downloadMinioUrl = '/bc-apis/minio/download';

export default {
  BC_CONSOLE_API_URL,
  BC_EXPLORER_API_PREFIX,
  DESCRIPTION_LENGTH_REG,
  IS_PROD,
  IS_QIAN_KUN,
  NAME_K8S_REG,
  NAME_LENGTH_REG,
  basename,
  downloadMinioUrl,
};
