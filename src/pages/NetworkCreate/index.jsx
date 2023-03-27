// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Typography,
  Card,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  Space,
  UnifiedLink,
  FormilyRadio,
  FormilyNumberPicker,
  FormilyTextArea,
  Divider,
  Button,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

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
      delete params.db;
      try {
        const res = await this.props.appHelper.utils.bff.createNetwork({
          network: params,
        });
        this.utils.notification.success({
          message: this.i18n('i18n-27jnv87egc2'),
        });
        this.cancel();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n('i18n-j8xxbkn3j7a'),
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

  validatorName(value) {
    var _this$props,
      _this$props$useGetNet,
      _this$props$useGetNet2,
      _this$props$useGetNet3;
    if (
      (_this$props = this.props) !== null &&
      _this$props !== void 0 &&
      (_this$props$useGetNet = _this$props.useGetNetworks) !== null &&
      _this$props$useGetNet !== void 0 &&
      (_this$props$useGetNet2 = _this$props$useGetNet.data) !== null &&
      _this$props$useGetNet2 !== void 0 &&
      (_this$props$useGetNet3 = _this$props$useGetNet2.networks) !== null &&
      _this$props$useGetNet3 !== void 0 &&
      _this$props$useGetNet3.some((item) => item.name === value)
    ) {
      return this.i18n('i18n-4y6fvhua');
    }
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
            style={{ paddingBottom: '12px' }}
          >
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this.i18n('i18n-kwbu3vyst6') /* 新建网络 */}
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
                  labelAlign: 'left',
                  labelCol: 4,
                  labelWidth: '120px',
                  layout: 'horizontal',
                  wrapperCol: 10,
                  wrapperWidth: '400px',
                }}
                ref={this._refsManager.linkRef('formily_create')}
              >
                <Row
                  __component_name="Row"
                  gutter={[0, 20]}
                  h-gutter={0}
                  v-gutter={20}
                  wrap={true}
                >
                  <Col __component_name="Col" span={24}>
                    <Typography.Title
                      __component_name="Typography.Title"
                      bold={true}
                      bordered={true}
                      ellipsis={true}
                      level={1}
                    >
                      {this.i18n('i18n-98hectg940s') /* 基本信息 */}
                    </Typography.Title>
                  </Col>
                  <Col
                    __component_name="Col"
                    span={24}
                    style={{ marginBottom: '-20px', marginLeft: '50px' }}
                  >
                    <FormilyInput
                      __component_name="FormilyInput"
                      componentProps={{
                        'x-component-props': {
                          placeholder:
                            this.i18n(
                              'i18n-zkmmrz6f'
                            ) /* 请输入网络名称，最多 20 个字符 */,
                        },
                      }}
                      fieldProps={{
                        name: 'name',
                        required: true,
                        title: this.i18n('i18n-03e0p0acqmaf') /* 网络名称 */,
                        'x-validator': [
                          {
                            children: '未知',
                            icon: 'tenx-ui-icon:Circle',
                            id: 'disabled',
                            message:
                              this.i18n(
                                'i18n-o3gly28f'
                              ) /* 长度为 3- 20 个字符 */,
                            pattern: __$$eval(
                              () => this?.constants?.NAME_LENGTH_REG
                            ),
                            type: 'disabled',
                          },
                          {
                            children: '未知',
                            icon: 'tenx-ui-icon:Circle',
                            id: 'disabled',
                            message:
                              this.i18n(
                                'i18n-36661y2t'
                              ) /* 由小写字母、数字、“-”组成，开头和结尾只能是字母或数字 */,
                            pattern: __$$eval(
                              () => this?.constants?.NAME_K8S_REG
                            ),
                            type: 'disabled',
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
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _sdkSwrGetFunc: {
                            func: __$$eval(() => this.utils.bff.getFederations),
                            label: 'name',
                            resKey: '',
                            transformFunc: function () {
                              return this.transformFederation.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            value: 'name',
                          },
                          _unsafe_MixedSetter__sdkSwrGetFunc_select:
                            'ObjectSetter',
                          _unsafe_MixedSetter_enum_select: 'ArraySetter',
                          allowClear: false,
                          disabled: false,
                          enum: [],
                          notFoundContent: {},
                          placeholder:
                            this.i18n('i18n-a30nnbu41z6') /* 请选择联盟 */,
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_description_select: 'SlotSetter',
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
                              style={{ fontSize: '' }}
                            >
                              {
                                this.i18n(
                                  'i18n-txk6oui9mfs'
                                ) /* 区块链网络购买成功后，所属联盟不能更换。您可以 */
                              }
                            </Typography.Text>
                            <UnifiedLink
                              __component_name="UnifiedLink"
                              target="_blank"
                              to="/federation"
                            >
                              {this.i18n('i18n-i69exda650e') /* 新建联盟 */}
                            </UnifiedLink>
                          </Space>
                        ),
                        name: 'federation',
                        required: true,
                        title: this.i18n('i18n-dlxiuotq6z4') /* 所属联盟 */,
                        'x-validator': [],
                      }}
                    />
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _unsafe_MixedSetter_enum_select: 'StringSetter',
                          allowClear: false,
                          disabled: false,
                          enum: "{{ $form?.values?.federation ? (JSON.parse($form?.values?.federation)?.curOrganizations?.map(item => ({ label: `${item.name}(${item.admin || '-'})`, value: item.name })) ||[]) : []}}",
                          placeholder:
                            this.i18n(
                              'i18n-3cphsjan5d2'
                            ) /* 选择自己拥有的组织 */,
                        },
                      }}
                      fieldProps={{
                        name: 'initiator',
                        required: true,
                        title: this.i18n('i18n-v6gmjbqnol') /* 设置发起者 */,
                        'x-validator': [],
                      }}
                    />
                    <FormilyRadio
                      __component_name="FormilyRadio"
                      componentProps={{
                        'x-component-props': {
                          buttonStyle: 'outline',
                          disabled: false,
                          optionType: 'button',
                          size: 'middle',
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_default_select: 'StringSetter',
                        _unsafe_MixedSetter_description_select: 'SlotSetter',
                        default: 'Standard',
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
                              style={{ fontSize: '' }}
                            >
                              {
                                this.i18n(
                                  'i18n-b3i37ksj9vv'
                                ) /* 节点默认配置为 4核CPU 8G内存 200G磁盘，详见 */
                              }
                            </Typography.Text>
                          </Space>
                        ),
                        enum: [
                          {
                            label: this.i18n('i18n-pg663sglzcs') /* 标准版 */,
                            value: 'Standard',
                          },
                        ],
                        name: 'version',
                        title: this.i18n('i18n-bm3i5ksesut') /* 版本选择 */,
                        'x-validator': [],
                      }}
                    />
                  </Col>
                  <Col __component_name="Col" span={24}>
                    {!!false && (
                      <FormilySelect
                        __component_name="FormilySelect"
                        componentProps={{
                          'x-component-props': {
                            _unsafe_MixedSetter_enum_select: 'StringSetter',
                            allowClear: false,
                            disabled: false,
                            enum: "{{ $form?.values?.federation ? (JSON.parse($form?.values?.federation)?.organizations?.map(item => ({ label: `${item.name}(${item.admin || '-'})`, value: item.name })) ||[]) : []}}",
                            mode: 'multiple',
                            placeholder:
                              this.i18n(
                                'i18n-nbke0i5upzc'
                              ) /* 组织名称，建议格式 xxxOrg */,
                          },
                        }}
                        fieldProps={{
                          _unsafe_MixedSetter_default_select: 'I18nSetter',
                          _unsafe_MixedSetter_description_select: 'SlotSetter',
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
                                style={{ fontSize: '' }}
                              >
                                {
                                  this.i18n(
                                    'i18n-dr1hx3bw3v'
                                  ) /* 组织名称须以字母开头，12 位以内数字和字母组成。只有网络初创者可以新建多个组织 */
                                }
                              </Typography.Text>
                              <UnifiedLink
                                __component_name="UnifiedLink"
                                target="_blank"
                                to="https://alibaba.com"
                              >
                                {
                                  this.i18n(
                                    'i18n-xlmv8ef2bsq'
                                  ) /*  了解详情>> */
                                }
                              </UnifiedLink>
                            </Space>
                          ),
                          name: 'organizations',
                          title: this.i18n('i18n-cprrxhrkty') /* 配置成员 */,
                          'x-validator': [],
                        }}
                      />
                    )}
                  </Col>
                  <Col __component_name="Col" span={24}>
                    <Typography.Title
                      __component_name="Typography.Title"
                      bold={true}
                      bordered={true}
                      ellipsis={true}
                      level={1}
                    >
                      {this.i18n('i18n-hjgnfbc9iew') /* 共识配置 */}
                    </Typography.Title>
                  </Col>
                  <Col
                    __component_name="Col"
                    span={24}
                    style={{ marginBottom: '-20px', marginLeft: '50px' }}
                  >
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          allowClear: false,
                          disabled: false,
                          placeholder:
                            this.i18n('i18n-0it28c04tx6') /* 请选择共识算法 */,
                        },
                      }}
                      fieldProps={{
                        enum: [
                          {
                            _unsafe_MixedSetter_label_select: 'StringSetter',
                            children: '未知',
                            icon: 'tenx-ui-icon:Circle',
                            id: 'disabled',
                            label: 'etcdraft',
                            type: 'disabled',
                            value: 'etcdraft',
                          },
                        ],
                        name: 'ordererType',
                        required: true,
                        title: this.i18n('i18n-twykcar3l6l') /* 共识算法 */,
                        'x-validator': [],
                      }}
                    />
                    <FormilyNumberPicker
                      __component_name="FormilyNumberPicker"
                      componentProps={{
                        'x-component-props': {
                          max: 5,
                          min: 0,
                          placeholder: '请输入',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { wrapperWidth: '100px' },
                      }}
                      fieldProps={{
                        enum: [],
                        name: 'clusterSize',
                        title: this.i18n('i18n-vo8kd18n6pd') /* 共识集群节点 */,
                        'x-validator': [],
                      }}
                    />
                    <FormilyInput
                      __component_name="FormilyInput"
                      componentProps={{
                        'x-component-props': {
                          placeholder:
                            this.i18n('i18n-cj9hvn1xox5') /* 请输入节点配置 */,
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_default_select: 'StringSetter',
                        default: 'LevelDB',
                        name: 'db',
                        title: this.i18n('i18n-dgb9yehb') /* 状态数据库类型 */,
                        'x-pattern': 'disabled',
                        'x-validator': [],
                      }}
                    />
                    <FormilyTextArea
                      __component_name="FormilyTextArea"
                      componentProps={{
                        'x-component-props': {
                          placeholder:
                            this.i18n('i18n-rw0h41prk6') /* 请输入描述 */,
                        },
                      }}
                      fieldProps={{
                        name: 'description',
                        title: this.i18n('i18n-8weq4mfy9lf') /* 描述 */,
                        'x-component': 'Input.TextArea',
                        'x-validator': [
                          {
                            children: '未知',
                            icon: 'tenx-ui-icon:Circle',
                            id: 'disabled',
                            message:
                              this.i18n(
                                'i18n-qsvtbgvf'
                              ) /* 网络描述由 0 ~ 200 字符组成 */,
                            pattern: '^.{0,200}$',
                            type: 'disabled',
                          },
                        ],
                      }}
                    />
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
                <Col __component_name="Col" flex="170px" />
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
                            name: 'onClick',
                            relatedEventName: 'cancel',
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
                        this.cancel.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      type="default"
                    >
                      {this.i18n('i18n-l8xumyvnlya') /* 取消 */}
                    </Button>
                    <Button
                      __component_name="Button"
                      __events={{
                        eventDataList: [
                          {
                            name: 'onClick',
                            relatedEventName: 'confirm',
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
                        this.confirm.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      type="primary"
                    >
                      {this.i18n('i18n-tixlz8m0le9') /* 确定 */}
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
  const match = matchPath({ path: '/network/create' }, location.pathname);
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
          func: 'useGetNetworks',
          params: undefined,
        },
      ]}
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
