// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Button,
  Space,
  Card,
  Typography,
  Descriptions,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createAxiosHandler as __$$createAxiosRequestHandler } from '@yunti/lowcode-datasource-axios-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DepositoryManagementDetail$$Page extends React.Component {
  get location() {
    return this.props.self?.location;
  }
  get match() {
    return this.props.self?.match;
  }
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: {
      axios: __$$createAxiosRequestHandler(utils.getAxiosHanlderConfig?.()),
    },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { data: undefined, loading: false };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: 'getDepositoryDetail',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {},
              isCors: true,
              method: 'GET',
              params: {},
              timeout: 5000,
              uri: `${this.constants?.BC_SAAS_API_URL}/basic/depositories/${this.match?.params?.id}`,
            };
          }.bind(_this),
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {}

  getDepositoryDetail() {
    this.setState({
      loading: true,
    });
    this.dataSourceMap.getDepositoryDetail
      .load({})
      .then((res) => {
        this.setState({
          data: res,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          data: undefined,
          loading: false,
        });
      });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getDepositoryDetail();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row __component_name="Row" wrap={true}>
          <Col
            __component_name="Col"
            span={24}
            style={{ paddingBottom: '12px' }}
          >
            <Button.Back
              __component_name="Button.Back"
              title={this.i18n('i18n-daan0ik3') /* 存证详情 */}
              type="simple"
            />
          </Col>
          <Col __component_name="Col" span={24}>
            <Space align="center" direction="horizontal" size="middle">
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                shape="default"
                type="primary"
              >
                {this.i18n('i18n-53sb33cw') /* 下载证书 */}
              </Button>
              {!!false && (
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  ref={this._refsManager.linkRef('button-87523f8b')}
                  shape="default"
                >
                  {this.i18n('i18n-6rprtc19') /* 文件预览 */}
                </Button>
              )}
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={true}
                        ellipsis={true}
                        level={1}
                      >
                        {this.i18n('i18n-k671gflr') /* 存证信息 */}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Descriptions
                        __component_name="Descriptions"
                        bordered={false}
                        borderedBottom={true}
                        borderedBottomDashed={false}
                        colon={false}
                        column={4}
                        items={[
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => this.state.data?.name || '-')}
                              </Typography.Text>
                            ),
                            key: '9uejq4o8g69',
                            label: this.i18n('i18n-bdz6vmls') /* 存证名称 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() =>
                                  this.state.data?.contentType === 'file'
                                    ? '文件类型'
                                    : '文本类型'
                                )}
                              </Typography.Text>
                            ),
                            key: 'i93cdt9msn',
                            label: this.i18n('i18n-cke99h2r') /* 存证类型 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {this.i18n('i18n-cmk38d3j') /* 个人 */}
                              </Typography.Text>
                            ),
                            key: 'c9duaphcrsr',
                            label: this.i18n('i18n-z30c3mb2') /* 存证主体 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(
                                  () => this.state.data?.contentName || '-'
                                )}
                              </Typography.Text>
                            ),
                            key: 'rwxzqvojrkl',
                            label: this.i18n('i18n-lzk2l232') /* 文件名称 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                text
                              </Typography.Text>
                            ),
                            key: '6vs6wn94x0a',
                            label: this.i18n('i18n-4yubvt9f') /* 文件大小 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(
                                  () => this.state.data?.description || '-'
                                )}
                              </Typography.Text>
                            ),
                            key: '148tkynnx59',
                            label: this.i18n('i18n-3mnzh9hd') /* 文件备注 */,
                            span: 1,
                          },
                        ]}
                        labelStyle={{ width: 110 }}
                        layout="horizontal"
                        ref={this._refsManager.linkRef('descriptions-c7c8ac3f')}
                        size="middle"
                        title=" "
                      >
                        <Descriptions.Item
                          key="9uejq4o8g69"
                          label={this.i18n('i18n-bdz6vmls') /* 存证名称 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(() => this.state.data?.name || '-')}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="i93cdt9msn"
                          label={this.i18n('i18n-cke99h2r') /* 存证类型 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(() =>
                                this.state.data?.contentType === 'file'
                                  ? '文件类型'
                                  : '文本类型'
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="c9duaphcrsr"
                          label={this.i18n('i18n-z30c3mb2') /* 存证主体 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {this.i18n('i18n-cmk38d3j') /* 个人 */}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="rwxzqvojrkl"
                          label={this.i18n('i18n-lzk2l232') /* 文件名称 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              ref={this._refsManager.linkRef(
                                'typography.text-7b417135'
                              )}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(
                                () => this.state.data?.contentName || '-'
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="6vs6wn94x0a"
                          label={this.i18n('i18n-4yubvt9f') /* 文件大小 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              ref={this._refsManager.linkRef(
                                'typography.text-97366e0f'
                              )}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(() =>
                                this.state.data?.contentSize ||
                                this.state.data?.contentSize === 0
                                  ? this.utils.formatBitUnit(
                                      this.state.data?.contentSize
                                    )?.size +
                                    this.utils.formatBitUnit(
                                      this.state.data?.contentSize
                                    )?.unit
                                  : '-'
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="148tkynnx59"
                          label={this.i18n('i18n-3mnzh9hd') /* 文件备注 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(
                                () => this.state.data?.description || '-'
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={true}
                        ellipsis={true}
                        level={1}
                      >
                        {this.i18n('i18n-fbu1djjd') /* 链上信息 */}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Descriptions
                        __component_name="Descriptions"
                        bordered={false}
                        borderedBottom={true}
                        borderedBottomDashed={false}
                        colon={false}
                        column={2}
                        items={[
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                copyable={true}
                                disabled={false}
                                ellipsis={false}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => this.state.data?.kid || '')}
                              </Typography.Text>
                            ),
                            key: '9uejq4o8g69',
                            label: this.i18n('i18n-9uie0y5g') /* 存证编号 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Time
                                __component_name="Typography.Time"
                                format=""
                                relativeTime={false}
                                time={__$$eval(() =>
                                  this.state?.data?.trustedTimestamp
                                    ? this.state.data.trustedTimestamp * 1000
                                    : undefined
                                )}
                              />
                            ),
                            key: '3femagybdo5',
                            label: this.i18n('i18n-4wpuoyi3') /* 存证时间 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(
                                  () => this.state.data?.blockNumber || ''
                                )}
                              </Typography.Text>
                            ),
                            key: 'rw2sih1iaek',
                            label: this.i18n('i18n-4dh77hfc') /* 区块高度 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                copyable={true}
                                disabled={false}
                                ellipsis={false}
                                ref={this._refsManager.linkRef(
                                  'typography.text-ee15595e'
                                )}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => this.state.data?.kid || '')}
                              </Typography.Text>
                            ),
                            key: 'zlxb05pfx5j',
                            label: this.i18n('i18n-6n2agihe') /* 存证Hash */,
                            span: 1,
                          },
                        ]}
                        labelStyle={{ width: 110 }}
                        layout="horizontal"
                        ref={this._refsManager.linkRef('descriptions-df73ecc6')}
                        size="middle"
                        title=" "
                      >
                        <Descriptions.Item
                          key="9uejq4o8g69"
                          label={this.i18n('i18n-9uie0y5g') /* 存证编号 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              copyable={true}
                              disabled={false}
                              ellipsis={false}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(() => this.state.data?.kid || '')}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="3femagybdo5"
                          label={this.i18n('i18n-4wpuoyi3') /* 存证时间 */}
                          span={1}
                        >
                          {
                            <Typography.Time
                              __component_name="Typography.Time"
                              format=""
                              relativeTime={false}
                              time={__$$eval(() =>
                                this.state?.data?.trustedTimestamp
                                  ? this.state.data.trustedTimestamp * 1000
                                  : undefined
                              )}
                            />
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="rw2sih1iaek"
                          label={this.i18n('i18n-4dh77hfc') /* 区块高度 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(
                                () => this.state.data?.blockNumber || ''
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="zlxb05pfx5j"
                          label={this.i18n('i18n-6n2agihe') /* 存证Hash */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              copyable={true}
                              disabled={false}
                              ellipsis={false}
                              ref={this._refsManager.linkRef(
                                'typography.text-ee15595e'
                              )}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(() => this.state.data?.kid || '')}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions
                        __component_name="Descriptions"
                        bordered={false}
                        borderedBottom={true}
                        borderedBottomDashed={false}
                        colon={false}
                        column={1}
                        items={[
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                copyable={true}
                                disabled={false}
                                ellipsis={false}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(
                                  () => this.state.data?.contentID || ''
                                )}
                              </Typography.Text>
                            ),
                            key: 'i93cdt9msn',
                            label: this.i18n('i18n-vmxpi7mi') /* 文件Hash */,
                            span: 1,
                          },
                        ]}
                        labelStyle={{ width: 110 }}
                        layout="horizontal"
                        ref={this._refsManager.linkRef('descriptions-465577a9')}
                        size="middle"
                        title=" "
                      >
                        <Descriptions.Item
                          key="i93cdt9msn"
                          label={this.i18n('i18n-vmxpi7mi') /* 文件Hash */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              copyable={true}
                              disabled={false}
                              ellipsis={false}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {__$$eval(() => this.state.data?.contentID || '')}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath(
    { path: '/depository/management/detail/:id' },
    location.pathname
  );
  history.match = match;
  history.query = qs.parse(location.search);
  const appHelper = {
    utils,
    location,
    match,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      self={self}
      sdkSwrFuncs={[]}
      render={(dataProps) => (
        <DepositoryManagementDetail$$Page
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
};
export default PageWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
