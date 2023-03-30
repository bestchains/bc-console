// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Button,
  Card,
  Typography,
  Descriptions,
  UnifiedLink,
  Table,
  Status,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class NetworkContractDetail$$Page extends React.Component {
  _context = this;

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);
    this.location = props.self?.location;
    this.match = props.self?.match;
    this.history = props.self?.history;

    this.utils = utils;

    __$$i18n._inject2(this);

    this.state = {};
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  testFunc() {
    console.log('test aliLowcode func');
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'test-aliLowcode-func',
      },
      this.state.test
    );
  }

  download() {
    var _this$constants,
      _this$props$useGetCha,
      _this$props$useGetCha2,
      _this$props$useGetCha3,
      _this$props$useGetCha4,
      _this$props$useGetCha5,
      _this$props$useGetCha6,
      _this$props$useGetCha7,
      _this$props$useGetCha8;
    const link =
      ((_this$constants = this.constants) === null || _this$constants === void 0
        ? void 0
        : _this$constants.downloadMinioUrl) +
      `?bucket=${
        (_this$props$useGetCha = this.props.useGetChaincodebuild) === null ||
        _this$props$useGetCha === void 0
          ? void 0
          : (_this$props$useGetCha2 = _this$props$useGetCha.data) === null ||
            _this$props$useGetCha2 === void 0
          ? void 0
          : (_this$props$useGetCha3 = _this$props$useGetCha2.chaincodebuild) ===
              null || _this$props$useGetCha3 === void 0
          ? void 0
          : (_this$props$useGetCha4 = _this$props$useGetCha3.minio) === null ||
            _this$props$useGetCha4 === void 0
          ? void 0
          : _this$props$useGetCha4.bucket
      }&object=${
        (_this$props$useGetCha5 = this.props.useGetChaincodebuild) === null ||
        _this$props$useGetCha5 === void 0
          ? void 0
          : (_this$props$useGetCha6 = _this$props$useGetCha5.data) === null ||
            _this$props$useGetCha6 === void 0
          ? void 0
          : (_this$props$useGetCha7 = _this$props$useGetCha6.chaincodebuild) ===
              null || _this$props$useGetCha7 === void 0
          ? void 0
          : (_this$props$useGetCha8 = _this$props$useGetCha7.minio) === null ||
            _this$props$useGetCha8 === void 0
          ? void 0
          : _this$props$useGetCha8.object
      }`;
    window.open(link);
  }

  componentDidMount() {
    console.log(this);
    console.log('did mount');
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
              title={this.i18n('i18n-hraggxk8') /* 合约信息 */}
              type="simple"
            />
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={12} style={{ display: 'flex' }}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={__$$eval(
                    () => this.props.useGetChaincodebuild?.loading
                  )}
                  size="default"
                  style={{}}
                  type="default"
                >
                  <Row __component_name="Row" style={{}} wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={false}
                        ellipsis={true}
                        level={2}
                      >
                        {this.i18n('i18n-98hectg940s') /* 基本信息 */}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Descriptions
                        __component_name="Descriptions"
                        bordered={false}
                        colon={false}
                        column={2}
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
                                {__$$eval(
                                  () =>
                                    this.props.useGetChaincodebuild?.data
                                      ?.chaincodebuild?.name
                                )}
                              </Typography.Text>
                            ),
                            key: '9qhq7vaoun',
                            label: this.i18n('i18n-7ws2ncyb') /* 合约名称 */,
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
                                  () =>
                                    this.props.useGetChaincodebuild?.data
                                      ?.chaincodebuild?.version
                                )}
                              </Typography.Text>
                            ),
                            key: 'pvlb9npuf1',
                            label: this.i18n('i18n-ot1siqdw') /* 版本号 */,
                            span: 1,
                          },
                          {
                            children: (
                              <Typography.Time
                                __component_name="Typography.Time"
                                format=""
                                relativeTime={false}
                                time={__$$eval(
                                  () =>
                                    this.props.useGetChaincodebuild?.data
                                      ?.chaincodebuild?.creationTimestamp
                                )}
                              />
                            ),
                            key: '3fvfujee7p7',
                            label: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
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
                                type="success"
                              >
                                text
                              </Typography.Text>
                            ),
                            key: '6nqt3o5m7n8',
                            label: this.i18n('i18n-1vlhlgh9') /* 合约来源 */,
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
                                  () =>
                                    this.props.useGetChaincodebuild?.data
                                      ?.chaincodebuild?.initiator
                                )}
                              </Typography.Text>
                            ),
                            key: 'zvaiq32eosn',
                            label: this.i18n('i18n-iahrowai') /* 发起组织 */,
                            span: 1,
                          },
                          {
                            children: (
                              <UnifiedLink
                                __component_name="UnifiedLink"
                                target="_blank"
                                to={__$$eval(
                                  () =>
                                    this.props.appHelper?.constants
                                      ?.downloadMinioUrl +
                                    `bucket=${this.props.useGetChaincodebuild?.data?.chaincodebuild?.minio?.bucket}&object=${this.props.useGetChaincodebuild?.data?.chaincodebuild?.minio?.object}`
                                )}
                              >
                                {this.i18n('i18n-r1gt8gfi') /* 下载 */}
                              </UnifiedLink>
                            ),
                            key: 'd5nxvp29i',
                            label: this.i18n('i18n-gp8gule7') /* 正文 */,
                            span: 1,
                          },
                        ]}
                        labelStyle={{ width: 100 }}
                        layout="horizontal"
                        size="default"
                        title=" "
                      >
                        <Descriptions.Item
                          key="9qhq7vaoun"
                          label={this.i18n('i18n-7ws2ncyb') /* 合约名称 */}
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
                                () =>
                                  this.props.useGetChaincodebuild?.data
                                    ?.chaincodebuild?.name
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="pvlb9npuf1"
                          label={this.i18n('i18n-ot1siqdw') /* 版本号 */}
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
                                () =>
                                  this.props.useGetChaincodebuild?.data
                                    ?.chaincodebuild?.version
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="3fvfujee7p7"
                          label={this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */}
                          span={1}
                        >
                          {
                            <Typography.Time
                              __component_name="Typography.Time"
                              format=""
                              relativeTime={false}
                              time={__$$eval(
                                () =>
                                  this.props.useGetChaincodebuild?.data
                                    ?.chaincodebuild?.creationTimestamp
                              )}
                            />
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="6nqt3o5m7n8"
                          label={this.i18n('i18n-1vlhlgh9') /* 合约来源 */}
                          span={1}
                        >
                          {
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                              type="success"
                            >
                              text
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="zvaiq32eosn"
                          label={this.i18n('i18n-iahrowai') /* 发起组织 */}
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
                                () =>
                                  this.props.useGetChaincodebuild?.data
                                    ?.chaincodebuild?.initiator
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="d5nxvp29i"
                          label={this.i18n('i18n-gp8gule7') /* 正文 */}
                          span={1}
                        >
                          {
                            <Button
                              __component_name="Button"
                              type="link"
                              icon=""
                              danger={false}
                              ghost={false}
                              shape="default"
                              block={false}
                              disabled={false}
                              style={{ marginTop: '-6px', marginLeft: '-18px' }}
                              __events={{
                                eventDataList: [
                                  {
                                    type: 'componentEvent',
                                    name: 'onClick',
                                    relatedEventName: 'download',
                                  },
                                ],
                                eventList: [
                                  {
                                    name: 'onClick',
                                    template:
                                      "onClick(event,${extParams}){\n// 点击按钮时的回调\nconsole.log('onClick', event);}",
                                    disabled: true,
                                  },
                                ],
                              }}
                              onClick={function () {
                                return this.download.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                            >
                              {this.i18n('i18n-r1gt8gfi') /* 下载 */}
                            </Button>
                          }
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col __component_name="Col" span={12} style={{ display: 'flex' }}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  style={{}}
                  type="default"
                >
                  <Row
                    __component_name="Row"
                    style={{ display: 'flex' }}
                    wrap={true}
                  >
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={false}
                        ellipsis={true}
                        level={2}
                      >
                        {this.i18n('i18n-5rnqqm9p') /* 合约 */}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Table
                        __component_name="Table"
                        columns={[
                          {
                            dataIndex: 'name',
                            key: 'name',
                            title: this.i18n('i18n-9e87qfos') /* 名称 */,
                          },
                          {
                            dataIndex: 'version',
                            key: 'age',
                            title: this.i18n('i18n-5rnqqm9p') /* 合约 */,
                          },
                          { title: this.i18n('i18n-6uzygunv') /* 合约日志 */ },
                        ]}
                        dataSource={__$$eval(() => [{}])}
                        loading={__$$eval(
                          () => this.props.useGetChaincodebuild?.loading
                        )}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: false, y: 180 }}
                        showHeader={true}
                        size="small"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={12} style={{ display: 'flex' }}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  style={{}}
                  type="default"
                >
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={false}
                        ellipsis={true}
                        level={2}
                      >
                        {this.i18n('i18n-2uy76ea1') /* 组织 */}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Table
                        __component_name="Table"
                        columns={[
                          {
                            dataIndex: 'name',
                            key: 'name',
                            title: this.i18n('i18n-2uy76ea1') /* 组织 */,
                          },
                          {
                            _unsafe_MixedSetter_title_select: 'StringSetter',
                            dataIndex: 'name',
                            key: 'age',
                            title: 'mspid',
                          },
                          {
                            dataIndex: 'status',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Status
                                  __component_name="Status"
                                  id="disabled"
                                  types={[
                                    {
                                      children: '未知',
                                      icon: 'tenx-ui-icon:Circle',
                                      id: 'disabled',
                                      type: 'disabled',
                                    },
                                  ]}
                                />
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-bik6xl952y6') /* 状态 */,
                          },
                        ]}
                        dataSource={__$$eval(
                          () =>
                            this.props.useGetChaincodebuild?.data
                              ?.chaincodebuild?.organizations || []
                        )}
                        loading={__$$eval(
                          () => this.props.useGetChaincodebuild?.loading
                        )}
                        pagination={{
                          showQuickJumper: false,
                          showSizeChanger: false,
                          simple: false,
                          size: 'default',
                        }}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: false, y: 180 }}
                        showHeader={true}
                        size="small"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col __component_name="Col" span={12} style={{ display: 'flex' }}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  style={{}}
                  type="default"
                >
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={false}
                        ellipsis={true}
                        level={2}
                      >
                        {this.i18n('i18n-4wgfgnn6') /* 通道 */}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Table
                        __component_name="Table"
                        columns={[
                          {
                            dataIndex: 'name',
                            key: 'name',
                            title: this.i18n('i18n-4wgfgnn6') /* 通道 */,
                          },
                          {
                            dataIndex: 'epolicy',
                            key: 'epolicy',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(
                                    () =>
                                      record?.epolicy
                                        ?.map((item) => item?.name)
                                        ?.join(',') || '-'
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-wh9bw5j9') /* 背书策略 */,
                          },
                        ]}
                        dataSource={__$$eval(
                          () =>
                            this.props.useGetChaincodebuild?.data
                              ?.chaincodebuild?.channels || []
                        )}
                        loading={__$$eval(
                          () => this.props.useGetChaincodebuild?.loading
                        )}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: false, y: 180 }}
                        showHeader={true}
                        size="small"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath(
    { path: '/network/detail/:id/contract/:contractId' },
    location.pathname
  );
  location.match = match;
  const self = {
    location,
    match,
    history,
  };
  const appHelper = {
    utils,
    ...self,
  };
  return (
    <DataProvider
      sdkSwrFuncs={[
        {
          func: 'useGetChaincodebuild',
          params: {
            name: self.match?.params?.contractId,
          },
        },
      ]}
      render={(dataProps) => (
        <NetworkContractDetail$$Page
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
};

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
