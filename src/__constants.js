const constants = {};

/** api 前缀 */
const __BC_CONSOLE_API_URL = function applyThis() {
  return '/bc-apis';
}.apply(constants);
constants.BC_CONSOLE_API_URL = __BC_CONSOLE_API_URL;
export const BC_CONSOLE_API_URL = __BC_CONSOLE_API_URL;

/** 区块链浏览器前缀 */
const __BC_EXPLORER_API_PREFIX = function applyThis() {
  return '/bc-explorer';
}.apply(constants);
constants.BC_EXPLORER_API_PREFIX = __BC_EXPLORER_API_PREFIX;
export const BC_EXPLORER_API_PREFIX = __BC_EXPLORER_API_PREFIX;

/** 描述长度 */
const __DESCRIPTION_LENGTH_REG = function applyThis() {
  return '^.{0,200}$';
}.apply(constants);
constants.DESCRIPTION_LENGTH_REG = __DESCRIPTION_LENGTH_REG;
export const DESCRIPTION_LENGTH_REG = __DESCRIPTION_LENGTH_REG;

/** 是否为生产环境 */
const __IS_PROD = function applyThis() {
  return process.env.NODE_ENV === 'production';
}.apply(constants);
constants.IS_PROD = __IS_PROD;
export const IS_PROD = __IS_PROD;

/** 是否为乾坤微前端环境 */
const __IS_QIAN_KUN = function applyThis() {
  return window.__POWERED_BY_QIANKUN__;
}.apply(constants);
constants.IS_QIAN_KUN = __IS_QIAN_KUN;
export const IS_QIAN_KUN = __IS_QIAN_KUN;

/** K8S名称校验：小写字母、数字、“-”，开头和结尾只能是字母或数字 */
const __NAME_K8S_REG = function applyThis() {
  return '^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$';
}.apply(constants);
constants.NAME_K8S_REG = __NAME_K8S_REG;
export const NAME_K8S_REG = __NAME_K8S_REG;

/** 名称长度 */
const __NAME_LENGTH_REG = function applyThis() {
  return '^.{3,20}$';
}.apply(constants);
constants.NAME_LENGTH_REG = __NAME_LENGTH_REG;
export const NAME_LENGTH_REG = __NAME_LENGTH_REG;

/** 路由前缀 */
const __basename = function applyThis() {
  return '/bc';
}.apply(constants);
constants.basename = __basename;
export const basename = __basename;

/** 下载合约文件 */
const __downloadMinioUrl = function applyThis() {
  return '/bc-apis/minio/download';
}.apply(constants);
constants.downloadMinioUrl = __downloadMinioUrl;
export const downloadMinioUrl = __downloadMinioUrl;

export default constants;
