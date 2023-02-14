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
  Radio,
  Space,
  Input,
  Table,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  FormilyTextArea,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils, { RefsManager } from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

class ProposalDetail$$Page extends React.Component {
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
      types: [
        {
          text: this.i18n("i18n-gspz6pec67u"),
          value: "AddMemberProposal",
        },
        {
          text: this.i18n("i18n-l0it3k61ec"),
          value: "CreateFederationProposal",
        },
        {
          text: this.i18n("i18n-rufvxaz1mnc"),
          value: "DeleteMemberProposal",
        },
        {
          text: this.i18n("i18n-i7slyi98o4e"),
          value: "DissolveFederationProposal",
        },
        {
          text: this.i18n("i18n-9utg1r58kz"),
          value: "DissolveNetworkProposal",
        },
      ],
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

  confirmEditModal(e, payload) {
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
      var _this$state$record, _this$state$record2;
      const params = {
        name:
          (_this$state$record = this.state.record) === null ||
          _this$state$record === void 0
            ? void 0
            : _this$state$record.name,
        organization:
          (_this$state$record2 = this.state.record) === null ||
          _this$state$record2 === void 0
            ? void 0
            : _this$state$record2.organizationName,
        vote: {
          decision: v.decision === "true",
          description: v.description,
        },
      };
      try {
        const res = await this.props.appHelper.utils.bff.updateVote(params);
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-o6h4ay1jnp"),
        });
        this.props.useGetProposal.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-z0me61yhdpc"),
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

  openEditModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: "edit",
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
                "en-US": "Details of proposal",
                key: "i18n-ks9tefvs1g",
                "zh-CN": "提议详情",
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
              loading={__$$eval(() => this.props.useGetProposal?.loading)}
              size="default"
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
                            `${
                              this.props.useGetProposal?.data?.proposal
                                ?.initiator?.name
                            }(${
                              this.props.useGetProposal?.data?.proposal
                                ?.initiator?.admin || "-"
                            })`
                        )}
                      </Typography.Text>
                    ),
                    key: "r4gchd14zz",
                    label: this._i18nText({
                      "en-US": "initiator",
                      key: "i18n-nijfmnd2nf",
                      "zh-CN": "发起人",
                    }),
                    span: 1,
                  },
                  {
                    children: __$$eval(
                      () =>
                        this.state.types?.find(
                          (item) =>
                            item.value ===
                            this.props.useGetProposal?.data?.proposal?.type
                        )?.text || "-"
                    ),
                    key: "bdr5go2aun",
                    label: this._i18nText({
                      "en-US": "Proposal type",
                      key: "i18n-6bj0f7fay8",
                      "zh-CN": "提议类型",
                    }),
                    span: 1,
                  },
                  {
                    children: __$$eval(
                      () =>
                        this.props.useGetProposal?.data?.proposal?.federation ||
                        "-"
                    ),
                    key: "fh1j44o9bpr",
                    label: this._i18nText({
                      "en-US": "Related federation",
                      key: "i18n-h05l2cens9w",
                      "zh-CN": "相关联盟",
                    }),
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
                            this.props.useGetProposal?.data?.proposal
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
                        relativeTime={false}
                        time={__$$eval(
                          () => this.props.useGetProposal?.data?.proposal?.endAt
                        )}
                      />
                    ),
                    key: "o0cvbxwkrj",
                    label: this._i18nText({
                      "en-US": "Cut-off time",
                      key: "i18n-v1ic8b3llyo",
                      "zh-CN": "截止时间",
                    }),
                    span: 1,
                  },
                  {
                    children: (
                      <Status
                        __component_name="Status"
                        id={__$$eval(
                          () =>
                            this.props.useGetProposal?.data?.proposal?.status
                        )}
                        types={[
                          {
                            children: this._i18nText({
                              "en-US": "Pending",
                              key: "i18n-pmpcxrn4hxn",
                              "zh-CN": "等待中",
                            }),
                            icon: "ClockCircleFilled",
                            id: "Pending",
                            type: "warning",
                          },
                          {
                            children: this._i18nText({
                              "en-US": "Voting",
                              key: "i18n-cj4k368h6p9",
                              "zh-CN": "投票中",
                            }),
                            icon: "CheckCircleFilled",
                            id: "Voting",
                            type: "success",
                          },
                          {
                            children: this._i18nText({
                              "en-US": "Succeeded",
                              key: "i18n-6sh24mree",
                              "zh-CN": "提议成功",
                            }),
                            icon: "CheckCircleFilled",
                            id: "Succeeded",
                            type: "success",
                          },
                          {
                            children: this._i18nText({
                              "en-US": "Failed",
                              key: "i18n-i94pxfwl0cb",
                              "zh-CN": "提议失败",
                            }),
                            icon: "CloseCircleFilled",
                            id: "Failed",
                            type: "error",
                          },
                          {
                            children: this._i18nText({
                              "en-US": "Expired",
                              key: "i18n-6ojbq0y628y",
                              "zh-CN": "提议超时",
                            }),
                            icon: "CloseCircleFilled",
                            id: "Expired",
                            type: "error",
                          },
                          {
                            children: this._i18nText({
                              "en-US": "Error",
                              key: "i18n-ibaeqidf0n",
                              "zh-CN": "提议异常",
                            }),
                            icon: "CloseCircleFilled",
                            id: "Error",
                            type: "error",
                          },
                        ]}
                      />
                    ),
                    key: "mljbt4bcmo",
                    label: this._i18nText({
                      "en-US": "status",
                      key: "i18n-bik6xl952y6",
                      "zh-CN": "状态",
                    }),
                    span: 1,
                  },
                  {
                    _unsafe_MixedSetter_children_select: "SlotSetter",
                    children: null,
                    key: "h44w5btrr16",
                    label: this._i18nText({
                      "en-US": "content",
                      key: "i18n-pair5ijzb3j",
                      "zh-CN": "内容",
                    }),
                    span: 1,
                  },
                ]}
                labelStyle={{ width: 100 }}
                layout="horizontal"
                size="default"
              >
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="r4gchd14zz"
                  label={this._i18nText({
                    "en-US": "initiator",
                    key: "i18n-nijfmnd2nf",
                    "zh-CN": "发起人",
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
                          `${
                            this.props.useGetProposal?.data?.proposal?.initiator
                              ?.name
                          }(${
                            this.props.useGetProposal?.data?.proposal?.initiator
                              ?.admin || "-"
                          })`
                      )}
                    </Typography.Text>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="bdr5go2aun"
                  label={this._i18nText({
                    "en-US": "Proposal type",
                    key: "i18n-6bj0f7fay8",
                    "zh-CN": "提议类型",
                  })}
                  span={1}
                  tab=""
                >
                  {__$$eval(
                    () =>
                      this.state.types?.find(
                        (item) =>
                          item.value ===
                          this.props.useGetProposal?.data?.proposal?.type
                      )?.text || "-"
                  )}
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="fh1j44o9bpr"
                  label={this._i18nText({
                    "en-US": "Related federation",
                    key: "i18n-h05l2cens9w",
                    "zh-CN": "相关联盟",
                  })}
                  span={1}
                >
                  {__$$eval(
                    () =>
                      this.props.useGetProposal?.data?.proposal?.federation ||
                      "-"
                  )}
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
                      relativeTime={false}
                      time={__$$eval(
                        () =>
                          this.props.useGetProposal?.data?.proposal
                            ?.creationTimestamp
                      )}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="o0cvbxwkrj"
                  label={this._i18nText({
                    "en-US": "Cut-off time",
                    key: "i18n-v1ic8b3llyo",
                    "zh-CN": "截止时间",
                  })}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      relativeTime={false}
                      time={__$$eval(
                        () => this.props.useGetProposal?.data?.proposal?.endAt
                      )}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="mljbt4bcmo"
                  label={this._i18nText({
                    "en-US": "status",
                    key: "i18n-bik6xl952y6",
                    "zh-CN": "状态",
                  })}
                  span={1}
                >
                  {
                    <Status
                      __component_name="Status"
                      id={__$$eval(
                        () => this.props.useGetProposal?.data?.proposal?.status
                      )}
                      types={[
                        {
                          children: this._i18nText({
                            "en-US": "Pending",
                            key: "i18n-pmpcxrn4hxn",
                            "zh-CN": "等待中",
                          }),
                          icon: "ClockCircleFilled",
                          id: "Pending",
                          type: "warning",
                        },
                        {
                          children: this._i18nText({
                            "en-US": "Voting",
                            key: "i18n-cj4k368h6p9",
                            "zh-CN": "投票中",
                          }),
                          icon: "CheckCircleFilled",
                          id: "Voting",
                          type: "success",
                        },
                        {
                          children: this._i18nText({
                            "en-US": "Succeeded",
                            key: "i18n-6sh24mree",
                            "zh-CN": "提议成功",
                          }),
                          icon: "CheckCircleFilled",
                          id: "Succeeded",
                          type: "success",
                        },
                        {
                          children: this._i18nText({
                            "en-US": "Failed",
                            key: "i18n-i94pxfwl0cb",
                            "zh-CN": "提议失败",
                          }),
                          icon: "CloseCircleFilled",
                          id: "Failed",
                          type: "error",
                        },
                        {
                          children: this._i18nText({
                            "en-US": "Expired",
                            key: "i18n-6ojbq0y628y",
                            "zh-CN": "提议超时",
                          }),
                          icon: "CloseCircleFilled",
                          id: "Expired",
                          type: "error",
                        },
                        {
                          children: this._i18nText({
                            "en-US": "Error",
                            key: "i18n-ibaeqidf0n",
                            "zh-CN": "提议异常",
                          }),
                          icon: "CloseCircleFilled",
                          id: "Error",
                          type: "error",
                        },
                      ]}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="h44w5btrr16"
                  label={this._i18nText({
                    "en-US": "content",
                    key: "i18n-pair5ijzb3j",
                    "zh-CN": "内容",
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
                      {__$$eval(() =>
                        JSON.stringify(
                          this.props.useGetProposal?.data?.proposal
                            ?.information || {}
                        )
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
                        "en-US": "all",
                        key: "i18n-w8mwq8gtr08",
                        "zh-CN": "全部",
                      }),
                      value: "ALL",
                    },
                    {
                      label: this._i18nText({
                        "en-US": "Have voted",
                        key: "i18n-ldhfyodm92n",
                        "zh-CN": "已投票",
                      }),
                      value: "Voted",
                    },
                    {
                      disabled: false,
                      label: this._i18nText({
                        "en-US": "unvoted",
                        key: "i18n-tu47rri2uk",
                        "zh-CN": "未投票",
                      }),
                      value: "NotVoted",
                    },
                  ]}
                  size="middle"
                  value={__$$eval(() => this.state.filter)}
                />
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
                      "en-US": "Enter voter search",
                      key: "i18n-pjire30gfe",
                      "zh-CN": "输入投票人搜索",
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
                    dataIndex: "organizationAdmin",
                    key: "organizationAdmin",
                    title: this._i18nText({
                      "en-US": "voter",
                      key: "i18n-dt2juiko79s",
                      "zh-CN": "投票人",
                    }),
                  },
                  {
                    dataIndex: "organizationName",
                    key: "organizationName",
                    title: this._i18nText({
                      "en-US": "Affiliated organization",
                      key: "i18n-nkfizmvwbzo",
                      "zh-CN": "所属组织",
                    }),
                  },
                  {
                    dataIndex: "voteTime",
                    key: "voteTime",
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
                    title: this._i18nText({
                      "en-US": "Voting time",
                      key: "i18n-kcfnvyebgwr",
                      "zh-CN": "投票时间",
                    }),
                  },
                  {
                    dataIndex: "decision",
                    key: "decision",
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
                            text
                              ? __$$context.i18n("i18n-mwsw0gqsjf")
                              : text + "" === "false"
                              ? __$$context.i18n("i18n-n7pr8w2kqpn")
                              : "-"
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
                      "en-US": "decide",
                      key: "i18n-sndszzqhg7j",
                      "zh-CN": "决定",
                    }),
                  },
                  {
                    dataIndex: "description",
                    key: "description",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: "" }}
                        >
                          {__$$eval(() => text || "-")}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "cause",
                      key: "i18n-7s50z0jhy96",
                      "zh-CN": "原因",
                    }),
                  },
                  {
                    dataIndex: "status",
                    key: "status",
                    title: this._i18nText({
                      "en-US": "stage",
                      key: "i18n-9j32uhzao7",
                      "zh-CN": "阶段",
                    }),
                  },
                  {
                    dataIndex: "op",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Button
                          __component_name="Button"
                          __events={{
                            eventDataList: [
                              {
                                name: "onClick",
                                paramStr: '{\n \t "record": this.record\n}',
                                relatedEventName: "openEditModal",
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
                          disabled={__$$eval(
                            () =>
                              record.organizationAdmin !==
                                __$$context.props.authData?.user?.name ||
                              new Date(
                                __$$context.props.useGetProposal?.data?.proposal?.endAt
                              ).getTime() < new Date().getTime() ||
                              ["Voted", "Finished"].includes(record.status)
                          )}
                          ghost={false}
                          icon=""
                          onClick={function () {
                            this.openEditModal.apply(
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
                            "en-US": "update",
                            key: "i18n-eirr55ndhxk",
                            "zh-CN": "更新",
                          })}
                        </Button>
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
                    width: 100,
                  },
                ]}
                dataSource={__$$eval(
                  () =>
                    this.props.useGetProposal?.data?.proposal?.votes
                      ?.filter((item) => {
                        if (this.state.filter === "ALL") {
                          return true;
                        }
                        if (this.state.filter === "NotVoted") {
                          return item.status === "NotVoted";
                        }
                        if (this.state.filter === "Voted") {
                          return item.status === "Voted";
                        }
                        return true;
                      })
                      ?.filter((item) => {
                        return this.state.searchValue
                          ? item.organizationAdmin?.includes(
                              this.state.searchValue
                            )
                          : true;
                      }) || []
                )}
                loading={__$$eval(() => this.props.useGetProposal?.loading)}
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
                        this.props.useGetProposal?.data?.proposal?.votes
                          ?.filter((item) => {
                            if (this.state.filter === "ALL") {
                              return true;
                            }
                            if (this.state.filter === "NotVoted") {
                              return item.status === "NotVoted";
                            }
                            if (this.state.filter === "Voted") {
                              return item.status === "Voted";
                            }
                            return true;
                          })
                          ?.filter((item) => {
                            return this.state.searchValue
                              ? item.organizationAdmin?.includes(
                                  this.state.searchValue
                                )
                              : true;
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
                relatedEventName: "confirmEditModal",
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
            this.confirmEditModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.isOpenModal)}
          title={this._i18nText({
            "en-US": "Update vote",
            key: "i18n-r2egx18xw9c",
            "zh-CN": "更新投票",
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
                "x-component-props": { bordered: true, placeholder: "请输入" },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: "VariableSetter",
                default: __$$eval(
                  () => this.props.useGetProposal?.data?.proposal?.name
                ),
                name: "name",
                required: false,
                title: this._i18nText({
                  "en-US": "Proposed name",
                  key: "i18n-d3zo18q4hrn",
                  "zh-CN": "提议名称",
                }),
                "x-pattern": "disabled",
                "x-validator": [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                "x-component-props": {
                  bordered: true,
                  placeholder: this._i18nText({
                    "en-US": "Please select a proposal type",
                    key: "i18n-f83f1t03e",
                    "zh-CN": "请选择提议类型",
                  }),
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: "VariableSetter",
                default: __$$eval(
                  () => this.props.useGetProposal?.data?.proposal?.type
                ),
                name: "type",
                required: false,
                title: this._i18nText({
                  "en-US": "Proposal type",
                  key: "i18n-6bj0f7fay8",
                  "zh-CN": "提议类型",
                }),
                "x-pattern": "disabled",
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
                    "en-US": "Please choose to decide",
                    key: "i18n-onidezp69vb",
                    "zh-CN": "请选择决定",
                  }),
                },
              }}
              fieldProps={{
                enum: [
                  { children: [], label: "同意", value: "true" },
                  { children: [], label: "不同意", value: "false" },
                ],
                name: "decision",
                required: true,
                title: this._i18nText({
                  "en-US": "decide",
                  key: "i18n-sndszzqhg7j",
                  "zh-CN": "决定",
                }),
                "x-validator": [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                "x-component-props": {
                  placeholder: this._i18nText({
                    "en-US": "Please enter the reason",
                    key: "i18n-21s244w63fc",
                    "zh-CN": "请输入原因",
                  }),
                },
              }}
              fieldProps={{
                name: "description",
                title: this._i18nText({
                  "en-US": "cause",
                  key: "i18n-7s50z0jhy96",
                  "zh-CN": "原因",
                }),
                "x-component": "Input.TextArea",
                "x-validator": [
                  {
                    message: this._i18nText({
                      "en-US":
                        "The cause description consists of 0 to 200 characters",
                      key: "i18n-l0t1y311yy",
                      "zh-CN": "原因描述由 0 ~ 200 字符组成",
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
  const match = matchPath({ path: "/proposal/:id" }, location.pathname);
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
          func: "useGetProposal",
          params: {
            name: self.match?.params?.id,
          },
        },
      ]}
      render={(dataProps) => (
        <ProposalDetail$$Page
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
