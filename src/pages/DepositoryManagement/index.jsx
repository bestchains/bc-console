// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Typography,
  Space,
  Input,
  Button,
  Icon,
  DatePicker,
  Card,
  Table,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createAxiosHandler as __$$createAxiosRequestHandler } from '@yunti/lowcode-datasource-axios-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DepositoryManagement$$Page extends React.Component {
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

    __$$i18n._inject2(this);

    this.state = {
      isOpenModal: false,
      modalType: 'create',
      filter: 'ALL',
      searchValue: undefined,
      searchKey: 'name',
      size: 10,
      current: 1,
      list: [],
      loading: false,
    };
  }

  $ = () => null;

  $$ = () => [];

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: 'getDepositoryList',
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
              uri: `${this.constants?.BC_SAAS_API_URL}/basic/depositories`,
            };
          }.bind(_this),
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {}

  formatTimeParams(v) {
    return v ? parseInt(new Date(v).getTime() / 1000) : undefined;
  }

  getDepositoryList() {
    const time = this.state['searchValue-time'];
    this.setState({
      loading: true,
    });
    this.dataSourceMap.getDepositoryList
      .load({
        from: (this.state.current - 1) * this.state.size,
        size: this.state.size,
        startTime: this.formatTimeParams(time?.[0]),
        endTime: this.formatTimeParams(time?.[1]),
        name: this.state['searchValue-name'],
        contentName: this.state['searchValue-filename'],
        kid: this.state['searchValue-number'],
      })
      .then((res) => {
        this.setState({
          list: res.data || [],
          total: res?.count || 0,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          list: [],
          total: 0,
          loading: false,
        });
      });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
      current: 1,
    });
  }

  handleSearchValueChange(e, { searchKey }) {
    this.setState({
      [`temp-searchValue-` + searchKey]: e.target.value,
    });
  }

  handleTimeValueChange(v) {
    this.setState({
      [`temp-searchValue-time`]: v,
    });
  }

  handleSearch(v) {
    const search = {
      current: 1,
    };
    Object.keys(this.state).forEach((key) => {
      if (key.includes('temp-searchValue')) {
        search[key.slice(5)] = this.state[key];
      }
    });
    this.setState(search, this.getDepositoryList);
  }

  handleReset(v) {
    const reset = {
      current: 1,
    };
    Object.keys(this.state).forEach((key) => {
      if (key.startsWith('searchValue')) {
        reset[key] = undefined;
        reset[`temp-` + key] = undefined;
      }
    });
    this.setState(reset, this.getDepositoryList);
  }

  handlePaginationChange(c, s) {
    this.setState(
      {
        size: s,
        current: c,
      },
      this.getDepositoryList
    );
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState(
      {
        pagination,
        filters,
        sorter,
      },
      this.getDepositoryList
    );
  }

  getType(id, payload) {
    if (payload?.id === 'Error') {
      return {
        children: this.i18n('i18n-xtno2l9qqog'),
        icon: 'CloseCircleFilled',
        tooltip: payload.tooltip,
        id,
        type: 'error',
      };
    }
    return {
      children: this.i18n('i18n-fifkprltibf'),
      icon: 'CheckCircleFilled',
      id,
      type: 'success',
    };
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  validatorName(value) {
    if (
      this.props?.useGetOrganizations?.data?.organizations?.some(
        (item) => item.name === value
      )
    ) {
      return this.i18n('i18n-4y6fvhua');
    }
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getDepositoryList();
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
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this.i18n('i18n-yvr76ee9') /* 存证管理 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={8}>
                <Space align="center" direction="horizontal">
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {this.i18n('i18n-bdz6vmls') /* 存证名称 */}
                  </Typography.Text>
                  <Input.Search
                    __component_name="Input.Search"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          paramStr: '{\n \t "searchKey": "name" \n}',
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
                      return this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            searchKey: 'name',
                          },
                        ])
                      );
                    }.bind(this)}
                    placeholder={
                      this.i18n('i18n-7ngnbed5') /* 请输入存证名称 */
                    }
                    prefix=""
                    style={{ width: '' }}
                    value={__$$eval(() => this.state[`temp-searchValue-name`])}
                  />
                </Space>
              </Col>
              <Col __component_name="Col" span={8}>
                <Space align="center" direction="horizontal">
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {this.i18n('i18n-9uie0y5g') /* 存证编号 */}
                  </Typography.Text>
                  <Input.Search
                    __component_name="Input.Search"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          paramStr: '{\n\t"searchKey": "number"\n}',
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
                      return this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            searchKey: 'number',
                          },
                        ])
                      );
                    }.bind(this)}
                    placeholder={
                      this.i18n('i18n-9owanicd') /* 请输入存证编号 */
                    }
                    prefix=""
                    style={{ width: '' }}
                    value={__$$eval(
                      () => this.state[`temp-searchValue-number`]
                    )}
                  />
                </Space>
              </Col>
              <Col __component_name="Col" span={8}>
                <Space align="center" direction="horizontal">
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {this.i18n('i18n-lzk2l232') /* 文件名称 */}
                  </Typography.Text>
                  <Input.Search
                    __component_name="Input.Search"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          paramStr: '{\n\t"searchKey": "filename"\n}',
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
                      return this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            searchKey: 'filename',
                          },
                        ])
                      );
                    }.bind(this)}
                    placeholder={
                      this.i18n('i18n-pzz3ko43') /* 请输入文件名称 */
                    }
                    prefix=""
                    style={{ width: '' }}
                    value={__$$eval(
                      () => this.state[`temp-searchValue-filename`]
                    )}
                  />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col">
                <Button
                  __component_name="Button"
                  __events={{
                    eventDataList: [],
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
                  href="/depository/management/create"
                  icon={
                    <Icon
                      __component_name="Icon"
                      size={12}
                      style={{ marginRight: 3 }}
                      type="PlusOutlined"
                    />
                  }
                  shape="default"
                  type="primary"
                >
                  {this.i18n('i18n-am198ty7') /* 新增存证 */}
                </Button>
              </Col>
              <Col __component_name="Col">
                <Space
                  __component_name="Space"
                  align="center"
                  direction="horizontal"
                  size={34}
                >
                  <Space align="center" direction="horizontal">
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {this.i18n('i18n-4wpuoyi3') /* 存证时间 */}
                    </Typography.Text>
                    <DatePicker.RangePicker
                      __component_name="DatePicker.RangePicker"
                      __events={{
                        eventDataList: [
                          {
                            name: 'onChange',
                            relatedEventName: 'handleTimeValueChange',
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
                        return this.handleTimeValueChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      showTime={false}
                      value={__$$eval(
                        () => this.state[`temp-searchValue-time`]
                      )}
                    />
                  </Space>
                  <Space
                    align="center"
                    direction="horizontal"
                    size={12}
                    split=""
                  >
                    <Button
                      __component_name="Button"
                      __events={{
                        eventDataList: [
                          {
                            name: 'onClick',
                            relatedEventName: 'handleSearch',
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
                        return this.handleSearch.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
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
                            relatedEventName: 'handleReset',
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
                        return this.handleReset.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      {this.i18n('i18n-ufdmbyh3') /* 重置 */}
                    </Button>
                  </Space>
                </Space>
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
              type="default"
            >
              <Table
                __component_name="Table"
                __events={{
                  eventDataList: [
                    {
                      name: 'pagination.onChange',
                      relatedEventName: 'handlePaginationChange',
                      type: 'componentEvent',
                    },
                    {
                      name: 'pagination.onShowSizeChange',
                      relatedEventName: 'handlePaginationChange',
                      type: 'componentEvent',
                    },
                    {
                      name: 'onChange',
                      relatedEventName: 'handleTableChange',
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
                    dataIndex: 'kid',
                    ellipsis: { showTitle: true },
                    key: 'kid',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          copyable={{
                            _unsafe_MixedSetter_text_select: 'VariableSetter',
                            text: __$$eval(() => text),
                          }}
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                        >
                          {__$$eval(() => text || '-')}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-9uie0y5g') /* 存证编号 */,
                  },
                  {
                    dataIndex: 'name',
                    key: 'name',
                    title: this.i18n('i18n-bdz6vmls') /* 存证名称 */,
                  },
                  {
                    dataIndex: 'contentType',
                    key: 'contentType',
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
                            text === 'file' ? '文件存证' : '文本存证'
                          )}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-cke99h2r') /* 存证类型 */,
                  },
                  {
                    dataIndex: 'contentName',
                    ellipsis: { showTitle: true },
                    key: 'contentName',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          copyable={{
                            _unsafe_MixedSetter_text_select: 'VariableSetter',
                            text: __$$eval(() => text),
                          }}
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                        >
                          {__$$eval(() => text || '-')}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-lzk2l232') /* 文件名称 */,
                  },
                  {
                    _unsafe_MixedSetter_sorter_select: 'BoolSetter',
                    dataIndex: 'trustedTimestamp',
                    key: 'creationTimestamp',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={true}
                          time={__$$eval(() =>
                            text ? text * 1000 : undefined
                          )}
                        />
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    sorter: false,
                    title: this.i18n('i18n-4wpuoyi3') /* 存证时间 */,
                  },
                  {
                    dataIndex: 'op',
                    key: 'op',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Space
                          __component_name="Space"
                          align="center"
                          direction="horizontal"
                          size={0}
                        >
                          <Button
                            __component_name="Button"
                            block={false}
                            danger={false}
                            disabled={false}
                            ghost={false}
                            href={__$$eval(
                              () =>
                                '/depository/management/detail/' + record.kid
                            )}
                            icon=""
                            shape="default"
                            type="link"
                          >
                            {this.i18n('i18n-m6n5fnxybu') /* - */}
                          </Button>
                          <Button
                            __component_name="Button"
                            block={false}
                            danger={false}
                            disabled={false}
                            ghost={false}
                            href=""
                            icon=""
                            shape="default"
                            type="link"
                          >
                            {this.i18n('i18n-53sb33cw') /* - */}
                          </Button>
                        </Space>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                    width: 180,
                  },
                ]}
                dataSource={__$$eval(() => this.state.list || [])}
                loading={__$$eval(() => this.state.loading)}
                onChange={function () {
                  this.handleTableChange.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                pagination={{
                  current: __$$eval(() => this.state.current),
                  onChange: function () {
                    this.handlePaginationChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  onShowSizeChange: function () {
                    this.handlePaginationChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  pageSize: __$$eval(() => this.state.size),
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
                  total: __$$eval(() => this.state.total || 0),
                }}
                rowKey="index"
                scroll={{ scrollToFirstRowOnChange: true }}
                showHeader={true}
                size="default"
                style={{ marginTop: '-20px' }}
              />
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
    { path: '/depository/management' },
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
        <DepositoryManagement$$Page
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
