// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Space,
  Typography,
  UnifiedLink,
  Row,
  Col,
  Button,
  Select,
  Card,
  Image,
  Descriptions,
  Table,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ContractDetail$$Page extends React.Component {
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

    __$$i18n._inject2(this);

    this.state = {
      current: 1,
      filter: 'ALL',
      isOpenModal: false,
      modalLoading: false,
      modalType: 'usedconfirm',
      network: undefined,
      searchKey: 'name',
      searchValue: undefined,
      size: 10,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {}

  changeNetwork(network) {
    this.setState({
      network,
    });
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  async confirmNoNetworkModal() {
    window.open('/bc/network/create');
  }

  async confirmUsedConfirmModal() {
    this.setState({
      modalLoading: true,
    });
    try {
      await this.props.appHelper.utils.bff.importContract({
        name: this.match?.params?.id,
        network: this.state.network,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-m1le7bb8'),
      });
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

  openNoNetworkModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'nonetwork',
    });
  }

  openUsedConfirmModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'usedconfirm',
    });
  }

  openUsedModal() {
    if (this.state.network) {
      this.openUsedConfirmModal();
      return;
    }
    this.openNoNetworkModal();
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
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
                relatedEventName: 'confirmNoNetworkModal',
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
            return this.confirmNoNetworkModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === 'nonetwork'
          )}
          title={this.i18n('i18n-gh0v3bik') /* 合约使用 */}
        >
          <Space align="center" direction="horizontal">
            <Typography.Text
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {
                this.i18n(
                  'i18n-lgzfwvga'
                ) /* 请选择网络，再使用合约，如没有网络，请 */
              }
            </Typography.Text>
            <UnifiedLink color="primary" target="_blank" to="/network/create">
              {this.i18n('i18n-kwbu3vyst6') /* 新建网络 */}
            </UnifiedLink>
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
              {__$$eval(
                () => this.props.useGetContract?.data?.contract?.name || '-'
              )}
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
              {__$$eval(() => this.state.network || '-')}
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
        <Row __component_name="Row" wrap={true}>
          <Col
            __component_name="Col"
            span={24}
            style={{ paddingBottom: '12px' }}
          >
            <Button.Back
              __component_name="Button.Back"
              title={this.i18n('i18n-3cf8mxcp') /* 合约详情 */}
              type="simple"
            />
          </Col>
          <Col __component_name="Col" span={24} style={{}}>
            <Space align="center" direction="horizontal" size="large">
              <Select
                __component_name="Select"
                __events={{
                  eventDataList: [
                    {
                      name: 'onChange',
                      relatedEventName: 'changeNetwork',
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
                allowClear={true}
                disabled={false}
                maxTagCount={0}
                maxTagTextLength={0}
                onChange={function () {
                  return this.changeNetwork.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                options={__$$eval(() =>
                  this.props.useGetNetworks?.data?.networks?.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))
                )}
                placeholder={this.i18n('i18n-cxg6rjg3') /* 请选择使用的网络 */}
                showSearch={true}
                style={{ width: 200 }}
              />
              <Button
                __component_name="Button"
                __events={{
                  eventDataList: [
                    {
                      name: 'onClick',
                      relatedEventName: 'openUsedModal',
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
                  return this.openUsedModal.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                shape="default"
                type="primary"
              >
                {this.i18n('i18n-o6jrqfvs') /* 立即使用 */}
              </Button>
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={__$$eval(() => this.props.useGetContract?.loading)}
              size="default"
              title={null}
              type="default"
            >
              <Row __component_name="Row" wrap={false}>
                <Col
                  __component_name="Col"
                  flex="70px"
                  style={{ paddingLeft: '0px' }}
                >
                  <Image
                    __component_name="Image"
                    fallback=""
                    height={70}
                    preview={false}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHkWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA1LTEyVDExOjEzOjQxKzA4OjAwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNS0xMlQxMToxMzo0MSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNS0xMlQxMToxMzo0MSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyZTg2MDhhNS00ZDAyLTQ4N2EtOGIwZC1iN2NkYWZhNGU2ZjYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNzY4NzkwZC01ODMxLWE2NGEtOWRhYS0zZmExNzk0ZTk0NjMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMWY2MjQ4OS05NTk0LTQwYmItOGY4MS1mM2YzMTJkY2E4MjUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMWY2MjQ4OS05NTk0LTQwYmItOGY4MS1mM2YzMTJkY2E4MjUiIHN0RXZ0OndoZW49IjIwMjMtMDUtMTJUMTE6MTM6NDErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmU4NjA4YTUtNGQwMi00ODdhLThiMGQtYjdjZGFmYTRlNmY2IiBzdEV2dDp3aGVuPSIyMDIzLTA1LTEyVDExOjEzOjQxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTFmNjI0ODktOTU5NC00MGJiLThmODEtZjNmMzEyZGNhODI1IiBz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"
                    width={70}
                  />
                </Col>
                <Col __component_name="Col" flex="auto">
                  <Row __component_name="Row" wrap={true}>
                    <Col
                      __component_name="Col"
                      span={6}
                      style={{ paddingLeft: '12px' }}
                    >
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={true}
                        style={{ fontSize: '16px', paddingBottom: '8px' }}
                      >
                        {__$$eval(
                          () =>
                            this.props.useGetContract?.data?.contract?.name ||
                            '-'
                        )}
                      </Typography.Text>
                    </Col>
                  </Row>
                  <Descriptions
                    __component_name="Descriptions"
                    bordered={false}
                    borderedBottom={false}
                    borderedBottomDashed={false}
                    colon={true}
                    column={3}
                    items={[
                      {
                        children: __$$eval(
                          () =>
                            this.props.useGetContract?.data?.contract?.from ||
                            '-'
                        ),
                        key: 'x6fzmf20wkg',
                        label: this.i18n('i18n-ewddsv99') /* 发布者 */,
                        span: 1,
                      },
                      {
                        children: __$$eval(
                          () =>
                            this.props.useGetContract?.data?.contract
                              ?.version || '-'
                        ),
                        key: 'lu5nygtudhq',
                        label: this.i18n('i18n-ot1siqdw') /* 版本号 */,
                        span: 1,
                      },
                      {
                        children: __$$eval(
                          () =>
                            this.props.useGetContract?.data?.contract
                              ?.language || '-'
                        ),
                        key: 'bdr5go2aun',
                        label: this.i18n('i18n-6frnk76i') /* 语言 */,
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
                                +this.props.useGetContract?.data?.contract
                                  ?.createdAt
                            )}
                          />
                        ),
                        key: 'ub0bc25o7d',
                        label: this.i18n('i18n-7yvaecz4') /* 发布时间 */,
                        span: 1,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                        children: null,
                        key: '9yucmkfjfqg',
                        label: this.i18n('i18n-watjije0jk') /* 更新时间 */,
                        span: 1,
                      },
                      {
                        children: __$$eval(
                          () =>
                            this.props.useGetContract?.data?.contract
                              ?.package || '-'
                        ),
                        key: 'o0cvbxwkrj',
                        label: this.i18n('i18n-a8dml771') /* 源文件 */,
                        span: 1,
                      },
                    ]}
                    labelStyle={{ width: 70 }}
                    layout="horizontal"
                    size="middle"
                    style={{ display: 'inline', textAlign: 'left' }}
                    title=""
                  >
                    <Descriptions.Item
                      key="x6fzmf20wkg"
                      label={this.i18n('i18n-ewddsv99') /* 发布者 */}
                      span={1}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetContract?.data?.contract?.from || '-'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      __component_name="Descriptions.Item"
                      key="lu5nygtudhq"
                      label={this.i18n('i18n-ot1siqdw') /* 版本号 */}
                      span={1}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetContract?.data?.contract?.version ||
                          '-'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      __component_name="Descriptions.Item"
                      key="bdr5go2aun"
                      label={this.i18n('i18n-6frnk76i') /* 语言 */}
                      span={1}
                      tab=""
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetContract?.data?.contract?.language ||
                          '-'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      key="ub0bc25o7d"
                      label={this.i18n('i18n-7yvaecz4') /* 发布时间 */}
                      span={1}
                    >
                      {
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={false}
                          time={__$$eval(
                            () =>
                              +this.props.useGetContract?.data?.contract
                                ?.createdAt
                          )}
                        />
                      }
                    </Descriptions.Item>
                    <Descriptions.Item
                      key="9yucmkfjfqg"
                      label={this.i18n('i18n-watjije0jk') /* 更新时间 */}
                      span={1}
                    >
                      {
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={false}
                          time={__$$eval(
                            () =>
                              +this.props.useGetContract?.data?.contract
                                ?.updatedAt
                          )}
                        />
                      }
                    </Descriptions.Item>
                    <Descriptions.Item
                      __component_name="Descriptions.Item"
                      key="o0cvbxwkrj"
                      label={this.i18n('i18n-a8dml771') /* 源文件 */}
                      span={1}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetContract?.data?.contract?.package ||
                          '-'
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions
                    __component_name="Descriptions"
                    bordered={false}
                    borderedBottom={false}
                    borderedBottomDashed={false}
                    colon={true}
                    column={1}
                    items={[
                      {
                        children: __$$eval(
                          () =>
                            this.props.useGetContract?.data?.contract
                              ?.description || '-'
                        ),
                        key: 'r4gchd14zz',
                        label: this.i18n('i18n-8weq4mfy9lf') /* 描述 */,
                        span: 1,
                      },
                    ]}
                    labelStyle={{ width: 70 }}
                    layout="horizontal"
                    size="default"
                    style={{
                      display: 'flex',
                      marginTop: '-4px',
                      textAlign: 'left',
                    }}
                    title=""
                  >
                    <Descriptions.Item
                      __component_name="Descriptions.Item"
                      key="r4gchd14zz"
                      label={this.i18n('i18n-8weq4mfy9lf') /* 描述 */}
                      span={1}
                      tab=""
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetContract?.data?.contract
                            ?.description || '-'
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={__$$eval(() => this.props.useGetOrganization?.loading)}
              size="default"
              title={null}
              type="default"
            >
              <Row __component_name="Row" wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ paddingLeft: '0px' }}
                >
                  <Typography.Title
                    __component_name="Typography.Title"
                    bold={true}
                    bordered={false}
                    ellipsis={true}
                    level={2}
                  >
                    {this.i18n('i18n-10p7svr3') /* 接口描述 */}
                  </Typography.Title>
                </Col>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ paddingLeft: '0px', paddingRight: '0px' }}
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
                        dataIndex: 'name',
                        key: 'name',
                        title: this.i18n('i18n-yub3uru9') /* 函数名 */,
                      },
                      {
                        dataIndex: 'args',
                        key: 'age',
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
                                  '[' + (record?.args || []).toString() + ']'
                              )}
                            </Typography.Text>
                          ))(
                            __$$createChildContext(__$$context, {
                              text,
                              record,
                              index,
                            })
                          ),
                        title: this.i18n('i18n-th0tat0o') /* 参数 */,
                      },
                      {
                        dataIndex: 'description',
                        title: this.i18n('i18n-898z92hq') /* 简介 */,
                      },
                    ]}
                    dataSource={__$$eval(
                      () =>
                        this.props.useGetContract?.data?.contract?.interfaces ||
                        []
                    )}
                    loading={__$$eval(() => this.props.useGetContract?.loading)}
                    onChange={function () {
                      return this.handleTableChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    pagination={{
                      current: __$$eval(() => this.state.current),
                      onChange: function () {
                        return this.handlePaginationChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      onShowSizeChange: function () {
                        return this.handlePaginationChange.apply(
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
                      total: __$$eval(
                        () =>
                          (
                            this.props.useGetContract?.data?.contract
                              ?.interfaces || []
                          )?.length || '0'
                      ),
                    }}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: true }}
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

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/contract/:id' }, location.pathname);
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
      sdkSwrFuncs={[
        {
          func: 'useGetContract',
          params: {
            name: self.match?.params?.id,
          },
        },
        {
          func: 'useGetNetworks',
          params: undefined,
        },
      ]}
      render={(dataProps) => (
        <ContractDetail$$Page
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
