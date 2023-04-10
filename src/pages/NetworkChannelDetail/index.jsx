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
  Table,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils from '../../utils/index';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class NetworkChannelDetail$$Page extends React.Component {
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

  async downLoadFile() {
    try {
      const res = await this.props.appHelper.utils.bff?.getChannelProfile({
        name: this?.match?.params?.channelId,
      });
      this.utils.downloadFile(res?.channel?.profileJson);
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-62p13m1r'),
        errors: error?.response?.errors,
      });
    }
  }

  componentDidMount() {
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
              title={this.i18n('i18n-fl4pb7jd') /* 通道信息 */}
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
                  loading={__$$eval(() => this.props.useGetChannel?.loading)}
                  size="default"
                  style={{ width: '100%' }}
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
                                    this.props.useGetChannel?.data?.channel
                                      ?.name || '-'
                                )}
                              </Typography.Text>
                            ),
                            key: '9qhq7vaoun',
                            label: this.i18n('i18n-9e87qfos') /* 名称 */,
                            span: 1,
                          },
                          {
                            children: null,
                            key: 'uwryumjd0x7',
                            label:
                              this.i18n('i18n-aw2q2zra') /* 通道链接文件 */,
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
                                    this.props.useGetChannel?.data?.channel
                                      ?.description || '-'
                                )}
                              </Typography.Text>
                            ),
                            key: 'pvlb9npuf1',
                            label: this.i18n('i18n-8weq4mfy9lf') /* 描述 */,
                            span: 1,
                          },
                          { children: null, key: 'lna3pj2de7', span: 1 },
                          {
                            children: (
                              <Typography.Time
                                __component_name="Typography.Time"
                                format=""
                                relativeTime={false}
                                time={__$$eval(
                                  () =>
                                    this.props.useGetChannel?.data?.channel
                                      ?.creationTimestamp || '-'
                                )}
                              />
                            ),
                            key: '3fvfujee7p7',
                            label: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
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
                          label={this.i18n('i18n-9e87qfos') /* 名称 */}
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
                                  this.props.useGetChannel?.data?.channel
                                    ?.displayName || '-'
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="uwryumjd0x7"
                          label={this.i18n('i18n-aw2q2zra') /* 通道链接文件 */}
                          span={1}
                        >
                          {
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    relatedEventName: 'downLoadFile',
                                    type: 'componentEvent',
                                  },
                                ],
                                eventList: [
                                  {
                                    disabled: true,
                                    name: 'onClick',
                                    template:
                                      "onClick(event,${extParams}){\n// 点击按钮时的回调\nconsole.log('onClick', event);}",
                                  },
                                ],
                              }}
                              block={false}
                              danger={false}
                              disabled={false}
                              ghost={false}
                              icon=""
                              onClick={function () {
                                return this.downLoadFile.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              shape="default"
                              size="small"
                              type="link"
                            >
                              {this.i18n('i18n-r1gt8gfi') /* 下载 */}
                            </Button>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item
                          key="pvlb9npuf1"
                          label={this.i18n('i18n-8weq4mfy9lf') /* 描述 */}
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
                                  this.props.useGetChannel?.data?.channel
                                    ?.description || '-'
                              )}
                            </Typography.Text>
                          }
                        </Descriptions.Item>
                        <Descriptions.Item key="lna3pj2de7" span={1}>
                          {null}
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
                                  this.props.useGetChannel?.data?.channel
                                    ?.creationTimestamp || '-'
                              )}
                            />
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
                  <Row __component_name="Row" wrap={true}>
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
                                      `${record?.displayName || '-'}(${
                                        record?.name
                                      })`
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-9e87qfos') /* 名称 */,
                          },
                          {
                            dataIndex: 'version',
                            key: 'age',
                            title: this.i18n('i18n-hbf63hki898') /* 版本 */,
                          },
                        ]}
                        dataSource={__$$eval(
                          () =>
                            this.props.useGetChannel?.data?.channel
                              ?.chaincode || []
                        )}
                        loading={__$$eval(
                          () => this.props.useGetChannel?.loading
                        )}
                        pagination={false}
                        rowKey="name"
                        scroll={{ scrollToFirstRowOnChange: false, y: 130 }}
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
            <Row __component_name="Row" style={{}} wrap={true}>
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
                            key: 'name',
                            title: 'mspid',
                          },
                        ]}
                        dataSource={__$$eval(
                          () =>
                            this.props.useGetChannel?.data?.channel?.members ||
                            []
                        )}
                        loading={__$$eval(
                          () => this.props.useGetChannel?.loading
                        )}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: false, y: 130 }}
                        showHeader={true}
                        size="small"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col __component_name="Col" span={12}>
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
                        {
                          this.i18n(
                            'i18n-rrvzpe8g'
                          ) /* 节点1111111111111111111111111111111 */
                        }
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
                            dataIndex: 'namespace',
                            key: 'namespace',
                            title: this.i18n('i18n-2uy76ea1') /* 组织 */,
                          },
                          {
                            dataIndex: 'wrongnode',
                            key: 'wrongnode',
                            title: this.i18n('i18n-db5zj61b') /* 错节点 */,
                          },
                        ]}
                        dataSource={__$$eval(
                          () =>
                            this.props.useGetChannel?.data?.channel?.peers || []
                        )}
                        loading={__$$eval(
                          () => this.props.useGetChannel?.loading
                        )}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: false, y: 130 }}
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
                    {this.i18n('i18n-wh9bw5j9') /* 背书策略 */}
                  </Typography.Title>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Table
                    __component_name="Table"
                    columns={[
                      {
                        dataIndex: 'name',
                        key: 'name',
                        title: this.i18n('i18n-87kp314f') /* 策略名称 */,
                      },
                      {
                        dataIndex: 'description',
                        key: 'description',
                        title: this.i18n('i18n-w3qy6omh') /* 策略描述 */,
                      },
                      {
                        _unsafe_MixedSetter_title_select: 'I18nSetter',
                        dataIndex: '2',
                        key: '2',
                        title: this.i18n('i18n-xnyhdqu3') /* 应用合约数 */,
                      },
                      {
                        dataIndex: 'creationTimestamp',
                        key: 'creationTimestamp',
                        render: (text, record, index) =>
                          ((__$$context) => (
                            <Typography.Time
                              __component_name="Typography.Time"
                              format=""
                              relativeTime={false}
                              time={__$$eval(() => record?.creationTimestamp)}
                            />
                          ))(
                            __$$createChildContext(__$$context, {
                              text,
                              record,
                              index,
                            })
                          ),
                        title: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
                      },
                    ]}
                    dataSource={__$$eval(
                      () =>
                        this.props.useGetChannel?.data?.channel?.epolicy || []
                    )}
                    loading={__$$eval(() => this.props.useGetChannel?.loading)}
                    pagination={false}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: false, y: 130 }}
                    showHeader={true}
                    size="small"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath(
    { path: '/network/detail/:id/channel/:channelId' },
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
          func: 'useGetChannel',
          params: {
            name: self.match?.params?.channelId,
          },
        },
      ]}
      render={(dataProps) => (
        <NetworkChannelDetail$$Page
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
