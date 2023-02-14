// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
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
  Modal,
  FormilyForm,
  FormilyInput,
  FormilyTextArea,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils, { RefsManager } from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

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
      filter: "ALL",
      isOpenModal: false,
      modalType: "create",
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
      try {
        await this.props.appHelper.utils.bff.createOrganization({
          organization: v,
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-1x4p2xt91ss"),
        });
        this.props.useGetOrganizations.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-y29rf6lwd8q"),
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

  getType(id, payload) {
    if (
      (payload === null || payload === void 0 ? void 0 : payload.id) === "Error"
    ) {
      return {
        children: this.i18n("i18n-xtno2l9qqog"),
        icon: "CloseCircleFilled",
        tooltip: payload.tooltip,
        id,
        type: "error",
      };
    }
    return {
      children: this.i18n("i18n-fifkprltibf"),
      icon: "CheckCircleFilled",
      id,
      type: "success",
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
      modalType: "create",
    });
  }

  paginationShowTotal(total, range) {
    return `${this.i18n("i18n-5xl7aihzcuy")} ${total} ${this.i18n(
      "i18n-v7xu122b9o"
    )}`;
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page
        ref={this._refsManager.linkRef("outerView")}
        style={{ height: "100%" }}
      >
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
                "en-US": "organization",
                key: "i18n-54sfaqivd5i",
                "zh-CN": "组织管理",
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
                    "en-US": "add organization",
                    key: "i18n-4kyrlfsirm5",
                    "zh-CN": "新增组织",
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
                    size={8}
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
                            "en-US": "all organization",
                            key: "i18n-wbcc2febor",
                            "zh-CN": "全部组织",
                          }),
                          value: "ALL",
                        },
                        {
                          label: this._i18nText({
                            "en-US": "I manage",
                            key: "i18n-66pkydvtrcv",
                            "zh-CN": "我管理的",
                          }),
                          value: "B",
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
                      key: "i18n-bvuyqd393pj",
                      "zh-CN": "输入组织名称或创建人搜索",
                    })}
                    style={{ width: "" }}
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
                      name: "pagination.onChange",
                      relatedEventName: "handlePaginationChange",
                      type: "componentEvent",
                    },
                    {
                      name: "pagination.onShowSizeChange",
                      relatedEventName: "handlePaginationChange",
                      type: "componentEvent",
                    },
                    {
                      name: "onChange",
                      relatedEventName: "handleTableChange",
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
                          to={__$$eval(() => "/organization/" + record.name)}
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
                      key: "i18n-ycr2zketd3o",
                      "zh-CN": "组织名称",
                    }),
                  },
                  {
                    dataIndex: "admin",
                    key: "admin",
                    title: this._i18nText({
                      "en-US": "admin",
                      key: "i18n-inwcelhiing",
                      "zh-CN": "管理员Admin",
                    }),
                  },
                  {
                    _unsafe_MixedSetter_sorter_select: "BoolSetter",
                    dataIndex: "creationTimestamp",
                    key: "creationTimestamp",
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
                    title: this._i18nText({
                      "en-US": "create time",
                      key: "i18n-9ox4rx1wtwv",
                      "zh-CN": "创建时间",
                    }),
                  },
                  {
                    dataIndex: "status",
                    key: "status",
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
                              children: this._i18nText({
                                "en-US": "Deployed",
                                key: "i18n-fifkprltibf",
                                "zh-CN": "Deployed",
                              }),
                              icon: "CheckCircleFilled",
                              id: "Deployed",
                              type: "success",
                            },
                            {
                              _unsafe_MixedSetter_tooltip_select:
                                "VariableSetter",
                              children: this._i18nText({
                                "en-US": "Error",
                                key: "i18n-xtno2l9qqog",
                                "zh-CN": "失败",
                              }),
                              icon: "CloseCircleFilled",
                              id: "Error",
                              tooltip: __$$eval(() => record.reason),
                              type: "error",
                            },
                            {
                              children: this._i18nText({
                                "en-US": "Normal",
                                key: "i18n-fifkprltibf",
                                "zh-CN": "正常",
                              }),
                              icon: "CheckCircleFilled",
                              id: "Deploying",
                              type: "success",
                            },
                            {
                              children: this._i18nText({
                                "en-US": "Normal",
                                key: "i18n-fifkprltibf",
                                "zh-CN": "正常",
                              }),
                              icon: "CheckCircleFilled",
                              id: "Created",
                              type: "success",
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
                            disabled={__$$eval(() =>
                              record?.admin ===
                              __$$context.props.authData?.user?.name
                                ? undefined
                                : "disabled"
                            )}
                            ghost={false}
                            href={__$$eval(
                              () => "/organization/" + record.name
                            )}
                            icon=""
                            shape="default"
                            type="link"
                          >
                            {this._i18nText({
                              "en-US": "Management organization",
                              key: "i18n-m6n5fnxybu",
                              "zh-CN": "管理组织",
                            })}
                          </Button>
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
                dataSource={__$$eval(() =>
                  this.props.useGetOrganizations?.data?.organizations
                    ?.filter((item) => {
                      if (this.state.filter === "ALL") {
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
                  size: "default",
                  total: __$$eval(
                    () =>
                      this.props.useGetOrganizations?.data?.organizations
                        ?.filter((item) => {
                          if (this.state.filter === "ALL") {
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
          open={__$$eval(() => this.state.isOpenModal)}
          title={this._i18nText({
            "en-US": "create organization",
            key: "i18n-tlql06imj7",
            "zh-CN": "创建组织",
          })}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: "left",
              labelCol: 4,
              layout: "horizontal",
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef("formily_create")}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                "x-component-props": {
                  bordered: true,
                  placeholder: this._i18nText({
                    "en-US": "Please enter an organization name",
                    key: "i18n-d6xpwgoamdo",
                    "zh-CN": "请输入组织名称",
                  }),
                },
              }}
              fieldProps={{
                name: "name",
                required: true,
                title: this._i18nText({
                  "en-US": "name",
                  key: "i18n-ycr2zketd3o",
                  "zh-CN": "组织名称",
                }),
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The organization name contains 3 to 10 uppercase and lowercase letters, digits, and underscores",
                      key: "i18n-iiub6ybv6ms",
                      "zh-CN":
                        "组织名称由 3 ~ 10 个大小写字母, 数字, 下划线组成",
                    }),
                    pattern: "^[a-zA-Z0-9_]{3,10}$",
                    required: true,
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                "x-component-props": {
                  placeholder: this._i18nText({
                    "en-US": "Please enter a display name",
                    key: "i18n-bpso2h286ae",
                    "zh-CN": "请输入展示名",
                  }),
                },
              }}
              fieldProps={{
                name: "displayName",
                title: this._i18nText({
                  "en-US": "displayName",
                  key: "i18n-luwmbzt4j2",
                  "zh-CN": "展示名",
                }),
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The display name consists of 0 ~ 20 Chinese and English numbers",
                      key: "i18n-de6rhkx2m7v",
                      "zh-CN": "展示名由 0 ~ 20 个中英文、数字组成",
                    }),
                    pattern: "^[a-zA-Z0-9_\\u4e00-\\u9fa5]{0,20}$",
                  },
                ],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                "x-component-props": {
                  placeholder: this._i18nText({
                    "en-US": "Please enter description",
                    key: "i18n-1247x9lxlbkg",
                    "zh-CN": "请输入组织备注",
                  }),
                },
              }}
              fieldProps={{
                name: "description",
                title: this._i18nText({
                  "en-US": "description",
                  key: "i18n-lu4j2exhudd",
                  "zh-CN": "组织描述",
                }),
                "x-component": "Input.TextArea",
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The organization description consists of 0 to 200 characters",
                      key: "i18n-brvipauy4t4",
                      "zh-CN": "组织描述由 0 ~ 200 字符组成",
                    }),
                    pattern: "^.{0,200}$",
                  },
                ],
              }}
            />
          </FormilyForm>
        </Modal>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath({ path: "/organization" }, location.pathname);
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
          func: "useGetOrganizations",
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
