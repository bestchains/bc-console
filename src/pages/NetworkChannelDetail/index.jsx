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

import utils from '../../utils';

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
              <Col __component_name="Col" span={12}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  style={{ height: '250px' }}
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
                        column={1}
                        items={[
                          {
                            children: null,
                            key: '9qhq7vaoun',
                            label: this.i18n('i18n-9e87qfos') /* 名称 */,
                            span: 1,
                          },
                          {
                            children: null,
                            key: 'pvlb9npuf1',
                            label: this.i18n('i18n-8weq4mfy9lf') /* 描述 */,
                            span: 1,
                          },
                          {
                            children: null,
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
                              text
                            </Typography.Text>
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
                              text
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
                              time=""
                            />
                          }
                        </Descriptions.Item>
                      </Descriptions>
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
                  style={{ height: '250px' }}
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
                            title: this.i18n('i18n-9e87qfos') /* 名称 */,
                          },
                          {
                            dataIndex: 'version',
                            key: 'age',
                            title: this.i18n('i18n-hbf63hki898') /* 版本 */,
                          },
                        ]}
                        dataSource={__$$eval(() => [{}])}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: true, y: 130 }}
                        showHeader={true}
                        size="default"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={12}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  style={{ height: '250px' }}
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
                            dataIndex: 'version',
                            key: 'age',
                            title: 'mspid',
                          },
                        ]}
                        dataSource={__$$eval(() => [{}])}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: true, y: 130 }}
                        showHeader={true}
                        size="default"
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
                  style={{ height: '250px' }}
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
                            dataIndex: 'version',
                            key: 'age',
                            title: this.i18n('i18n-2uy76ea1') /* 组织 */,
                          },
                          {
                            dataIndex: 'wrongnode',
                            key: 'wrongnode',
                            title: this.i18n('i18n-db5zj61b') /* 错节点 */,
                          },
                        ]}
                        dataSource={__$$eval(() => [{}])}
                        pagination={false}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: true, y: 130 }}
                        showHeader={true}
                        size="default"
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
              style={{ height: '250px' }}
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
                        dataIndex: 'version',
                        key: 'age',
                        title: this.i18n('i18n-w3qy6omh') /* 策略描述 */,
                      },
                      {
                        _unsafe_MixedSetter_title_select: 'I18nSetter',
                        dataIndex: '2',
                        key: '2',
                        title: this.i18n('i18n-xnyhdqu3') /* 应用合约数 */,
                      },
                      {
                        dataIndex: 'crea',
                        key: 'crea',
                        title: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
                      },
                    ]}
                    dataSource={__$$eval(() => [{}])}
                    pagination={false}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: true, y: 130 }}
                    showHeader={true}
                    size="default"
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
      sdkSwrFuncs={[]}
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
