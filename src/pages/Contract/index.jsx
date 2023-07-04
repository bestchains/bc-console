// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Space,
  Typography,
  FormilyForm,
  FormilySelect,
  Row,
  Col,
  Radio,
  Input,
  Button,
  List,
  Card,
  Tag,
} from '@tenx-ui/materials';

import { AntdIconReloadOutlined } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class Contract$$Page extends React.Component {
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

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      current: 1,
      filter: 'ALL',
      isOpenModal: false,
      modalLoading: false,
      modalType: 'used',
      record: {},
      searchKey: 'name',
      searchValue: undefined,
      size: 10,
      usedModalData: {},
    };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  async confirmUsedConfirmModal() {
    this.setState({
      modalLoading: true,
    });
    try {
      await this.props.appHelper.utils.bff.importContract({
        name: this.state.record?.name,
        network: this.state.usedModalData?.network,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-m1le7bb8'),
      });
      this.props.useGetContracts.mutate();
      this.setState({
        modalLoading: false,
      });
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-97y1zdgo'),
        errors: error?.response?.errors,
      });
      this.setState({
        modalLoading: false,
      });
    }
  }

  confirmUsedModal() {
    const form = this.$('formily_used')?.formRef?.current?.form;
    form.submit(async (v) => {
      this.setState({
        usedModalData: v,
      });
      this.openUsedConfirmModal();
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
      current: 1,
    });
  }

  handlePaginationChange(c, s) {
    this.setState({
      size: s,
      current: c,
    });
  }

  handleRefresh(event) {
    this.props.useGetContracts.mutate();
  }

  handleSearchValueChange(e) {
    this.setState({
      searchValue: e.target.value,
      current: 1,
    });
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
    });
  }

  openUsedConfirmModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'usedconfirm',
    });
  }

  openUsedModal(_, payload) {
    this.setState({
      isOpenModal: true,
      modalType: 'used',
      record: payload?.record || this.state.record,
    });
  }

  componentDidMount() {}

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
              {
                name: 'onOk',
                relatedEventName: 'confirmUsedConfirmModal',
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
                disabled: true,
                name: 'onOk',
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={__$$eval(() => this.state.modalLoading)}
          destroyOnClose={true}
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
          onOk={function () {
            return this.confirmUsedConfirmModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal && this.state.modalType === 'usedconfirm'
          )}
          title={this.i18n('i18n-gh0v3bik') /* 合约使用 */}
        >
          <Space align="center" direction="horizontal" size={0}>
            <Typography.Text
              __component_name="Typography.Text"
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-pthjgtxg') /* 是否确定将合约商店中的” */}
            </Typography.Text>
            <Typography.Text
              __component_name="Typography.Text"
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {__$$eval(() => this.state.record?.name || '-')}
            </Typography.Text>
            <Typography.Text
              __component_name="Typography.Text"
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-p7sym7eo') /* ”添加到 */}
            </Typography.Text>
            <Typography.Text
              __component_name="Typography.Text"
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {__$$eval(() => this.state.usedModalData?.network || '-')}
            </Typography.Text>
            <Typography.Text
              __component_name="Typography.Text"
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-rt6and5m') /* 中 */}
            </Typography.Text>
          </Space>
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
              {
                name: 'onOk',
                relatedEventName: 'confirmUsedModal',
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
                disabled: true,
                name: 'onOk',
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={__$$eval(() => this.state.modalLoading)}
          destroyOnClose={true}
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
          onOk={function () {
            return this.confirmUsedModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === 'used'
          )}
          title={this.i18n('i18n-gh0v3bik') /* 合约使用 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 6,
              layout: 'horizontal',
              wrapperCol: 18,
            }}
            ref={this._refsManager.linkRef('formily_used')}
          >
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  _sdkSwrGetFunc: { params: [] },
                  _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                  allowClear: false,
                  disabled: false,
                  enum: __$$eval(() =>
                    this.props.useGetNetworks?.data?.networks?.map((item) => ({
                      label: item.name,
                      value: item.name,
                    }))
                  ),
                  placeholder: this.i18n('i18n-wrzfitnj') /* 请选择网络 */,
                },
              }}
              fieldProps={{
                name: 'network',
                title: this.i18n('i18n-cxg6rjg3') /* 请选择使用的网络 */,
                'x-validator': [
                  {
                    children: '未知',
                    id: 'disabled',
                    message: this.i18n('i18n-wrzfitnj') /* 请选择网络 */,
                    required: true,
                    type: 'disabled',
                  },
                ],
              }}
            />
          </FormilyForm>
        </Modal>
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
              {this.i18n('i18n-b7z8763j') /* 合约商店 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col">
                <Space
                  __component_name="Space"
                  align="center"
                  direction="horizontal"
                >
                  <Radio.Group
                    __component_name="Radio.Group"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onChange',
                          relatedEventName: 'handleFilterChange',
                          type: 'componentEvent',
                        },
                      ],
                      eventList: [
                        {
                          disabled: true,
                          name: 'onChange',
                          template:
                            "onChange(event,${extParams}){\n// 选项变化时的回调函数\nconsole.log('onChange',event);}",
                        },
                      ],
                    }}
                    buttonSpace={true}
                    buttonStyle="solid"
                    disabled={false}
                    onChange={function () {
                      this.handleFilterChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    optionType="button"
                    options={[
                      {
                        label: this.i18n('i18n-w8mwq8gtr08') /* 全部 */,
                        value: 'ALL',
                      },
                    ]}
                    size="middle"
                    value={__$$eval(() => this.state.filter)}
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
                      this.i18n('i18n-b3d2mz7i') /* 请输入合约名称 */
                    }
                  />
                  <Button
                    __component_name="Button"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onClick',
                          relatedEventName: 'handleRefresh',
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
                    icon={
                      <AntdIconReloadOutlined
                        __component_name="AntdIconReloadOutlined"
                        style={{ marginRight: '3px' }}
                      />
                    }
                    onClick={function () {
                      this.handleRefresh.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    shape="default"
                  >
                    {this.i18n('i18n-71sxvlf0d98') /* 刷新 */}
                  </Button>
                </Space>
              </Col>
              <Col __component_name="Col" />
            </Row>
          </Col>
          <Col __component_name="Col" span={24}>
            <List
              __component_name="List"
              bordered={false}
              dataSource={__$$eval(
                () =>
                  this.props.useGetContracts?.data?.contracts?.filter(
                    (item) => {
                      return this.state.searchValue
                        ? item.name?.includes(this.state.searchValue)
                        : true;
                    }
                  ) || []
              )}
              grid={{
                column: 3,
                gutter: 20,
                lg: 3,
                md: 3,
                sm: 3,
                xl: 4,
                xs: 3,
                xxl: 4,
              }}
              gridEnable={true}
              itemLayout="horizontal"
              loading={__$$eval(() => this.props.useGetContracts?.loading)}
              pagination={false}
              renderItem={(item) =>
                ((__$$context) => (
                  <List.Item __component_name="List.Item">
                    <Card
                      __component_name="Card"
                      actions={[
                        <Row
                          __component_name="Row"
                          justify="space-between"
                          style={{ paddingLeft: '24px', paddingRight: '24px' }}
                          wrap={false}
                        >
                          <Col __component_name="Col">
                            <Space
                              align="center"
                              direction="horizontal"
                              size="middle"
                              split=""
                            >
                              <Button
                                __component_name="Button"
                                block={false}
                                danger={false}
                                disabled={false}
                                ghost={false}
                                href={__$$eval(() => `/contract/${item.name}`)}
                                icon=""
                                shape="default"
                                style={{
                                  height: '16px',
                                  paddingBottom: '0px',
                                  paddingLeft: '0px',
                                  paddingRight: '0px',
                                  paddingTop: '0px',
                                }}
                                target="_self"
                                type="link"
                              >
                                {this.i18n('i18n-m6n5fnxybu') /* 详情 */}
                              </Button>
                              <Typography.Text
                                __component_name="Typography.Text"
                                __events={{
                                  eventDataList: [
                                    {
                                      name: 'onClick',
                                      paramStr: '{\n \t "record":this.item \n}',
                                      relatedEventName: 'openUsedModal',
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
                                  return this.openUsedModal.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([
                                        {
                                          record: item,
                                        },
                                      ])
                                  );
                                }.bind(__$$context)}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="default"
                              >
                                {this.i18n('i18n-o6jrqfvs') /* 立即使用 */}
                              </Typography.Text>
                            </Space>
                          </Col>
                          <Col __component_name="Col">
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                              type="primary"
                            >
                              {__$$eval(() => item.version)}
                            </Typography.Text>
                          </Col>
                        </Row>,
                      ]}
                      bordered={false}
                      cover={
                        <Row
                          __component_name="Row"
                          gutter={[0, 0]}
                          h-gutter={0}
                          style={{
                            borderTopLeftRadius: '2px',
                            borderTopRightRadius: '2px',
                          }}
                          wrap={true}
                        >
                          <Col
                            __component_name="Col"
                            span={24}
                            style={{ color: '#ffffff' }}
                          >
                            <Row
                              __component_name="Row"
                              gutter={[0, 0]}
                              h-gutter={0}
                              style={{
                                backgroundImage:
                                  'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAB2CAIAAAB9Dg4UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHkWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA1LTEyVDExOjExOjEyKzA4OjAwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNS0xMlQxMToxMToxMiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNS0xMlQxMToxMToxMiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YzhmMDBiNi1hMDEzLTRlMmItOGE3ZC04YTRhYWM1MmUwNDYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZjMwZWMwOS1lNGEwLWRiNDktOWQ3Yy1hYTU1ZDJkMGYwODUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxYmI2YWI3Yy1lMWQ1LTQwMWMtODhkZS0yM2RjM2FkYmMzZjQiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxYmI2YWI3Yy1lMWQ1LTQwMWMtODhkZS0yM2RjM2FkYmMzZjQiIHN0RXZ0OndoZW49IjIwMjMtMDUtMTJUMTE6MTE6MTIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWM4ZjAwYjYtYTAxMy00ZTJiLThhN2QtOGE0YWFjNTJlMDQ2IiBzdEV2dDp3aGVuPSIyMDIzLTA1LTEyVDExOjExOjEyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWJiNmFiN2MtZTFkNS00MDFjLTg4ZGUtMjNkYzNhZGJjM2Y0IiBz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)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                              }}
                              wrap={true}
                            >
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{
                                  alignItems: 'flex-end',
                                  display: 'flex',
                                  height: '118px',
                                  paddingBottom: '15px',
                                  paddingLeft: '24px',
                                }}
                              >
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ color: '#ffffff', fontSize: '' }}
                                >
                                  {__$$eval(() => item.name)}
                                </Typography.Text>
                                {!!__$$eval(() => item.language) && (
                                  <Tag
                                    __component_name="Tag"
                                    closable={false}
                                    color="#fe8f35"
                                    ref={this._refsManager.linkRef(
                                      'tag-16d6bac6'
                                    )}
                                    style={{
                                      display: 'flex',
                                      position: 'absolute',
                                      right: '20px',
                                      top: '12px',
                                    }}
                                  >
                                    {__$$eval(() => item.language || '-')}
                                  </Tag>
                                )}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      }
                      hoverable={false}
                      loading={false}
                      size="default"
                      title=""
                      type="default"
                    >
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={false}
                        strong={false}
                        style={{ display: 'inline', fontSize: '' }}
                      >
                        {__$$eval(() => item.description || '-')}
                      </Typography.Text>
                    </Card>
                  </List.Item>
                ))(__$$createChildContext(__$$context, { item }))
              }
              rowKey="name"
              size="small"
              split={false}
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
  const match = matchPath({ path: '/contract' }, location.pathname);
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
      sdkInitFunc={{
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[
        {
          func: 'useGetContracts',
          params: undefined,
        },
        {
          func: 'useGetNetworks',
          params: undefined,
        },
      ]}
      render={(dataProps) => (
        <Contract$$Page {...dataProps} self={self} appHelper={appHelper} />
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
