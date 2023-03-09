// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilyTextArea,
  Alert,
  Typography,
  Button,
  Space,
  Icon,
  Row,
  Col,
  Radio,
  Input,
  Card,
  Table,
  Status,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class Organization$$Page extends React.Component {
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
      current: 1,
      filter: 'ALL',
      isOpenModal: false,
      modalType: 'create',
      searchKey: 'name',
      searchValue: undefined,
      size: 10,
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

  confirmCreateModal(e, payload) {
    var _this$$, _this$$$formRef, _this$$$formRef$curre;
    const form =
      (_this$$ = this.$('formily_create')) === null || _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      try {
        await this.props.appHelper.utils.bff.createOrganization({
          organization: v,
        });
        // this.closeModal()
        // this.utils.notification.success({
        //   message: this.i18n('i18n-1x4p2xt91ss'),
        // })
        this.openCreateSuceessModal();
        this.props.useGetOrganizations.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n('i18n-y29rf6lwd8q'),
          errors:
            error === null || error === void 0
              ? void 0
              : (_error$response = error.response) === null ||
                _error$response === void 0
              ? void 0
              : _error$response.errors,
        });
      }
    });
  }

  async confirmDeleteModal(e, payload) {
    try {
      var _this$state$record;
      await this.props.appHelper.utils.bff.deleteOrganization({
        name:
          (_this$state$record = this.state.record) === null ||
          _this$state$record === void 0
            ? void 0
            : _this$state$record.name,
      });
      this.closeModal();
      this.props.useGetOrganizations.mutate();
      this.utils.notification.success({
        message: this.i18n('i18n-4lcfgutb'),
      });
    } catch (error) {
      var _error$response, _error$response$error, _error$response2;
      if (
        error !== null &&
        error !== void 0 &&
        (_error$response = error.response) !== null &&
        _error$response !== void 0 &&
        (_error$response$error = _error$response.errors) !== null &&
        _error$response$error !== void 0 &&
        _error$response$error.some(
          (item) =>
            (item === null || item === void 0 ? void 0 : item.message) ===
            'the organization is initiator of one federation'
        )
      ) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-e7ei7djt'),
          description: this.i18n('i18n-33ei2z58'),
        });
        return;
      }
      this.utils.notification.warnings({
        message: this.i18n('i18n-e7ei7djt'),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response2 = error.response) === null ||
              _error$response2 === void 0
            ? void 0
            : _error$response2.errors,
      });
    }
  }

  getType(id, payload) {
    if (
      (payload === null || payload === void 0 ? void 0 : payload.id) === 'Error'
    ) {
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

  openCreateModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'create',
    });
  }

  openCreateSuceessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'createsuccess',
    });
  }

  openDeleteModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: 'delete',
      record: payload.record,
    });
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  validatorName(value) {
    var _this$props,
      _this$props$useGetOrg,
      _this$props$useGetOrg2,
      _this$props$useGetOrg3;
    if (
      (_this$props = this.props) !== null &&
      _this$props !== void 0 &&
      (_this$props$useGetOrg = _this$props.useGetOrganizations) !== null &&
      _this$props$useGetOrg !== void 0 &&
      (_this$props$useGetOrg2 = _this$props$useGetOrg.data) !== null &&
      _this$props$useGetOrg2 !== void 0 &&
      (_this$props$useGetOrg3 = _this$props$useGetOrg2.organizations) !==
        null &&
      _this$props$useGetOrg3 !== void 0 &&
      _this$props$useGetOrg3.some((item) => item.name === value)
    ) {
      return this.i18n('i18n-4y6fvhua');
    }
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page
        ref={this._refsManager.linkRef('outerView')}
        style={{ height: '100%' }}
      >
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: 'onOk',
                relatedEventName: 'confirmCreateModal',
                type: 'componentEvent',
              },
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
                disabled: true,
                name: 'onOk',
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={false}
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
            return this.confirmCreateModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === 'create'
          )}
          title={this.i18n('i18n-tlql06imj7') /* 创建组织 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 4,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef('formily_create')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  bordered: true,
                  placeholder:
                    this.i18n('i18n-d6xpwgoamdo') /* 请输入组织名称 */,
                },
              }}
              fieldProps={{
                name: 'name',
                required: true,
                title: this.i18n('i18n-ycr2zketd3o') /* 组织名称 */,
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-iiub6ybv6ms'
                      ) /* 组织名称由 3 ~ 10 个大小写字母, 数字, 下划线组成 */,
                    pattern: '^[a-z0-9_]{3,10}$',
                    required: true,
                    whitespace: true,
                  },
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    type: 'disabled',
                    validator: function () {
                      return this.validatorName.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this),
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-bpso2h286ae') /* 请输入展示名 */,
                },
              }}
              fieldProps={{
                name: 'displayName',
                title: this.i18n('i18n-luwmbzt4j2') /* 展示名 */,
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-de6rhkx2m7v'
                      ) /* 展示名由 0 ~ 20 个中英文、数字组成 */,
                    pattern: '^[a-zA-Z0-9_\\u4e00-\\u9fa5]{0,20}$',
                  },
                ],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder:
                    this.i18n('i18n-1247x9lxlbkg') /* 请输入组织备注 */,
                },
              }}
              fieldProps={{
                name: 'description',
                title: this.i18n('i18n-lu4j2exhudd') /* 组织描述 */,
                'x-component': 'Input.TextArea',
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-brvipauy4t4'
                      ) /* 组织描述由 0 ~ 200 字符组成 */,
                    pattern: '^.{0,200}$',
                  },
                ],
              }}
            />
          </FormilyForm>
        </Modal>
        <Modal
          __events={{
            eventDataList: [
              {
                name: 'onCancel',
                relatedEventName: 'closeModal',
                type: 'componentEvent',
              },
              {
                name: 'onOk',
                relatedEventName: 'confirmDeleteModal',
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
          confirmLoading={false}
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
            return this.confirmDeleteModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === 'delete'
          )}
          title={this.i18n('i18n-85yslvv9') /* 确认删除组织 */}
        >
          <Alert
            message={
              this.i18n(
                'i18n-36owczmg'
              ) /* 请确保组织加入的网络已经停用，并退出联盟，删除之后不可恢复，请慎重！ */
            }
            showIcon={true}
            type="warning"
          />
        </Modal>
        <Modal
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
          footer={
            <Button
              __events={{
                eventDataList: [
                  {
                    name: 'onClick',
                    relatedEventName: 'closeModal',
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
                return this.closeModal.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this)}
              shape="default"
              type="primary"
            >
              {this.i18n('i18n-tixlz8m0le9') /* 确定 */}
            </Button>
          }
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
              this.state.isOpenModal && this.state.modalType === 'createsuccess'
          )}
          title={
            <Space align="center" direction="horizontal">
              <Icon color="#5cb85c" size={12} type="CheckCircleFilled" />
              <Typography.Text
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              >
                {this.i18n('i18n-1x4p2xt91ss') /* 组织创建成功 */}
              </Typography.Text>
            </Space>
          }
        >
          <Typography.Text
            disabled={false}
            ellipsis={true}
            strong={false}
            style={{ fontSize: '' }}
          >
            {
              this.i18n(
                'i18n-jdv1hwgs'
              ) /* 您可以在组织列表查看，并可以邀请成员加入 */
            }
          </Typography.Text>
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
              {this.i18n('i18n-54sfaqivd5i') /* 组织管理 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col">
                <Button
                  __component_name="Button"
                  __events={{
                    eventDataList: [
                      {
                        name: 'onClick',
                        relatedEventName: 'openCreateModal',
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
                    <Icon
                      __component_name="Icon"
                      size={12}
                      style={{ marginRight: 3 }}
                      type="PlusOutlined"
                    />
                  }
                  onClick={function () {
                    this.openCreateModal.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  type="primary"
                >
                  {this.i18n('i18n-4kyrlfsirm5') /* 新增组织 */}
                </Button>
              </Col>
              <Col __component_name="Col">
                <Space
                  __component_name="Space"
                  align="center"
                  direction="horizontal"
                  size={34}
                >
                  <Space
                    __component_name="Space"
                    align="center"
                    direction="horizontal"
                    size={8}
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
                          label: this.i18n('i18n-wbcc2febor') /* 全部组织 */,
                          value: 'ALL',
                        },
                        {
                          label: this.i18n('i18n-66pkydvtrcv') /* 我管理的 */,
                          value: 'B',
                        },
                      ]}
                      size="middle"
                      value={__$$eval(() => this.state.filter)}
                    />
                  </Space>
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
                      this.i18n(
                        'i18n-bvuyqd393pj'
                      ) /* 输入组织名称或创建人搜索 */
                    }
                    style={{ width: '' }}
                  />
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
                    dataIndex: 'name',
                    key: 'name',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Button
                          __component_name="Button"
                          block={false}
                          danger={false}
                          disabled={__$$eval(() =>
                            record?.admin ===
                            __$$context.props.authData?.user?.name
                              ? undefined
                              : 'disabled'
                          )}
                          ghost={false}
                          href={__$$eval(() => '/organization/' + record.name)}
                          icon=""
                          shape="default"
                          type="link"
                        >
                          {__$$eval(
                            () =>
                              `${record.displayName || '-'}(${
                                record.name || '-'
                              })`
                          )}
                        </Button>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-ycr2zketd3o') /* 组织名称 */,
                  },
                  {
                    dataIndex: 'admin',
                    key: 'admin',
                    title: this.i18n('i18n-inwcelhiing') /* 管理员Admin */,
                  },
                  {
                    dataIndex: 'federations',
                    key: 'federations',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                        >
                          {__$$eval(() =>
                            text?.length > 0 ? text?.join(',') : '-'
                          )}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-ely1ij2y') /* 所在联盟 */,
                  },
                  {
                    dataIndex: 'networks',
                    key: 'networks',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                        >
                          {__$$eval(() =>
                            text?.length > 0
                              ? text?.map((item) => item.name)?.join(',')
                              : '-'
                          )}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-386epq7m') /* 所在网络 */,
                  },
                  {
                    _unsafe_MixedSetter_sorter_select: 'BoolSetter',
                    dataIndex: 'creationTimestamp',
                    key: 'creationTimestamp',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={true}
                          time={__$$eval(() => text)}
                        />
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    sorter: true,
                    title: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
                  },
                  {
                    dataIndex: 'status',
                    key: 'status',
                    render: /* 插槽容器*/ (text, record, index) =>
                      ((__$$context) => (
                        <Status
                          __component_name="Status"
                          getTypes={function () {
                            return this.getType.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  id: text,
                                  tooltip:
                                    record?.reason &&
                                    `reason: ${record?.reason}`,
                                },
                              ])
                            );
                          }.bind(__$$context)}
                          id={__$$eval(() => text)}
                          types={[
                            {
                              children:
                                this.i18n('i18n-fifkprltibf') /* Deployed */,
                              icon: 'CheckCircleFilled',
                              id: 'Deployed',
                              type: 'success',
                            },
                            {
                              _unsafe_MixedSetter_tooltip_select:
                                'VariableSetter',
                              children:
                                this.i18n('i18n-xtno2l9qqog') /* 失败 */,
                              icon: 'CloseCircleFilled',
                              id: 'Error',
                              tooltip: __$$eval(() => record.reason),
                              type: 'error',
                            },
                            {
                              children:
                                this.i18n('i18n-fifkprltibf') /* 正常 */,
                              icon: 'CheckCircleFilled',
                              id: 'Deploying',
                              type: 'success',
                            },
                            {
                              children:
                                this.i18n('i18n-fifkprltibf') /* 正常 */,
                              icon: 'CheckCircleFilled',
                              id: 'Created',
                              type: 'success',
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
                            disabled={__$$eval(() =>
                              record?.admin ===
                              __$$context.props.authData?.user?.name
                                ? undefined
                                : 'disabled'
                            )}
                            ghost={false}
                            href={__$$eval(
                              () => '/organization/' + record.name
                            )}
                            icon=""
                            shape="default"
                            type="link"
                          >
                            {this.i18n('i18n-m6n5fnxybu') /* 管理组织 */}
                          </Button>
                          <Button
                            __component_name="Button"
                            __events={{
                              eventDataList: [
                                {
                                  name: 'onClick',
                                  paramStr: '{\n \t "record":this.record \n}',
                                  relatedEventName: 'openDeleteModal',
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
                            disabled={__$$eval(() =>
                              record?.admin ===
                              __$$context.props.authData?.user?.name
                                ? undefined
                                : true
                            )}
                            ghost={false}
                            href={null}
                            icon=""
                            onClick={function () {
                              return this.openDeleteModal.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([
                                  {
                                    record: record,
                                  },
                                ])
                              );
                            }.bind(__$$context)}
                            shape="default"
                            type="link"
                          >
                            {this.i18n('i18n-ias68eipm18') /* 删除 */}
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
                dataSource={__$$eval(() =>
                  this.props.useGetOrganizations?.data?.organizations
                    ?.filter((item) => {
                      if (this.state.filter === 'ALL') {
                        return true;
                      }
                      return item.admin === this.props.authData?.user?.name;
                    })
                    ?.filter((item) => {
                      return this.state.searchValue
                        ? item.name?.includes(this.state.searchValue)
                        : true;
                    })
                    ?.sort((a, b) => {
                      if (this.state.sorter?.order !== 'ascend') {
                        return (
                          new Date(b.creationTimestamp).getTime() -
                          new Date(a.creationTimestamp).getTime()
                        );
                      }
                      return (
                        new Date(a.creationTimestamp).getTime() -
                        new Date(b.creationTimestamp).getTime()
                      );
                    })
                )}
                loading={__$$eval(() => this.props.useGetOrganizations.loading)}
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
                  total: __$$eval(
                    () =>
                      this.props.useGetOrganizations?.data?.organizations
                        ?.filter((item) => {
                          if (this.state.filter === 'ALL') {
                            return true;
                          }
                          return item.admin === this.props.authData?.user?.name;
                        })
                        ?.filter((item) => {
                          return this.state.searchValue
                            ? item.name?.includes(this.state.searchValue)
                            : true;
                        })?.length || 0
                  ),
                }}
                rowKey="name"
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

export default () => {
  const location = useLocation();
  const match = matchPath({ path: '/organization' }, location.pathname);
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
          func: 'useGetOrganizations',
          params: undefined,
        },
      ]}
      render={(dataProps) => (
        <Organization$$Page {...dataProps} self={self} appHelper={appHelper} />
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
