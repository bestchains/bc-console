// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
  Row,
  Col,
  Typography,
  Space,
  Button,
  Icon,
  Input,
  List,
  Card,
  Descriptions,
  Status,
  Dropdown,
  Modal,
  Alert,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

class Network$$Page extends React.Component {
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

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {}

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  async confirmDissolveModal(e, payload) {
    var _this$state$record,
      _this$state$record2,
      _this$state$record2$i,
      _this$state$record3;
    console.log({
      name:
        (_this$state$record = this.state.record) === null ||
        _this$state$record === void 0
          ? void 0
          : _this$state$record.name,
      initiator:
        (_this$state$record2 = this.state.record) === null ||
        _this$state$record2 === void 0
          ? void 0
          : (_this$state$record2$i = _this$state$record2.initiator) === null ||
            _this$state$record2$i === void 0
          ? void 0
          : _this$state$record2$i.name,
      federation:
        (_this$state$record3 = this.state.record) === null ||
        _this$state$record3 === void 0
          ? void 0
          : _this$state$record3.federation,
    });
    try {
      var _this$state$record4,
        _this$state$record5,
        _this$state$record5$i,
        _this$state$record6;
      await this.props.appHelper.utils.bff.dissolveNetwork({
        name:
          (_this$state$record4 = this.state.record) === null ||
          _this$state$record4 === void 0
            ? void 0
            : _this$state$record4.name,
        initiator:
          (_this$state$record5 = this.state.record) === null ||
          _this$state$record5 === void 0
            ? void 0
            : (_this$state$record5$i = _this$state$record5.initiator) ===
                null || _this$state$record5$i === void 0
            ? void 0
            : _this$state$record5$i.name,
        federation:
          (_this$state$record6 = this.state.record) === null ||
          _this$state$record6 === void 0
            ? void 0
            : _this$state$record6.federation,
      });
      this.closeModal();
      this.utils.message.success({
        content: this.i18n("i18n-65qwbj9telu"),
      });
      this.props.useGetFederations.mutate();
    } catch (error) {
      this.utils.message.warning({
        content: this.i18n("i18n-j5kb8u4qc1b"),
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

  handleRefresh(event) {
    var _this$props$utils$bff;
    (_this$props$utils$bff = this.props.utils.bff.useGetNetworks) === null ||
    _this$props$utils$bff === void 0
      ? void 0
      : _this$props$utils$bff.mute();
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
    if (key === "detail") {
      var _this$history, _payload$record;
      (_this$history = this.history) === null || _this$history === void 0
        ? void 0
        : _this$history.push(
            `/network/detail/${
              payload === null || payload === void 0
                ? void 0
                : (_payload$record = payload.record) === null ||
                  _payload$record === void 0
                ? void 0
                : _payload$record.name
            }`
          );
    }
  }

  openDissolveModal() {
    this.setState({
      isOpenModal: true,
      modalType: "dissolve",
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
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
                "en-US": "network",
                key: "i18n-xb2o10tue1m",
                use: "zh-CN",
                "zh-CN": "网络",
              })}
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
                  <Button
                    __component_name="Button"
                    __events={{
                      eventDataList: [],
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
                    href="/network/create"
                    icon={
                      <Icon
                        __component_name="Icon"
                        size={12}
                        style={{ marginRight: 3 }}
                        type="PlusOutlined"
                      />
                    }
                    shape="default"
                    target="_self"
                    type="primary"
                  >
                    {this._i18nText({
                      "en-US": "create network",
                      key: "i18n-kwbu3vyst6",
                      use: "zh-CN",
                      "zh-CN": "新建网络",
                    })}
                  </Button>
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
                      "en-US": "Please enter a name search",
                      key: "i18n-94e6orcx5ms",
                      use: "zh-CN",
                      "zh-CN": "请输入名称搜索",
                    })}
                  />
                  <Button
                    __component_name="Button"
                    __events={{
                      eventDataList: [
                        {
                          name: "onClick",
                          relatedEventName: "handleRefresh",
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
                        type="ReloadOutlined"
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
                    {this._i18nText({
                      "en-US": "refresh",
                      key: "i18n-71sxvlf0d98",
                      use: "zh-CN",
                      "zh-CN": "刷新",
                    })}
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
                  this.props.useGetNetworks?.data?.networks
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
              grid={{
                column: 3,
                gutter: 20,
                lg: 3,
                md: 3,
                sm: 3,
                xl: 3,
                xs: 3,
                xxl: 3,
              }}
              gridEnable={true}
              itemLayout="horizontal"
              loading={__$$eval(() => this.props.useGetNetworks?.loading)}
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
                          wrap={false}
                        >
                          <Col __component_name="Col">
                            <Dropdown
                              __component_name="Dropdown"
                              __events={{
                                eventDataList: [
                                  {
                                    name: "menu.onClick",
                                    paramStr: '{\n \t "record":this.item \n}',
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
                                    disabled: false,
                                    key: "detail",
                                    label: this._i18nText({
                                      "en-US": "View details",
                                      key: "i18n-4t70z9gdf8u",
                                      use: "zh-CN",
                                      "zh-CN": "查看详情",
                                    }),
                                  },
                                  {
                                    key: "dissolve",
                                    label: this._i18nText({
                                      "en-US": "Disband network",
                                      key: "i18n-hlh9eenb9wn",
                                      use: "zh-CN",
                                      "zh-CN": "解散网络",
                                    }),
                                  },
                                ],
                                onClick: function () {
                                  this.onMenuClick.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([
                                        {
                                          record: item,
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
                                      use: "zh-CN",
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
                          </Col>
                          <Col __component_name="Col" />
                        </Row>,
                      ]}
                      bordered={false}
                      cover={
                        <Row
                          __component_name="Row"
                          gutter={[0, 0]}
                          h-gutter={0}
                          style={{
                            borderTopLeftRadius: "2px",
                            borderTopRightRadius: "2px",
                          }}
                          wrap={true}
                        >
                          <Col
                            __component_name="Col"
                            span={24}
                            style={{ color: "#ffffff" }}
                          >
                            <Row
                              __component_name="Row"
                              gutter={[0, 0]}
                              h-gutter={0}
                              style={{
                                backgroundImage:
                                  "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAABiCAYAAABqK9nOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHXmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTAxLTMwVDE2OjQ4OjEzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAxLTMwVDE2OjQ4OjEzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wMS0zMFQxNjo0ODoxMyswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNWU1ZWRiOS03NjUzLTQ0OTUtOTMxMy0yOTIyOGI3YTczYmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5ODk4MTc5YS05Yzk1LWE3NDQtYjBkMy00NTI3NWJjNTk2YzgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMDk0ZWMxMC1jNDI0LTRmMzQtOGI4ZC0zOTRiNTRkNDgzNTAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMDk0ZWMxMC1jNDI0LTRmMzQtOGI4ZC0zOTRiNTRkNDgzNTAiIHN0RXZ0OndoZW49IjIwMjMtMDEtMzBUMTY6NDg6MTMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzVlNWVkYjktNzY1My00NDk1LTkzMTMtMjkyMjhiN2E3M2JjIiBzdEV2dDp3aGVuPSIyMDIzLTAxLTMwVDE2OjQ4OjEzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTA5NGVjMTAtYzQyNC00ZjM0LThiOGQtMzk0YjU0ZDQ4MzUwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmUwOTRlYzEwLWM0MjQtNGYzNC04YjhkLTM5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)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100% 100%",
                              }}
                              wrap={true}
                            >
                              <Col __component_name="Col" span={8} style={{}}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  h-gutter={0}
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0)",
                                    textAlign: "center",
                                  }}
                                  wrap={true}
                                >
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{
                                      color: "#ffffff",
                                      lineHeight: "40px",
                                    }}
                                  >
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ color: "#ffffff", fontSize: "" }}
                                      type="default"
                                    >
                                      {this._i18nText({
                                        "en-US": "My node/total node",
                                        key: "i18n-4m04opydvf9",
                                        use: "zh-CN",
                                        "zh-CN": "我的节点/总节点",
                                      })}
                                    </Typography.Text>
                                  </Col>
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{ lineHeight: "58px" }}
                                  >
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{
                                        color: "#ffffff",
                                        fontSize: "28px",
                                      }}
                                    >
                                      {__$$eval(
                                        () => `${item?.clusterSize}/${"-"}`
                                      )}
                                    </Typography.Text>
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={8} style={{}}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  h-gutter={0}
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0)",
                                    textAlign: "center",
                                  }}
                                  wrap={true}
                                >
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{
                                      color: "#ffffff",
                                      lineHeight: "40px",
                                    }}
                                  >
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ color: "#ffffff", fontSize: "" }}
                                      type="default"
                                    >
                                      {this._i18nText({
                                        "en-US": "My channel/Total channel",
                                        key: "i18n-0l8kit6a2d3",
                                        use: "zh-CN",
                                        "zh-CN": "我的通道/总通道",
                                      })}
                                    </Typography.Text>
                                  </Col>
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{ lineHeight: "58px" }}
                                  >
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{
                                        color: "#ffffff",
                                        fontSize: "28px",
                                      }}
                                    >
                                      {__$$eval(() => `${"-"}/${"-"}`)}
                                    </Typography.Text>
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={8}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  h-gutter={0}
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0)",
                                    textAlign: "center",
                                  }}
                                  wrap={true}
                                >
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{
                                      color: "#ffffff",
                                      lineHeight: "40px",
                                    }}
                                  >
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ color: "#ffffff", fontSize: "" }}
                                      type="default"
                                    >
                                      {this._i18nText({
                                        "en-US": "Organization number",
                                        key: "i18n-18ncsld69pu",
                                        use: "zh-CN",
                                        "zh-CN": "组织数",
                                      })}
                                    </Typography.Text>
                                  </Col>
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{ lineHeight: "58px" }}
                                  >
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{
                                        color: "#ffffff",
                                        fontSize: "28px",
                                      }}
                                    >
                                      {__$$eval(
                                        () => item?.organizations?.length || 0
                                      )}
                                    </Typography.Text>
                                  </Col>
                                </Row>
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
                      <Descriptions
                        __component_name="Descriptions"
                        bordered={false}
                        colon={true}
                        column={1}
                        items={[
                          {
                            children: __$$eval(() => item.name),
                            key: "i61229f215s",
                            label: this._i18nText({
                              "en-US": "Network ID",
                              key: "i18n-vxubih1pqa",
                              use: "zh-CN",
                              "zh-CN": "网络 ID",
                            }),
                            span: 1,
                          },
                          {
                            children: __$$eval(() => item.federation),
                            key: "58hhyu92zxg",
                            label: this._i18nText({
                              "en-US": "affiliate",
                              key: "i18n-dlxiuotq6z4",
                              use: "zh-CN",
                              "zh-CN": "所属联盟",
                            }),
                            span: 1,
                          },
                          {
                            children: (
                              <Row
                                __component_name="Row"
                                gutter={[0, 0]}
                                h-gutter={0}
                                v-gutter={0}
                                wrap={true}
                              >
                                <Col __component_name="Col" span={24}>
                                  <Typography.Time
                                    __component_name="Typography.Time"
                                    format=""
                                    relativeTime={false}
                                    time="2023-01-30"
                                  />
                                </Col>
                                <Col __component_name="Col" span={24}>
                                  <Typography.Time
                                    __component_name="Typography.Time"
                                    format=""
                                    relativeTime={true}
                                    time="2023-01-30"
                                  />
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: "" }}
                                  >
                                    {this._i18nText({
                                      "en-US": "expire",
                                      key: "i18n-9v1fm4itv3m",
                                      use: "zh-CN",
                                      "zh-CN": "过期",
                                    })}
                                  </Typography.Text>
                                </Col>
                              </Row>
                            ),
                            key: "13vdlxyakn3",
                            label: this._i18nText({
                              "en-US": "Maturity time",
                              key: "i18n-pra1gymtjol",
                              use: "zh-CN",
                              "zh-CN": "到期时间",
                            }),
                            span: 1,
                          },
                        ]}
                        labelStyle={{ width: 100 }}
                        layout="horizontal"
                        size="default"
                        title={
                          <Row
                            __component_name="Row"
                            gutter={[0, 0]}
                            h-gutter={0}
                            v-gutter={0}
                            wrap={false}
                          >
                            <Col __component_name="Col" flex="auto">
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: "" }}
                              >
                                {__$$eval(() => item.name)}
                              </Typography.Text>
                            </Col>
                            <Col
                              __component_name="Col"
                              flex="50px"
                              style={{ textAlign: "right" }}
                            >
                              <Status
                                __component_name="Status"
                                id={__$$eval(() => item.status)}
                                types={[
                                  {
                                    children: this._i18nText({
                                      "en-US": "NetworkCreated",
                                      key: "i18n-zrowlr7zwx",
                                      use: "zh-CN",
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
                                      use: "zh-CN",
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
                                      use: "zh-CN",
                                      "zh-CN": "异常",
                                    }),
                                    icon: "CloseCircleFilled",
                                    id: "Error",
                                    type: "error",
                                  },
                                  {
                                    children: this._i18nText({
                                      "en-US": "Created",
                                      key: "i18n-1vangoko4yf",
                                      use: "zh-CN",
                                      "zh-CN": "正常",
                                    }),
                                    icon: "CheckCircleFilled",
                                    id: "Created",
                                    type: "success",
                                  },
                                ]}
                              />
                            </Col>
                          </Row>
                        }
                      >
                        <Descriptions.Item
                          __component_name="Descriptions.Item"
                          key="i61229f215s"
                          label={this._i18nText({
                            "en-US": "Network ID",
                            key: "i18n-vxubih1pqa",
                            use: "zh-CN",
                            "zh-CN": "网络 ID",
                          })}
                          span={1}
                        >
                          {__$$eval(() => item.name)}
                        </Descriptions.Item>
                        <Descriptions.Item
                          __component_name="Descriptions.Item"
                          key="58hhyu92zxg"
                          label={this._i18nText({
                            "en-US": "affiliate",
                            key: "i18n-dlxiuotq6z4",
                            use: "zh-CN",
                            "zh-CN": "所属联盟",
                          })}
                          span={1}
                        >
                          {__$$eval(() => item.federation)}
                        </Descriptions.Item>
                        <Descriptions.Item
                          __component_name="Descriptions.Item"
                          key="13vdlxyakn3"
                          label={this._i18nText({
                            "en-US": "Maturity time",
                            key: "i18n-pra1gymtjol",
                            use: "zh-CN",
                            "zh-CN": "到期时间",
                          })}
                          span={1}
                        >
                          {
                            <Row
                              __component_name="Row"
                              align="middle"
                              gutter={[0, 0]}
                              h-gutter={0}
                              v-gutter={0}
                              wrap={true}
                            >
                              <Col __component_name="Col" span={24}>
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time="2023-01-30"
                                />
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={true}
                                  time="2023-01-30"
                                />
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: "" }}
                                >
                                  {this._i18nText({
                                    "en-US": "expire",
                                    key: "i18n-9v1fm4itv3m",
                                    use: "zh-CN",
                                    "zh-CN": "过期",
                                  })}
                                </Typography.Text>
                              </Col>
                            </Row>
                          }
                        </Descriptions.Item>
                      </Descriptions>
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
            "en-US": "Disband network",
            key: "i18n-hlh9eenb9wn",
            use: "zh-CN",
            "zh-CN": "解散网络",
          })}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            message={this._i18nText({
              "en-US":
                "The network will disband after the proposal is approved, whether to continue",
              key: "i18n-c3oheknv0lu",
              use: "zh-CN",
              "zh-CN": "网络将在提议通过后解散，是否继续",
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
  const match = matchPath({ path: "/network" }, location.pathname);
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
          func: "useGetNetworks",
          params: undefined,
        },
      ]}
      render={(dataProps) => (
        <Network$$Page {...dataProps} self={self} appHelper={appHelper} />
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
