// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Button,
  Card,
  Descriptions,
  Typography,
  Status,
  Tabs,
  Icon,
  Space,
  Input,
  Table,
  Modal,
  Select,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  Alert,
  UnifiedLink,
  FormilyNumberPicker,
} from '@tenx-ui/materials';

import { default as Logs } from '@tenx-ui/logs';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class OrganizationDetail$$Page extends React.Component {
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
    this.logs = []
    this.state = {
      current: 1,
      filter: 'ALL',
      isOpenModal: false,
      logsContainer: undefined,
      logsTotal: undefined,
      modalType: 'create',
      peers: [],
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

  changeLogsContainer(v, payload) {
    this.setState({
      logsContainer: v,
    });
    const { namespace, name, containers } = this.state?.record?.pod || {};
    this.initWebsocketLogs({
      query: {
        pod: name,
        namespace,
        container: v,
      },
    });
  }

  changeLogsTotal(v, payload) {
    this.setState({
      logsTotal: v,
    });
  }

  closeModal() {
    this.state.ws && this.state.ws.close();
    this.logRef && this.logRef.clearLogs();
    this.setState({
      isOpenModal: false,
    });
  }

  confirmCreateModal(e, payload) {
    const organization =
      this.props.useGetOrganization?.data?.organization || {};
    const form = this.$('formily_create')?.formRef?.current?.form;
    form.submit(async (v) => {
      try {
        const res = await this.props.appHelper.utils.bff.updateOrganization({
          name: organization.name,
          organization: {
            users: (organization?.users || [])
              .concat({
                name: v.name,
                isOrganizationAdmin: !!v.isOrganizationAdmin === 'true',
              })
              ?.map((item) => item.name),
          },
        });
        // this.closeModal()
        // this.utils.notification.success({
        //   message: this.i18n('i18n-x26twb9oy0l'),
        // })
        this.openCreateSuccessModal();
        this.props.useGetOrganization.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-43getajmxf3'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  confirmCreateNodelModal(e, payload) {
    const organization =
      this.props.useGetOrganization?.data?.organization || {};
    const form = this.$('formily_create_node')?.formRef?.current?.form;
    form.submit(async (v) => {
      try {
        const res = await this.props.appHelper.utils.bff.createIbppeer({
          org: organization.name,
          count: v.count,
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-knuex06q'),
        });
        this.getIbppeers();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-sunw6qwy'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  async confirmDeleteModal(e, payload) {
    const organization =
      this.props.useGetOrganization?.data?.organization || {};
    const users = (organization?.users || [])
      .filter((item) => item.name !== this.state.record?.name)
      ?.map((item) => item.name);
    try {
      await this.props.appHelper.utils.bff.updateOrganization({
        name: organization.name,
        organization: {
          users,
        },
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-yy3f9rxigm'),
      });
      this.props.useGetOrganization.mutate();
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-p5gea1q7fem'),
        errors: error?.response?.errors,
      });
    }
  }

  confirmTransferModal(e, payload) {
    const organization =
      this.props.useGetOrganization?.data?.organization || {};
    const form = this.$('formily_transfer')?.formRef?.current?.form;
    form.submit(async (v) => {
      try {
        await this.props.appHelper.utils.bff.updateOrganization({
          name: organization.name,
          organization: v,
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-hjonznxjara'),
        });
        this.props.useGetOrganization.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-zzu9mo73zo'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  downloadLogs(e, payload) {
      const logs = this.state.logs
      ?.slice(this.state.logs?.length - (this.state.logsTotal || this.state.logs?.length))
      ?.map((item) =>
        item?.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]/g, '')
      )
      ?.join('\r\n');
    this.utils.downloadFile(logs, this.state.record?.name + '.log');
  }

  getComponentRef(ref) {
    this.logRef = ref;
  }

  async getIbppeers() {
    const res = await this.props.appHelper.utils.bff.getIbppeers({
      organization: this.match?.params?.id,
    });
    this.setState({
      peers: res?.ibppeers || [],
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
      current: 1,
    });
  }

  handleNodeFilterChange(e) {
    this.setState({
      filter: e.target.value,
      current: 1,
    });
  }

  handleNodePaginationChange(c, s) {
    this.setState({
      size: s,
      current: c,
    });
  }

  handleNodeSearchValueChange(e) {
    this.setState({
      searchValue: e.target.value,
      current: 1,
    });
  }

  handleNodeTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
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

  initWebsocketLogs({ query }) {
    if (!this.logRef) {
      setTimeout(() => {
        this.initWebsocketLogs({
          query,
        });
      }, 200);
      return;
    }
    this.logs = [];
    this.state.ws && this.state.ws.close();
    this.logRef.clearLogs();
    this.logRef.writelns('加载中...');
    const pre = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
    const url = `${pre}//${window.location.host}${
      this.constants.BC_WS_LOGS_API_URL
    }?pod=${query?.pod}&namespace=${query?.namespace}&container=${
      query?.container
    }&token=${this.utils.getAuthData()?.token?.id_token}`;
    const protocol = undefined;
    const ws = new WebSocket(url, protocol);
    this.setState({
      ws,
    });
    ws.onopen = () => {
      this.logRef.clearLogs();
      // ws.send();
    };

    ws.onmessage = (event) => {
      const { data } = event;
      this.logRef.writelns(data);
      this.logs = this.logs.concat(data);
      this.setState({
        logs: this.logs
      })
    };
    ws.onerror = (err) => {};
    ws.onclose = (err) => {};
  }

  nodePaginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  openCreateModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'create',
    });
  }

  openCreateNodeModal() {
    this.setState(
      {
        isOpenModal: true,
        modalType: 'createnode',
      },
      () => {
        setTimeout(() => {
          const organization =
            this.props.useGetOrganization?.data?.organization || {};
          const form = this.$('formily_create_node')?.formRef?.current?.form;
          form.setValues({
            organization: organization.name,
            nodes: this.state.peers?.length || 0,
            count: 1,
            storage: 50,
            time: '30',
          });
        }, 0);
      }
    );
  }

  openCreateSuccessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'createsuccess',
    });
  }

  openDeleteModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: 'delete',
      record: payload?.record,
    });
  }

  openNodeLogsModal(e, payload) {
    const { namespace, name, containers } = payload?.record?.pod || {};
    this.initWebsocketLogs({
      query: {
        pod: name,
        namespace,
        container: containers?.[0],
      },
    });
    this.setState({
      isOpenModal: true,
      modalType: 'nodelogs',
      record: payload?.record,
      logsContainer: containers?.[0],
    });
  }

  openTransferModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: 'transfer',
      record: payload?.record,
    });
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  componentDidMount() {
    this.getIbppeers();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page
        ref={this._refsManager.linkRef('outerView')}
        style={{ height: '100%' }}
      >
        <Row __component_name="Row" wrap={true}>
          <Col
            __component_name="Col"
            span={24}
            style={{ paddingBottom: '12px' }}
          >
            <Button.Back
              __component_name="Button.Back"
              title={this.i18n('i18n-m6n5fnxybu') /* 详情 */}
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
                borderedBottom={false}
                borderedBottomDashed={false}
                colon={false}
                column={2}
                items={[
                  {
                    children: __$$eval(
                      () =>
                        this.props.useGetOrganization?.data?.organization?.name
                    ),
                    key: 'x6fzmf20wkg',
                    label: this.i18n('i18n-ycr2zketd3o') /* 组织名称 */,
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
                            this.props.useGetOrganization?.data?.organization
                              ?.creationTimestamp
                        )}
                      />
                    ),
                    key: 'lu5nygtudhq',
                    label: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
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
                            children: '未知',
                            icon: 'tenx-ui-icon:Circle',
                            id: 'disabled',
                            type: 'disabled',
                          },
                          {
                            children: this.i18n('i18n-7xnyzmr7') /* 创建中 */,
                            icon: 'ClockCircleFilled',
                            id: 'Deploying',
                            type: 'warning',
                          },
                          {
                            children: this.i18n('i18n-xtno2l9qqog') /* 异常 */,
                            icon: 'CloseCircleFilled',
                            id: 'Error',
                            type: 'error',
                          },
                          {
                            children: this.i18n('i18n-fifkprltibf') /* 正常 */,
                            icon: 'CheckCircleFilled',
                            id: 'Deployed',
                            type: 'success',
                          },
                          {
                            children: this.i18n('i18n-7xnyzmr7') /* 创建中 */,
                            icon: 'ClockCircleFilled',
                            id: 'Created',
                            type: 'warning',
                          },
                        ]}
                      />
                    ),
                    key: 'bdr5go2aun',
                    label: this.i18n('i18n-bik6xl952y6') /* 状态 */,
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
                            this.props.useGetOrganization?.data?.organization?.users?.find(
                              (item) => item.isOrganizationAdmin
                            )?.joinedAt
                        )}
                      />
                    ),
                    key: 'ub0bc25o7d',
                    label: this.i18n('i18n-c0d66z03kpk') /* 加入时间 */,
                    span: 1,
                  },
                  {
                    children: __$$eval(
                      () =>
                        this.props.useGetOrganization?.data?.organization?.federations?.join(
                          ','
                        ) || '-'
                    ),
                    key: '9yucmkfjfqg',
                    label: this.i18n('i18n-dlxiuotq6z4') /* 所属联盟 */,
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
                            this.props.useGetOrganization?.data?.organization
                              ?.lastHeartbeatTime
                        )}
                      />
                    ),
                    key: 'o0cvbxwkrj',
                    label: this.i18n('i18n-5er0ayqzcp') /* 最近更新 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization?.networks
                              ?.map((item) => item.name)
                              ?.join(',') || '-'
                        )}
                      </Typography.Text>
                    ),
                    key: 'r4gchd14zz',
                    label: this.i18n('i18n-brhael1t') /* 所属网络 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(
                          () =>
                            this.props.useGetOrganization?.data?.organization
                              ?.description
                        )}
                      </Typography.Text>
                    ),
                    key: 'eleg9opa0dc',
                    label: this.i18n('i18n-wlgvrke3jz9') /* 介绍 */,
                    span: 1,
                  },
                  {
                    children: __$$eval(
                      () =>
                        this.props.useGetOrganization?.data?.organization?.channels?.join(
                          ','
                        ) || '-'
                    ),
                    key: '5gva0owfbf9',
                    label: this.i18n('i18n-ci3cdwcy') /* 加入通道 */,
                    span: 1,
                  },
                  { children: null, key: 'k20atuz7jte', label: ' ', span: 1 },
                  {
                    children: __$$eval(
                      () =>
                        this.props.useGetOrganization?.data?.organization
                          ?.ibppeers?.length || '-'
                    ),
                    key: 'ayb0txehyzf',
                    label: this.i18n('i18n-kh6e0jr0i7b') /* 节点数量 */,
                    span: 1,
                  },
                ]}
                labelStyle={{ width: 100 }}
                layout="horizontal"
                size="default"
                title=""
              >
                <Descriptions.Item
                  key="x6fzmf20wkg"
                  label={this.i18n('i18n-ycr2zketd3o') /* 组织名称 */}
                  span={1}
                >
                  {__$$eval(
                    () =>
                      this.props.useGetOrganization?.data?.organization?.name
                  )}
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="lu5nygtudhq"
                  label={this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      relativeTime={false}
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
                  key="bdr5go2aun"
                  label={this.i18n('i18n-bik6xl952y6') /* 状态 */}
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
                          children: '未知',
                          icon: 'tenx-ui-icon:Circle',
                          id: 'disabled',
                          type: 'disabled',
                        },
                        {
                          children: this.i18n('i18n-7xnyzmr7') /* 创建中 */,
                          icon: 'ClockCircleFilled',
                          id: 'Deploying',
                          type: 'warning',
                        },
                        {
                          children: this.i18n('i18n-xtno2l9qqog') /* 异常 */,
                          icon: 'CloseCircleFilled',
                          id: 'Error',
                          type: 'error',
                        },
                        {
                          children: this.i18n('i18n-fifkprltibf') /* 正常 */,
                          icon: 'CheckCircleFilled',
                          id: 'Deployed',
                          type: 'success',
                        },
                        {
                          children: this.i18n('i18n-7xnyzmr7') /* 创建中 */,
                          icon: 'ClockCircleFilled',
                          id: 'Created',
                          type: 'warning',
                        },
                      ]}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  key="ub0bc25o7d"
                  label={this.i18n('i18n-c0d66z03kpk') /* 加入时间 */}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      relativeTime={false}
                      time={__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization?.users?.find(
                            (item) => item.isOrganizationAdmin
                          )?.joinedAt
                      )}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  key="9yucmkfjfqg"
                  label={this.i18n('i18n-dlxiuotq6z4') /* 所属联盟 */}
                  span={1}
                >
                  {__$$eval(
                    () =>
                      this.props.useGetOrganization?.data?.organization?.federations?.join(
                        ','
                      ) || '-'
                  )}
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="o0cvbxwkrj"
                  label={this.i18n('i18n-5er0ayqzcp') /* 最近更新 */}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      relativeTime={false}
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
                  key="r4gchd14zz"
                  label={this.i18n('i18n-brhael1t') /* 所属网络 */}
                  span={1}
                  tab=""
                >
                  {
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization?.networks
                            ?.map((item) => item.name)
                            ?.join(',') || '-'
                      )}
                    </Typography.Text>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="eleg9opa0dc"
                  label={this.i18n('i18n-wlgvrke3jz9') /* 介绍 */}
                  span={1}
                >
                  {
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(
                        () =>
                          this.props.useGetOrganization?.data?.organization
                            ?.description
                      )}
                    </Typography.Text>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  key="5gva0owfbf9"
                  label={this.i18n('i18n-ci3cdwcy') /* 加入通道 */}
                  span={1}
                >
                  {__$$eval(
                    () =>
                      this.props.useGetOrganization?.data?.organization?.channels?.join(
                        ','
                      ) || '-'
                  )}
                </Descriptions.Item>
                <Descriptions.Item key="k20atuz7jte" label=" " span={1}>
                  {null}
                </Descriptions.Item>
                <Descriptions.Item
                  key="ayb0txehyzf"
                  label={this.i18n('i18n-kh6e0jr0i7b') /* 节点数量 */}
                  span={1}
                >
                  {__$$eval(
                    () =>
                      this.props.useGetOrganization?.data?.organization
                        ?.ibppeers?.length || '-'
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col __component_name="Col" span={24}>
            <Tabs
              destroyInactiveTabPane="true"
              items={[
                {
                  children: (
                    <Row wrap={true}>
                      <Col span={24}>
                        <Card
                          __component_name="Card"
                          actions={[]}
                          bordered={false}
                          hoverable={false}
                          loading={false}
                          size="default"
                          style={{ marginLeft: '-20px', marginTop: '-16px' }}
                          type="default"
                        >
                          <Row
                            __component_name="Row"
                            justify="space-between"
                            wrap={false}
                          >
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
                                disabled={__$$eval(
                                  () =>
                                    this.props.useGetOrganization?.data
                                      ?.organization?.status !== 'Deployed'
                                )}
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
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                type="primary"
                              >
                                {this.i18n('i18n-n5ny2k3khy') /* 新增用户 */}
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
                                        name: 'onChange',
                                        relatedEventName:
                                          'handleSearchValueChange',
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
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([])
                                    );
                                  }.bind(this)}
                                  placeholder={
                                    this.i18n(
                                      'i18n-gnwdi4ep1vt'
                                    ) /* 输入用户名搜索 */
                                  }
                                />
                              </Space>
                            </Col>
                          </Row>
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
                                key: 'id',
                                title: this.i18n('i18n-289qyoqa3vs') /* 用户 */,
                              },
                              {
                                dataIndex: 'isOrganizationAdmin',
                                filters: [
                                  { text: 'admin', value: true },
                                  { text: 'client', value: false },
                                ],
                                key: 'isOrganizationAdmin',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ fontSize: '' }}
                                    >
                                      {__$$eval(() =>
                                        record.isOrganizationAdmin
                                          ? 'admin'
                                          : 'client'
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title: this.i18n('i18n-9yrquy3v2y7') /* 类型 */,
                              },
                              {
                                dataIndex: 'joinAt',
                                key: 'joinAt',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Typography.Time
                                      format=""
                                      relativeTime={false}
                                      time={__$$eval(() => record.joinedAt)}
                                    />
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-c0d66z03kpk') /* 加入时间 */,
                              },
                              {
                                dataIndex: 'status',
                                key: 'status',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Status
                                      id="zc"
                                      types={[
                                        {
                                          children: '未知',
                                          icon: 'tenx-ui-icon:Circle',
                                          id: 'disabled',
                                          type: 'disabled',
                                        },
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-fifkprltibf'
                                            ) /* - */,
                                          icon: 'CheckCircleFilled',
                                          id: 'zc',
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
                                render: (text, record, index) =>
                                  ((__$$context) => [
                                    !!__$$eval(
                                      () => record.isOrganizationAdmin
                                    ) && (
                                      <Button
                                        __component_name="Button"
                                        __events={{
                                          eventDataList: [
                                            {
                                              name: 'onClick',
                                              paramStr:
                                                '{\n \trecord: this.record\n}',
                                              relatedEventName:
                                                'openTransferModal',
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
                                        disabled={__$$eval(
                                          () =>
                                            __$$context.props.useGetOrganization
                                              ?.data?.organization?.status !==
                                            'Deployed'
                                        )}
                                        ghost={false}
                                        icon=""
                                        onClick={function () {
                                          this.openTransferModal.apply(
                                            this,
                                            Array.prototype.slice
                                              .call(arguments)
                                              .concat([
                                                {
                                                  record: record,
                                                },
                                              ])
                                          );
                                        }.bind(__$$context)}
                                        shape="default"
                                        type="link"
                                      >
                                        {this.i18n('i18n-v10ihnkwhn') /* - */}
                                      </Button>
                                    ),
                                    !!__$$eval(
                                      () => !record.isOrganizationAdmin
                                    ) && (
                                      <Button
                                        __component_name="Button"
                                        __events={{
                                          eventDataList: [
                                            {
                                              name: 'onClick',
                                              paramStr:
                                                '{\n \trecord: this.record \n}',
                                              relatedEventName:
                                                'openDeleteModal',
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
                                          this.openDeleteModal.apply(
                                            this,
                                            Array.prototype.slice
                                              .call(arguments)
                                              .concat([
                                                {
                                                  record: record,
                                                },
                                              ])
                                          );
                                        }.bind(__$$context)}
                                        shape="default"
                                        type="link"
                                      >
                                        {this.i18n('i18n-ias68eipm18') /* - */}
                                      </Button>
                                    ),
                                  ])(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                                width: 100,
                              },
                            ]}
                            dataSource={__$$eval(() =>
                              this.props.useGetOrganization?.data?.organization?.users
                                ?.filter((item) => {
                                  const arr =
                                    this.state.filters?.isOrganizationAdmin;
                                  return arr?.length > 0
                                    ? arr.some(
                                        (key) =>
                                          item.isOrganizationAdmin === key
                                      )
                                    : true;
                                })
                                ?.filter((item) => {
                                  return this.state.searchValue
                                    ? item.name?.includes(
                                        this.state.searchValue
                                      )
                                    : true;
                                })
                            )}
                            loading={__$$eval(
                              () => this.props.useGetOrganization?.loading
                            )}
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
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              onShowSizeChange: function () {
                                this.handlePaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              pageSize: __$$eval(() => this.state.size),
                              showQuickJumper: false,
                              showSizeChanger: false,
                              showTotal: function () {
                                return this.paginationShowTotal.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              simple: false,
                              size: 'default',
                              total: __$$eval(
                                () =>
                                  this.props.useGetOrganization?.data?.organization?.users
                                    ?.filter((item) => {
                                      const arr =
                                        this.state.filters?.isOrganizationAdmin;
                                      return arr?.length > 0
                                        ? arr.some(
                                            (key) =>
                                              item.isOrganizationAdmin === key
                                          )
                                        : true;
                                    })
                                    ?.filter((item) => {
                                      return this.state.searchValue
                                        ? item.name?.includes(
                                            this.state.searchValue
                                          )
                                        : true;
                                    })?.length || 0
                              ),
                            }}
                            rowKey="name"
                            scroll={{ scrollToFirstRowOnChange: true }}
                            showHeader={true}
                            size="default"
                            style={{ marginTop: '-0px' }}
                          />
                        </Card>
                      </Col>
                    </Row>
                  ),
                  key: 'tab-item-1',
                  label: this.i18n('i18n-bs2k201x') /* 用户管理 */,
                },
                {
                  children: (
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      size="default"
                      style={{ marginLeft: '-20px', marginTop: '-16px' }}
                      type="default"
                    >
                      <Row
                        __component_name="Row"
                        justify="space-between"
                        wrap={false}
                      >
                        <Col __component_name="Col">
                          <Button
                            __component_name="Button"
                            __events={{
                              eventDataList: [
                                {
                                  name: 'onClick',
                                  relatedEventName: 'openCreateNodeModal',
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
                            disabled={__$$eval(
                              () =>
                                this.props.useGetOrganization?.data
                                  ?.organization?.status !== 'Deployed'
                            )}
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
                              return this.openCreateNodeModal.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            shape="default"
                            type="primary"
                          >
                            {this.i18n('i18n-30zxwkgi') /* 添加节点 */}
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
                                    name: 'onChange',
                                    relatedEventName:
                                      'handleNodeSearchValueChange',
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
                                return this.handleNodeSearchValueChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              placeholder={
                                this.i18n('i18n-x40a97na') /* 输入节点名搜索 */
                              }
                            />
                          </Space>
                        </Col>
                      </Row>
                      <Table
                        __component_name="Table"
                        __events={{
                          eventDataList: [
                            {
                              name: 'onChange',
                              relatedEventName: 'handleNodeTableChange',
                              type: 'componentEvent',
                            },
                            {
                              name: 'pagination.onChange',
                              relatedEventName: 'handleNodePaginationChange',
                              type: 'componentEvent',
                            },
                            {
                              name: 'pagination.onShowSizeChange',
                              relatedEventName: 'handleNodePaginationChange',
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
                            key: 'id',
                            title: this.i18n('i18n-60cjqhh2') /* 节点名 */,
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
                                  {__$$eval(
                                    () => record?.networks?.join(',') || '-'
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-rkrm1qsa') /* 加入联盟链 */,
                          },
                          {
                            dataIndex: 'channel',
                            key: 'channel',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(
                                    () => record?.channels?.join(',') || '-'
                                  )}
                                </Typography.Text>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-ci3cdwcy') /* 加入通道 */,
                          },
                          {
                            dataIndex: 'node',
                            key: 'node',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Space
                                  align="center"
                                  direction="horizontal"
                                  size={0}
                                >
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() =>
                                      __$$context.utils.formatCpu(
                                        record?.limits?.cpu
                                      )
                                    )}
                                  </Typography.Text>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {this.i18n('i18n-m8df8p4v') /* - */}
                                  </Typography.Text>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() =>
                                      parseInt(
                                        __$$context?.record?.limits?.memory
                                      )
                                    )}
                                  </Typography.Text>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {this.i18n('i18n-3y2g20xr') /* - */}
                                  </Typography.Text>
                                </Space>
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-zjmh7vtphh') /* 节点配置 */,
                          },
                          {
                            dataIndex: 'creationTimestamp',
                            key: 'creationTimestamp',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Typography.Time
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(
                                    () => record?.creationTimestamp
                                  )}
                                />
                              ))(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
                          },
                          {
                            dataIndex: 'status',
                            key: 'status',
                            render: (text, record, index) =>
                              ((__$$context) => (
                                <Status
                                  id={__$$eval(() => record.status)}
                                  types={[
                                    {
                                      children:
                                        this.i18n('i18n-fifkprltibf') /* - */,
                                      icon: 'CheckCircleFilled',
                                      id: 'Deployed',
                                      type: 'success',
                                    },
                                    {
                                      children:
                                        this.i18n('i18n-7xnyzmr7') /* - */,
                                      icon: 'ClockCircleFilled',
                                      id: 'Deploying',
                                      type: 'warning',
                                    },
                                    {
                                      children:
                                        this.i18n('i18n-xtno2l9qqog') /* - */,
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
                            render: (text, record, index) =>
                              ((__$$context) => [
                                <Button
                                  __component_name="Button"
                                  __events={{
                                    eventDataList: [
                                      {
                                        name: 'onClick',
                                        paramStr:
                                          '{\n \t "record":this.record \n}',
                                        relatedEventName: 'openNodeLogsModal',
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
                                    return this.openNodeLogsModal.apply(
                                      this,
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([
                                          {
                                            record: record,
                                          },
                                        ])
                                    );
                                  }.bind(__$$context)}
                                  shape="default"
                                  type="link"
                                >
                                  {this.i18n('i18n-7zfzajob') /* - */}
                                </Button>,
                                <Button
                                  __component_name="Button"
                                  __events={{
                                    eventDataList: [],
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
                                  disabled={true}
                                  ghost={false}
                                  icon=""
                                  shape="default"
                                  type="link"
                                >
                                  {this.i18n('i18n-15rtqwxm') /* - */}
                                </Button>,
                              ])(
                                __$$createChildContext(__$$context, {
                                  text,
                                  record,
                                  index,
                                })
                              ),
                            title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                            width: 150,
                          },
                        ]}
                        dataSource={__$$eval(() =>
                          this.state.peers?.filter((item) => {
                            return this.state.searchValue
                              ? item.name?.includes(this.state.searchValue)
                              : true;
                          })
                        )}
                        loading={__$$eval(
                          () => this.props.useGetOrganization?.loading
                        )}
                        onChange={function () {
                          return this.handleNodeTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        pagination={{
                          current: __$$eval(() => this.state.current),
                          onChange: function () {
                            return this.handleNodePaginationChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          onShowSizeChange: function () {
                            return this.handleNodePaginationChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          pageSize: __$$eval(() => this.state.size),
                          showQuickJumper: false,
                          showSizeChanger: false,
                          showTotal: function () {
                            return this.nodePaginationShowTotal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          simple: false,
                          size: 'default',
                          total: __$$eval(
                            () =>
                              this.state.peers
                                ?.filter((item) => {
                                  return this.state.searchValue
                                    ? item.name?.includes(
                                        this.state.searchValue
                                      )
                                    : true;
                                })
                                ?.filter((item) => {
                                  return this.state.searchValue
                                    ? item.name?.includes(
                                        this.state.searchValue
                                      )
                                    : true;
                                })?.length || 0
                          ),
                        }}
                        rowKey="name"
                        scroll={{ scrollToFirstRowOnChange: true }}
                        showHeader={true}
                        size="default"
                        style={{ marginTop: '-0px' }}
                      />
                    </Card>
                  ),
                  key: 'tab-item-2',
                  label: this.i18n('i18n-3hlx98g9') /* 节点管理 */,
                },
              ]}
              size="large"
              style={{ paddingLeft: '20px' }}
              tabPosition="top"
              type="line"
            />
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
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col" />
              <Col __component_name="Col" />
            </Row>
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
            () => this.state.isOpenModal && this.state.modalType === 'nodelogs'
          )}
          title={[
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={2}
            >
              {__$$eval(() => this?.state?.record?.name || '-')}
            </Typography.Title>,
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={2}
            >
              {this.i18n('i18n-qbsph9pa') /* 节点的日志 */}
            </Typography.Title>,
          ]}
          width="900px"
        >
          <Row __component_name="Row" wrap={true}>
            <Col __component_name="Col" span={24}>
              <Row __component_name="Row" justify="space-between" wrap={false}>
                <Col __component_name="Col">
                  <Space align="center" direction="horizontal">
                    <Select
                      __component_name="Select"
                      __events={{
                        eventDataList: [
                          {
                            name: 'onChange',
                            relatedEventName: 'changeLogsContainer',
                            type: 'componentEvent',
                          },
                        ],
                        eventList: [
                          {
                            disabled: true,
                            name: 'onChange',
                            template:
                              "onChange(value,option,${extParams}){\n// 选中 option，或 input 的 value 变化时，调用此函数\nconsole.log('onChange',value,option);}",
                          },
                          {
                            disabled: false,
                            name: 'onSearch',
                            template:
                              "onSearch(value,${extParams}){\n// 文本框值变化时回调\nconsole.log('onSearch',value);}",
                          },
                        ],
                      }}
                      allowClear={false}
                      disabled={false}
                      maxTagCount={0}
                      maxTagTextLength={0}
                      onChange={function () {
                        return this.changeLogsContainer.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      options={__$$eval(
                        () =>
                          this.state?.record?.pod?.containers?.map(
                            (container) => ({
                              label: container,
                              value: container,
                            })
                          ) || []
                      )}
                      placeholder={this.i18n('i18n-fvjc99uh') /* 请选择容器 */}
                      showSearch={true}
                      style={{ width: 200 }}
                      value={__$$eval(() => this.state.logsContainer)}
                    />
                    <Select
                      __component_name="Select"
                      __events={{
                        eventDataList: [
                          {
                            name: 'onChange',
                            relatedEventName: 'changeLogsTotal',
                            type: 'componentEvent',
                          },
                        ],
                        eventList: [
                          {
                            disabled: true,
                            name: 'onChange',
                            template:
                              "onChange(value,option,${extParams}){\n// 选中 option，或 input 的 value 变化时，调用此函数\nconsole.log('onChange',value,option);}",
                          },
                          {
                            disabled: false,
                            name: 'onSearch',
                            template:
                              "onSearch(value,${extParams}){\n// 文本框值变化时回调\nconsole.log('onSearch',value);}",
                          },
                        ],
                      }}
                      allowClear={true}
                      disabled={false}
                      maxTagCount={0}
                      maxTagTextLength={0}
                      onChange={function () {
                        return this.changeLogsTotal.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      options={[
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          label: '50',
                          value: '50',
                        },
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          label: '100',
                          value: '100',
                        },
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          label: '200',
                          value: '200',
                        },
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          disabled: false,
                          label: '500',
                          value: '500',
                        },
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          disabled: false,
                          label: '1000',
                          value: '1000',
                        },
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          disabled: false,
                          label: '2000',
                          value: '2000',
                        },
                      ]}
                      placeholder={this.i18n('i18n-2qmyluwa') /* 请选择条数 */}
                      showSearch={true}
                      style={{ width: 200 }}
                    />
                  </Space>
                </Col>
                <Col __component_name="Col">
                  <Button
                    __component_name="Button"
                    __events={{
                      eventDataList: [
                        {
                          name: 'onClick',
                          relatedEventName: 'downloadLogs',
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
                        type="DownloadOutlined"
                      />
                    }
                    loading={false}
                    onClick={function () {
                      return this.downloadLogs.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    shape="default"
                    type="primary"
                  >
                    {this.i18n('i18n-xcgopsty') /* 下载日志 */}
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col __component_name="Col" span={24}>
              <Logs
                __component_name="Logs"
                filterColorCharacters={true}
                getComponentRef={function () {
                  return this.getComponentRef.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                header=""
                logs=""
                scrollToBottom={true}
              />
            </Col>
          </Row>
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
            () => this.state.modalType === 'create' && this.state.isOpenModal
          )}
          title={this.i18n('i18n-n5ny2k3khy') /* 新增用户 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 5,
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
                    this.i18n('i18n-ttjyzz0s45l') /* 请输入用户名称 */,
                },
              }}
              fieldProps={{
                name: 'name',
                required: true,
                title: this.i18n('i18n-289qyoqa3vs') /* 用户 */,
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-ch5wgxkhdhs'
                      ) /* 用户名称由 3 ~ 20 个小写字母, 数字, 下划线组成 */,
                    pattern: '^[a-z0-9_]{3,20}$',
                    required: true,
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: true,
                  placeholder:
                    this.i18n('i18n-6a9y7k26xhq') /* 请选择用户类型 */,
                },
              }}
              fieldProps={{
                default: 'client',
                enum: [
                  { children: [], label: 'admin', value: 'true' },
                  { children: [], label: 'client', value: 'false' },
                ],
                name: 'isOrganizationAdmin',
                title: this.i18n('i18n-irf019z3fd') /* 配置用户类型 */,
                'x-validator': [],
              }}
            />
          </FormilyForm>
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
                relatedEventName: 'confirmTransferModal',
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
            this.confirmTransferModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.modalType === 'transfer' && this.state.isOpenModal
          )}
          title={this.i18n('i18n-armm7kw0zpr') /* 转移管理员权限 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 6,
              layout: 'horizontal',
              wrapperCol: 18,
            }}
            ref={this._refsManager.linkRef('formily_transfer')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  bordered: true,
                  placeholder:
                    this.i18n('i18n-ttjyzz0s45l') /* 请输入用户名称 */,
                },
              }}
              fieldProps={{
                name: 'admin',
                required: true,
                title: this.i18n('i18n-0tsputxj615') /* 新的管理员用户 */,
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-ch5wgxkhdhs'
                      ) /* 用户名称由 3 ~ 20 个小写字母, 数字, 下划线组成 */,
                    pattern: '^[a-z0-9_]{3,20}$',
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
            message={
              this.i18n(
                'i18n-3ja6wz9xvoh'
              ) /* 提示：确认后，管理员权限将全部转移给新用户 */
            }
            showIcon={true}
            type="warning"
          />
        </Modal>
        <Modal
          __events={{
            eventDataList: [
              {
                name: 'onOk',
                relatedEventName: 'closeModal',
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
                {this.i18n('i18n-od5gesjx') /* 用户邀请已发送 */}
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
            () => this.state.modalType === 'delete' && this.state.isOpenModal
          )}
          title={this.i18n('i18n-h52hay1ld2s') /* 删除用户 */}
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
                style={{ fontSize: '' }}
              >
                {this.i18n('i18n-3lwzud889in') /* 您正在从组织 */}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
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
                style={{ fontSize: '' }}
              >
                {this.i18n('i18n-nm17suv2xhh') /* 中删除用户 */}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              >
                {__$$eval(() => this.state.record && this.state.record.name)}
              </Typography.Text>,
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              >
                {
                  this.i18n(
                    'i18n-h8159rss9ij'
                  ) /* ，删除后，用户在该组织下所有权限将被收回 */
                }
              </Typography.Text>,
            ]}
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
              {
                name: 'onOk',
                relatedEventName: 'confirmCreateNodelModal',
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
            return this.confirmCreateNodelModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal && this.state.modalType === 'createnode'
          )}
          title={this.i18n('i18n-30zxwkgi') /* 添加节点 */}
        >
          <Row gutter={[0, 20]} h-gutter={0} v-gutter={20} wrap={true}>
            <Col
              span={24}
              style={{
                backgroundColor: 'rgba(13,8,13,0.08)',
                borderRadius: '4px',
                paddingBottom: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                paddingTop: '12px',
              }}
            >
              <Descriptions
                bordered={false}
                colon={true}
                column={3}
                items={[
                  {
                    children: null,
                    key: '7zzd99339hq',
                    label: this.i18n('i18n-9e87qfos') /* 名称 */,
                    span: 1,
                  },
                  {
                    children: null,
                    key: '1itgdo73rvo',
                    label: this.i18n('i18n-flja3ls6') /* 云主机及配置 */,
                    span: 1,
                  },
                  {
                    children: null,
                    key: '60po9w401l8',
                    label: this.i18n('i18n-pra1gymtjol') /* 到期时间 */,
                    span: 1,
                  },
                ]}
                layout="horizontal"
                size="default"
                title={this.i18n('i18n-6w3cfx8m') /* 原配置 */}
              >
                <Descriptions.Item
                  key="7zzd99339hq"
                  label={this.i18n('i18n-9e87qfos') /* 名称 */}
                  span={1}
                >
                  {
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      -
                    </Typography.Text>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  key="1itgdo73rvo"
                  label={this.i18n('i18n-flja3ls6') /* 云主机及配置 */}
                  span={1}
                >
                  {
                    <Space align="center" direction="horizontal">
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        4核8G
                      </Typography.Text>
                    </Space>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  key="60po9w401l8"
                  label={this.i18n('i18n-pra1gymtjol') /* 到期时间 */}
                  span={1}
                >
                  {
                    <Typography.Time
                      __component_name="Typography.Time"
                      format=""
                      relativeTime={false}
                      time=""
                    />
                  }
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={24}>
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelCol: 5,
                  layout: 'horizontal',
                  wrapperCol: 20,
                }}
                ref={this._refsManager.linkRef('formily_create_node')}
              >
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      placeholder:
                        this.i18n('i18n-d6xpwgoamdo') /* 请输入组织名称 */,
                    },
                  }}
                  fieldProps={{
                    description: {},
                    name: 'organization',
                    title: this.i18n('i18n-2uy76ea1') /* 组织 */,
                    'x-pattern': 'disabled',
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': { placeholder: '请输入' },
                  }}
                  fieldProps={{
                    name: 'nodes',
                    title: this.i18n('i18n-8xwszqos') /* 原节点数 */,
                    'x-pattern': 'disabled',
                    'x-validator': [],
                  }}
                />
                <FormilyNumberPicker
                  __component_name="FormilyNumberPicker"
                  componentProps={{
                    'x-component-props': {
                      min: 1,
                      placeholder: '请输入',
                      precision: 0,
                      step: 1,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { size: 'default' } }}
                  fieldProps={{
                    name: 'count',
                    title: this.i18n('i18n-rjt0ywiz') /* 新增节点数量 */,
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      _unsafe_MixedSetter_addonAfter_select: 'StringSetter',
                      addonAfter: 'G',
                      placeholder: '请输入',
                    },
                  }}
                  fieldProps={{
                    _unsafe_MixedSetter_default_select: 'StringSetter',
                    default: '50',
                    name: 'storage',
                    title: this.i18n('i18n-cbhoi5g6') /* 节点存储 */,
                    'x-pattern': 'disabled',
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      _unsafe_MixedSetter_addonAfter_select: 'I18nSetter',
                      addonAfter: this.i18n('i18n-rzd7hbhq') /* 天 */,
                      placeholder: '请输入',
                    },
                  }}
                  fieldProps={{
                    _unsafe_MixedSetter_default_select: 'StringSetter',
                    default: '30',
                    name: 'time',
                    title: this.i18n('i18n-ugehpppw') /* 购买时长 */,
                    'x-pattern': 'disabled',
                    'x-validator': [],
                  }}
                />
              </FormilyForm>
            </Col>
          </Row>
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/organization/:id' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);
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
      self={self}
      sdkSwrFuncs={[
        {
          func: 'useGetOrganization',
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
