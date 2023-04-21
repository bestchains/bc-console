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
  Spin,
  Empty,
  Table,
  DatePicker,
  Button,
  Select,
  Input,
} from '@tenx-ui/materials';

import { PieChart, LineChart } from '@tenx-ui/charts';

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

class Browser$$Page extends React.Component {
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

    this.state = {
      block: {
        time: null,
        size: 10,
        current: 1,
        record: {},
        list: [],
        loading: false,
      },
      filter: 'ALL',
      isOpenModal: false,
      modalType: 'create',
      myChannels: [],
      network: '',
      overview: {},
      searchKey: 'name',
      searchValue: undefined,
      tab: 'overview',
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
          }.bind(_this),
          options: function () {
            return {
              headers: {},
              isCors: true,
              method: 'GET',
              params: {
                blockHash: this.state.block.blockHash,
                blockNumber: this.state.searchValue,
                endTime: this.formatTimeParams(this.state.block.time?.[1]),
                from: (this.state.block.current - 1) * 10,
                size: this.state.block.size,
                startTime: this.formatTimeParams(this.state.block.time?.[0]),
              },
              timeout: 5000,
              uri: `${this.constants?.BC_EXPLORER_API_PREFIX}/networks/${this.state.network}/blocks`,
            };
          }.bind(_this),
          type: 'axios',
        },
        {
          id: 'getBrowserTransactions',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {},
              isCors: true,
              method: 'GET',
              params: {
                blockNumber: this.state.searchValue,
                endTime: this.formatTimeParams(
                  this.state.transaction.time?.[1]
                ),
                from: (this.state.transaction.current - 1) * 10,
                size: this.state.transaction.size,
                startTime: this.formatTimeParams(
                  this.state.transaction.time?.[0]
                ),
              },
              timeout: 5000,
              uri: `${this.constants?.BC_EXPLORER_API_PREFIX}/networks/${this.state.network}/transactions`,
            };
          }.bind(_this),
          type: 'axios',
        },
        {
          id: 'getOverviewSummary',
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
              uri: `${this.constants?.BC_EXPLORER_API_PREFIX}/networks/${this.state.network}/overview/summary`,
            };
          }.bind(_this),
          type: 'axios',
        },
        {
          id: 'getTransactionsCount',
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
              uri: `${this.constants?.BC_EXPLORER_API_PREFIX}/networks/${this.state.network}/transactionsCount`,
            };
          }.bind(_this),
          type: 'axios',
        },
        {
          id: 'getQueryBySeg',
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
              uri: `${this.constants?.BC_EXPLORER_API_PREFIX}/networks/${this.state.network}/overview/query-by-seg`,
            };
          }.bind(_this),
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {}

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  formatTimeParams(v) {
    return v ? parseInt(new Date(v).getTime() / 1000) : undefined;
  }

  formateTransactionsCount(text, item, index) {
    const percent =
      parseFloat(
        item.data?.angleField / this.state.overview?.transactionsCountTotal
      )?.toFixed(2) * 100;
    return (
      <span>
        <span
          style={{
            display: 'inline-block',
            width: '100px',
          }}
        >
          {text}
        </span>
        <span
          style={{
            float: 'right',
          }}
        >
          {percent} %
        </span>
      </span>
    );
  }

  getAllQueryBySeg() {
    this.getQueryBySeg({
      type: 'blockH',
      query: {
        from: parseInt(new Date().getTime() / 1000 - 3600 * 24),
        interval: 3600,
        number: 24,
        type: 'blocks',
      },
    });
    this.getQueryBySeg({
      type: 'transactionH',
      query: {
        from: parseInt(new Date().getTime() / 1000 - 3600 * 24),
        interval: 3600,
        number: 24,
        type: 'transactions',
      },
    });
    this.getQueryBySeg({
      type: 'blockM',
      query: {
        from: parseInt(new Date().getTime() / 1000 - 60 * 60),
        interval: 60,
        number: 60,
        type: 'blocks',
      },
    });
    this.getQueryBySeg({
      type: 'transactionM',
      query: {
        from: parseInt(new Date().getTime() / 1000 - 60 * 60),
        interval: 60,
        number: 60,
        type: 'transactions',
      },
    });
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
            total: res?.count,
            list: res?.data,
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
            total: res?.count,
            list: res?.data,
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

  async getMyChannels() {
    try {
      const res = await this.props.appHelper.utils.bff.getMyChannels();
      const myChannels =
        []?.concat(res?.channels)?.map((item) => ({
          ...item,
          value: `${item.network}_${item.displayName}`,
          label: `${item.network}_${item.displayName}`,
        })) || [];
      this.setState(
        {
          myChannels,
          network: myChannels?.[0]?.value,
        },
        () => {
          this.loadData();
        }
      );
    } catch (error) {}
  }

  getOverview() {
    this.setState({
      overview: {
        ...this.state.overview,
        loading: true,
      },
    });
    this.dataSourceMap.getOverviewSummary
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

  getQueryBySeg({ type, query }) {
    this.setState({
      overview: {
        ...this.state.overview,
        loading: true,
      },
    });
    this.dataSourceMap.getQueryBySeg
      .load(query)
      .then((res) => {
        this.setState({
          overview: {
            ...this.state.overview,
            [type]: res?.map((item) => ({
              seriesField: this.i18n('i18n-1pf627eu'),
              xField: item.end * 1000,
              yField: item.count,
            })),
            loading: false,
          },
        });
      })
      .catch((error) => {
        this.setState({
          overview: {
            ...this.state.overview,
            [type]: [],
            loading: false,
          },
        });
      });
  }

  getTransactionsCount() {
    this.setState({
      overview: {
        ...this.state.overview,
        loading: true,
      },
    });
    this.dataSourceMap.getTransactionsCount
      .load({})
      .then((res) => {
        this.setState({
          overview: {
            ...this.state.overview,
            transactionsCount:
              res?.data?.map((item) => ({
                angleField: item.count || 0,
                seriesField: item.creator || '-',
              })) || [],
            transactionsCountTotal: res?.data?.reduce(
              (prev, cur, index, arr) => {
                return prev + cur?.count;
              },
              0
            ),
            loading: false,
          },
        });
      })
      .catch((error) => {
        this.setState({
          overview: {
            ...this.state.overview,
            transactionsCount: [],
            loading: false,
          },
        });
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

  handleNetworkChannelChange(v) {
    this.setState(
      {
        network: v,
        current: 1,
      },
      this.loadData
    );
  }

  handleSearch(value, event) {
    this.setState(
      {
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

  handleTabChange(v) {
    this.setState(
      {
        tab: v,
        current: 1,
      },
      this.loadData
    );
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

  loadData() {
    if (!this.state.network) return;
    if (this.state.tab === 'overview') {
      this.getOverview();
      this.getTransactionsCount();
      this.getAllQueryBySeg();
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
    if (this.state.tab === 'block') {
      this.getBrowserBlocks();
    }
    if (this.state.tab === 'transaction') {
      this.getBrowserTransactions();
    }
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
                        this.state.block?.record?.network?.split('_')?.[1] ||
                        '-'
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
                      () => this.state.block?.record?.blockNumber || '-'
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
                      () => this.state.block?.record?.createdAt * 1000
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
                    {__$$eval(() => this.state.block?.record?.txCount || '-')}
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
                    ellipsis={{
                      tooltip: {
                        _unsafe_MixedSetter_title_select: 'VariableSetter',
                        title: __$$eval(
                          () => this.state.block?.record?.blockHash || '-'
                        ),
                      },
                    }}
                    strong={false}
                    style={{ fontSize: '', width: '300px' }}
                  >
                    {__$$eval(() => this.state.block?.record?.blockHash || '-')}
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
                    ellipsis={{
                      tooltip: {
                        _unsafe_MixedSetter_title_select: 'VariableSetter',
                        title: __$$eval(
                          () => this.state.block?.record?.dataHash || '-'
                        ),
                      },
                    }}
                    strong={false}
                    style={{ fontSize: '', width: '300px' }}
                  >
                    {__$$eval(() => this.state.block?.record?.dataHash || '-')}
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
                    ellipsis={{
                      tooltip: {
                        _unsafe_MixedSetter_title_select: 'VariableSetter',
                        title: __$$eval(
                          () => this.state.block?.record?.preBlockHash || '-'
                        ),
                      },
                    }}
                    strong={false}
                    style={{ fontSize: '', width: '300px' }}
                  >
                    {__$$eval(
                      () => this.state.block?.record?.preBlockHash || '-'
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
                  {__$$eval(() => this.state.block?.record?.network || '-')}
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
                  {__$$eval(() => this.state.block?.record?.blockNumber || '-')}
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
                    () => this.state.block?.record?.createdAt * 1000
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
                  {__$$eval(() => this.state.block?.record?.txCount || '-')}
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
                  ellipsis={{
                    tooltip: {
                      _unsafe_MixedSetter_title_select: 'VariableSetter',
                      title: __$$eval(
                        () => this.state.block?.record?.blockHash || '-'
                      ),
                    },
                  }}
                  strong={false}
                  style={{ fontSize: '', width: '300px' }}
                >
                  {__$$eval(() => this.state.block?.record?.blockHash || '-')}
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
                  ellipsis={{
                    tooltip: {
                      _unsafe_MixedSetter_title_select: 'VariableSetter',
                      title: __$$eval(
                        () => this.state.block?.record?.dataHash || '-'
                      ),
                    },
                  }}
                  strong={false}
                  style={{ fontSize: '', width: '300px' }}
                >
                  {__$$eval(() => this.state.block?.record?.dataHash || '-')}
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
                  ellipsis={{
                    tooltip: {
                      _unsafe_MixedSetter_title_select: 'VariableSetter',
                      title: __$$eval(
                        () => this.state.block?.record?.preBlockHash || '-'
                      ),
                    },
                  }}
                  strong={false}
                  style={{ fontSize: '', width: '300px' }}
                >
                  {__$$eval(
                    () => this.state.block?.record?.preBlockHash || '-'
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
                    style={{ fontSize: '', width: '270px' }}
                  >
                    {__$$eval(() => this.state.transaction?.record?.id || '-')}
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
                        this.state.transaction?.record?.validationCode + '' ||
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
                    copyable={false}
                    disabled={false}
                    ellipsis={{
                      expandable: true,
                      rows: 4,
                      tooltip: {
                        _unsafe_MixedSetter_title_select: 'VariableSetter',
                        title: __$$eval(
                          () =>
                            this.utils.decodeBase64(
                              this.state.transaction?.record?.Payload || ''
                            ) || '-'
                        ),
                      },
                    }}
                    strong={false}
                    style={{ fontSize: '', width: '270px' }}
                  >
                    {__$$eval(
                      () =>
                        this.utils.decodeBase64(
                          this.state.transaction?.record?.payload || ''
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
                      () => this.state.transaction?.record?.creator || '-'
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
                      () => this.state.transaction?.record?.chaincodeId || '-'
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
                      () => this.state.transaction?.record?.type || '-'
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
                        this.state.transaction?.record?.createdAt &&
                        this.state.transaction.record.createdAt * 1000
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
                  style={{ fontSize: '', width: '270px' }}
                >
                  {__$$eval(() => this.state.transaction?.record?.id || '-')}
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
                      this.state.transaction?.record?.validationCode + '' || '-'
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
                  copyable={false}
                  disabled={false}
                  ellipsis={{
                    expandable: true,
                    rows: 4,
                    tooltip: {
                      _unsafe_MixedSetter_title_select: 'VariableSetter',
                      title: __$$eval(
                        () =>
                          this.utils.decodeBase64(
                            this.state.transaction?.record?.payload || ''
                          ) || '-'
                      ),
                    },
                  }}
                  strong={false}
                  style={{ fontSize: '', width: '270px' }}
                >
                  {__$$eval(
                    () =>
                      this.utils.decodeBase64(
                        this.state.transaction?.record?.payload || ''
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
                    () => this.state.transaction?.record?.creator || '-'
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
                    () => this.state.transaction?.record?.chaincodeId || '-'
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
                  {__$$eval(() => this.state.transaction?.record?.type || '-')}
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
                      this.state.transaction?.record?.createdAt &&
                      this.state.transaction.record.createdAt * 1000
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
              activeKey={null}
              defaultActiveKey="overview"
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
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHXmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTAzLTI5VDEwOjE2OjAyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAzLTI5VDEwOjE2OjAyKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wMy0yOVQxMDoxNjowMiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NzMxYTFiMC1jYmQxLTQxNTQtYTEwMC0xODA3YTQ5NmU3OGYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNThiMjM0YS1kODE4LTdlNDMtOWVlMS04ZjU1YzQ5YTdlMzEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NTI5ZWZhOS1iNzY2LTQ3YWYtODNmMy00ODYwYzRjYmZjOWEiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NTI5ZWZhOS1iNzY2LTQ3YWYtODNmMy00ODYwYzRjYmZjOWEiIHN0RXZ0OndoZW49IjIwMjMtMDMtMjlUMTA6MTY6MDIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTczMWExYjAtY2JkMS00MTU0LWExMDAtMTgwN2E0OTZlNzhmIiBzdEV2dDp3aGVuPSIyMDIzLTAzLTI5VDEwOjE2OjAyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTUyOWVmYTktYjc2Ni00N2FmLTgzZjMtNDg2MGM0Y2JmYzlhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1MjllZmE5LWI3NjYtNDdhZi04M2YzLTQ4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"
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
                                        {__$$eval(
                                          () =>
                                            this.state?.overview?.data
                                              ?.blockNumber || '0'
                                        )}
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
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHkWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAzLTI5VDEwOjIwOjQwKzA4OjAwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMy0yOVQxMDoyMDo0MCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wMy0yOVQxMDoyMDo0MCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiYzNlYTBhZi1mNzJiLTQxZTktYjY2MS0wZWYxOTBiNTc1YjgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4YmQ5MWMwYy0yYTY0LWIwNDktOGE1YS1kYzUzNGUxY2Q2MjciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYzcwNDMyZC02N2Y3LTQ3MTItYWJlNy0wMjczYTY1ZjgwNWIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkYzcwNDMyZC02N2Y3LTQ3MTItYWJlNy0wMjczYTY1ZjgwNWIiIHN0RXZ0OndoZW49IjIwMjMtMDMtMjlUMTA6MjA6NDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmMzZWEwYWYtZjcyYi00MWU5LWI2NjEtMGVmMTkwYjU3NWI4IiBzdEV2dDp3aGVuPSIyMDIzLTAzLTI5VDEwOjIwOjQwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGM3MDQzMmQtNjdmNy00NzEyLWFiZTctMDI3M2E2NWY4MDViIiBz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"
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
                                        {__$$eval(
                                          () =>
                                            this.state?.overview?.data
                                              ?.txCount || '0'
                                        )}
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
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHkWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAzLTI5VDEwOjIxOjI4KzA4OjAwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMy0yOVQxMDoyMToyOCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wMy0yOVQxMDoyMToyOCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMWM5N2Q2Ni04NmVlLTQ5MzgtODQyMy1kZmE2MmI2NTgxZTAiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplODhmNzg1Ni1lMzI5LTQ5NDEtOWI3Yi01OGVhMjI4ZjcxNWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNzE4ZmM3My1kODRlLTQ1MTAtOGJhMS1jZGU4MzVkODVlN2IiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNzE4ZmM3My1kODRlLTQ1MTAtOGJhMS1jZGU4MzVkODVlN2IiIHN0RXZ0OndoZW49IjIwMjMtMDMtMjlUMTA6MjE6MjgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDFjOTdkNjYtODZlZS00OTM4LTg0MjMtZGZhNjJiNjU4MWUwIiBzdEV2dDp3aGVuPSIyMDIzLTAzLTI5VDEwOjIxOjI4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjcxOGZjNzMtZDg0ZS00NTEwLThiYTEtY2RlODM1ZDg1ZTdiIiBz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"
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
                                        {__$$eval(
                                          () =>
                                            this.state.myChannels?.find(
                                              (item) =>
                                                this.state.network ===
                                                item.value
                                            )?.peers?.length || '0'
                                        )}
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
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHXmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTAzLTI5VDEwOjIxOjE4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAzLTI5VDEwOjIxOjE4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wMy0yOVQxMDoyMToxOCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMzhhMjgzMC03Mjk3LTRmYjItODk3MC1kZjRmNzVmMDg3MWEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplZTMyZGMyZC1lZTA1LWY4NDctOTJlMy1jNGIwNmY4MmZiZDkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNWZhZWViNy1hZWZmLTRiYjgtYWY1Yi02Nzg2MGY3ZjU3NjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNWZhZWViNy1hZWZmLTRiYjgtYWY1Yi02Nzg2MGY3ZjU3NjMiIHN0RXZ0OndoZW49IjIwMjMtMDMtMjlUMTA6MjE6MTgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDM4YTI4MzAtNzI5Ny00ZmIyLTg5NzAtZGY0Zjc1ZjA4NzFhIiBzdEV2dDp3aGVuPSIyMDIzLTAzLTI5VDEwOjIxOjE4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjVmYWVlYjctYWVmZi00YmI4LWFmNWItNjc4NjBmN2Y1NzYzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY1ZmFlZWI3LWFlZmYtNGJiOC1hZjViLTY3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"
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
                                        {__$$eval(
                                          () =>
                                            this.state.myChannels?.find(
                                              (item) =>
                                                this.state.network ===
                                                item.value
                                            )?.chaincode?.length || '0'
                                        )}
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
                                  style={{ height: '339px' }}
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
                                            'i18n-fdpwjf9q'
                                          ) /* 组织交易占比 */
                                        }
                                      </Typography.Title>
                                    </Col>
                                    <Col __component_name="Col" span={24}>
                                      {!!__$$eval(
                                        () =>
                                          this.state.overview?.transactionsCount
                                            ?.length > 0
                                      ) && (
                                        <Spin
                                          __component_name="Spin"
                                          ref={this._refsManager.linkRef(
                                            'spin-1473bf67'
                                          )}
                                          spinning={__$$eval(
                                            () => this.state.overview.loading
                                          )}
                                        >
                                          <PieChart
                                            __component_name="PieChart"
                                            angleField="angleField"
                                            customerLegend={{
                                              formatter: function () {
                                                return this.formateTransactionsCount.apply(
                                                  this,
                                                  Array.prototype.slice
                                                    .call(arguments)
                                                    .concat([])
                                                );
                                              }.bind(this),
                                              max: 5,
                                              popoverWidth: '160px',
                                              width: '160px',
                                            }}
                                            data={__$$eval(
                                              () =>
                                                this.state.overview
                                                  ?.transactionsCount || []
                                            )}
                                            height={250}
                                            ref={this._refsManager.linkRef(
                                              'piechart-18ab37f8'
                                            )}
                                            seriesField="seriesField"
                                            title=" "
                                            tools={[]}
                                          />
                                        </Spin>
                                      )}
                                    </Col>
                                  </Row>
                                  {!!__$$eval(
                                    () =>
                                      !(
                                        this.state.overview?.transactionsCount
                                          ?.length > 0
                                      )
                                  ) && (
                                    <Spin
                                      __component_name="Spin"
                                      ref={this._refsManager.linkRef(
                                        'spin-ea6d42ab'
                                      )}
                                      spinning={__$$eval(
                                        () =>
                                          this.state.overview.loading || false
                                      )}
                                    >
                                      <Empty
                                        __component_name="Empty"
                                        ref={this._refsManager.linkRef(
                                          'empty-6d3c2fb4'
                                        )}
                                        style={{ marginTop: '40px' }}
                                      />
                                    </Spin>
                                  )}
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
                                  style={{ height: '339px' }}
                                  type="default"
                                >
                                  <Tabs
                                    __component_name="Tabs"
                                    destroyInactiveTabPane="true"
                                    items={[
                                      {
                                        children: (
                                          <Spin
                                            __component_name="Spin"
                                            spinning={__$$eval(
                                              () =>
                                                this.state.overview.loading ||
                                                false
                                            )}
                                          >
                                            <LineChart
                                              __component_name="LineChart"
                                              data={__$$eval(
                                                () =>
                                                  this.state.overview?.blockH ||
                                                  []
                                              )}
                                              height={232}
                                              legend={{ visible: false }}
                                              seriesField="seriesField"
                                              slider={false}
                                              title=" "
                                              tools={[]}
                                              xAxisLastTickVisible={false}
                                              xField="xField"
                                              xFieldTimeFormat="HH:mm"
                                              yField="yField"
                                            />
                                          </Spin>
                                        ),
                                        key: 'tab-item-1',
                                        label:
                                          this.i18n(
                                            'i18n-7uvsyqsq'
                                          ) /* 区块/小时 */,
                                      },
                                      {
                                        children: (
                                          <Spin
                                            __component_name="Spin"
                                            spinning={__$$eval(
                                              () => this.state.overview.loading
                                            )}
                                          >
                                            <LineChart
                                              __component_name="LineChart"
                                              data={__$$eval(
                                                () =>
                                                  this.state.overview?.blockM ||
                                                  []
                                              )}
                                              height={232}
                                              legend={{ visible: false }}
                                              seriesField="seriesField"
                                              slider={false}
                                              title=" "
                                              tools={[]}
                                              xField="xField"
                                              xFieldTimeFormat="HH:mm"
                                              yField="yField"
                                            />
                                          </Spin>
                                        ),
                                        key: 'tab-item-2',
                                        label:
                                          this.i18n(
                                            'i18n-ivlw5o59'
                                          ) /* 区块/分钟 */,
                                      },
                                      {
                                        children: (
                                          <Spin
                                            __component_name="Spin"
                                            spinning={__$$eval(
                                              () => this.state.overview.loading
                                            )}
                                          >
                                            <LineChart
                                              __component_name="LineChart"
                                              data={__$$eval(
                                                () =>
                                                  this.state.overview
                                                    ?.transactionH || []
                                              )}
                                              height={232}
                                              legend={{ visible: false }}
                                              seriesField="seriesField"
                                              slider={false}
                                              tools={[]}
                                              xField="xField"
                                              xFieldTimeFormat="HH:mm"
                                              yField="yField"
                                            />
                                          </Spin>
                                        ),
                                        key: 'lz1hkbje8t',
                                        label:
                                          this.i18n(
                                            'i18n-09e7coyp'
                                          ) /* 交易/小时 */,
                                      },
                                      {
                                        children: (
                                          <Spin
                                            __component_name="Spin"
                                            spinning={__$$eval(
                                              () => this.state.overview.loading
                                            )}
                                          >
                                            <LineChart
                                              __component_name="LineChart"
                                              data={__$$eval(
                                                () =>
                                                  this.state.overview
                                                    ?.transactionM || []
                                              )}
                                              height={232}
                                              legend={{ visible: false }}
                                              seriesField="seriesField"
                                              slider={false}
                                              title=" "
                                              tools={[]}
                                              xField="xField"
                                              xFieldTimeFormat="HH:mm"
                                              yField="yField"
                                            />
                                          </Spin>
                                        ),
                                        key: 'fnsk5omcp4',
                                        label:
                                          this.i18n(
                                            'i18n-sv4oi1v8'
                                          ) /* 交易/分钟 */,
                                      },
                                    ]}
                                    size="large"
                                    style={{ marginTop: '-12px' }}
                                    tabBarGutter={14}
                                    tabPosition="top"
                                    type="line"
                                  />
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
                                            dataIndex: 'blockNumber',
                                            key: 'blockNumber',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Text
                                                  __component_name="Typography.Text"
                                                  __events={{
                                                    eventDataList: [
                                                      {
                                                        name: 'onClick',
                                                        paramStr:
                                                          '{\n \t "record": this.record \n}',
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
                                                  style={{
                                                    color: '',
                                                    fontSize: '',
                                                  }}
                                                  type="primary"
                                                >
                                                  {__$$eval(
                                                    () =>
                                                      record?.blockNumber || '-'
                                                  )}
                                                </Typography.Text>
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
                                            dataIndex: 'blockHash',
                                            key: 'blockHash',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Text
                                                  __component_name="Typography.Text"
                                                  disabled={false}
                                                  ellipsis={{
                                                    tooltip: {
                                                      _unsafe_MixedSetter_title_select:
                                                        'VariableSetter',
                                                      title: __$$eval(
                                                        () =>
                                                          record?.blockHash ||
                                                          '-'
                                                      ),
                                                    },
                                                  }}
                                                  strong={false}
                                                  style={{
                                                    fontSize: '',
                                                    width: '100px',
                                                  }}
                                                >
                                                  {__$$eval(
                                                    () =>
                                                      record?.blockHash || '-'
                                                  )}
                                                </Typography.Text>
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                            title:
                                              this.i18n(
                                                'i18n-9a9nh7iu'
                                              ) /* 区块哈希 */,
                                          },
                                          {
                                            dataIndex: 'txCount',
                                            key: 'txCount',
                                            title:
                                              this.i18n(
                                                'i18n-1pf627eu'
                                              ) /* 交易数 */,
                                          },
                                          {
                                            dataIndex: 'createdAt',
                                            key: 'createdAt',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Time
                                                  __component_name="Typography.Time"
                                                  format=""
                                                  relativeTime={false}
                                                  time={__$$eval(
                                                    () =>
                                                      record?.createdAt &&
                                                      record?.createdAt * 1000
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
                                        loading={__$$eval(
                                          () => this.state.block?.loading
                                        )}
                                        pagination={false}
                                        rowKey="blockNumber"
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
                                            dataIndex: 'id',
                                            key: 'id',
                                            render: (text, record, index) =>
                                              ((__$$context) => (
                                                <Typography.Text
                                                  __component_name="Typography.Text"
                                                  disabled={false}
                                                  ellipsis={{
                                                    tooltip: {
                                                      _unsafe_MixedSetter_title_select:
                                                        'VariableSetter',
                                                      title: __$$eval(
                                                        () => record?.id || '-'
                                                      ),
                                                    },
                                                  }}
                                                  strong={false}
                                                  style={{
                                                    fontSize: '',
                                                    width: '100px',
                                                  }}
                                                >
                                                  {__$$eval(
                                                    () => record?.id || '-'
                                                  )}
                                                </Typography.Text>
                                              ))(
                                                __$$createChildContext(
                                                  __$$context,
                                                  { text, record, index }
                                                )
                                              ),
                                            title:
                                              this.i18n(
                                                'i18n-dnzjf5qx'
                                              ) /* 交易哈希 */,
                                          },
                                          {
                                            dataIndex: 'blockNumber',
                                            key: 'blockNumber',
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
                                                      record?.createdAt &&
                                                      record?.createdAt * 1000
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
                                        loading={__$$eval(
                                          () => this.state.transaction?.loading
                                        )}
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
                            dataIndex: 'blockNumber',
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
                                  {__$$eval(() => record?.network || '-')}
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
                            dataIndex: 'txCount',
                            key: 'txCount',
                            title: this.i18n('i18n-1pf627eu') /* 交易数 */,
                          },
                          {
                            dataIndex: 'blockHash',
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
                                  ellipsis={{
                                    tooltip: {
                                      _unsafe_MixedSetter_title_select:
                                        'VariableSetter',
                                      title: __$$eval(
                                        () => record?.blockHash || '-'
                                      ),
                                    },
                                  }}
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
                                  style={{
                                    color: '',
                                    fontSize: '',
                                    width: '100px',
                                  }}
                                  type="primary"
                                >
                                  {__$$eval(() => record?.blockHash || '-')}
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
                            dataIndex: 'previoudBlockHash',
                            key: 'PrevioudBlockHash',
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
                                  ellipsis={{
                                    tooltip: {
                                      _unsafe_MixedSetter_title_select:
                                        'VariableSetter',
                                      title: __$$eval(
                                        () => record?.preBlockHash || '-'
                                      ),
                                    },
                                  }}
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
                                  style={{
                                    color: '',
                                    fontSize: '',
                                    width: '100px',
                                  }}
                                >
                                  {__$$eval(() => record?.preBlockHash || '-')}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-nk62m3xg') /* 上一个 hash */,
                          },
                          {
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(
                                    () =>
                                      record?.createdAt &&
                                      record?.createdAt * 1000
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
                            dataIndex: 'blockSize',
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
                                  {__$$eval(
                                    () =>
                                      parseInt(
                                        (record?.blockSize || 0) / 1024
                                      ) || '-'
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
                            dataIndex: 'blockNumber',
                            key: 'blockNumber',
                            title: this.i18n('i18n-4dh77hfc') /* 区块高度 */,
                          },
                          {
                            dataIndex: 'creator',
                            key: 'Creator',
                            title: this.i18n('i18n-wctt13ld2x') /* 发起者 */,
                          },
                          {
                            dataIndex: 'network',
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
                                  {__$$eval(() => record?.network || '-')}
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
                                  ellipsis={{
                                    tooltip: {
                                      _unsafe_MixedSetter_title_select:
                                        'VariableSetter',
                                      title: __$$eval(() => record?.id || '-'),
                                    },
                                  }}
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
                                  style={{
                                    color: '#FE8F35',
                                    fontSize: '',
                                    width: '100px',
                                  }}
                                >
                                  {__$$eval(() => record?.id || '-')}
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
                            dataIndex: 'type',
                            key: 'Type',
                            title: this.i18n('i18n-9yrquy3v2y7') /* 类型 */,
                          },
                          {
                            dataIndex: 'chaincodeId',
                            key: 'ChaincodeID',
                            title: this.i18n('i18n-5rnqqm9p') /* 合约 */,
                          },
                          {
                            dataIndex: 'createdAt',
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
                                      record?.createdAt &&
                                      record?.createdAt * 1000
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

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/browser' }, location.pathname);
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
        <Browser$$Page {...dataProps} self={self} appHelper={appHelper} />
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
