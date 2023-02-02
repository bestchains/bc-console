// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
  Row,
  Col,
  Typography,
  Card,
  FormilyForm,
  FormilySelect,
  Space,
  UnifiedLink,
  FormilyRadio,
  FormilyNumberPicker,
  FormilyInput,
  Divider,
  Button,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils, { RefsManager } from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

class NetworkCreate$$Page extends React.Component {
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

    this.state = {};
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  cancel() {
    this.history.go(-1);
  }

  confirm(e, payload) {
    var _this$$, _this$$$formRef, _this$$$formRef$curre;

    // const network = this.props.useGetNetwork?.data?.network || {}
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
      var _JSON$parse;
      const params = {
        ...v,
        federation:
          v.federation &&
          ((_JSON$parse = JSON.parse(v.federation)) === null ||
          _JSON$parse === void 0
            ? void 0
            : _JSON$parse.name),
      };
      console.log(v, params);
      delete params.jdpz;
      delete params.sc;
      try {
        const res = await this.props.appHelper.utils.bff.createNetwork({
          network: params,
        });
        this.utils.notification.success({
          message: this.i18n("i18n-27jnv87egc2"),
        });
        this.cancel();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-j8xxbkn3j7a"),
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

  transformFederation(data) {
    return data.map((item) => {
      var _item$organizations;
      return {
        ...item,
        label: item.name,
        value: JSON.stringify({
          ...item,
          curOrganizations:
            (_item$organizations = item.organizations) === null ||
            _item$organizations === void 0
              ? void 0
              : _item$organizations.filter((item) => {
                  var _this$props, _this$props$authData, _this$props$authData$;
                  return (
                    item.admin ===
                    (this === null || this === void 0
                      ? void 0
                      : (_this$props = this.props) === null ||
                        _this$props === void 0
                      ? void 0
                      : (_this$props$authData = _this$props.authData) ===
                          null || _this$props$authData === void 0
                      ? void 0
                      : (_this$props$authData$ = _this$props$authData.user) ===
                          null || _this$props$authData$ === void 0
                      ? void 0
                      : _this$props$authData$.name)
                  );
                }),
        }),
      };
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this._i18nText({
                "en-US": "create network",
                key: "i18n-kwbu3vyst6",
                "zh-CN": "新建网络",
              })}
            </Typography.Title>
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
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: "left",
                  labelCol: 4,
                  labelWidth: "120px",
                  layout: "horizontal",
                  wrapperCol: 10,
                  wrapperWidth: "400px",
                }}
                ref={this._refsManager.linkRef("formily_create")}
              >
                <Row __component_name="Row" wrap={true}>
                  <Col __component_name="Col" span={24}>
                    <Typography.Title
                      __component_name="Typography.Title"
                      bold={true}
                      bordered={true}
                      ellipsis={true}
                      level={1}
                    >
                      {this._i18nText({
                        "en-US": "Basic information",
                        key: "i18n-98hectg940s",
                        "zh-CN": "基本信息",
                      })}
                    </Typography.Title>
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        "x-component-props": {
                          _sdkSwrGetFunc: {
                            func: __$$eval(() => this.utils.bff.getFederations),
                            label: "name",
                            resKey: "",
                            transformFunc: function () {
                              return this.transformFederation.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            value: "name",
                          },
                          _unsafe_MixedSetter__sdkSwrGetFunc_select:
                            "ObjectSetter",
                          _unsafe_MixedSetter_enum_select: "ArraySetter",
                          allowClear: false,
                          disabled: false,
                          enum: [],
                          notFoundContent: {},
                          placeholder: this._i18nText({
                            "en-US": "Please select alliance",
                            key: "i18n-a30nnbu41z6",
                            "zh-CN": "请选择联盟",
                          }),
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_description_select: "SlotSetter",
                        description: (
                          <Space
                            __component_name="Space"
                            align="center"
                            direction="horizontal"
                          >
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: "" }}
                            >
                              {this._i18nText({
                                "en-US":
                                  "After the successful purchase of block chain network, the affiliate cannot be replaced. You can",
                                key: "i18n-txk6oui9mfs",
                                "zh-CN":
                                  "区块链网络购买成功后，所属联盟不能更换。您可以",
                              })}
                            </Typography.Text>
                            <UnifiedLink
                              __component_name="UnifiedLink"
                              target="_blank"
                              to="/federation"
                            >
                              {this._i18nText({
                                "en-US": "create federation",
                                key: "i18n-i69exda650e",
                                "zh-CN": "新建联盟",
                              })}
                            </UnifiedLink>
                            <UnifiedLink
                              __component_name="UnifiedLink"
                              target="_blank"
                              to="https://alibaba.com"
                            >
                              {this._i18nText({
                                "en-US": "Know the details",
                                key: "i18n-xlmv8ef2bsq",
                                "zh-CN": "了解详情",
                              })}
                            </UnifiedLink>
                          </Space>
                        ),
                        name: "federation",
                        title: this._i18nText({
                          "en-US": "affiliate",
                          key: "i18n-dlxiuotq6z4",
                          "zh-CN": "所属联盟",
                        }),
                        "x-validator": [],
                      }}
                    />
                    <FormilyRadio
                      __component_name="FormilyRadio"
                      componentProps={{
                        "x-component-props": {
                          buttonStyle: "outline",
                          disabled: false,
                          optionType: "button",
                          size: "middle",
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_default_select: "StringSetter",
                        _unsafe_MixedSetter_description_select: "SlotSetter",
                        default: "Standard",
                        description: (
                          <Space
                            __component_name="Space"
                            align="center"
                            direction="horizontal"
                          >
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: "" }}
                            >
                              {this._i18nText({
                                "en-US":
                                  "By default, the node is configured with 4-core CPU, 8GB memory, and 200 GB disk. For details, see",
                                key: "i18n-b3i37ksj9vv",
                                "zh-CN":
                                  "节点默认配置为 4核CPU 8G内存 200G磁盘，详见",
                              })}
                            </Typography.Text>
                            <UnifiedLink
                              __component_name="UnifiedLink"
                              target="_blank"
                              to="https://alibaba.com"
                            >
                              {this._i18nText({
                                "en-US": "Version details",
                                key: "i18n-3g6iq8ncfsh",
                                "zh-CN": "版本详细介绍",
                              })}
                            </UnifiedLink>
                          </Space>
                        ),
                        enum: [
                          {
                            label: this._i18nText({
                              "en-US": "Standard edition",
                              key: "i18n-pg663sglzcs",
                              "zh-CN": "标准版",
                            }),
                            value: "Standard",
                          },
                          {
                            label: this._i18nText({
                              "en-US": "Enterprise edition",
                              key: "i18n-6ndnzzhki9k",
                              "zh-CN": "企业版",
                            }),
                            value: "Enterprise",
                          },
                          {
                            children: "未知",
                            icon: "tenx-ui-icon:Circle",
                            id: "disabled",
                            label: this._i18nText({
                              "en-US": "Financial security edition",
                              key: "i18n-csjzk2p708j",
                              "zh-CN": "金融安全版",
                            }),
                            type: "disabled",
                            value: "Finance",
                          },
                        ],
                        name: "version",
                        title: this._i18nText({
                          "en-US": "Version selection",
                          key: "i18n-bm3i5ksesut",
                          "zh-CN": "版本选择",
                        }),
                        "x-validator": [],
                      }}
                    />
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <Typography.Title
                      __component_name="Typography.Title"
                      bold={true}
                      bordered={true}
                      ellipsis={true}
                      level={1}
                    >
                      {this._i18nText({
                        "en-US": "Organization member configuration",
                        key: "i18n-tb85t2eb0c",
                        "zh-CN": "组织成员配置",
                      })}
                    </Typography.Title>
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        "x-component-props": {
                          _unsafe_MixedSetter_enum_select: "StringSetter",
                          allowClear: false,
                          disabled: false,
                          enum: "{{ $form?.values?.federation ? (JSON.parse($form?.values?.federation)?.organizations?.map(item => ({ label: `${item.name}(${item.admin || '-'})`, value: item.name })) ||[]) : []}}",
                          mode: "multiple",
                          placeholder: this._i18nText({
                            "en-US": "The recommended format is xxxOrg",
                            key: "i18n-nbke0i5upzc",
                            "zh-CN": "组织名称，建议格式 xxxOrg",
                          }),
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_default_select: "I18nSetter",
                        _unsafe_MixedSetter_description_select: "SlotSetter",
                        description: (
                          <Space
                            __component_name="Space"
                            align="center"
                            direction="horizontal"
                          >
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: "" }}
                            >
                              {this._i18nText({
                                "en-US":
                                  "The organization name must start with a letter and contain no more than 12 digits and letters. Only web start-ups can create multiple organizations",
                                key: "i18n-dr1hx3bw3v",
                                "zh-CN":
                                  "组织名称须以字母开头，12 位以内数字和字母组成。只有网络初创者可以新建多个组织",
                              })}
                            </Typography.Text>
                            <UnifiedLink
                              __component_name="UnifiedLink"
                              target="_blank"
                              to="https://alibaba.com"
                            >
                              {this._i18nText({
                                "en-US": " Know the details>>",
                                key: "i18n-xlmv8ef2bsq",
                                "zh-CN": " 了解详情>>",
                              })}
                            </UnifiedLink>
                          </Space>
                        ),
                        name: "organizations",
                        title: this._i18nText({
                          "en-US": "Configuration member",
                          key: "i18n-cprrxhrkty",
                          "zh-CN": "配置成员",
                        }),
                        "x-validator": [],
                      }}
                    />
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        "x-component-props": {
                          _unsafe_MixedSetter_enum_select: "StringSetter",
                          allowClear: false,
                          disabled: false,
                          enum: "{{ $form?.values?.federation ? (JSON.parse($form?.values?.federation)?.curOrganizations?.map(item => ({ label: `${item.name}(${item.admin || '-'})`, value: item.name })) ||[]) : []}}",
                          placeholder: this._i18nText({
                            "en-US": "Choose your own organization",
                            key: "i18n-3cphsjan5d2",
                            "zh-CN": "选择自己拥有的组织",
                          }),
                        },
                      }}
                      fieldProps={{
                        name: "initiator",
                        title: this._i18nText({
                          "en-US": "Set initiator",
                          key: "i18n-v6gmjbqnol",
                          "zh-CN": "设置发起者",
                        }),
                        "x-validator": [],
                      }}
                    />
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <Typography.Title
                      __component_name="Typography.Title"
                      bold={true}
                      bordered={true}
                      ellipsis={true}
                      level={1}
                    >
                      {this._i18nText({
                        "en-US": "Consensus allocation",
                        key: "i18n-hjgnfbc9iew",
                        "zh-CN": "共识配置",
                      })}
                    </Typography.Title>
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        "x-component-props": {
                          allowClear: false,
                          disabled: false,
                          placeholder: this._i18nText({
                            "en-US": "Select a consensus algorithm",
                            key: "i18n-0it28c04tx6",
                            "zh-CN": "请选择共识算法",
                          }),
                        },
                      }}
                      fieldProps={{
                        enum: [
                          {
                            _unsafe_MixedSetter_label_select: "StringSetter",
                            children: "未知",
                            icon: "tenx-ui-icon:Circle",
                            id: "disabled",
                            label: "etcdraft",
                            type: "disabled",
                            value: "etcdraft",
                          },
                        ],
                        name: "ordererType",
                        title: this._i18nText({
                          "en-US": "Consensus algorithm",
                          key: "i18n-twykcar3l6l",
                          "zh-CN": "共识算法",
                        }),
                        "x-validator": [],
                      }}
                    />
                    <FormilyNumberPicker
                      __component_name="FormilyNumberPicker"
                      componentProps={{
                        "x-component-props": { placeholder: "请输入" },
                      }}
                      decoratorProps={{
                        "x-decorator-props": { wrapperWidth: "100px" },
                      }}
                      fieldProps={{
                        name: "clusterSize",
                        title: this._i18nText({
                          "en-US": "Consensus cluster node",
                          key: "i18n-vo8kd18n6pd",
                          "zh-CN": "共识集群节点",
                        }),
                        "x-validator": [],
                      }}
                    />
                    <FormilyInput
                      __component_name="FormilyInput"
                      componentProps={{
                        "x-component-props": {
                          placeholder: this._i18nText({
                            "en-US": "Please enter node configuration",
                            key: "i18n-cj9hvn1xox5",
                            "zh-CN": "请输入节点配置",
                          }),
                        },
                      }}
                      fieldProps={{
                        name: "jdpz",
                        title: this._i18nText({
                          "en-US": "Node configuration",
                          key: "i18n-zjmh7vtphh",
                          "zh-CN": "节点配置",
                        }),
                        "x-validator": [],
                      }}
                    />
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <Divider
                      __component_name="Divider"
                      content={[
                        <FormilyRadio
                          __component_name="FormilyRadio"
                          componentProps={{
                            "x-component-props": {
                              buttonStyle: "outline",
                              disabled: false,
                              optionType: "button",
                              size: "middle",
                            },
                          }}
                          fieldProps={{
                            _unsafe_MixedSetter_default_select: "StringSetter",
                            default: "1m",
                            enum: [
                              {
                                label: this._i18nText({
                                  "en-US": "1 month",
                                  key: "i18n-trhw8lpkemh",
                                  "zh-CN": "1个月",
                                }),
                                value: "1m",
                              },
                              {
                                label: this._i18nText({
                                  "en-US": "3 month",
                                  key: "i18n-lie8dycfnu",
                                  "zh-CN": "3个月",
                                }),
                                value: "3",
                              },
                              {
                                children: "未知",
                                icon: "tenx-ui-icon:Circle",
                                id: "disabled",
                                label: this._i18nText({
                                  "en-US": "6 month",
                                  key: "i18n-67illnj3hic",
                                  "zh-CN": "6个月",
                                }),
                                type: "disabled",
                                value: "6",
                              },
                              {
                                children: "未知",
                                icon: "tenx-ui-icon:Circle",
                                id: "disabled",
                                label: this._i18nText({
                                  "en-US": "1 year",
                                  key: "i18n-uq1hm9mlcqd",
                                  "zh-CN": "1年",
                                }),
                                type: "disabled",
                                value: "12",
                              },
                              {
                                children: "未知",
                                icon: "tenx-ui-icon:Circle",
                                id: "disabled",
                                label: this._i18nText({
                                  "en-US": "2 year",
                                  key: "i18n-jmam3xzi5le",
                                  "zh-CN": "2年",
                                }),
                                type: "disabled",
                                value: "24",
                              },
                              {
                                children: "未知",
                                icon: "tenx-ui-icon:Circle",
                                id: "disabled",
                                label: this._i18nText({
                                  "en-US": "more",
                                  key: "i18n-2b4dhrz51wu",
                                  "zh-CN": "更多",
                                }),
                                type: "disabled",
                                value: "more",
                              },
                            ],
                            name: "sc",
                            title: this._i18nText({
                              "en-US": "duration",
                              key: "i18n-g2ktwfqaf0g",
                              "zh-CN": "时长",
                            }),
                            "x-validator": [],
                          }}
                        />,
                      ]}
                      dashed={true}
                      defaultOpen={true}
                      mode="expanded"
                      orientation="left"
                      orientationMargin={0}
                    >
                      高级配置
                    </Divider>
                  </Col>
                </Row>
              </FormilyForm>
              <Divider
                __component_name="Divider"
                dashed={false}
                defaultOpen={false}
                mode="line"
              />
              <Row __component_name="Row" wrap={false}>
                <Col __component_name="Col" flex="120px" />
                <Col __component_name="Col" flex="auto">
                  <Space
                    __component_name="Space"
                    align="center"
                    direction="horizontal"
                  >
                    <Button
                      __component_name="Button"
                      __events={{
                        eventDataList: [
                          {
                            name: "onClick",
                            relatedEventName: "cancel",
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
                        this.cancel.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      type="default"
                    >
                      {this._i18nText({
                        "en-US": "cancel",
                        key: "i18n-l8xumyvnlya",
                        "zh-CN": "取消",
                      })}
                    </Button>
                    <Button
                      __component_name="Button"
                      __events={{
                        eventDataList: [
                          {
                            name: "onClick",
                            relatedEventName: "confirm",
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
                        this.confirm.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      type="primary"
                    >
                      {this._i18nText({
                        "en-US": "confirm",
                        key: "i18n-tixlz8m0le9",
                        "zh-CN": "确定",
                      })}
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath({ path: "/network/create" }, location.pathname);
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
      sdkSwrFuncs={[]}
      render={(dataProps) => (
        <NetworkCreate$$Page {...dataProps} self={self} appHelper={appHelper} />
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
