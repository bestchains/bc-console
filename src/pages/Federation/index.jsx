// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  FormilyTextArea,
  Alert,
  Row,
  Col,
  Typography,
  Button,
  Icon,
  Space,
  Radio,
  Input,
  Card,
  Table,
  UnifiedLink,
  Status,
  Dropdown,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils, { RefsManager } from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

class Federation$$Page extends React.Component {
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
      filter: "ALL",
      isOpenModal: false,
      modalType: "create",
      organizations: [],
      record: {},
      searchKey: "name",
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
      (_this$$ = this.$("formily_create")) === null || _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      delete v.displayName;
      try {
        await this.props.appHelper.utils.bff.createFederation({
          federation: v,
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-d4bbvp00v5t"),
        });
        this.props.useGetFederations.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-n58z07yheg"),
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
      await this.props.appHelper.utils.bff.deleteFederation({
        name:
          (_this$state$record = this.state.record) === null ||
          _this$state$record === void 0
            ? void 0
            : _this$state$record.name,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n("i18n-08rsz7n9sruo"),
      });
      this.props.useGetFederations.mutate();
    } catch (error) {
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n("i18n-2tfq4ggp9cv"),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response = error.response) === null ||
              _error$response === void 0
            ? void 0
            : _error$response.errors,
      });
    }
  }

  async confirmDissolveModal(e, payload) {
    try {
      var _this$state$record, _this$state$record2, _this$state$record2$i;
      await this.props.appHelper.utils.bff.dissolveFederation({
        name:
          (_this$state$record = this.state.record) === null ||
          _this$state$record === void 0
            ? void 0
            : _this$state$record.name,
        initiator:
          (_this$state$record2 = this.state.record) === null ||
          _this$state$record2 === void 0
            ? void 0
            : (_this$state$record2$i = _this$state$record2.initiator) ===
                null || _this$state$record2$i === void 0
            ? void 0
            : _this$state$record2$i.name,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n("i18n-gagifmv2uun"),
      });
      this.props.useGetFederations.mutate();
    } catch (error) {
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n("i18n-j5kb8u4qc1b"),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response = error.response) === null ||
              _error$response === void 0
            ? void 0
            : _error$response.errors,
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

  onMenuClick({ key }, payload) {
    this.setState({
      record: payload === null || payload === void 0 ? void 0 : payload.record,
    });
    if (key === "dissolve") {
      this.openDissolveModal();
    }
    if (key === "delete") {
      this.openDeleteModal();
    }
  }

  openCreateModal() {
    this.setState({
      isOpenModal: true,
      modalType: "create",
    });
  }

  openDeleteModal() {
    this.setState({
      isOpenModal: true,
      modalType: "delete",
    });
  }

  openDissolveModal() {
    this.setState({
      isOpenModal: true,
      modalType: "dissolve",
    });
  }

  paginationShowTotal(total, range) {
    return `${this.i18n("i18n-5xl7aihzcuy")} ${total} ${this.i18n(
      "i18n-v7xu122b9o"
    )}`;
  }

  componentDidMount() {
    const getOrganizations = async () => {
      var _res$organizations;
      const res = await this.props.appHelper.utils.bff.getOrganizations();
      this.setState({
        organizations:
          (res === null || res === void 0
            ? void 0
            : (_res$organizations = res.organizations) === null ||
              _res$organizations === void 0
            ? void 0
            : _res$organizations.map((item) => ({
                ...item,
                value: item.name,
                label: `${item.name}(${item.admin})`,
              }))) || [],
      });
    };
    getOrganizations();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page
        ref={this._refsManager.linkRef("outerView")}
        style={{ height: "100%" }}
      >
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: "onCancel",
                relatedEventName: "closeModal",
                type: "componentEvent",
              },
              {
                name: "onOk",
                relatedEventName: "confirmCreateModal",
                type: "componentEvent",
              },
            ],
            eventList: [
              {
                disabled: false,
                name: "afterClose",
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: "onCancel",
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: true,
                name: "onOk",
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
            this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            this.confirmCreateModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === "create"
          )}
          title={this._i18nText({
            "en-US": "create federation",
            key: "i18n-i69exda650e",
            "zh-CN": "新建联盟",
          })}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: "left",
              labelCol: 7,
              layout: "horizontal",
              wrapperCol: 19,
            }}
            ref={this._refsManager.linkRef("formily_create")}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                "x-component-props": {
                  bordered: true,
                  placeholder: this._i18nText({
                    "en-US": "federation name",
                    key: "i18n-b5zuy9i6xlf",
                    "zh-CN": "请输入联盟名称",
                  }),
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_title_select: "I18nSetter",
                name: "name",
                required: true,
                title: this._i18nText({
                  "en-US": "name",
                  key: "i18n-fvcps4edx44",
                  "zh-CN": "联盟名称",
                }),
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US": "The value contains 3 to 20 characters",
                      key: "i18n-wprl86g5wy",
                      "zh-CN": "字符长度为 3 ~ 20",
                    }),
                    pattern: "^[a-zA-Z0-9-\\u4e00-\\u9fa5]{3,20}$",
                  },
                  {
                    message: this._i18nText({
                      "en-US":
                        "It consists of uppercase and lowercase letters, numbers, and hyphens. The beginning and end can only be a letter or number",
                      key: "i18n-neccml35hvq",
                      "zh-CN":
                        "大小写字母, 数字, 中划线组成，开头和结尾只能是字母或数字",
                    }),
                    pattern:
                      "^[a-zA-Z0-9]([-a-zA-Z0-9]*[a-zA-Z0-9])?(\\.[a-zA-Z0-9]([-a-zA-Z0-9]*[a-zA-Z0-9])?)*$",
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                "x-component-props": { placeholder: "请输入" },
              }}
              fieldProps={{
                default: this._i18nText({
                  "en-US": "Real-name authentication",
                  key: "i18n-1g6cw1w1uv4",
                  "zh-CN": "实名认证",
                }),
                name: "displayName",
                title: this._i18nText({
                  "en-US": "members",
                  key: "i18n-21z9nbkoohk",
                  "zh-CN": "成员限制",
                }),
                "x-pattern": "disabled",
                "x-validator": [
                  {
                    message: "展示名由 0 ~ 20 个中英文、数字组成",
                    pattern: "^[a-zA-Z0-9_\\u4e00-\\u9fa5]{0,20}$",
                  },
                ],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                "x-component-props": {
                  allowClear: false,
                  disabled: false,
                  placeholder: this._i18nText({
                    "en-US": "Choose your own organization",
                    key: "i18n-3cphsjan5d2",
                    "zh-CN": "选择自己拥有的组织",
                  }),
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_enum_select: "ExpressionSetter",
                enum: __$$eval(
                  () =>
                    this.state.organizations?.filter(
                      (item) => item?.admin === this.props.authData?.user?.name
                    ) || []
                ),
                name: "initiator",
                required: true,
                title: this._i18nText({
                  "en-US": "initiator",
                  key: "i18n-wctt13ld2x",
                  "zh-CN": "发起者",
                }),
                "x-validator": [],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                "x-component-props": {
                  allowClear: false,
                  disabled: false,
                  mode: "multiple",
                  placeholder: this._i18nText({
                    "en-US": "select members",
                    key: "i18n-bko8c4ii1ad",
                    "zh-CN": "请选择成员",
                  }),
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_enum_select: "ExpressionSetter",
                enum: __$$eval(
                  () =>
                    this.state.organizations?.filter(
                      (item) => item?.admin !== this.props.authData?.user?.name
                    ) || []
                ),
                name: "organizations",
                required: true,
                title: this._i18nText({
                  "en-US": "选择成员",
                  key: "i18n-0bo5igd908x",
                  "zh-CN": "选择成员",
                }),
                "x-validator": [],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                "x-component-props": {
                  allowClear: false,
                  disabled: false,
                  placeholder: this._i18nText({
                    "en-US": "propsoal",
                    key: "i18n-fpx7c35bovp",
                    "zh-CN": "请选择提议投票策略",
                  }),
                },
              }}
              decoratorProps={{
                "x-decorator-props": {
                  _unsafe_MixedSetter_tooltip_select: "StringSetter",
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_enum_select: "ArraySetter",
                enum: [
                  {
                    _unsafe_MixedSetter_label_select: "StringSetter",
                    _unsafe_MixedSetter_value_select: "StringSetter",
                    children: "未知",
                    icon: "tenx-ui-icon:Circle",
                    id: "disabled",
                    label: "All",
                    type: "disabled",
                    value: "All",
                  },
                  {
                    _unsafe_MixedSetter_label_select: "StringSetter",
                    children: "未知",
                    icon: "tenx-ui-icon:Circle",
                    id: "disabled",
                    label: "Majority",
                    type: "disabled",
                    value: "Majority",
                  },
                  {
                    _unsafe_MixedSetter_label_select: "StringSetter",
                    children: "未知",
                    icon: "tenx-ui-icon:Circle",
                    id: "disabled",
                    label: "OneVoteVeto",
                    type: "disabled",
                    value: "OneVoteVeto",
                  },
                ],
                name: "policy",
                required: true,
                title: this._i18nText({
                  "en-US": "propsoal",
                  key: "i18n-p98jmw4mkzq",
                  "zh-CN": "提议投票策略",
                }),
                "x-validator": [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                "x-component-props": {
                  placeholder: this._i18nText({
                    "en-US": "description",
                    key: "i18n-rw0h41prk6",
                    "zh-CN": "请输入描述",
                  }),
                },
              }}
              fieldProps={{
                name: "description",
                title: this._i18nText({
                  "en-US": "federation description",
                  key: "i18n-8weq4mfy9lf",
                  "zh-CN": "联盟描述",
                }),
                "x-component": "Input.TextArea",
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The association description consists of 0 to 200 characters",
                      key: "i18n-xr251ak8b2",
                      "zh-CN": "联盟描述由 0 ~ 200 字符组成",
                    }),
                    pattern: "^.{0,200}$",
                  },
                ],
              }}
            />
          </FormilyForm>
        </Modal>
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: "onCancel",
                relatedEventName: "closeModal",
                type: "componentEvent",
              },
              {
                name: "onOk",
                relatedEventName: "confirmDissolveModal",
                type: "componentEvent",
              },
            ],
            eventList: [
              {
                disabled: false,
                name: "afterClose",
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: "onCancel",
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: true,
                name: "onOk",
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
            this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            this.confirmDissolveModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === "dissolve"
          )}
          title={this._i18nText({
            "en-US": "delete federation",
            key: "i18n-axcofu86f15",
            "zh-CN": "解散联盟",
          })}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            icon=""
            message={this._i18nText({
              "en-US": "delete federation",
              key: "i18n-z04apojz8aj",
              "zh-CN": "解散联盟后，内部资源仍需要手动删除",
            })}
            showIcon={true}
            type="warning"
          />
        </Modal>
        <Row __component_name="Row" wrap={true}>
          <Col
            __component_name="Col"
            span={24}
            style={{ paddingBottom: "12px" }}
          >
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this._i18nText({
                "en-US": "Federation",
                key: "i18n-3u58kijmwhw",
                "zh-CN": "联盟",
              })}
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
                        name: "onClick",
                        relatedEventName: "openCreateModal",
                        type: "componentEvent",
                      },
                    ],
                    eventList: [
                      {
                        disabled: true,
                        name: "onClick",
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
                  {this._i18nText({
                    "en-US": "create federation",
                    key: "i18n-i69exda650e",
                    "zh-CN": "新建联盟",
                  })}
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
                  >
                    <Radio.Group
                      __component_name="Radio.Group"
                      __events={{
                        eventDataList: [
                          {
                            name: "onChange",
                            relatedEventName: "handleFilterChange",
                            type: "componentEvent",
                          },
                        ],
                        eventList: [
                          {
                            disabled: true,
                            name: "onChange",
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
                          label: this._i18nText({
                            "en-US": "all federation",
                            key: "i18n-j6d9jqyiwnj",
                            "zh-CN": "全部联盟",
                          }),
                          value: "ALL",
                        },
                        {
                          label: this._i18nText({
                            "en-US": "my create",
                            key: "i18n-5jwxi1nlnsm",
                            "zh-CN": "我创建的",
                          }),
                          value: "MY",
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
                          name: "onChange",
                          relatedEventName: "handleSearchValueChange",
                          type: "componentEvent",
                        },
                      ],
                      eventList: [
                        {
                          disabled: true,
                          name: "onChange",
                          template:
                            "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}",
                        },
                        {
                          disabled: false,
                          name: "onPressEnter",
                          template:
                            "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}",
                        },
                        {
                          disabled: false,
                          name: "onSearch",
                          template:
                            "onSearch(value,event,${extParams}){\n// 点击搜索图标、清除图标，或按下回车键时的回调\nconsole.log('onSearch',value,event);}",
                        },
                        {
                          disabled: false,
                          name: "onFocus",
                          template:
                            "onFocus(event,${extParams}){\n// 获取焦点回调\nconsole.log('onFocus',event);}",
                        },
                        {
                          disabled: false,
                          name: "onKeyDown",
                          template:
                            "onKeyDown(event,${extParams}){\n// 按键按下时的回调\nconsole.log('onKeyDown',event);}",
                        },
                        {
                          disabled: false,
                          name: "onKeyPress",
                          template:
                            "onKeyPress(event,${extParams}){\n// 按键按下后的回调\nconsole.log('onKeyPress',event);}",
                        },
                        {
                          disabled: false,
                          name: "onKeyUp",
                          template:
                            "onKeyUp(event,${extParams}){\n// 按键释放回调\nconsole.log('onKeyUp',event);}",
                        },
                        {
                          disabled: false,
                          name: "onBlur",
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
                    placeholder={this._i18nText({
                      "en-US": "search",
                      key: "i18n-96qiu0ctj5p",
                      "zh-CN": "输入联盟名称或创建人搜索",
                    })}
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
                      name: "onChange",
                      relatedEventName: "handleTableChange",
                      type: "componentEvent",
                    },
                    {
                      name: "pagination.onChange",
                      relatedEventName: "handlePaginationChange",
                      type: "componentEvent",
                    },
                    {
                      name: "pagination.onShowSizeChange",
                      relatedEventName: "handlePaginationChange",
                      type: "componentEvent",
                    },
                  ],
                  eventList: [
                    {
                      disabled: true,
                      name: "onChange",
                      template:
                        "onChange(pagination,filters,sorter,extra,${extParams}){\n// 表格翻页事件\nconsole.log('onChange', pagination);}",
                    },
                    {
                      disabled: false,
                      name: "rowSelection.onChange",
                      template:
                        "onRowSelectionChange(selectedRowKeys,selectedRows,${extParams}){\n// 选中项发生变化时的回调\nconsole.log('onRowSelectionChange', selectedRowKeys, selectedRows);}",
                    },
                    {
                      disabled: false,
                      name: "expandable.onExpand",
                      template:
                        "onExpandableExpand(expanded,record){\n// 点击展开图标时触发\nconsole.log('onRowSelectionChange', expanded, record);}",
                    },
                    {
                      disabled: true,
                      name: "pagination.onChange",
                      template:
                        "onPaginationChange(page, pageSize){\n// 页码或 pageSize 改变的回调  \nconsole.log('onPaginationChange', page, pageSize);}",
                    },
                    {
                      disabled: true,
                      name: "pagination.onShowSizeChange",
                      template:
                        "onPaginationShowSizeChange(current, size){\n// pageSize 变化的回调\nconsole.log('onPaginationShowSizeChange', current, size);}",
                    },
                  ],
                }}
                columns={[
                  {
                    dataIndex: "name",
                    key: "name",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <UnifiedLink
                          __component_name="UnifiedLink"
                          target="_self"
                          to={__$$eval(() => "/federation/" + record.name)}
                        >
                          {__$$eval(() => record.name)}
                        </UnifiedLink>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "name",
                      key: "i18n-fvcps4edx44",
                      "zh-CN": "联盟名称",
                    }),
                  },
                  {
                    dataIndex: "initiator",
                    key: "initiator",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: "" }}
                        >
                          {__$$eval(() => `${text?.name}(${text?.admin})`)}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "creator",
                      key: "i18n-wctt13ld2x",
                      "zh-CN": "发起者",
                    }),
                  },
                  {
                    dataIndex: "organizations",
                    key: "organizations",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: "" }}
                        >
                          {__$$eval(() => text?.length || 0)}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "members",
                      key: "i18n-4btnh7pqt1m",
                      "zh-CN": "成员个数",
                    }),
                  },
                  {
                    dataIndex: "networks",
                    key: "networks",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: "" }}
                        >
                          {__$$eval(() => record?.networks?.length || "0")}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "networks",
                      key: "i18n-w4mcacnr3z",
                      "zh-CN": "网络个数",
                    }),
                  },
                  {
                    dataIndex: "creationTimestamp",
                    key: "creationTimestamp",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={false}
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
                    title: this._i18nText({
                      "en-US": "create time",
                      key: "i18n-9ox4rx1wtwv",
                      "zh-CN": "创建时间",
                    }),
                  },
                  {
                    dataIndex: "joinedAt",
                    key: "joinedAt",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={false}
                          time={__$$eval(() => text)}
                        />
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    sorter: false,
                    title: this._i18nText({
                      "en-US": "join time",
                      key: "i18n-c0d66z03kpk",
                      "zh-CN": "加入时间",
                    }),
                  },
                  {
                    dataIndex: "policy",
                    key: "policy",
                    title: this._i18nText({
                      "en-US": "propsoal",
                      key: "i18n-g8rbmvh04cd",
                      "zh-CN": "提议策略",
                    }),
                  },
                  {
                    dataIndex: "status",
                    key: "status",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Status
                          __component_name="Status"
                          id={__$$eval(() => text)}
                          types={[
                            {
                              children: this._i18nText({
                                "en-US": "FederationPending",
                                key: "i18n-1d5bt7sz4jb",
                                "zh-CN": "组建中",
                              }),
                              icon: "ClockCircleFilled",
                              id: "FederationPending",
                              type: "warning",
                            },
                            {
                              children: this._i18nText({
                                "en-US": "FederationActivated",
                                key: "i18n-2vzrxdpca5",
                                "zh-CN": "已激活",
                              }),
                              icon: "CheckCircleFilled",
                              id: "FederationActivated",
                              type: "success",
                            },
                            {
                              children: this._i18nText({
                                "en-US": "FederationFailed",
                                key: "i18n-ej048sy57c",
                                "zh-CN": "组建失败",
                              }),
                              icon: "CloseCircleFilled",
                              id: "FederationFailed",
                              type: "error",
                            },
                            {
                              children: this._i18nText({
                                "en-US": "FederationDissolved",
                                key: "i18n-pev2ce1ut3l",
                                "zh-CN": "已解散",
                              }),
                              icon: "CloseCircleFilled",
                              id: "FederationDissolved",
                              type: "error",
                            },
                            {
                              children: this._i18nText({
                                "en-US": "Error",
                                key: "i18n-xtno2l9qqog",
                                "zh-CN": "异常",
                              }),
                              icon: "CloseCircleFilled",
                              id: "Error",
                              type: "error",
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
                    title: this._i18nText({
                      "en-US": "status",
                      key: "i18n-bik6xl952y6",
                      "zh-CN": "状态",
                    }),
                  },
                  {
                    dataIndex: "op",
                    key: "op",
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
                            disabled={__$$eval(
                              () => record.status !== "FederationActivated"
                            )}
                            ghost={false}
                            href={__$$eval(() => "/federation/" + record.name)}
                            icon=""
                            shape="default"
                            type="link"
                          >
                            {this._i18nText({
                              "en-US": "detail",
                              key: "i18n-e6ttl8tm6f",
                              "zh-CN": "管理联盟",
                            })}
                          </Button>
                          <Dropdown
                            __component_name="Dropdown"
                            __events={{
                              eventDataList: [
                                {
                                  name: "menu.onClick",
                                  paramStr: '{\n \t"record": this.record \n}',
                                  relatedEventName: "onMenuClick",
                                  type: "componentEvent",
                                },
                              ],
                              eventList: [
                                {
                                  disabled: true,
                                  name: "menu.onClick",
                                  template:
                                    "onDropDownClick({ item, key, keyPath, domEvent }, ${extParams}){\n// onClick\t点击 MenuItem 调用此函数 \nconsole.log('onDropDownClick', item, key, keyPath, domEvent);}",
                                },
                              ],
                            }}
                            destroyPopupOnHide={true}
                            disabled={false}
                            menu={{
                              items: [
                                {
                                  disabled: __$$eval(
                                    () =>
                                      record?.status === "FederationDissolved"
                                  ),
                                  key: "dissolve",
                                  label: this._i18nText({
                                    "en-US": "delete federation",
                                    key: "i18n-axcofu86f15",
                                    "zh-CN": "解散联盟",
                                  }),
                                },
                                {
                                  _unsafe_MixedSetter_label_select:
                                    "I18nSetter",
                                  disabled: __$$eval(
                                    () =>
                                      record?.status !== "FederationDissolved"
                                  ),
                                  key: "delete",
                                  label: this._i18nText({
                                    "en-US": "Delete federation",
                                    key: "i18n-anergo0dunh",
                                    "zh-CN": "删除联盟",
                                  }),
                                },
                              ],
                              onClick: function () {
                                this.onMenuClick.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([
                                    {
                                      record: record,
                                    },
                                  ])
                                );
                              }.bind(__$$context),
                            }}
                            placement="bottomLeft"
                            trigger={["hover"]}
                          >
                            <Button
                              __component_name="Button"
                              block={false}
                              danger={false}
                              disabled={false}
                              ghost={false}
                              shape="default"
                              type="link"
                            >
                              {[
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  strong={false}
                                  style={{ color: "inherit", fontSize: "" }}
                                >
                                  {this._i18nText({
                                    "en-US": "more",
                                    key: "i18n-2b4dhrz51wu",
                                    "zh-CN": "更多",
                                  })}
                                </Typography.Text>,
                                <Icon
                                  __component_name="Icon"
                                  size={12}
                                  style={{
                                    marginLeft: 4,
                                    verticalAlign: "middle",
                                  }}
                                  type="DownOutlined"
                                />,
                              ]}
                            </Button>
                          </Dropdown>
                        </Space>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "operation",
                      key: "i18n-k5inn5jmnt9",
                      "zh-CN": "操作",
                    }),
                    width: 180,
                  },
                ]}
                dataSource={__$$eval(
                  () =>
                    this.props.useGetFederations?.data?.federations
                      ?.filter((item) => {
                        if (this.state.filter === "ALL") {
                          return true;
                        }
                        return (
                          item?.initiator?.admin ===
                          this.props.authData?.user?.name
                        );
                      })
                      ?.filter((item) => {
                        return this.state.searchValue
                          ? item.name?.includes(this.state.searchValue)
                          : true;
                      })
                      ?.sort((a, b) => {
                        if (this.state.sorter?.order !== "ascend") {
                          return (
                            new Date(b.creationTimestamp).getTime() -
                            new Date(a.creationTimestamp).getTime()
                          );
                        }
                        return (
                          new Date(a.creationTimestamp).getTime() -
                          new Date(b.creationTimestamp).getTime()
                        );
                      }) || []
                )}
                loading={__$$eval(() => this.props.useGetFederations?.loading)}
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
                  size: "default",
                  total: __$$eval(
                    () =>
                      (
                        this.props.useGetFederations?.data?.federations
                          ?.filter((item) => {
                            if (this.state.filter === "ALL") {
                              return true;
                            }
                            return (
                              item?.initiator?.admin ===
                              this.props.authData?.user?.name
                            );
                          })
                          ?.filter((item) => {
                            return this.state.searchValue
                              ? item.name?.includes(this.state.searchValue)
                              : true;
                          })
                          ?.sort((a, b) => {
                            if (this.state.sorter?.order !== "ascend") {
                              return (
                                new Date(b.creationTimestamp).getTime() -
                                new Date(a.creationTimestamp).getTime()
                              );
                            }
                            return (
                              new Date(a.creationTimestamp).getTime() -
                              new Date(b.creationTimestamp).getTime()
                            );
                          }) || []
                      ).length
                  ),
                }}
                rowKey="name"
                scroll={{ scrollToFirstRowOnChange: true }}
                showHeader={true}
                size="default"
                style={{ marginTop: "-20px" }}
              />
            </Card>
          </Col>
        </Row>
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: "onCancel",
                relatedEventName: "closeModal",
                type: "componentEvent",
              },
              {
                name: "onOk",
                relatedEventName: "confirmDeleteModal",
                type: "componentEvent",
              },
            ],
            eventList: [
              {
                disabled: false,
                name: "afterClose",
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: "onCancel",
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: true,
                name: "onOk",
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
            this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            this.confirmDeleteModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === "delete"
          )}
          title={this._i18nText({
            "en-US": "Delete federation",
            key: "i18n-anergo0dunh",
            "zh-CN": "删除联盟",
          })}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            message={this._i18nText({
              "en-US": " Are you sure to delete the federation?",
              key: "i18n-nnvhk2w7bh",
              "zh-CN": "确定删除联盟？",
            })}
            showIcon={true}
            type="warning"
          />
        </Modal>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath({ path: "/federation" }, location.pathname);
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
          func: "useGetFederations",
          params: {},
        },
      ]}
      render={(dataProps) => (
        <Federation$$Page {...dataProps} self={self} appHelper={appHelper} />
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
