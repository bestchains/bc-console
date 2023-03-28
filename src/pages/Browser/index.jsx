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
  Select,
  Input,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import { createFetchHandler as __$$createFetchRequestHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class Browser$$Page extends React.Component {
  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { fetch: __$$createFetchRequestHandler() },
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
    this.location = props.self?.location;
    this.match = props.self?.match;
    this.history = props.self?.history;

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      isOpenModal: false,
      modalType: 'create',
      filter: 'ALL',
      searchValue: undefined,
      searchKey: 'name',
      network: '',
      tab: 'overview',
      myChannels: [],
      overview: {},
      block: {
        time: null,
        size: 10,
        current: 1,
        record: {},
        list: [],
        loading: false,
      },
      transaction: {
        time: null,
        size: 10,
        current: 1,
        record: {},
        list: [],
        loading: false,
      },
    };
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
          id: 'getBrowserBlocks',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              headers: {},
              isCors: true,
              method: 'GET',
              params: {
                blockHash: _this.state.block.blockHash,
                blockNumber: _this.state.searchValue,
                endTime: _this.formatTimeParams(_this.state.block.time?.[1]),
                from: (_this.state.block.current - 1) * 10,
                size: _this.state.block.size,
                startTime: _this.formatTimeParams(_this.state.block.time?.[0]),
              },
              timeout: 5000,
              uri: `${_this.constants?.BC_EXPLORER_API_PREFIX}/networks/${_this.state.network}/blocks`,
            };
          },
          type: 'fetch',
        },
        {
          id: 'getBrowserTransactions',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              headers: {},
              isCors: true,
              method: 'GET',
              params: {
                blockNumber: _this.state.searchValue,
                endTime: _this.formatTimeParams(
                  _this.state.transaction.time?.[1]
                ),
                from: (_this.state.transaction.current - 1) * 10,
                size: _this.state.transaction.size,
                startTime: _this.formatTimeParams(
                  _this.state.transaction.time?.[0]
                ),
              },
              timeout: 5000,
              uri: `${_this.constants?.BC_EXPLORER_API_PREFIX}/networks/${_this.state.network}/transactions`,
            };
          },
          type: 'fetch',
        },
        {
          id: 'getOverview',
          isInit: function () {
            return false;
          },
          options: function () {
            return {
              headers: {},
              isCors: true,
              method: 'GET',
              params: {},
              timeout: 5000,
              uri: `${_this.constants?.BC_EXPLORER_API_PREFIX}/overview`,
            };
          },
          type: 'fetch',
        },
      ],
    };
  }

  componentWillUnmount() {}

  formatTimeParams(v) {
    return v ? parseInt(new Date(v).getTime() / 1000) : undefined;
  }

  async getMyChannels() {
    try {
      var _ref, _ref$concat, _myChannels$;
      const res = await this.props.appHelper.utils.bff.getMyChannels();
      const myChannels =
        ((_ref = [
          {
            network: 'blkexp',
            name: 'blkexp6',
          },
        ]) === null || _ref === void 0
          ? void 0
          : (_ref$concat = _ref.concat(
              res === null || res === void 0 ? void 0 : res.channels
            )) === null || _ref$concat === void 0
          ? void 0
          : _ref$concat.map((item) => ({
              value: `${item.network}_${item.name}`,
              label: `${item.network}_${item.name}`,
            }))) || [];
      this.setState(
        {
          myChannels,
          network:
            myChannels === null || myChannels === void 0
              ? void 0
              : (_myChannels$ = myChannels[0]) === null ||
                _myChannels$ === void 0
              ? void 0
              : _myChannels$.value,
        },
        () => {
          this.loadData();
        }
      );
    } catch (error) {}
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  paginationShowTotal(a, b) {
    return this.utils.paginationShowTotal(a, b, this);
  }

  getBrowserBlocks() {
    this.setState({
      block: {
        ...this.state.block,
        loading: true,
      },
    });
    this.dataSourceMap.getBrowserBlocks
      .load({})
      .then((res) => {
        this.setState({
          block: {
            ...this.state.block,
            total: res === null || res === void 0 ? void 0 : res.count,
            list: res === null || res === void 0 ? void 0 : res.data,
            loading: false,
          },
        });
      })
      .catch((error) => {
        this.setState({
          block: {
            ...this.state.block,
            total: 0,
            list: [],
            loading: false,
          },
        });
      });
  }

  getBrowserTransactions() {
    this.setState({
      transaction: {
        ...this.state.transaction,
        loading: true,
      },
    });
    this.dataSourceMap.getBrowserTransactions
      .load({})
      .then((res) => {
        this.setState({
          transaction: {
            ...this.state.transaction,
            total: res === null || res === void 0 ? void 0 : res.count,
            list: res === null || res === void 0 ? void 0 : res.data,
            loading: false,
          },
        });
      })
      .catch((error) => {
        this.setState({
          transaction: {
            ...this.state.transaction,
            total: 0,
            list: [],
            loading: false,
          },
        });
      });
  }

  getOverview() {
    this.setState({
      overview: {
        ...this.state.overview,
        loading: true,
      },
    });
    this.dataSourceMap.getOverview
      .load({})
      .then((res) => {
        this.setState({
          overview: {
            ...this.state.overview,
            data: res || {},
            loading: false,
          },
        });
      })
      .catch((error) => {
        this.setState({
          overview: {
            ...this.state.overview,
            data: {},
            loading: false,
          },
        });
      });
  }

  loadData() {
    if (this.state.tab === 'overview') {
      this.getOverview();
      this.setState(
        {
          time: null,
          current: 1,
        },
        this.getBrowserBlocks
      );
      this.setState(
        {
          time: null,
          current: 1,
        },
        this.getBrowserTransactions
      );
    }
    if (!this.state.network) return;
    if (this.state.tab === 'block') {
      this.getBrowserBlocks();
    }
    if (this.state.tab === 'transaction') {
      this.getBrowserTransactions();
    }
  }

  handleNetworkChannelChange(v) {
    this.setState(
      {
        network: v,
        current: 1,
      },
      this.loadData
    );
  }

  handleSearchValueChange(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  handleSearch(value, event) {
    this.setState(
      {
        current: 1,
      },
      this.loadData
    );
  }

  handleTabChange(v) {
    this.setState(
      {
        tab: v,
        current: 1,
      },
      this.loadData
    );
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

  handleBlockPaginationChange(c, s) {
    this.setState(
      {
        block: {
          ...this.state.block,
          size: s,
          current: c,
        },
      },
      this.loadData
    );
  }

  handleBlockTableChange(pagination, filters, sorter, extra) {
    this.setState(
      {
        block: {
          ...this.state.block,
          pagination,
          filters,
          sorter,
          size: pagination.pageSize,
          current: pagination.current,
        },
      },
      this.loadData
    );
  }

  handleBlockSearch() {
    this.setState(
      {
        block: {
          ...this.state.block,
          current: 1,
        },
      },
      this.loadData
    );
  }

  handleBlockReset() {
    this.setState(
      {
        block: {
          ...this.state.block,
          time: null,
          current: 1,
        },
      },
      this.loadData
    );
  }

  handleBlockTimeChange(v) {
    this.setState(
      {
        block: {
          ...this.state.block,
          time: v,
        },
      },
      this.loadData
    );
  }

  handleTransactionSearch() {
    this.setState(
      {
        transaction: {
          ...this.state.transaction,
          current: 1,
        },
      },
      this.loadData
    );
  }

  handleTransactionReset() {
    this.setState(
      {
        transaction: {
          ...this.state.transaction,
          time: null,
          current: 1,
        },
      },
      this.loadData
    );
  }

  handleTransactionTimeChange(v) {
    this.setState(
      {
        transaction: {
          ...this.state.transaction,
          time: v,
        },
      },
      this.loadData
    );
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

  handleTransactionPaginationChange(c, s) {
    this.setState(
      {
        transaction: {
          ...this.state.transaction,
          size: s,
          current: c,
        },
      },
      this.loadData
    );
  }

  handleTransactionTableChange(pagination, filters, sorter, extra) {
    this.setState(
      {
        transaction: {
          ...this.state.transaction,
          pagination,
          filters,
          sorter,
          size: pagination.pageSize,
          current: pagination.current,
        },
      },
      this.loadData
    );
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getMyChannels();
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
                      () =>
                        this.state.transaction?.record?.Network?.split(
                          '-'
                        )?.[1] || '-'
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
                      () => this.state.transaction?.record?.BlockNumber || '-'
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
                    time={__$$eval(
                      () => this.state.transaction?.record?.CreatedAt * 1000
                    )}
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
                      () => this.state.transaction?.record?.TxCount || '-'
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
                    style={{ fontSize: '', width: '330px' }}
                  >
                    {__$$eval(
                      () => this.state.transaction?.record?.BlockHash || '-'
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
                      () => this.state.transaction?.record?.DataHash || '-'
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
                      () =>
                        this.state.transaction?.record?.PreviousBlockHash || '-'
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
                  {__$$eval(
                    () =>
                      this.state.block?.record?.Network?.split('_')?.[1] || '-'
                  )}
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
                  {__$$eval(() => this.state.block?.record?.BlockNumber || '-')}
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
                  time={__$$eval(
                    () => this.state.block?.record?.CreatedAt * 1000
                  )}
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
                  {__$$eval(() => this.state.block?.record?.TxCount || '-')}
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
                  style={{ fontSize: '', width: '330px' }}
                >
                  {__$$eval(() => this.state.block?.record?.BlockHash || '-')}
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
                  style={{ fontSize: '', width: '330px' }}
                >
                  {__$$eval(() => this.state.block?.record?.DataHash || '-')}
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
                  style={{ fontSize: '', width: '330px' }}
                >
                  {__$$eval(
                    () => this.state.block?.record?.PrevioudBlockHash || '-'
                  )}
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
                    style={{ fontSize: '', width: '290px' }}
                  >
                    {__$$eval(() => this.state.transaction?.record?.ID || '-')}
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
                      () =>
                        this.state.transaction?.record?.ValidationCode + '' ||
                        '-'
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
                    copyable={{
                      _unsafe_MixedSetter_text_select: 'VariableSetter',
                      text: __$$eval(
                        () =>
                          this.utils.decodeBase64(
                            this.state.transaction?.record?.Payload || ''
                          ) || '-'
                      ),
                    }}
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '', width: '290px' }}
                  >
                    {__$$eval(
                      () =>
                        this.utils.decodeBase64(
                          this.state.transaction?.record?.Payload || ''
                        ) || '-'
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
                      () => this.state.transaction?.record?.Creator || '-'
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
                      () => this.state.transaction?.record?.ChaincodeID || '-'
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
                      () => this.state.transaction?.record?.Type || '-'
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
                    ref={this._refsManager.linkRef('typography.time-a1872598')}
                    relativeTime={false}
                    time={__$$eval(
                      () =>
                        this.state.transaction?.record?.CreatedAt &&
                        this.state.transaction.record.CreatedAt * 1000
                    )}
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
                  style={{ fontSize: '', width: '290px' }}
                >
                  {__$$eval(() => this.state.transaction?.record?.ID || '-')}
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
                  {__$$eval(
                    () =>
                      this.state.transaction?.record?.ValidationCode + '' || '-'
                  )}
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
                  copyable={{
                    _unsafe_MixedSetter_text_select: 'VariableSetter',
                    text: __$$eval(
                      () =>
                        this.utils.decodeBase64(
                          this.state.transaction?.record?.Payload || ''
                        ) || '-'
                    ),
                  }}
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '', width: '290px' }}
                >
                  {__$$eval(
                    () =>
                      this.utils.decodeBase64(
                        this.state.transaction?.record?.Payload || ''
                      ) || '-'
                  )}
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
                  {__$$eval(
                    () => this.state.transaction?.record?.Creator || '-'
                  )}
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
                  {__$$eval(
                    () => this.state.transaction?.record?.ChaincodeID || '-'
                  )}
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
                  {__$$eval(() => this.state.transaction?.record?.Type || '-')}
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
                  ref={this._refsManager.linkRef('typography.time-a1872598')}
                  relativeTime={false}
                  time={__$$eval(
                    () =>
                      this.state.transaction?.record?.CreatedAt &&
                      this.state.transaction.record.CreatedAt * 1000
                  )}
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
              __events={{
                eventDataList: [
                  {
                    name: 'onChange',
                    relatedEventName: 'handleTabChange',
                    type: 'componentEvent',
                  },
                ],
                eventList: [
                  {
                    disabled: true,
                    name: 'onChange',
                    template:
                      "onChange(activeKey,${extParams}){\n// 切换面板的回调\nconsole.log('onChange',activeKey);}",
                  },
                  {
                    disabled: false,
                    name: 'onEdit',
                    template:
                      "onEdit(targetKey,action,${extParams}){\n// 新增和删除页签的回调\nconsole.log('onEdit',targetKey,action);}",
                  },
                  {
                    disabled: false,
                    name: 'onTabClick',
                    template:
                      "onTabClick(key,event,${extParams}){\n// tab 被点击的回调\nconsole.log('onTabClick',key,event);}",
                  },
                  {
                    disabled: false,
                    name: 'onTabScroll',
                    template:
                      "onTabScroll({direction},${extParams}){\n// tab 滚动时触\nconsole.log('onTabScroll',direction);}",
                  },
                ],
              }}
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
                                            dataIndex: 'BlockNumber',
                                            key: 'BlockNumber',
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
                                                    () =>
                                                      record?.BlockNumber || '-'
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
                                            dataIndex: 'BlockHash',
                                            key: 'BlockHash',
                                            title:
                                              this.i18n(
                                                'i18n-9a9nh7iu'
                                              ) /* 区块哈希 */,
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Text
                                                  __component_name="Typography.Text"
                                                  ellipsis={true}
                                                  style={{
                                                    fontSize: '',
                                                    width: '100px',
                                                  }}
                                                  disabled={false}
                                                  strong={false}
                                                >
                                                  {__$$eval(
                                                    () =>
                                                      record?.BlockHash || '-'
                                                  )}
                                                </Typography.Text>
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                          },
                                          {
                                            dataIndex: 'TxCount',
                                            key: 'TxCount',
                                            title:
                                              this.i18n(
                                                'i18n-1pf627eu'
                                              ) /* 交易数 */,
                                          },
                                          {
                                            dataIndex: 'CreatedAt',
                                            key: 'CreatedAt',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Time
                                                  __component_name="Typography.Time"
                                                  format=""
                                                  relativeTime={false}
                                                  time={__$$eval(
                                                    () =>
                                                      record?.CreatedAt &&
                                                      record?.CreatedAt * 1000
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
                                        dataSource={__$$eval(
                                          () =>
                                            this.state.block?.list?.slice(
                                              0,
                                              5
                                            ) || []
                                        )}
                                        pagination={false}
                                        rowKey="BlockNumber"
                                        scroll={{
                                          scrollToFirstRowOnChange: true,
                                        }}
                                        showHeader={true}
                                        size="small"
                                        loading={__$$eval(
                                          () => this.state.block?.loading
                                        )}
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
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Text
                                                  __component_name="Typography.Text"
                                                  ellipsis={true}
                                                  style={{
                                                    fontSize: '',
                                                    width: '100px',
                                                  }}
                                                  disabled={false}
                                                  strong={false}
                                                >
                                                  {__$$eval(
                                                    () => record?.ID || '-'
                                                  )}
                                                </Typography.Text>
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                          },
                                          {
                                            dataIndex: 'BlockNumber',
                                            key: 'BlockNumber',
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
                                                    () =>
                                                      record?.CreatedAt &&
                                                      record?.CreatedAt * 1000
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
                                        dataSource={__$$eval(
                                          () =>
                                            this.state.transaction?.list?.slice(
                                              0,
                                              5
                                            ) || []
                                        )}
                                        pagination={false}
                                        rowKey="ID"
                                        scroll={{
                                          scrollToFirstRowOnChange: true,
                                        }}
                                        showHeader={true}
                                        size="small"
                                        loading={__$$eval(
                                          () => this.state.transaction?.loading
                                        )}
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
                                    relatedEventName: 'handleBlockTimeChange',
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
                                return this.handleBlockTimeChange.apply(
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
                            dataIndex: 'BlockNumber',
                            key: 'blockNumber',
                            title: this.i18n('i18n-o4hf8a4q') /* 区块号 */,
                          },
                          {
                            dataIndex: 'Network',
                            key: 'network',
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
                                      record?.Network?.split('_')?.[1] || '-'
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-6oadzcxin7k') /* 通道名称 */,
                          },
                          {
                            dataIndex: 'TxCount',
                            key: 'txCount',
                            title: this.i18n('i18n-1pf627eu') /* 交易数 */,
                          },
                          {
                            dataIndex: 'BlockHash',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Text
                                  __component_name="Typography.Text"
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
                                          "onClick(event, ${extParams}){\n// \t点击 Text 时的回调\nconsole.log('onCopy');}",
                                      },
                                      {
                                        disabled: false,
                                        name: 'copyable.onCopy',
                                        template:
                                          "onCopy(${extParams}){\n// 拷贝成功的回调函数\nconsole.log('onCopy');}",
                                      },
                                      {
                                        disabled: false,
                                        name: 'ellipsis.onEllipsis',
                                        template:
                                          "onEllipsis(ellipsis,${extParams}){\n// 触发省略时的回调\nconsole.log('onEllipsis', ellipsis);}",
                                      },
                                      {
                                        disabled: false,
                                        name: 'ellipsis.onExpand',
                                        template:
                                          "onExpand(event,${extParams}){\n// 点击展开时的回调\nconsole.log('onExpand', event);}",
                                      },
                                    ],
                                  }}
                                  disabled={false}
                                  ellipsis={true}
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
                                  strong={false}
                                  style={{ color: '#FE8F35', fontSize: '' }}
                                >
                                  {__$$eval(() => record?.BlockHash || '-')}
                                </Typography.Text>
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
                            dataIndex: 'PrevioudBlockHash',
                            ellipsis: { showTitle: true },
                            key: 'preBlockHash',
                            title: this.i18n('i18n-nk62m3xg') /* 上一个 hash */,
                          },
                          {
                            dataIndex: 'CreatedAt',
                            key: 'createdAt',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(
                                    () =>
                                      record?.CreatedAt &&
                                      record?.CreatedAt * 1000
                                  )}
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
                            dataIndex: 'BlockSize',
                            key: 'BlockSize',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(() =>
                                    parseInt((record?.BlockSize || 0) / 1024)
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-etm3zsud') /* 大小（KB） */,
                          },
                        ]}
                        dataSource={__$$eval(
                          () => this.state.block?.list || []
                        )}
                        loading={__$$eval(() => this.state.block?.loading)}
                        onChange={function () {
                          return this.handleBlockTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        pagination={{
                          current: __$$eval(
                            () => this.state.block?.current || 0
                          ),
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
                          pageSize: __$$eval(() => this.state.block?.size || 0),
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
                          total: __$$eval(() => this.state.block?.total || 0),
                        }}
                        ref={this._refsManager.linkRef('table-d32c6baa')}
                        rowKey="BlockNumber"
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
                            dataIndex: 'Creator',
                            key: 'Creator',
                            title: this.i18n('i18n-wctt13ld2x') /* 发起者 */,
                          },
                          {
                            dataIndex: 'Network',
                            key: 'Network',
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
                                      record?.Network?.split('_')?.[1] || '-'
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-6oadzcxin7k') /* 通道名称 */,
                          },
                          {
                            dataIndex: 'name',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Text
                                  __component_name="Typography.Text"
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
                                          "onClick(event, ${extParams}){\n// \t点击 Text 时的回调\nconsole.log('onCopy');}",
                                      },
                                      {
                                        disabled: false,
                                        name: 'copyable.onCopy',
                                        template:
                                          "onCopy(${extParams}){\n// 拷贝成功的回调函数\nconsole.log('onCopy');}",
                                      },
                                      {
                                        disabled: false,
                                        name: 'ellipsis.onEllipsis',
                                        template:
                                          "onEllipsis(ellipsis,${extParams}){\n// 触发省略时的回调\nconsole.log('onEllipsis', ellipsis);}",
                                      },
                                      {
                                        disabled: false,
                                        name: 'ellipsis.onExpand',
                                        template:
                                          "onExpand(event,${extParams}){\n// 点击展开时的回调\nconsole.log('onExpand', event);}",
                                      },
                                    ],
                                  }}
                                  disabled={false}
                                  ellipsis={true}
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
                                  ref={this._refsManager.linkRef(
                                    'typography.text-d27fa9ed'
                                  )}
                                  strong={false}
                                  style={{ color: '#FE8F35', fontSize: '' }}
                                >
                                  {__$$eval(() => record?.ID || '-')}
                                </Typography.Text>
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
                            dataIndex: 'Type',
                            key: 'Type',
                            title: this.i18n('i18n-9yrquy3v2y7') /* 类型 */,
                          },
                          {
                            dataIndex: 'ChaincodeID',
                            key: 'ChaincodeID',
                            title: this.i18n('i18n-5rnqqm9p') /* 合约 */,
                          },
                          {
                            dataIndex: 'CreatedAt',
                            key: 'CreatedAt',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  ref={this._refsManager.linkRef(
                                    'typography.time-b513b216'
                                  )}
                                  relativeTime={false}
                                  time={__$$eval(
                                    () =>
                                      record?.CreatedAt &&
                                      record?.CreatedAt * 1000
                                  )}
                                />
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-2scieorh') /* 时间戳 */,
                          },
                        ]}
                        dataSource={__$$eval(
                          () => this.state.transaction?.list || []
                        )}
                        loading={__$$eval(
                          () => this.state.transaction?.loading
                        )}
                        onChange={function () {
                          return this.handleTransactionTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        pagination={{
                          current: __$$eval(
                            () => this.state.transaction?.current || 0
                          ),
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
                          pageSize: __$$eval(
                            () => this.state.transaction?.size || 0
                          ),
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
                          total: __$$eval(
                            () => this.state.transaction?.total || 0
                          ),
                        }}
                        ref={this._refsManager.linkRef('table-d32c6baa')}
                        rowKey="ID"
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
              onChange={function () {
                return this.handleTabChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this)}
              ref={this._refsManager.linkRef('tabs-d2b4008e')}
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
                  <Select
                    __component_name="Select"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          relatedEventName: 'handleNetworkChannelChange',
                          type: 'componentEvent',
                        },
                      ],
                      eventList: [
                        {
                          disabled: true,
                          name: 'onChange',
                          template:
                            "onChange(value,option,${extParams}){\n// 选中 option，或 input 的 value 变化时，调用此函数\nconsole.log('onChange',value,option);}",
                        },
                        {
                          disabled: false,
                          name: 'onSearch',
                          template:
                            "onSearch(value,${extParams}){\n// 文本框值变化时回调\nconsole.log('onSearch',value);}",
                        },
                      ],
                    }}
                    allowClear={false}
                    disabled={false}
                    maxTagCount={0}
                    maxTagTextLength={0}
                    onChange={function () {
                      return this.handleNetworkChannelChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    options={__$$eval(() => this.state.myChannels)}
                    placeholder="请选择"
                    showSearch={true}
                    style={{ width: 200 }}
                    value={__$$eval(() => this.state.network)}
                  />
                  <Input.Search
                    __component_name="Input.Search"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          relatedEventName: 'handleSearchValueChange',
                          type: 'componentEvent',
                        },
                        {
                          name: 'onSearch',
                          relatedEventName: 'handleSearch',
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
                          disabled: true,
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
                      return this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    onSearch={function () {
                      return this.handleSearch.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placeholder={
                      this.i18n('i18n-06oayifb') /* 请输入区块号搜索 */
                    }
                    style={{ width: '220px' }}
                    value={__$$eval(() => this.state.searchValue)}
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
