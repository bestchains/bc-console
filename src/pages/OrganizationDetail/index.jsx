// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
  Row,
  Col,
  Button,
  Card,
  Descriptions,
  Typography,
  Status,
  Icon,
  Space,
  Input,
  Table,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  Alert,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils, { RefsManager } from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

class OrganizationDetail$$Page extends React.Component {
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
    var _this$props$useGetOrg,
      _this$props$useGetOrg2,
      _this$$,
      _this$$$formRef,
      _this$$$formRef$curre;
    const organization =
      ((_this$props$useGetOrg = this.props.useGetOrganization) === null ||
      _this$props$useGetOrg === void 0
        ? void 0
        : (_this$props$useGetOrg2 = _this$props$useGetOrg.data) === null ||
          _this$props$useGetOrg2 === void 0
        ? void 0
        : _this$props$useGetOrg2.organization) || {};
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
        var _concat;
        const res = await this.props.appHelper.utils.bff.updateOrganization({
          name: organization.name,
          organization: {
            users:
              (_concat = (
                (organization === null || organization === void 0
                  ? void 0
                  : organization.users) || []
              ).concat({
                name: v.name,
                isOrganizationAdmin: !!v.isOrganizationAdmin === "true",
              })) === null || _concat === void 0
                ? void 0
                : _concat.map((item) => item.name),
          },
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-x26twb9oy0l"),
        });
        this.props.useGetOrganization.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-43getajmxf3"),
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
    var _this$props$useGetOrg, _this$props$useGetOrg2, _filter;
    const organization =
      ((_this$props$useGetOrg = this.props.useGetOrganization) === null ||
      _this$props$useGetOrg === void 0
        ? void 0
        : (_this$props$useGetOrg2 = _this$props$useGetOrg.data) === null ||
          _this$props$useGetOrg2 === void 0
        ? void 0
        : _this$props$useGetOrg2.organization) || {};
    const users =
      (_filter = (
        (organization === null || organization === void 0
          ? void 0
          : organization.users) || []
      ).filter((item) => {
        var _this$state$record;
        return (
          item.name !==
          ((_this$state$record = this.state.record) === null ||
          _this$state$record === void 0
            ? void 0
            : _this$state$record.name)
        );
      })) === null || _filter === void 0
        ? void 0
        : _filter.map((item) => item.name);
    try {
      await this.props.appHelper.utils.bff.updateOrganization({
        name: organization.name,
        organization: {
          users,
        },
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n("i18n-yy3f9rxigm"),
      });
      this.props.useGetOrganization.mutate();
    } catch (error) {
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n("i18n-p5gea1q7fem"),
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

  confirmTransferModal(e, payload) {
    var _this$props$useGetOrg,
      _this$props$useGetOrg2,
      _this$$,
      _this$$$formRef,
      _this$$$formRef$curre;
    const organization =
      ((_this$props$useGetOrg = this.props.useGetOrganization) === null ||
      _this$props$useGetOrg === void 0
        ? void 0
        : (_this$props$useGetOrg2 = _this$props$useGetOrg.data) === null ||
          _this$props$useGetOrg2 === void 0
        ? void 0
        : _this$props$useGetOrg2.organization) || {};
    const form =
      (_this$$ = this.$("formily_transfer")) === null || _this$$ === void 0
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
        await this.props.appHelper.utils.bff.updateOrganization({
          name: organization.name,
          organization: v,
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-hjonznxjara"),
        });
        this.props.useGetOrganization.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-zzu9mo73zo"),
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

  openDeleteModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: "delete",
      record: payload === null || payload === void 0 ? void 0 : payload.record,
    });
  }

  openTransferModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: "transfer",
      record: payload === null || payload === void 0 ? void 0 : payload.record,
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
            <Button.Back
              __component_name="Button.Back"
              title={this._i18nText({
                "en-US": "Management organization",
                key: "i18n-m6n5fnxybu",
                "zh-CN": "管理组织",
              })}
              type="simple"
            />
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
              <Descriptions
                __component_name="Descriptions"
                bordered={false}
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
                        style={{ fontSize: "" }}
                      >
                        {__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization
                              ?.users?.length
                        )}
                      </Typography.Text>
                    ),
                    key: "r4gchd14zz",
                    label: this._i18nText({
                      "en-US": "Total organizational users",
                      key: "i18n-v4wf8ejznd",
                      "zh-CN": "组织用户总数",
                    }),
                    span: 1,
                  },
                  {
                    children: (
                      <Status
                        __component_name="Status"
                        id={__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization
                              ?.status
                        )}
                        types={[
                          {
                            children: "未知",
                            icon: "tenx-ui-icon:Circle",
                            id: "disabled",
                            type: "disabled",
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
                              "en-US": "Error",
                              key: "i18n-xtno2l9qqog",
                              "zh-CN": "异常",
                            }),
                            icon: "CloseCircleFilled",
                            id: "Error",
                            type: "error",
                          },
                          {
                            children: this._i18nText({
                              "en-US": "Normal",
                              key: "i18n-fifkprltibf",
                              "zh-CN": "正常",
                            }),
                            icon: "CheckCircleFilled",
                            id: "Deployed",
                            type: "success",
                          },
                        ]}
                      />
                    ),
                    key: "bdr5go2aun",
                    label: this._i18nText({
                      "en-US": "status",
                      key: "i18n-bik6xl952y6",
                      "zh-CN": "状态",
                    }),
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Time
                        __component_name="Typography.Time"
                        format=""
                        time={__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization
                              ?.creationTimestamp
                        )}
                      />
                    ),
                    key: "lu5nygtudhq",
                    label: this._i18nText({
                      "en-US": "Creation time",
                      key: "i18n-9ox4rx1wtwv",
                      "zh-CN": "创建时间",
                    }),
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Time
                        __component_name="Typography.Time"
                        format=""
                        time={__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization
                              ?.lastHeartbeatTime
                        )}
                      />
                    ),
                    key: "o0cvbxwkrj",
                    label: this._i18nText({
                      "en-US": "Last update time",
                      key: "i18n-5er0ayqzcp",
                      "zh-CN": "最近更新时间",
                    }),
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: "" }}
                      >
                        {__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization
                              ?.description
                        )}
                      </Typography.Text>
                    ),
                    key: "eleg9opa0dc",
                    label: this._i18nText({
                      "en-US": "introduce",
                      key: "i18n-wlgvrke3jz9",
                      "zh-CN": "介绍",
                    }),
                    span: 1,
                  },
                ]}
                labelStyle={{ width: 100 }}
                layout="horizontal"
                size="default"
                title={__$$eval(
                  () => this.props.useGetOrganization?.data?.organization?.name
                )}
              >
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="r4gchd14zz"
                  label={this._i18nText({
                    "en-US": "Total organizational users",
                    key: "i18n-v4wf8ejznd",
                    "zh-CN": "组织用户总数",
                  })}
                  span={1}
                  tab=""
                >
                  {
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: "" }}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization
                            ?.users?.length
                      )}
                    </Typography.Text>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="bdr5go2aun"
                  label={this._i18nText({
                    "en-US": "status",
                    key: "i18n-bik6xl952y6",
                    "zh-CN": "状态",
                  })}
                  span={1}
                  tab=""
                >
                  {
                    <Status
                      __component_name="Status"
                      id={__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization
                            ?.status
                      )}
                      types={[
                        {
                          children: "未知",
                          icon: "tenx-ui-icon:Circle",
                          id: "disabled",
                          type: "disabled",
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
                            "en-US": "Error",
                            key: "i18n-xtno2l9qqog",
                            "zh-CN": "异常",
                          }),
                          icon: "CloseCircleFilled",
                          id: "Error",
                          type: "error",
                        },
                        {
                          children: this._i18nText({
                            "en-US": "Normal",
                            key: "i18n-fifkprltibf",
                            "zh-CN": "正常",
                          }),
                          icon: "CheckCircleFilled",
                          id: "Deployed",
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
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="lu5nygtudhq"
                  label={this._i18nText({
                    "en-US": "Creation time",
                    key: "i18n-9ox4rx1wtwv",
                    "zh-CN": "创建时间",
                  })}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      time={__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization
                            ?.creationTimestamp
                      )}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="o0cvbxwkrj"
                  label={this._i18nText({
                    "en-US": "Last update time",
                    key: "i18n-5er0ayqzcp",
                    "zh-CN": "最近更新时间",
                  })}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      time={__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization
                            ?.lastHeartbeatTime
                      )}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="eleg9opa0dc"
                  label={this._i18nText({
                    "en-US": "introduce",
                    key: "i18n-wlgvrke3jz9",
                    "zh-CN": "介绍",
                  })}
                  span={1}
                >
                  {
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: "" }}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization
                            ?.description
                      )}
                    </Typography.Text>
                  }
                </Descriptions.Item>
              </Descriptions>
            </Card>
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
                    "en-US": "New user",
                    key: "i18n-n5ny2k3khy",
                    "zh-CN": "新增用户",
                  })}
                </Button>
              </Col>
              <Col __component_name="Col">
                <Space
                  __component_name="Space"
                  align="center"
                  direction="horizontal"
                  size="large"
                >
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
                      "en-US": "Enter the user name to search",
                      key: "i18n-gnwdi4ep1vt",
                      "zh-CN": "输入用户名搜索",
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
                    key: "id",
                    title: this._i18nText({
                      "en-US": "User",
                      key: "i18n-289qyoqa3vs",
                      "zh-CN": "用户",
                    }),
                  },
                  {
                    dataIndex: "isOrganizationAdmin",
                    filters: [
                      { text: "admin", value: true },
                      { text: "client", value: false },
                    ],
                    key: "isOrganizationAdmin",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: "" }}
                        >
                          {__$$eval(() =>
                            record.isOrganizationAdmin ? "admin" : "client"
                          )}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "Type",
                      key: "i18n-9yrquy3v2y7",
                      "zh-CN": "类型",
                    }),
                  },
                  {
                    dataIndex: "op",
                    render: (text, record, index) =>
                      ((__$$context) => [
                        !!__$$eval(() => record.isOrganizationAdmin) && (
                          <Button
                            __component_name="Button"
                            __events={{
                              eventDataList: [
                                {
                                  name: "onClick",
                                  paramStr: "{\n \trecord: this.record\n}",
                                  relatedEventName: "openTransferModal",
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
                            icon=""
                            onClick={function () {
                              this.openTransferModal.apply(
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
                            {this._i18nText({
                              "en-US": "transfer",
                              key: "i18n-v10ihnkwhn",
                              "zh-CN": "转移",
                            })}
                          </Button>
                        ),
                        !!__$$eval(() => !record.isOrganizationAdmin) && (
                          <Button
                            __component_name="Button"
                            __events={{
                              eventDataList: [
                                {
                                  name: "onClick",
                                  paramStr: "{\n \trecord: this.record \n}",
                                  relatedEventName: "openDeleteModal",
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
                            icon=""
                            onClick={function () {
                              this.openDeleteModal.apply(
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
                            {this._i18nText({
                              "en-US": "delete",
                              key: "i18n-ias68eipm18",
                              "zh-CN": "删除",
                            })}
                          </Button>
                        ),
                      ])(
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
                    width: 100,
                  },
                ]}
                dataSource={__$$eval(() =>
                  this.props.useGetOrganization?.data?.organization?.users
                    ?.filter((item) => {
                      const arr = this.state.filters?.isOrganizationAdmin;
                      return arr?.length > 0
                        ? arr.some((key) => item.isOrganizationAdmin === key)
                        : true;
                    })
                    ?.filter((item) => {
                      return this.state.searchValue
                        ? item.name?.includes(this.state.searchValue)
                        : true;
                    })
                )}
                loading={__$$eval(() => this.props.useGetOrganization?.loading)}
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
                      this.props.useGetOrganization?.data?.organization?.users
                        ?.filter((item) => {
                          const arr = this.state.filters?.isOrganizationAdmin;
                          return arr?.length > 0
                            ? arr.some(
                                (key) => item.isOrganizationAdmin === key
                              )
                            : true;
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
          open={__$$eval(
            () => this.state.modalType === "create" && this.state.isOpenModal
          )}
          title={this._i18nText({
            "en-US": "New user",
            key: "i18n-n5ny2k3khy",
            "zh-CN": "新增用户",
          })}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: "left",
              labelCol: 5,
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
                    "en-US": "Please enter the user name",
                    key: "i18n-ttjyzz0s45l",
                    "zh-CN": "请输入用户名称",
                  }),
                },
              }}
              fieldProps={{
                name: "name",
                required: true,
                title: this._i18nText({
                  "en-US": "User",
                  key: "i18n-289qyoqa3vs",
                  "zh-CN": "用户",
                }),
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The user name contains 3 to 20 letters, digits, and underscores",
                      key: "i18n-ch5wgxkhdhs",
                      "zh-CN":
                        "用户名称由 3 ~ 20 个大小写字母, 数字, 下划线组成",
                    }),
                    pattern: "^[a-zA-Z0-9_]{3,10}$",
                    required: true,
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                "x-component-props": {
                  allowClear: false,
                  disabled: true,
                  placeholder: this._i18nText({
                    "en-US": "Please select a user type",
                    key: "i18n-6a9y7k26xhq",
                    "zh-CN": "请选择用户类型",
                  }),
                },
              }}
              fieldProps={{
                default: "client",
                enum: [
                  { children: [], label: "admin", value: "true" },
                  { children: [], label: "client", value: "false" },
                ],
                name: "isOrganizationAdmin",
                title: this._i18nText({
                  "en-US": "Configuring the user Type",
                  key: "i18n-irf019z3fd",
                  "zh-CN": "配置用户类型",
                }),
                "x-validator": [],
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
                relatedEventName: "confirmTransferModal",
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
            this.confirmTransferModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.modalType === "transfer" && this.state.isOpenModal
          )}
          title={this._i18nText({
            "en-US": "Transfer administrator rights",
            key: "i18n-armm7kw0zpr",
            "zh-CN": "转移管理员权限",
          })}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: "left",
              labelCol: 6,
              layout: "horizontal",
              wrapperCol: 18,
            }}
            ref={this._refsManager.linkRef("formily_transfer")}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                "x-component-props": {
                  bordered: true,
                  placeholder: this._i18nText({
                    "en-US": "Please enter the user name",
                    key: "i18n-ttjyzz0s45l",
                    "zh-CN": "请输入用户名称",
                  }),
                },
              }}
              fieldProps={{
                name: "admin",
                required: true,
                title: this._i18nText({
                  "en-US": "New administrator",
                  key: "i18n-0tsputxj615",
                  "zh-CN": "新的管理员用户",
                }),
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The user name contains 3 to 20 letters, digits, and underscores",
                      key: "i18n-ch5wgxkhdhs",
                      "zh-CN":
                        "用户名称由 3 ~ 20 个大小写字母, 数字, 下划线组成",
                    }),
                    pattern: "^[a-zA-Z0-9_]{3,10}$",
                    required: true,
                    whitespace: true,
                  },
                ],
              }}
            />
          </FormilyForm>
          <Alert
            __component_name="Alert"
            bordered="none"
            message={this._i18nText({
              "en-US":
                "Tip: After confirmation, all administrator permissions are transferred to the new user",
              key: "i18n-3ja6wz9xvoh",
              "zh-CN": "提示：确认后，管理员权限将全部转移给新用户",
            })}
            showIcon={true}
            type="warning"
          />
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
            () => this.state.modalType === "delete" && this.state.isOpenModal
          )}
          title={this._i18nText({
            "en-US": "Delete a user",
            key: "i18n-h52hay1ld2s",
            "zh-CN": "删除用户",
          })}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            message={[
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: "" }}
              >
                {this._i18nText({
                  "en-US": "You are moving from the organization",
                  key: "i18n-3lwzud889in",
                  "zh-CN": "您正在从组织",
                })}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: "" }}
              >
                {__$$eval(
                  () => this.props.useGetOrganization?.data?.organization?.name
                )}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: "" }}
              >
                {this._i18nText({
                  "en-US": "Delete a user from",
                  key: "i18n-nm17suv2xhh",
                  "zh-CN": "中删除用户",
                })}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: "" }}
              >
                {__$$eval(() => this.state.record && this.state.record.name)}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: "" }}
              >
                {this._i18nText({
                  "en-US":
                    "，After the user is deleted, all permissions under the organization will be revoked",
                  key: "i18n-h8159rss9ij",
                  "zh-CN": "，删除后，用户在该组织下所有权限将被收回",
                })}
              </Typography.Text>,
            ]}
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
  const match = matchPath({ path: "/organization/:id" }, location.pathname);
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
          func: "useGetOrganization",
          params: { name: self.match?.params?.id },
        },
      ]}
      render={(dataProps) => (
        <OrganizationDetail$$Page
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
