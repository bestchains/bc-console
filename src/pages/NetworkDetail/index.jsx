// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
  Row,
  Col,
  Button,
  Card,
  Tabs,
  Spin,
  Descriptions,
  Typography,
  Status,
  Table,
  Icon,
  Space,
  Input,
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

class NetworkDetail$$Page extends React.Component {
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
      channelCurrent: 1,
      channelRecord: {},
      channelSize: 10,
      current: 1,
      filter: "ALL",
      isOpenModal: false,
      modalType: "addchannel",
      organizations: [],
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

  confirmAddChannelModal(e, payload) {
    var _this$props$useGetNet,
      _this$props$useGetNet2,
      _this$$,
      _this$$$formRef,
      _this$$$formRef$curre;
    const network =
      ((_this$props$useGetNet = this.props.useGetNetwork) === null ||
      _this$props$useGetNet === void 0
        ? void 0
        : (_this$props$useGetNet2 = _this$props$useGetNet.data) === null ||
          _this$props$useGetNet2 === void 0
        ? void 0
        : _this$props$useGetNet2.network) || {};
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
      console.log(v);
      try {
        // const res = await this.props.appHelper.utils.bff.addOrganizationToFederation({
        //   name: network?.name,
        //   organizations: v.organizations,
        //   initiator: network?.initiator?.name
        // })
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-l8fybssesij"),
        });
        this.props.useGetNetwork.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-85kkwp67i5u"),
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

  async confirmDeleteChannelModal(e, payload) {
    // const federation = this.props.useGetFederation?.data?.federation || {}
    // try {
    //   await this.props.appHelper.utils.bff.removeOrganizationToFederation({
    //     name: federation?.name,
    //     organization: this.state.channelRecord?.name,
    //     initiator: federation?.initiator?.name
    //   })
    //   this.closeModal()
    //   this.utils.notification.success({
    //     message: this.i18n('i18n-yy3f9rxigm'),
    //   })
    //   this.props.useGetFederation.mutate()
    // } catch (error) {
    //   this.utils.notification.warnings({
    //     message: this.i18n('i18n-p5gea1q7fem'),
    //     errors: error?.response?.errors
    //   })
    // }
  }

  handleChannelPaginationChange(c, s) {
    this.setState({
      size: s,
      current: c,
    });
  }

  handleChannelTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
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
    });
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
    });
  }

  openAddChannelModal() {
    this.setState({
      isOpenModal: true,
      modalType: "addchannel",
    });
  }

  openDeleteChannelModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: "delete",
      channelRecord:
        payload === null || payload === void 0 ? void 0 : payload.record,
    });
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
      <Page>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Button.Back
              __component_name="Button.Back"
              title={this._i18nText({
                "en-US": "Network details",
                key: "i18n-hpj9pfyfpq",
                "zh-CN": "网络详情",
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
              loading={false}
              size="default"
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
                          () => this.props.useGetNetwork?.loading
                        )}
                      >
                        <Descriptions
                          __component_name="Descriptions"
                          bordered={false}
                          colon={false}
                          column={1}
                          items={[
                            {
                              children: __$$eval(
                                () =>
                                  this.props.useGetNetwork?.data?.network
                                    ?.initiator?.admin || "-"
                              ),
                              key: "r4gchd14zz",
                              label: this._i18nText({
                                "en-US": "creator",
                                key: "i18n-yyexdt18ora",
                                "zh-CN": "创建人",
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
                                      this.props.useGetNetwork?.data?.network
                                        ?.organizations?.length || "0"
                                  )}
                                </Typography.Text>
                              ),
                              key: "bdr5go2aun",
                              label: this._i18nText({
                                "en-US": "Number of members",
                                key: "i18n-4btnh7pqt1m",
                                "zh-CN": "成员个数",
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
                                      this.props.useGetNetwork?.data?.network
                                        ?.creationTimestamp
                                  )}
                                />
                              ),
                              key: "o0cvbxwkrj",
                              label: this._i18nText({
                                "en-US": "create time",
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
                                    () =>
                                      this.props.useGetNetwork?.data?.network
                                        ?.joinedAt
                                  )}
                                />
                              ),
                              key: "8ei6l6dk6xn",
                              label: this._i18nText({
                                "en-US": "Update time",
                                key: "i18n-watjije0jk",
                                "zh-CN": "更新时间",
                              }),
                              span: 1,
                            },
                            {
                              children: __$$eval(
                                () =>
                                  this.props.useGetNetwork?.data?.network
                                    ?.version || "-"
                              ),
                              key: "mljbt4bcmo",
                              label: this._i18nText({
                                "en-US": "Version",
                                key: "i18n-hbf63hki898",
                                "zh-CN": "版本",
                              }),
                              span: 1,
                            },
                            {
                              children: (
                                <Descriptions
                                  __component_name="Descriptions"
                                  bordered={false}
                                  colon={true}
                                  column={1}
                                  items={[
                                    {
                                      children: null,
                                      key: "ufknvxft0u",
                                      label: this._i18nText({
                                        "en-US": "Consensus algorithm",
                                        key: "i18n-twykcar3l6l",
                                        "zh-CN": "共识算法",
                                      }),
                                      span: 1,
                                    },
                                    {
                                      children: null,
                                      key: "81dsq3cni9b",
                                      label: this._i18nText({
                                        "en-US": "Cluster size",
                                        key: "i18n-ax4swl3ryv7",
                                        "zh-CN": "集群大小",
                                      }),
                                      span: 1,
                                    },
                                    {
                                      children: null,
                                      key: "634p9mdxipk",
                                      label: this._i18nText({
                                        "en-US": "Node database",
                                        key: "i18n-kqc5q3s99wo",
                                        "zh-CN": "节点数据库",
                                      }),
                                      span: 1,
                                    },
                                  ]}
                                  labelStyle={{ width: 100 }}
                                  layout="horizontal"
                                  size="default"
                                  title=""
                                >
                                  <Descriptions.Item
                                    __component_name="Descriptions.Item"
                                    key="ufknvxft0u"
                                    label={this._i18nText({
                                      "en-US": "Consensus algorithm",
                                      key: "i18n-twykcar3l6l",
                                      "zh-CN": "共识算法",
                                    })}
                                    span={1}
                                  >
                                    {null}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    __component_name="Descriptions.Item"
                                    key="81dsq3cni9b"
                                    label={this._i18nText({
                                      "en-US": "Cluster size",
                                      key: "i18n-ax4swl3ryv7",
                                      "zh-CN": "集群大小",
                                    })}
                                    span={1}
                                  >
                                    {null}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    __component_name="Descriptions.Item"
                                    key="634p9mdxipk"
                                    label={this._i18nText({
                                      "en-US": "Node database",
                                      key: "i18n-kqc5q3s99wo",
                                      "zh-CN": "节点数据库",
                                    })}
                                    span={1}
                                  >
                                    {null}
                                  </Descriptions.Item>
                                </Descriptions>
                              ),
                              key: "i1zeuy7pn4n",
                              label: this._i18nText({
                                "en-US": "Consensus component",
                                key: "i18n-xgyxfdl8q",
                                "zh-CN": "共识组件",
                              }),
                              span: 1,
                            },
                            {
                              children: (
                                <Status
                                  __component_name="Status"
                                  id={__$$eval(
                                    () =>
                                      this.props.useGetNetwork?.data?.network
                                        ?.status
                                  )}
                                  types={[
                                    {
                                      children: this._i18nText({
                                        "en-US": "NetworkCreated",
                                        key: "i18n-zrowlr7zwx",
                                        "zh-CN": "运行中",
                                      }),
                                      icon: "CheckCircleFilled",
                                      id: "NetworkCreated",
                                      type: "success",
                                    },
                                    {
                                      children: this._i18nText({
                                        "en-US": "NetworkDissolved",
                                        key: "i18n-j3czm9su41",
                                        "zh-CN": "已解散",
                                      }),
                                      icon: "CloseCircleFilled",
                                      id: "NetworkDissolved",
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
                              ),
                              key: "s3t5k3dk449",
                              label: this._i18nText({
                                "en-US": "status",
                                key: "i18n-bik6xl952y6",
                                "zh-CN": "状态",
                              }),
                              span: 1,
                            },
                          ]}
                          labelStyle={{ width: 100 }}
                          layout="horizontal"
                          size="default"
                          title={__$$eval(
                            () => this.props.useGetNetwork?.data?.network?.name
                          )}
                        >
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="r4gchd14zz"
                            label={this._i18nText({
                              "en-US": "creator",
                              key: "i18n-yyexdt18ora",
                              "zh-CN": "创建人",
                            })}
                            span={1}
                            tab=""
                          >
                            {__$$eval(
                              () =>
                                this.props.useGetNetwork?.data?.network
                                  ?.initiator?.admin || "-"
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="bdr5go2aun"
                            label={this._i18nText({
                              "en-US": "Number of members",
                              key: "i18n-4btnh7pqt1m",
                              "zh-CN": "成员个数",
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
                                    this.props.useGetNetwork?.data?.network
                                      ?.organizations?.length || "0"
                                )}
                              </Typography.Text>
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="o0cvbxwkrj"
                            label={this._i18nText({
                              "en-US": "create time",
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
                                    this.props.useGetNetwork?.data?.network
                                      ?.creationTimestamp
                                )}
                              />
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="8ei6l6dk6xn"
                            label={this._i18nText({
                              "en-US": "Update time",
                              key: "i18n-watjije0jk",
                              "zh-CN": "更新时间",
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
                                    this.props.useGetNetwork?.data?.network
                                      ?.joinedAt
                                )}
                              />
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="mljbt4bcmo"
                            label={this._i18nText({
                              "en-US": "Version",
                              key: "i18n-hbf63hki898",
                              "zh-CN": "版本",
                            })}
                            span={1}
                          >
                            {__$$eval(
                              () =>
                                this.props.useGetNetwork?.data?.network
                                  ?.version || "-"
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="i1zeuy7pn4n"
                            label={this._i18nText({
                              "en-US": "Consensus component",
                              key: "i18n-xgyxfdl8q",
                              "zh-CN": "共识组件",
                            })}
                            span={1}
                          >
                            {
                              <Descriptions
                                __component_name="Descriptions"
                                bordered={false}
                                colon={true}
                                column={1}
                                items={[
                                  {
                                    children: null,
                                    key: "ufknvxft0u",
                                    label: this._i18nText({
                                      "en-US": "Consensus algorithm",
                                      key: "i18n-twykcar3l6l",
                                      "zh-CN": "共识算法",
                                    }),
                                    span: 1,
                                  },
                                  {
                                    children: null,
                                    key: "81dsq3cni9b",
                                    label: this._i18nText({
                                      "en-US": "Cluster size",
                                      key: "i18n-ax4swl3ryv7",
                                      "zh-CN": "集群大小",
                                    }),
                                    span: 1,
                                  },
                                  {
                                    children: null,
                                    key: "634p9mdxipk",
                                    label: this._i18nText({
                                      "en-US": "Node database",
                                      key: "i18n-kqc5q3s99wo",
                                      "zh-CN": "节点数据库",
                                    }),
                                    span: 1,
                                  },
                                ]}
                                labelStyle={{ width: 100 }}
                                layout="horizontal"
                                size="default"
                                title=""
                              >
                                <Descriptions.Item
                                  __component_name="Descriptions.Item"
                                  key="ufknvxft0u"
                                  label={this._i18nText({
                                    "en-US": "Consensus algorithm",
                                    key: "i18n-twykcar3l6l",
                                    "zh-CN": "共识算法",
                                  })}
                                  span={1}
                                >
                                  {null}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  __component_name="Descriptions.Item"
                                  key="81dsq3cni9b"
                                  label={this._i18nText({
                                    "en-US": "Cluster size",
                                    key: "i18n-ax4swl3ryv7",
                                    "zh-CN": "集群大小",
                                  })}
                                  span={1}
                                >
                                  {null}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  __component_name="Descriptions.Item"
                                  key="634p9mdxipk"
                                  label={this._i18nText({
                                    "en-US": "Node database",
                                    key: "i18n-kqc5q3s99wo",
                                    "zh-CN": "节点数据库",
                                  })}
                                  span={1}
                                >
                                  {null}
                                </Descriptions.Item>
                              </Descriptions>
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="s3t5k3dk449"
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
                                  () =>
                                    this.props.useGetNetwork?.data?.network
                                      ?.status
                                )}
                                types={[
                                  {
                                    children: this._i18nText({
                                      "en-US": "NetworkCreated",
                                      key: "i18n-zrowlr7zwx",
                                      "zh-CN": "运行中",
                                    }),
                                    icon: "CheckCircleFilled",
                                    id: "NetworkCreated",
                                    type: "success",
                                  },
                                  {
                                    children: this._i18nText({
                                      "en-US": "NetworkDissolved",
                                      key: "i18n-j3czm9su41",
                                      "zh-CN": "已解散",
                                    }),
                                    icon: "CloseCircleFilled",
                                    id: "NetworkDissolved",
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
                            }
                          </Descriptions.Item>
                        </Descriptions>
                      </Spin>
                    ),
                    key: "tab-item-1",
                    label: this._i18nText({
                      "en-US": "Network information",
                      key: "i18n-y0o0zplhhom",
                      "zh-CN": "网络信息",
                    }),
                  },
                  {
                    children: (
                      <Spin
                        __component_name="Spin"
                        spinning={__$$eval(
                          () => this.props.useGetNetwork?.loading
                        )}
                      >
                        <Table
                          __component_name="Table"
                          __events={{
                            eventDataList: [
                              {
                                name: "onChange",
                                relatedEventName: "handleUserTableChange",
                                type: "componentEvent",
                              },
                              {
                                name: "pagination.onChange",
                                relatedEventName: "handleUserPaginationChange",
                                type: "componentEvent",
                              },
                              {
                                name: "pagination.onShowSizeChange",
                                relatedEventName: "handleUserPaginationChange",
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
                              title: this._i18nText({
                                "en-US": "organization",
                                key: "i18n-gmx7l7tolvj",
                                "zh-CN": "成员组织",
                              }),
                            },
                            {
                              dataIndex: "age",
                              key: "age",
                              render: (text, record, index) =>
                                ((__$$context) => (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: "" }}
                                  >
                                    {this._i18nText({
                                      "en-US": "Real-name authentication",
                                      key: "i18n-1g6cw1w1uv4",
                                      "zh-CN": "实名认证",
                                    })}
                                  </Typography.Text>
                                ))(
                                  __$$createChildContext(__$$context, {
                                    text,
                                    record,
                                    index,
                                  })
                                ),
                              title: this._i18nText({
                                "en-US": "infomation",
                                key: "i18n-th9ag1qgsu",
                                "zh-CN": "认证信息",
                              }),
                            },
                            {
                              dataIndex: "num",
                              key: "num",
                              title: this._i18nText({
                                "en-US": "Number of added nodes",
                                key: "i18n-rs16rywzo",
                                "zh-CN": "加入节点个数",
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
                                "en-US": "The last time a node was added",
                                key: "i18n-iku70tej4ja",
                                "zh-CN": "节点最近加入时间",
                              }),
                            },
                          ]}
                          dataSource={__$$eval(() =>
                            (
                              this.props.useGetNetwork?.data?.network
                                ?.organizations || []
                            )?.sort((a, b) => {
                              if (this.state.sorter?.order !== "ascend") {
                                return (
                                  new Date(b.joinedAt).getTime() -
                                  new Date(a.joinedAt).getTime()
                                );
                              }
                              return (
                                new Date(a.joinedAt).getTime() -
                                new Date(b.joinedAt).getTime()
                              );
                            })
                          )}
                          loading={__$$eval(
                            () => this.props.useGetFederation?.loading
                          )}
                          onChange={function () {
                            this.handleUserTableChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          pagination={{
                            current: __$$eval(() => this.state.userCurrent),
                            onChange: function () {
                              this.handleUserPaginationChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            onShowSizeChange: function () {
                              this.handleUserPaginationChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            pageSize: __$$eval(() => this.state.userSize),
                            showQuickJumper: false,
                            showSizeChanger: false,
                            simple: false,
                            size: "default",
                            total: __$$eval(
                              () =>
                                (
                                  this.props.useGetFederation?.data?.federation
                                    ?.organizations || []
                                )?.length
                            ),
                          }}
                          rowKey="name"
                          scroll={{ scrollToFirstRowOnChange: true }}
                          showHeader={true}
                          size="default"
                        />
                      </Spin>
                    ),
                    key: "tab-item-2",
                    label: this._i18nText({
                      "en-US": "Network member",
                      key: "i18n-xinrdc2qk1f",
                      "zh-CN": "网络成员",
                    }),
                  },
                ]}
                size="large"
                tabPosition="top"
                type="line"
              />
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
                        relatedEventName: "openAddChannelModal",
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
                  href=""
                  icon={
                    <Icon
                      __component_name="Icon"
                      size={12}
                      style={{ marginRight: 3 }}
                      type="PlusOutlined"
                    />
                  }
                  onClick={function () {
                    this.openAddChannelModal.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  target="_self"
                  type="primary"
                >
                  {this._i18nText({
                    "en-US": "New channel",
                    key: "i18n-snaon3b2fni",
                    "zh-CN": "新建通道",
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
                      "en-US": "Enter a channel name",
                      key: "i18n-ajsvl5v284r",
                      "zh-CN": "输入通道名称查询",
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
                    title: this._i18nText({
                      "en-US": "Channel name",
                      key: "i18n-6oadzcxin7k",
                      "zh-CN": "通道名称",
                    }),
                  },
                  {
                    dataIndex: "creator",
                    key: "creator",
                    title: this._i18nText({
                      "en-US": "initiator",
                      key: "i18n-wctt13ld2x",
                      "zh-CN": "发起者",
                    }),
                  },
                  {
                    dataIndex: "proposal",
                    key: "proposal",
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
                      "en-US": "Relevant proposal",
                      key: "i18n-4idd49uxsod",
                      "zh-CN": "相关提议",
                    }),
                  },
                  {
                    dataIndex: "clusterSize",
                    key: "clusterSize",
                    title: this._i18nText({
                      "en-US": "Number of members",
                      key: "i18n-4btnh7pqt1m",
                      "zh-CN": "成员个数",
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
                    title: this._i18nText({
                      "en-US": "create time",
                      key: "i18n-9ox4rx1wtwv",
                      "zh-CN": "创建时间",
                    }),
                  },
                  {
                    dataIndex: "number",
                    key: "number",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
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
                      "en-US": "Number of nodes",
                      key: "i18n-kh6e0jr0i7b",
                      "zh-CN": "节点数量",
                    }),
                  },
                  {
                    dataIndex: "status",
                    key: "status",
                    title: this._i18nText({
                      "en-US": "status",
                      key: "i18n-bik6xl952y6",
                      "zh-CN": "状态",
                    }),
                  },
                  {
                    dataIndex: "op",
                    key: "op",
                    title: this._i18nText({
                      "en-US": "operation",
                      key: "i18n-k5inn5jmnt9",
                      "zh-CN": "操作",
                    }),
                  },
                ]}
                dataSource={__$$eval(() =>
                  (
                    this.props.useGetFederation?.data?.federation?.networks ||
                    []
                  )
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
                loading={__$$eval(() => this.props.useGetNetwork?.loading)}
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
                  simple: false,
                  size: "default",
                  total: __$$eval(
                    () =>
                      ((
                        this.props.useGetFederation?.data?.federation
                          ?.networks || []
                      )
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
                        })).length
                  ),
                }}
                rowKey="name"
                scroll={{ scrollToFirstRowOnChange: true }}
                showHeader={true}
                size="default"
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
                relatedEventName: "confirmAddChannelModal",
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
            this.confirmAddChannelModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal && this.state.modalType === "addchannel"
          )}
          title={this._i18nText({
            "en-US": "New channel",
            key: "i18n-snaon3b2fni",
            "zh-CN": "新建通道",
          })}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: "left",
              labelCol: 5,
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
                    "en-US": "Please enter a channel name",
                    key: "i18n-ienrgm2j5p9",
                    "zh-CN": "请输入通道名称",
                  }),
                },
              }}
              fieldProps={{
                name: "name",
                required: true,
                title: this._i18nText({
                  "en-US": "Channel name",
                  key: "i18n-6oadzcxin7k",
                  "zh-CN": "通道名称",
                }),
                "x-validator": [
                  {
                    message: "通道名称由 3 ~ 50 个大小写字母, 数字, 下划线组成",
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
                  disabled: false,
                  placeholder: this._i18nText({
                    "en-US": "Select the initiator",
                    key: "i18n-nezb9wehqyh",
                    "zh-CN": "请选择发起者",
                  }),
                },
              }}
              fieldProps={{
                name: "Select",
                required: true,
                title: this._i18nText({
                  "en-US": "Set initiator",
                  key: "i18n-v6gmjbqnol",
                  "zh-CN": "设置发起者",
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
                    "en-US": "Please select a member",
                    key: "i18n-bko8c4ii1ad",
                    "zh-CN": "请选择成员",
                  }),
                },
              }}
              fieldProps={{
                name: "Select1",
                required: true,
                title: this._i18nText({
                  "en-US": "Select member",
                  key: "i18n-0bo5igd908x",
                  "zh-CN": "选择成员",
                }),
                "x-validator": [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                "x-component-props": {
                  placeholder: this._i18nText({
                    "en-US": "Please enter a discription",
                    key: "i18n-rw0h41prk6",
                    "zh-CN": "请输入描述",
                  }),
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: "StringSetter",
                default: "",
                name: "description",
                title: this._i18nText({
                  "en-US": "Channel description",
                  key: "i18n-k3l0vmchhq",
                  "zh-CN": "通道描述",
                }),
                "x-component": "Input.TextArea",
                "x-validator": [
                  {
                    message: "组织描述由 0 ~ 200 字符组成",
                    pattern: "^[\\w]{0,200}$",
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
  const match = matchPath({ path: "/network/detail/:id" }, location.pathname);
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
          func: "useGetNetwork",
          params: {
            name: self.match?.params?.id,
          },
        },
      ]}
      render={(dataProps) => (
        <NetworkDetail$$Page {...dataProps} self={self} appHelper={appHelper} />
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