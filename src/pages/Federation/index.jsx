// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  Space,
  Typography,
  UnifiedLink,
  FormilyTextArea,
  Alert,
  Button,
  Icon,
  Row,
  Col,
  Radio,
  Input,
  Card,
  Table,
  Status,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import * as qs from 'querystring';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class Federation$$Page extends React.Component {
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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      createLoading: false,
      current: 1,
      filter: 'ALL',
      isOpenModal: false,
      modalType: 'create',
      organizations: [],
      record: {},
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
    const form = this.$('formily_create')?.formRef?.current?.form;
    form.submit(async (v) => {
      delete v.displayName;
      this.setState({
        createLoading: true,
      });
      try {
        await this.props.appHelper.utils.bff.createFederation({
          federation: v,
        });
        if (v?.organizations?.length > 0) {
          this.openCreateSuccessModal();
        } else {
          this.closeModal();
          this.utils.notification.success({
            message: this.i18n('i18n-d4bbvp00v5t'),
          });
        }
        this.props.useGetFederations.mutate();
        this.setState({
          createLoading: false,
        });
      } catch (error) {
        this.setState({
          createLoading: false,
        });
        this.utils.notification.warnings({
          message: this.i18n('i18n-n58z07yheg'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  async confirmDeleteModal(e, payload) {
    try {
      await this.props.appHelper.utils.bff.deleteFederation({
        name: this.state.record?.name,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-08rsz7n9sruo'),
      });
      this.props.useGetFederations.mutate();
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-2tfq4ggp9cv'),
        errors: error?.response?.errors,
      });
    }
  }

  async confirmDissolveModal(e, payload) {
    try {
      await this.props.appHelper.utils.bff.dissolveFederation({
        name: this.state.record?.name,
      });
      // this.closeModal()
      // this.utils.notification.success({
      //   message: this.i18n('i18n-gagifmv2uun'),
      // })
      this.openDissolveSuccessModal();
      this.props.useGetFederations.mutate();
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-j5kb8u4qc1b'),
        errors: error?.response?.errors,
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

  onMenuClick(e, payload) {
    const { key } = payload || {};
    this.setState({
      record: payload?.record,
    });
    if (key === 'dissolve') {
      this.openDissolveModal();
    }
    if (key === 'delete') {
      this.openDeleteModal();
    }
  }

  openCreateModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'create',
    });
  }

  openCreateSuccessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'createsuccess',
    });
  }

  openDeleteModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'delete',
    });
  }

  openDissolveModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'dissolve',
    });
  }

  openDissolveSuccessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'dissolvesuccess',
    });
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  validatorName(value) {
    if (
      this.props?.useGetFederations?.data?.federations?.some(
        (item) => item.name === value
      )
    ) {
      return this.i18n('i18n-4y6fvhua');
    }
  }

  componentDidMount() {
    const getOrganizations = async () => {
      const res = await this.props.appHelper.utils.bff.getOrganizations();
      this.setState({
        organizations:
          res?.organizations?.map((item) => ({
            ...item,
            value: item.name,
            label: `${item.name}(${item.admin})`,
          })) || [],
      });
    };
    getOrganizations();
  }

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
                name: 'onCancel',
                relatedEventName: 'closeModal',
                type: 'componentEvent',
              },
              {
                name: 'onOk',
                relatedEventName: 'confirmCreateModal',
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
          confirmLoading={__$$eval(() => this.state.createLoading || false)}
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
            () => this.state.isOpenModal && this.state.modalType === 'create'
          )}
          title={this.i18n('i18n-i69exda650e') /* 新建联盟 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 7,
              layout: 'horizontal',
              wrapperCol: 19,
            }}
            ref={this._refsManager.linkRef('formily_create')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  bordered: true,
                  placeholder:
                    this.i18n('i18n-b5zuy9i6xlf') /* 请输入联盟名称 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_title_select: 'I18nSetter',
                name: 'name',
                required: true,
                title: this.i18n('i18n-fvcps4edx44') /* 联盟名称 */,
                'x-validator': [
                  {
                    message:
                      this.i18n('i18n-o3gly28f') /* 长度为 3- 20 个字符 */,
                    pattern: __$$eval(() => this?.constants?.NAME_LENGTH_REG),
                  },
                  {
                    message:
                      this.i18n(
                        'i18n-36661y2t'
                      ) /* 由小写字母、数字、“-”组成，开头和结尾只能是字母或数字 */,
                    pattern: __$$eval(() => this?.constants?.NAME_K8S_REG),
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
                'x-component-props': { placeholder: '请输入' },
              }}
              fieldProps={{
                default: this.i18n('i18n-1g6cw1w1uv4') /* 实名认证 */,
                name: 'displayName',
                title: this.i18n('i18n-21z9nbkoohk') /* 成员限制 */,
                'x-pattern': 'disabled',
                'x-validator': [
                  {
                    message: '展示名由 0 ~ 20 个中英文、数字组成',
                    pattern: '^[a-zA-Z0-9_\\u4e00-\\u9fa5]{0,20}$',
                  },
                ],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: false,
                  placeholder:
                    this.i18n('i18n-3cphsjan5d2') /* 选择自己拥有的组织 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_description_select: 'SlotSetter',
                _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                description: (
                  <Space align="center" direction="horizontal">
                    <Typography.Text
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {
                        this.i18n(
                          'i18n-lkzmdgmv'
                        ) /* 如果您还没有组织，您可以 */
                      }
                    </Typography.Text>
                    <UnifiedLink target="_blank" to="/organization">
                      {this.i18n('i18n-tlql06imj7') /* 创建组织 */}
                    </UnifiedLink>
                  </Space>
                ),
                enum: __$$eval(
                  () =>
                    this.state.organizations?.filter(
                      (item) => item?.admin === this.props.authData?.user?.name
                    ) || []
                ),
                name: 'initiator',
                required: true,
                title: this.i18n('i18n-wctt13ld2x') /* 发起者 */,
                'x-validator': [],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: false,
                  mode: 'multiple',
                  placeholder: this.i18n('i18n-bko8c4ii1ad') /* 请选择成员 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                enum: __$$eval(
                  () =>
                    this.state.organizations?.filter(
                      (item) => item?.admin !== this.props.authData?.user?.name
                    ) || []
                ),
                name: 'organizations',
                required: false,
                title: this.i18n('i18n-0bo5igd908x') /* 选择成员 */,
                'x-validator': [],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: false,
                  placeholder:
                    this.i18n('i18n-fpx7c35bovp') /* 请选择提议投票策略 */,
                },
              }}
              decoratorProps={{
                'x-decorator-props': {
                  _unsafe_MixedSetter_tooltip_select: 'StringSetter',
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_enum_select: 'ArraySetter',
                enum: [
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    _unsafe_MixedSetter_value_select: 'StringSetter',
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: 'All',
                    type: 'disabled',
                    value: 'All',
                  },
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: 'Majority',
                    type: 'disabled',
                    value: 'Majority',
                  },
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: 'OneVoteVeto',
                    type: 'disabled',
                    value: 'OneVoteVeto',
                  },
                ],
                name: 'policy',
                required: true,
                title: this.i18n('i18n-p98jmw4mkzq') /* 提议投票策略 */,
                'x-validator': [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-rw0h41prk6') /* 请输入描述 */,
                },
              }}
              fieldProps={{
                name: 'description',
                title: this.i18n('i18n-8weq4mfy9lf') /* 描述 */,
                'x-component': 'Input.TextArea',
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-xr251ak8b2'
                      ) /* 联盟描述由 0 ~ 200 字符组成 */,
                    pattern: '^.{0,200}$',
                  },
                ],
              }}
            />
          </FormilyForm>
          <Alert
            message={this.i18n('i18n-ohwea8x7') /* 申请提议将发送给组建成员 */}
            showIcon={true}
            type="info"
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
              {
                name: 'onOk',
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
          onOk={function () {
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
                {this.i18n('i18n-x6icsntt') /* 新建联盟提议已发送 */}
              </Typography.Text>
            </Space>
          }
        >
          <Space align="center" direction="horizontal">
            <Typography.Text
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-10n3sqsc') /* 请在 */}
            </Typography.Text>
            <UnifiedLink target="_blank" to="/proposal">
              {this.i18n('i18n-e72wfods') /* 提议管理 */}
            </UnifiedLink>
            <Typography.Text
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-l8vvga48') /* 查看进度 */}
            </Typography.Text>
          </Space>
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
          onOk={function () {
            return this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'dissolvesuccess'
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
                {this.i18n('i18n-lxd7pwc9') /* 解散联盟提议已发送 */}
              </Typography.Text>
            </Space>
          }
        >
          <Space align="center" direction="horizontal">
            <Typography.Text
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-10n3sqsc') /* 请在 */}
            </Typography.Text>
            <UnifiedLink target="_blank" to="/proposal">
              {this.i18n('i18n-e72wfods') /* 提议管理 */}
            </UnifiedLink>
            <Typography.Text
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-l8vvga48') /* 查看进度 */}
            </Typography.Text>
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
                relatedEventName: 'confirmDissolveModal',
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
            () => this.state.isOpenModal && this.state.modalType === 'dissolve'
          )}
          title={this.i18n('i18n-fcr3rfde') /* 确认发起解散联盟提议 */}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            icon=""
            message={
              this.i18n(
                'i18n-ny3xb6gq'
              ) /* 请确保联盟下所有网络已经停用，解散之后不可恢复，请慎重！ */
            }
            showIcon={true}
            type="warning"
          />
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
              {this.i18n('i18n-3u58kijmwhw') /* 联盟 */}
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
                  {this.i18n('i18n-i69exda650e') /* 新建联盟 */}
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
                          label: this.i18n('i18n-j6d9jqyiwnj') /* 全部联盟 */,
                          value: 'ALL',
                        },
                        {
                          label: this.i18n('i18n-5jwxi1nlnsm') /* 我创建的 */,
                          value: 'MY',
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
                        'i18n-96qiu0ctj5p'
                      ) /* 输入联盟名称或创建人搜索 */
                    }
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
                      name: 'onChange',
                      relatedEventName: 'handleTableChange',
                      type: 'componentEvent',
                    },
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
                          disabled={__$$eval(
                            () => record.status !== 'FederationActivated'
                          )}
                          ghost={false}
                          href={__$$eval(() => '/federation/' + record.name)}
                          icon=""
                          shape="default"
                          type="link"
                        >
                          {__$$eval(() => record.name)}
                        </Button>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-fvcps4edx44') /* 联盟名称 */,
                  },
                  {
                    dataIndex: 'initiator',
                    key: 'initiator',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
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
                    title: this.i18n('i18n-7ww60oxk') /* 创建者 */,
                  },
                  {
                    dataIndex: 'organizations',
                    key: 'organizations',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
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
                    title: this.i18n('i18n-si4qi37l') /* 成员数 */,
                  },
                  {
                    dataIndex: 'networks',
                    key: 'networks',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                        >
                          {__$$eval(() => record?.networks?.length || '0')}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-csxel0bc') /* 网络数 */,
                  },
                  {
                    dataIndex: 'creationTimestamp',
                    key: 'creationTimestamp',
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
                    title: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
                  },
                  {
                    dataIndex: 'joinedAt',
                    key: 'joinedAt',
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
                    title: this.i18n('i18n-c0d66z03kpk') /* 加入时间 */,
                  },
                  {
                    dataIndex: 'policy',
                    key: 'policy',
                    title: this.i18n('i18n-g8rbmvh04cd') /* 提议策略 */,
                  },
                  {
                    dataIndex: 'status',
                    key: 'status',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Status
                          __component_name="Status"
                          id={__$$eval(() => text)}
                          types={[
                            {
                              children:
                                this.i18n('i18n-1d5bt7sz4jb') /* 组建中 */,
                              icon: 'ClockCircleFilled',
                              id: 'FederationPending',
                              type: 'warning',
                            },
                            {
                              children:
                                this.i18n('i18n-2vzrxdpca5') /* 已激活 */,
                              icon: 'CheckCircleFilled',
                              id: 'FederationActivated',
                              type: 'success',
                            },
                            {
                              children:
                                this.i18n('i18n-ej048sy57c') /* 组建失败 */,
                              icon: 'CloseCircleFilled',
                              id: 'FederationFailed',
                              type: 'error',
                            },
                            {
                              children:
                                this.i18n('i18n-pev2ce1ut3l') /* 已解散 */,
                              icon: 'CloseCircleFilled',
                              id: 'FederationDissolved',
                              type: 'error',
                            },
                            {
                              children:
                                this.i18n('i18n-xtno2l9qqog') /* 异常 */,
                              icon: 'CloseCircleFilled',
                              id: 'Error',
                              type: 'error',
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
                            disabled={__$$eval(
                              () => record.status !== 'FederationActivated'
                            )}
                            ghost={false}
                            href={__$$eval(() => '/federation/' + record.name)}
                            icon=""
                            shape="default"
                            type="link"
                          >
                            {this.i18n('i18n-m6n5fnxybu') /* 详情 */}
                          </Button>
                          {!!__$$eval(
                            () => record?.status === 'FederationDissolved'
                          ) && (
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    paramStr:
                                      '{\n \t "record":this.record,\n\t\tkey: \'delete\'\n}',
                                    relatedEventName: 'onMenuClick',
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
                              disabled={null}
                              ghost={false}
                              icon=""
                              onClick={function () {
                                return this.onMenuClick.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([
                                    {
                                      record: record,
                                      key: 'delete',
                                    },
                                  ])
                                );
                              }.bind(__$$context)}
                              shape="default"
                              type="link"
                            >
                              {this.i18n('i18n-ias68eipm18') /* 删除 */}
                            </Button>
                          )}
                          {!!__$$eval(
                            () => record?.status !== 'FederationDissolved'
                          ) && (
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: 'onClick',
                                    paramStr:
                                      '{\n \t "record":this.record, \n\t\t"key":"dissolve"\n}',
                                    relatedEventName: 'onMenuClick',
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
                              disabled={null}
                              ghost={false}
                              href={null}
                              icon=""
                              onClick={function () {
                                return this.onMenuClick.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([
                                    {
                                      record: record,
                                      key: 'dissolve',
                                    },
                                  ])
                                );
                              }.bind(__$$context)}
                              shape="default"
                              type="link"
                            >
                              {this.i18n('i18n-lfchnp1t') /* 解散 */}
                            </Button>
                          )}
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
                dataSource={__$$eval(
                  () =>
                    this.props.useGetFederations?.data?.federations
                      ?.filter((item) => {
                        if (this.state.filter === 'ALL') {
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
                  size: 'default',
                  total: __$$eval(
                    () =>
                      (
                        this.props.useGetFederations?.data?.federations
                          ?.filter((item) => {
                            if (this.state.filter === 'ALL') {
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
                          }) || []
                      ).length
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
            () => this.state.isOpenModal && this.state.modalType === 'delete'
          )}
          title={this.i18n('i18n-anergo0dunh') /* 删除联盟 */}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            message={
              this.i18n('i18n-qyzhg15a') /* 删除之后不可恢复，请慎重！ */
            }
            showIcon={true}
            type="warning"
          />
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/federation' }, location.pathname);
  location.match = match;
  location.query = qs.parse(location.search);
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
      sdkSwrFuncs={[
        {
          func: 'useGetFederations',
          params: {},
        },
      ]}
      render={(dataProps) => (
        <Federation$$Page {...dataProps} self={self} appHelper={appHelper} />
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
