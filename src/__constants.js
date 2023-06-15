const constants = {};

/** api 前缀 */
constants.BC_CONSOLE_API_URL = function applyThis() {
  return '/bc-apis';
}.apply(constants);
export const BC_CONSOLE_API_URL = constants.BC_CONSOLE_API_URL;

/** 区块链浏览器前缀 */
constants.BC_EXPLORER_API_PREFIX = function applyThis() {
  return '/bc-explorer';
}.apply(constants);
export const BC_EXPLORER_API_PREFIX = constants.BC_EXPLORER_API_PREFIX;

/** saas api 前缀 */
constants.BC_SAAS_API_URL = function applyThis() {
  return '/bc-saas';
}.apply(constants);
export const BC_SAAS_API_URL = constants.BC_SAAS_API_URL;

/** 日志 */
constants.BC_WS_LOGS_API_URL = function applyThis() {
  return '/bc-ws/k8s/logs';
}.apply(constants);
export const BC_WS_LOGS_API_URL = constants.BC_WS_LOGS_API_URL;

/** 描述长度 */
constants.DESCRIPTION_LENGTH_REG = function applyThis() {
  return '^.{0,200}$';
}.apply(constants);
export const DESCRIPTION_LENGTH_REG = constants.DESCRIPTION_LENGTH_REG;

/** 是否为生产环境 */
constants.IS_PROD = function applyThis() {
  return process.env.NODE_ENV === 'production';
}.apply(constants);
export const IS_PROD = constants.IS_PROD;

/** 是否为乾坤微前端环境 */
constants.IS_QIAN_KUN = function applyThis() {
  return window.__POWERED_BY_QIANKUN__;
}.apply(constants);
export const IS_QIAN_KUN = constants.IS_QIAN_KUN;

/** K8S名称校验：小写字母、数字、“-”，开头和结尾只能是字母或数字 */
constants.NAME_K8S_REG = function applyThis() {
  return '^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$';
}.apply(constants);
export const NAME_K8S_REG = constants.NAME_K8S_REG;

/** 名称长度 */
constants.NAME_LENGTH_REG = function applyThis() {
  return '^.{3,20}$';
}.apply(constants);
export const NAME_LENGTH_REG = constants.NAME_LENGTH_REG;

/** 路由前缀 */
constants.basename = function applyThis() {
  return '/bc';
}.apply(constants);
export const basename = constants.basename;

/** 下载合约文件 */
constants.downloadMinioUrl = function applyThis() {
  return '/bc-apis/minio/download';
}.apply(constants);
export const downloadMinioUrl = constants.downloadMinioUrl;

export default constants;
