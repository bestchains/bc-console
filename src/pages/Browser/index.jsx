// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Descriptions,
  Typography,
  Space,
  Row,
  Col,
  Tabs,
  Card,
  Image,
  Table,
  Button,
  DatePicker,
  Input,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class Browser$$Page extends React.Component {
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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      block: {
        time: [undefined, undefined],
        size: 10,
        current: 1,
        record: {},
      },
      filter: 'ALL',
      isOpenModal: false,
      modalType: 'create',
      overview: {},
      searchKey: 'name',
      searchValue: undefined,
      transaction: {
        time: [undefined, undefined],
        size: 10,
        current: 1,
        record: {},
      },
    };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {
    console.log('will unmount');
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  handleBlockPaginationChange(c, s) {
    this.setState({
      block: {
        ...this.state.block,
        size: s,
        current: c,
      },
    });
  }

  handleBlockReset() {
    // edit
    this.setState({
      block: {
        ...this.state.block,
        time: [undefined, undefined],
        current: 1,
      },
    });
  }

  handleBlockSearch() {
    // edit
    this.setState({
      block: {
        ...this.state.block,
        current: 1,
      },
    });
  }

  handleBlockTableChange(pagination, filters, sorter, extra) {
    this.setState({
      block: {
        ...this.state.block,
        pagination,
        filters,
        sorter,
      },
    });
  }

  handleBlockTimeChange(v) {
    this.setState({
      block: {
        ...this.state.block,
        time: v,
      },
    });
  }

  handleTransactionPaginationChange(c, s) {
    this.setState({
      transaction: {
        ...this.state.transaction,
        size: s,
        current: c,
      },
    });
  }

  handleTransactionReset() {
    // edit
    this.setState({
      transaction: {
        ...this.state.transaction,
        time: [undefined, undefined],
        current: 1,
      },
    });
  }

  handleTransactionSearch() {
    // edit
    this.setState({
      transaction: {
        ...this.state.transaction,
        current: 1,
      },
    });
  }

  handleTransactionTableChange(pagination, filters, sorter, extra) {
    this.setState({
      transaction: {
        ...this.state.transaction,
        pagination,
        filters,
        sorter,
      },
    });
  }

  handleTransactionTimeChange(v) {
    this.setState({
      transaction: {
        ...this.state.transaction,
        time: v,
      },
    });
  }

  openBlockDetailModal(e, { record }) {
    this.setState({
      isOpenModal: true,
      modalType: 'blockdetail',
      block: {
        ...this.state.block,
        record,
      },
      transaction: {
        ...this.state.transaction,
        record,
      },
    });
  }

  openTransactionDetailModal(e, { record }) {
    this.setState({
      isOpenModal: true,
      modalType: 'transactiondetail',
      transaction: {
        ...this.state.transaction,
        record,
      },
    });
  }

  paginationShowTotal(a, b) {
    return this.utils.paginationShowTotal(a, b, this);
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: 'onCancel',
                relatedEventName: 'closeModal',
                type: 'componentEvent',
              },
            ],
            eventList: [
              {
                disabled: false,
                name: 'afterClose',
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: 'onCancel',
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: false,
                name: 'onOk',
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          footer={<Space align="center" direction="horizontal" />}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal && this.state.modalType === 'blockdetail'
          )}
          ref={this._refsManager.linkRef('modal-ac67cc77')}
          title={this.i18n('i18n-rstoknta') /* 区块详情 */}
        >
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
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {__$$eval(
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'h495bbtwdkj',
                label: this.i18n('i18n-6oadzcxin7k') /* 通道名称 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: '5rk3nsekwj',
                label: this.i18n('i18n-o4hf8a4q') /* 区块号 */,
                span: 1,
              },
              {
                children: (
                  <Typography.Time
                    __component_name="Typography.Time"
                    format=""
                    relativeTime={false}
                    time={__$$eval(() => this.state.transaction?.record?.name)}
                  />
                ),
                key: 'ns3ahlga1n',
                label: this.i18n('i18n-cs2mt1k7') /* 出块时间 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'k2dbheu2dj',
                label: this.i18n('i18n-1pf627eu') /* 交易数 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'ktjd25sp5ae',
                label: this.i18n('i18n-1rb6qm57') /* 区块 hash */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'xydm638gnyc',
                label: this.i18n('i18n-i1x1ybuq') /* 数据 hash */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'p7lbf52pjyn',
                label: this.i18n('i18n-der81w4r') /* 上一区块 hash */,
                span: 1,
              },
            ]}
            labelStyle={{ width: 120 }}
            layout="horizontal"
            ref={this._refsManager.linkRef('descriptions-b183f63f')}
            size="small"
            title="  "
          >
            <Descriptions.Item
              key="h495bbtwdkj"
              label={this.i18n('i18n-6oadzcxin7k') /* 通道名称 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="5rk3nsekwj"
              label={this.i18n('i18n-o4hf8a4q') /* 区块号 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="ns3ahlga1n"
              label={this.i18n('i18n-cs2mt1k7') /* 出块时间 */}
              span={1}
            >
              {
                <Typography.Time
                  __component_name="Typography.Time"
                  format=""
                  relativeTime={false}
                  time={__$$eval(() => this.state.transaction?.record?.name)}
                />
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="k2dbheu2dj"
              label={this.i18n('i18n-1pf627eu') /* 交易数 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="ktjd25sp5ae"
              label={this.i18n('i18n-1rb6qm57') /* 区块 hash */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="xydm638gnyc"
              label={this.i18n('i18n-i1x1ybuq') /* 数据 hash */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="p7lbf52pjyn"
              label={this.i18n('i18n-der81w4r') /* 上一区块 hash */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
          </Descriptions>
        </Modal>
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: 'onCancel',
                relatedEventName: 'closeModal',
                type: 'componentEvent',
              },
            ],
            eventList: [
              {
                disabled: false,
                name: 'afterClose',
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: 'onCancel',
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: false,
                name: 'onOk',
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          footer={<Space align="center" direction="horizontal" />}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'transactiondetail'
          )}
          ref={this._refsManager.linkRef('modal-ac67cc77')}
          title={this.i18n('i18n-q2lrt9kq') /* 交易详情 */}
        >
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
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {__$$eval(
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'h495bbtwdkj',
                label: this.i18n('i18n-8bfjic36') /* 交易 ID */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: '5rk3nsekwj',
                label: this.i18n('i18n-53j00k4p') /* 交易验证码 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'k2dbheu2dj',
                label: this.i18n('i18n-9ze7q50s') /* Payload Proposal Hash */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'ktjd25sp5ae',
                label: this.i18n('i18n-1pf627eu') /* 交易数 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'xydm638gnyc',
                label: this.i18n('i18n-wctt13ld2x') /* 发起者 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'p7lbf52pjyn',
                label: this.i18n('i18n-hnd99uip') /* 背书节点 */,
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'opwcrxxtic',
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
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: 'kna2s8u4hyp',
                label: this.i18n('i18n-9v85anpj') /* 交易类型 */,
                span: 1,
              },
              {
                children: (
                  <Typography.Time
                    __component_name="Typography.Time"
                    format=""
                    relativeTime={false}
                    time={__$$eval(() => this.state.transaction?.record?.name)}
                  />
                ),
                key: 'ns3ahlga1n',
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
                  >
                    {__$$eval(
                      () => this.state.transaction?.record?.name || '-'
                    )}
                  </Typography.Text>
                ),
                key: '94ini0nyz0i',
                label: this.i18n('i18n-9bnr95km') /* 链接 */,
                span: 1,
              },
            ]}
            labelStyle={{ width: 170 }}
            layout="horizontal"
            ref={this._refsManager.linkRef('descriptions-b183f63f')}
            size="small"
            title="  "
          >
            <Descriptions.Item
              key="h495bbtwdkj"
              label={this.i18n('i18n-8bfjic36') /* 交易 ID */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="5rk3nsekwj"
              label={this.i18n('i18n-53j00k4p') /* 交易验证码 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="k2dbheu2dj"
              label={this.i18n('i18n-9ze7q50s') /* Payload Proposal Hash */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="ktjd25sp5ae"
              label={this.i18n('i18n-1pf627eu') /* 交易数 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="xydm638gnyc"
              label={this.i18n('i18n-wctt13ld2x') /* 发起者 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="p7lbf52pjyn"
              label={this.i18n('i18n-hnd99uip') /* 背书节点 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="opwcrxxtic"
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="kna2s8u4hyp"
              label={this.i18n('i18n-9v85anpj') /* 交易类型 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="ns3ahlga1n"
              label={this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */}
              span={1}
            >
              {
                <Typography.Time
                  __component_name="Typography.Time"
                  format=""
                  relativeTime={false}
                  time={__$$eval(() => this.state.transaction?.record?.name)}
                />
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="94ini0nyz0i"
              label={this.i18n('i18n-9bnr95km') /* 链接 */}
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
                  {__$$eval(() => this.state.transaction?.record?.name || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
          </Descriptions>
        </Modal>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this.i18n('i18n-gyh9gtql') /* 区块链浏览器 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Tabs
              destroyInactiveTabPane="true"
              items={[
                {
                  children: (
                    <Row wrap={true}>
                      <Col span={24}>
                        <Row
                          __component_name="Row"
                          style={{ marginLeft: '-30px', marginTop: '-16px' }}
                          wrap={true}
                        >
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
                                <Col __component_name="Col" span={6}>
                                  <Row
                                    __component_name="Row"
                                    gutter={[0, 10]}
                                    h-gutter={0}
                                    v-gutter={10}
                                    wrap={true}
                                  >
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Image
                                        __component_name="Image"
                                        fallback=""
                                        height={64}
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        width={64}
                                      />
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ color: '', fontSize: '34px' }}
                                        type="primary"
                                      >
                                        4
                                      </Typography.Text>
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: '' }}
                                      >
                                        {
                                          this.i18n(
                                            'i18n-4dh77hfc'
                                          ) /* 区块高度 */
                                        }
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col" span={6}>
                                  <Row
                                    __component_name="Row"
                                    gutter={[0, 10]}
                                    h-gutter={0}
                                    v-gutter={10}
                                    wrap={true}
                                  >
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Image
                                        __component_name="Image"
                                        fallback=""
                                        height={64}
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        width={64}
                                      />
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ color: '', fontSize: '34px' }}
                                        type="primary"
                                      >
                                        4
                                      </Typography.Text>
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: '' }}
                                      >
                                        {
                                          this.i18n(
                                            'i18n-ek0a2d5l'
                                          ) /* 交易数量 */
                                        }
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col" span={6}>
                                  <Row
                                    __component_name="Row"
                                    gutter={[0, 10]}
                                    h-gutter={0}
                                    v-gutter={10}
                                    wrap={true}
                                  >
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Image
                                        __component_name="Image"
                                        fallback=""
                                        height={64}
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        width={64}
                                      />
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ color: '', fontSize: '34px' }}
                                        type="primary"
                                      >
                                        4
                                      </Typography.Text>
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: '' }}
                                      >
                                        {
                                          this.i18n(
                                            'i18n-kh6e0jr0i7b'
                                          ) /* 节点数量 */
                                        }
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col" span={6}>
                                  <Row
                                    __component_name="Row"
                                    gutter={[0, 10]}
                                    h-gutter={0}
                                    v-gutter={10}
                                    wrap={true}
                                  >
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Image
                                        __component_name="Image"
                                        fallback=""
                                        height={64}
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        width={64}
                                      />
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ color: '', fontSize: '34px' }}
                                        type="primary"
                                      >
                                        4
                                      </Typography.Text>
                                    </Col>
                                    <Col
                                      __component_name="Col"
                                      span={24}
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: '' }}
                                      >
                                        {
                                          this.i18n(
                                            'i18n-4lrtaenb'
                                          ) /* 合约数量 */
                                        }
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Card>
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
                                  type="default"
                                >
                                  <Row __component_name="Row" wrap={true}>
                                    <Col __component_name="Col" span={24}>
                                      <Typography.Title
                                        __component_name="Typography.Title"
                                        bold={true}
                                        bordered={false}
                                        ellipsis={true}
                                        level={1}
                                      >
                                        Transactions by Organization
                                      </Typography.Title>
                                    </Col>
                                    <Col __component_name="Col" span={24} />
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
                                  type="default"
                                >
                                  <Row __component_name="Row" wrap={true}>
                                    <Col __component_name="Col" span={24}>
                                      <Typography.Title
                                        __component_name="Typography.Title"
                                        bold={true}
                                        bordered={false}
                                        ellipsis={true}
                                        level={1}
                                      >
                                        {this.i18n('i18n-u92msf8l') /* 数据 */}
                                      </Typography.Title>
                                    </Col>
                                    <Col __component_name="Col" span={24} />
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
                                  type="default"
                                >
                                  <Row __component_name="Row" wrap={true}>
                                    <Col __component_name="Col" span={24}>
                                      <Typography.Title
                                        __component_name="Typography.Title"
                                        bold={true}
                                        bordered={false}
                                        ellipsis={true}
                                        level={1}
                                      >
                                        {
                                          this.i18n(
                                            'i18n-gjhg8srl'
                                          ) /* 最新区块 */
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
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Button
                                                  __component_name="Button"
                                                  __events={{
                                                    eventDataList: [
                                                      {
                                                        name: 'onClick',
                                                        paramStr:
                                                          '{\n \t "record":this.record \n}',
                                                        relatedEventName:
                                                          'openBlockDetailModal',
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
                                                  onClick={function () {
                                                    return this.openBlockDetailModal.apply(
                                                      this,
                                                      Array.prototype.slice
                                                        .call(arguments)
                                                        .concat([
                                                          {
                                                            record: record,
                                                          },
                                                        ])
                                                    );
                                                  }.bind(__$$context)}
                                                  shape="default"
                                                  type="link"
                                                >
                                                  {__$$eval(
                                                    () => record?.name || '-'
                                                  )}
                                                </Button>
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                            title:
                                              this.i18n(
                                                'i18n-4dh77hfc'
                                              ) /* 区块高度 */,
                                          },
                                          {
                                            dataIndex: 'name',
                                            key: 'name',
                                            title:
                                              this.i18n(
                                                'i18n-9a9nh7iu'
                                              ) /* 区块哈希 */,
                                          },
                                          {
                                            dataIndex: 'name',
                                            key: 'name',
                                            title:
                                              this.i18n(
                                                'i18n-1pf627eu'
                                              ) /* 交易数 */,
                                          },
                                          {
                                            dataIndex: 'name',
                                            key: 'name',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Time
                                                  __component_name="Typography.Time"
                                                  format=""
                                                  relativeTime={false}
                                                  time={__$$eval(
                                                    () => record?.name
                                                  )}
                                                />
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                            title:
                                              this.i18n(
                                                'i18n-cs2mt1k7'
                                              ) /* 出块时间 */,
                                          },
                                        ]}
                                        dataSource={__$$eval(() => [
                                          {
                                            name: '111',
                                          },
                                        ])}
                                        pagination={false}
                                        rowKey="id"
                                        scroll={{
                                          scrollToFirstRowOnChange: true,
                                        }}
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
                                  type="default"
                                >
                                  <Row __component_name="Row" wrap={true}>
                                    <Col __component_name="Col" span={24}>
                                      <Typography.Title
                                        __component_name="Typography.Title"
                                        bold={true}
                                        bordered={false}
                                        ellipsis={true}
                                        level={1}
                                      >
                                        {
                                          this.i18n(
                                            'i18n-gqszzn1m'
                                          ) /* 最新交易 */
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
                                            title:
                                              this.i18n(
                                                'i18n-dnzjf5qx'
                                              ) /* 交易哈希 */,
                                          },
                                          {
                                            dataIndex: 'name',
                                            key: 'name',
                                            title:
                                              this.i18n(
                                                'i18n-4dh77hfc'
                                              ) /* 区块高度 */,
                                          },
                                          {
                                            dataIndex: 'name',
                                            key: 'name',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Time
                                                  __component_name="Typography.Time"
                                                  format=""
                                                  relativeTime={false}
                                                  time={__$$eval(
                                                    () => record?.name
                                                  )}
                                                />
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                            title:
                                              this.i18n(
                                                'i18n-fmbm1ucg'
                                              ) /* 交易时间 */,
                                          },
                                        ]}
                                        dataSource={__$$eval(() => [
                                          {
                                            name: '111',
                                          },
                                        ])}
                                        pagination={false}
                                        rowKey="id"
                                        scroll={{
                                          scrollToFirstRowOnChange: true,
                                        }}
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
                      </Col>
                    </Row>
                  ),
                  key: 'overview',
                  label: this.i18n('i18n-v40k4rrg') /* 总览 */,
                },
                {
                  children: (
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      size="default"
                      style={{ marginLeft: '-20px', marginTop: '-16px' }}
                      type="default"
                    >
                      <Row
                        __component_name="Row"
                        justify="space-between"
                        wrap={false}
                      >
                        <Col __component_name="Col">
                          <Space align="center" direction="horizontal">
                            <DatePicker.RangePicker
                              __component_name="DatePicker.RangePicker"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onChange',
                                    relatedEventName:
                                      'handleTransactionTimeChange',
                                    type: 'componentEvent',
                                  },
                                ],
                                eventList: [
                                  {
                                    disabled: true,
                                    name: 'onChange',
                                    template:
                                      "onChange(dates,dateStrings,${extParams}){\n// 日期范围发生变化的回调\nconsole.log('onChange',dates,dateStrings);}",
                                  },
                                  {
                                    disabled: false,
                                    name: 'onOpenChange',
                                    template:
                                      "onOpenChange(open,${extParams}){\n// 弹出日历和关闭日历的回调\nconsole.log('onOpenChange',open);}",
                                  },
                                  {
                                    disabled: false,
                                    name: 'onPanelChange',
                                    template:
                                      "onPanelChange(value,mode,${extParams}){\n// 日历面板切换的回调\nconsole.log('onPanelChange',value,mode);}",
                                  },
                                ],
                              }}
                              allowClear={true}
                              disabled={false}
                              onChange={function () {
                                return this.handleTransactionTimeChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              ref={this._refsManager.linkRef(
                                'datepicker.rangepicker-542b52b3'
                              )}
                              showTime={false}
                              value={__$$eval(() => this.state.block?.time)}
                            />
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    relatedEventName: 'handleBlockSearch',
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
                              onClick={function () {
                                return this.handleBlockSearch.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              ref={this._refsManager.linkRef('button-1058b258')}
                              shape="default"
                              type="primary"
                            >
                              {this.i18n('i18n-cn3ivz46') /* 搜索 */}
                            </Button>
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    relatedEventName: 'handleBlockReset',
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
                              onClick={function () {
                                return this.handleBlockReset.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              shape="default"
                            >
                              {this.i18n('i18n-ufdmbyh3') /* 重置 */}
                            </Button>
                          </Space>
                        </Col>
                        <Col __component_name="Col" />
                      </Row>
                      <Table
                        __component_name="Table"
                        __events={{
                          eventDataList: [
                            {
                              name: 'onChange',
                              relatedEventName: 'handleBlockTableChange',
                              type: 'componentEvent',
                            },
                            {
                              name: 'pagination.onShowSizeChange',
                              relatedEventName: 'handleBlockPaginationChange',
                              type: 'componentEvent',
                            },
                            {
                              name: 'pagination.onChange',
                              relatedEventName: 'handleBlockPaginationChange',
                              type: 'componentEvent',
                            },
                          ],
                          eventList: [
                            {
                              disabled: true,
                              name: 'onChange',
                              template:
                                "onChange(pagination,filters,sorter,extra,${extParams}){\n// 表格翻页事件\nconsole.log('onChange', pagination);}",
                            },
                            {
                              disabled: false,
                              name: 'rowSelection.onChange',
                              template:
                                "onRowSelectionChange(selectedRowKeys,selectedRows,${extParams}){\n// 选中项发生变化时的回调\nconsole.log('onRowSelectionChange', selectedRowKeys, selectedRows);}",
                            },
                            {
                              disabled: false,
                              name: 'expandable.onExpand',
                              template:
                                "onExpandableExpand(expanded,record){\n// 点击展开图标时触发\nconsole.log('onRowSelectionChange', expanded, record);}",
                            },
                            {
                              disabled: true,
                              name: 'pagination.onChange',
                              template:
                                "onPaginationChange(page, pageSize){\n// 页码或 pageSize 改变的回调  \nconsole.log('onPaginationChange', page, pageSize);}",
                            },
                            {
                              disabled: true,
                              name: 'pagination.onShowSizeChange',
                              template:
                                "onPaginationShowSizeChange(current, size){\n// pageSize 变化的回调\nconsole.log('onPaginationShowSizeChange', current, size);}",
                            },
                          ],
                        }}
                        columns={[
                          {
                            dataIndex: 'name',
                            key: 'name',
                            title: this.i18n('i18n-o4hf8a4q') /* 区块号 */,
                          },
                          {
                            dataIndex: 'name',
                            key: 'age',
                            title: this.i18n('i18n-6oadzcxin7k') /* 通道名称 */,
                          },
                          {
                            dataIndex: 'name',
                            title: this.i18n('i18n-1pf627eu') /* 交易数 */,
                          },
                          {
                            dataIndex: 'name',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Button
                                  __component_name="Button"
                                  __events={{
                                    eventDataList: [
                                      {
                                        name: 'onClick',
                                        paramStr:
                                          '{\n\t"record":this.record\n}',
                                        relatedEventName:
                                          'openBlockDetailModal',
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
                                  onClick={function () {
                                    return this.openBlockDetailModal.apply(
                                      this,
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([
                                          {
                                            record: record,
                                          },
                                        ])
                                    );
                                  }.bind(__$$context)}
                                  shape="default"
                                  type="link"
                                >
                                  {__$$eval(() => record?.name)}
                                </Button>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-1rb6qm57') /* 区块 hash */,
                          },
                          {
                            dataIndex: 'name',
                            title: this.i18n('i18n-nk62m3xg') /* 上一个 hash */,
                          },
                          {
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(() => record?.name)}
                                />
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-cs2mt1k7') /* 出块时间 */,
                          },
                          {
                            dataIndex: 'name',
                            title: this.i18n('i18n-etm3zsud') /* 大小（KB） */,
                          },
                        ]}
                        dataSource={__$$eval(() => [
                          {
                            name: 'name111',
                          },
                        ])}
                        onChange={function () {
                          return this.handleBlockTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        pagination={{
                          current: 1,
                          onChange: function () {
                            return this.handleBlockPaginationChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          onShowSizeChange: function () {
                            return this.handleBlockPaginationChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          pageSize: 10,
                          showQuickJumper: false,
                          showSizeChanger: false,
                          showTotal: function () {
                            return this.paginationShowTotal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          simple: false,
                          size: 'default',
                          total: 15,
                        }}
                        ref={this._refsManager.linkRef('table-d32c6baa')}
                        rowKey="name"
                        scroll={{ scrollToFirstRowOnChange: true }}
                        showHeader={true}
                        size="default"
                      />
                    </Card>
                  ),
                  key: 'block',
                  label: this.i18n('i18n-d5bqmg59') /* 区块 */,
                },
                {
                  children: (
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      size="default"
                      style={{ marginLeft: '-20px', marginTop: '-16px' }}
                      type="default"
                    >
                      <Row
                        __component_name="Row"
                        justify="space-between"
                        wrap={false}
                      >
                        <Col __component_name="Col">
                          <Space align="center" direction="horizontal">
                            <DatePicker.RangePicker
                              __component_name="DatePicker.RangePicker"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onChange',
                                    relatedEventName:
                                      'handleTransactionTimeChange',
                                    type: 'componentEvent',
                                  },
                                ],
                                eventList: [
                                  {
                                    disabled: true,
                                    name: 'onChange',
                                    template:
                                      "onChange(dates,dateStrings,${extParams}){\n// 日期范围发生变化的回调\nconsole.log('onChange',dates,dateStrings);}",
                                  },
                                  {
                                    disabled: false,
                                    name: 'onOpenChange',
                                    template:
                                      "onOpenChange(open,${extParams}){\n// 弹出日历和关闭日历的回调\nconsole.log('onOpenChange',open);}",
                                  },
                                  {
                                    disabled: false,
                                    name: 'onPanelChange',
                                    template:
                                      "onPanelChange(value,mode,${extParams}){\n// 日历面板切换的回调\nconsole.log('onPanelChange',value,mode);}",
                                  },
                                ],
                              }}
                              allowClear={true}
                              disabled={false}
                              onChange={function () {
                                return this.handleTransactionTimeChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              ref={this._refsManager.linkRef(
                                'datepicker.rangepicker-542b52b3'
                              )}
                              showTime={false}
                              value={__$$eval(
                                () => this.state.transaction?.time
                              )}
                            />
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    relatedEventName: 'handleTransactionSearch',
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
                              onClick={function () {
                                return this.handleTransactionSearch.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              ref={this._refsManager.linkRef('button-1058b258')}
                              shape="default"
                              type="primary"
                            >
                              {this.i18n('i18n-cn3ivz46') /* 搜索 */}
                            </Button>
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    relatedEventName: 'handleTransactionReset',
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
                              onClick={function () {
                                return this.handleTransactionReset.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              shape="default"
                            >
                              {this.i18n('i18n-ufdmbyh3') /* 重置 */}
                            </Button>
                          </Space>
                        </Col>
                        <Col __component_name="Col" />
                      </Row>
                      <Table
                        __component_name="Table"
                        __events={{
                          eventDataList: [
                            {
                              name: 'onChange',
                              relatedEventName: 'handleTransactionTableChange',
                              type: 'componentEvent',
                            },
                            {
                              name: 'pagination.onShowSizeChange',
                              relatedEventName:
                                'handleTransactionPaginationChange',
                              type: 'componentEvent',
                            },
                            {
                              name: 'pagination.onChange',
                              relatedEventName:
                                'handleTransactionPaginationChange',
                              type: 'componentEvent',
                            },
                          ],
                          eventList: [
                            {
                              disabled: true,
                              name: 'onChange',
                              template:
                                "onChange(pagination,filters,sorter,extra,${extParams}){\n// 表格翻页事件\nconsole.log('onChange', pagination);}",
                            },
                            {
                              disabled: false,
                              name: 'rowSelection.onChange',
                              template:
                                "onRowSelectionChange(selectedRowKeys,selectedRows,${extParams}){\n// 选中项发生变化时的回调\nconsole.log('onRowSelectionChange', selectedRowKeys, selectedRows);}",
                            },
                            {
                              disabled: false,
                              name: 'expandable.onExpand',
                              template:
                                "onExpandableExpand(expanded,record){\n// 点击展开图标时触发\nconsole.log('onRowSelectionChange', expanded, record);}",
                            },
                            {
                              disabled: true,
                              name: 'pagination.onChange',
                              template:
                                "onPaginationChange(page, pageSize){\n// 页码或 pageSize 改变的回调  \nconsole.log('onPaginationChange', page, pageSize);}",
                            },
                            {
                              disabled: true,
                              name: 'pagination.onShowSizeChange',
                              template:
                                "onPaginationShowSizeChange(current, size){\n// pageSize 变化的回调\nconsole.log('onPaginationShowSizeChange', current, size);}",
                            },
                          ],
                        }}
                        columns={[
                          {
                            dataIndex: 'name',
                            key: 'name',
                            title: this.i18n('i18n-wctt13ld2x') /* 发起者 */,
                          },
                          {
                            dataIndex: 'name',
                            key: 'age',
                            title: this.i18n('i18n-6oadzcxin7k') /* 通道名称 */,
                          },
                          {
                            dataIndex: 'name',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Button
                                  __component_name="Button"
                                  __events={{
                                    eventDataList: [
                                      {
                                        name: 'onClick',
                                        paramStr:
                                          '{\n \t "record":this.record \n}',
                                        relatedEventName:
                                          'openTransactionDetailModal',
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
                                  onClick={function () {
                                    return this.openTransactionDetailModal.apply(
                                      this,
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([
                                          {
                                            record: record,
                                          },
                                        ])
                                    );
                                  }.bind(__$$context)}
                                  shape="default"
                                  type="link"
                                >
                                  {__$$eval(() => record?.name || '-')}
                                </Button>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-wawjkqrp') /* 交易 */,
                          },
                          {
                            dataIndex: 'name',
                            title: this.i18n('i18n-9yrquy3v2y7') /* 类型 */,
                          },
                          {
                            dataIndex: 'name',
                            title: this.i18n('i18n-5rnqqm9p') /* 合约 */,
                          },
                          {
                            dataIndex: 'name',
                            title: this.i18n('i18n-2scieorh') /* 时间戳 */,
                          },
                        ]}
                        dataSource={__$$eval(() => [
                          {
                            name: 'name',
                          },
                        ])}
                        onChange={function () {
                          return this.handleTransactionTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        pagination={{
                          current: 1,
                          onChange: function () {
                            return this.handleTransactionPaginationChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          onShowSizeChange: function () {
                            return this.handleTransactionPaginationChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          pageSize: 10,
                          showQuickJumper: false,
                          showSizeChanger: false,
                          showTotal: function () {
                            return this.paginationShowTotal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          simple: false,
                          size: 'default',
                          total: 15,
                        }}
                        ref={this._refsManager.linkRef('table-d32c6baa')}
                        rowKey="name"
                        scroll={{ scrollToFirstRowOnChange: true }}
                        showHeader={true}
                        size="default"
                      />
                    </Card>
                  ),
                  key: 'transaction',
                  label: this.i18n('i18n-wawjkqrp') /* 交易 */,
                },
              ]}
              size="large"
              style={{ paddingLeft: '20px' }}
              tabBarExtraContent={
                <Space align="center" direction="horizontal">
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {this.i18n('i18n-4wgfgnn6') /* 通道 */}
                  </Typography.Text>
                  <Input.Search
                    __component_name="Input.Search"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          relatedEventName: 'handleSearchValueChange',
                          type: 'componentEvent',
                        },
                      ],
                      eventList: [
                        {
                          disabled: true,
                          name: 'onChange',
                          template:
                            "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}",
                        },
                        {
                          disabled: false,
                          name: 'onPressEnter',
                          template:
                            "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}",
                        },
                        {
                          disabled: false,
                          name: 'onSearch',
                          template:
                            "onSearch(value,event,${extParams}){\n// 点击搜索图标、清除图标，或按下回车键时的回调\nconsole.log('onSearch',value,event);}",
                        },
                        {
                          disabled: false,
                          name: 'onFocus',
                          template:
                            "onFocus(event,${extParams}){\n// 获取焦点回调\nconsole.log('onFocus',event);}",
                        },
                        {
                          disabled: false,
                          name: 'onKeyDown',
                          template:
                            "onKeyDown(event,${extParams}){\n// 按键按下时的回调\nconsole.log('onKeyDown',event);}",
                        },
                        {
                          disabled: false,
                          name: 'onKeyPress',
                          template:
                            "onKeyPress(event,${extParams}){\n// 按键按下后的回调\nconsole.log('onKeyPress',event);}",
                        },
                        {
                          disabled: false,
                          name: 'onKeyUp',
                          template:
                            "onKeyUp(event,${extParams}){\n// 按键释放回调\nconsole.log('onKeyUp',event);}",
                        },
                        {
                          disabled: false,
                          name: 'onBlur',
                          template:
                            "onBlur(event,${extParams}){\n// 按键释放回调\nconsole.log('onBlur',event);}",
                        },
                      ],
                    }}
                    onChange={function () {
                      this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placeholder={
                      this.i18n('i18n-06oayifb') /* 请输入区块高度、交易 hash */
                    }
                    style={{ width: '220px' }}
                  />
                </Space>
              }
              tabPosition="top"
              type="line"
            />
          </Col>
        </Row>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath({ path: '/browser' }, location.pathname);
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
        <Browser$$Page {...dataProps} self={self} appHelper={appHelper} />
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
