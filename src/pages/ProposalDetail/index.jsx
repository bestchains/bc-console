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
  Radio,
  Space,
  Input,
  Table,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  FormilyTextArea,
} from '@tenx-ui/materials';

import {
  AntdIconClockCircleFilled,
  AntdIconCheckCircleFilled,
  AntdIconCloseCircleFilled,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ProposalDetail$$Page extends React.Component {
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
      current: 1,
      filter: 'ALL',
      isOpenModal: false,
      modalType: 'create',
      record: {},
      searchKey: 'name',
      searchValue: undefined,
      size: 10,
      types: [
        {
          text: this.i18n('i18n-gspz6pec67u'),
          value: 'AddMemberProposal',
        },
        {
          text: this.i18n('i18n-l0it3k61ec'),
          value: 'CreateFederationProposal',
        },
        {
          text: this.i18n('i18n-rufvxaz1mnc'),
          value: 'DeleteMemberProposal',
        },
        {
          text: this.i18n('i18n-i7slyi98o4e'),
          value: 'DissolveFederationProposal',
        },
        {
          text: this.i18n('i18n-9utg1r58kz'),
          value: 'DissolveNetworkProposal',
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
    const form = this.$('formily_create')?.formRef?.current?.form;
    form.submit(async (v) => {
      const params = {
        name: this.state.record?.name,
        organization: this.state.record?.organizationName,
        vote: {
          decision: v.decision === 'true',
          description: v.description,
        },
      };
      try {
        const res = await this.props.appHelper.utils.bff.updateVote(params);
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-o6h4ay1jnp'),
        });
        this.props.useGetProposal.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-z0me61yhdpc'),
          errors: error?.response?.errors,
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
      modalType: 'edit',
      record: payload?.record,
    });
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  componentDidMount() {}

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
              title={this.i18n('i18n-ks9tefvs1g') /* 提议详情 */}
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
                borderedBottom={false}
                borderedBottomDashed={false}
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
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(
                          () =>
                            `${
                              this.props.useGetProposal?.data?.proposal
                                ?.initiator?.name
                            }(${
                              this.props.useGetProposal?.data?.proposal
                                ?.initiator?.admin || '-'
                            })`
                        )}
                      </Typography.Text>
                    ),
                    key: 'r4gchd14zz',
                    label: this.i18n('i18n-nijfmnd2nf') /* 发起人 */,
                    span: 1,
                  },
                  {
                    children: __$$eval(
                      () =>
                        this.state.types?.find(
                          (item) =>
                            item.value ===
                            this.props.useGetProposal?.data?.proposal?.type
                        )?.text || '-'
                    ),
                    key: 'bdr5go2aun',
                    label: this.i18n('i18n-6bj0f7fay8') /* 提议类型 */,
                    span: 1,
                  },
                  {
                    children: __$$eval(
                      () =>
                        this.props.useGetProposal?.data?.proposal?.federation ||
                        '-'
                    ),
                    key: 'fh1j44o9bpr',
                    label: this.i18n('i18n-h05l2cens9w') /* 相关联盟 */,
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
                    key: 'lu5nygtudhq',
                    label: this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
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
                    key: 'o0cvbxwkrj',
                    label: this.i18n('i18n-v1ic8b3llyo') /* 截止时间 */,
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
                            children:
                              this.i18n('i18n-pmpcxrn4hxn') /* 等待中 */,
                            icon: (
                              <AntdIconClockCircleFilled __component_name="AntdIconClockCircleFilled" />
                            ),
                            id: 'Pending',
                            type: 'warning',
                          },
                          {
                            children:
                              this.i18n('i18n-cj4k368h6p9') /* 投票中 */,
                            icon: (
                              <AntdIconCheckCircleFilled __component_name="AntdIconCheckCircleFilled" />
                            ),
                            id: 'Voting',
                            type: 'success',
                          },
                          {
                            children:
                              this.i18n('i18n-6sh24mree') /* 提议成功 */,
                            icon: (
                              <AntdIconCheckCircleFilled __component_name="AntdIconCheckCircleFilled" />
                            ),
                            id: 'Succeeded',
                            type: 'success',
                          },
                          {
                            children:
                              this.i18n('i18n-i94pxfwl0cb') /* 提议失败 */,
                            icon: (
                              <AntdIconCloseCircleFilled __component_name="AntdIconCloseCircleFilled" />
                            ),
                            id: 'Failed',
                            type: 'error',
                          },
                          {
                            children:
                              this.i18n('i18n-6ojbq0y628y') /* 提议超时 */,
                            icon: (
                              <AntdIconCloseCircleFilled __component_name="AntdIconCloseCircleFilled" />
                            ),
                            id: 'Expired',
                            type: 'error',
                          },
                          {
                            children:
                              this.i18n('i18n-ibaeqidf0n') /* 提议异常 */,
                            icon: (
                              <AntdIconCloseCircleFilled __component_name="AntdIconCloseCircleFilled" />
                            ),
                            id: 'Error',
                            type: 'error',
                          },
                        ]}
                      />
                    ),
                    key: 'mljbt4bcmo',
                    label: this.i18n('i18n-bik6xl952y6') /* 状态 */,
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
                        {__$$eval(() =>
                          JSON.stringify(
                            this.props.useGetProposal?.data?.proposal
                              ?.information || {}
                          )
                        )}
                      </Typography.Text>
                    ),
                    key: 'h44w5btrr16',
                    label: this.i18n('i18n-pair5ijzb3j') /* 内容 */,
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
                  label={this.i18n('i18n-nijfmnd2nf') /* 发起人 */}
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
                          `${
                            this.props.useGetProposal?.data?.proposal?.initiator
                              ?.name
                          }(${
                            this.props.useGetProposal?.data?.proposal?.initiator
                              ?.admin || '-'
                          })`
                      )}
                    </Typography.Text>
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="bdr5go2aun"
                  label={this.i18n('i18n-6bj0f7fay8') /* 提议类型 */}
                  span={1}
                  tab=""
                >
                  {__$$eval(
                    () =>
                      this.state.types?.find(
                        (item) =>
                          item.value ===
                          this.props.useGetProposal?.data?.proposal?.type
                      )?.text || '-'
                  )}
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="fh1j44o9bpr"
                  label={this.i18n('i18n-h05l2cens9w') /* 相关联盟 */}
                  span={1}
                >
                  {__$$eval(
                    () =>
                      this.props.useGetProposal?.data?.proposal?.federation ||
                      '-'
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
                          this.props.useGetProposal?.data?.proposal
                            ?.creationTimestamp
                      )}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="o0cvbxwkrj"
                  label={this.i18n('i18n-v1ic8b3llyo') /* 截止时间 */}
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
                  label={this.i18n('i18n-bik6xl952y6') /* 状态 */}
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
                          children: this.i18n('i18n-pmpcxrn4hxn') /* 等待中 */,
                          icon: (
                            <AntdIconClockCircleFilled __component_name="AntdIconClockCircleFilled" />
                          ),
                          id: 'Pending',
                          type: 'warning',
                        },
                        {
                          children: this.i18n('i18n-cj4k368h6p9') /* 投票中 */,
                          icon: (
                            <AntdIconCheckCircleFilled __component_name="AntdIconCheckCircleFilled" />
                          ),
                          id: 'Voting',
                          type: 'success',
                        },
                        {
                          children: this.i18n('i18n-6sh24mree') /* 提议成功 */,
                          icon: (
                            <AntdIconCheckCircleFilled __component_name="AntdIconCheckCircleFilled" />
                          ),
                          id: 'Succeeded',
                          type: 'success',
                        },
                        {
                          children:
                            this.i18n('i18n-i94pxfwl0cb') /* 提议失败 */,
                          icon: (
                            <AntdIconCloseCircleFilled __component_name="AntdIconCloseCircleFilled" />
                          ),
                          id: 'Failed',
                          type: 'error',
                        },
                        {
                          children:
                            this.i18n('i18n-6ojbq0y628y') /* 提议超时 */,
                          icon: (
                            <AntdIconCloseCircleFilled __component_name="AntdIconCloseCircleFilled" />
                          ),
                          id: 'Expired',
                          type: 'error',
                        },
                        {
                          children: this.i18n('i18n-ibaeqidf0n') /* 提议异常 */,
                          icon: (
                            <AntdIconCloseCircleFilled __component_name="AntdIconCloseCircleFilled" />
                          ),
                          id: 'Error',
                          type: 'error',
                        },
                      ]}
                    />
                  }
                </Descriptions.Item>
                <Descriptions.Item
                  __component_name="Descriptions.Item"
                  key="h44w5btrr16"
                  label={this.i18n('i18n-pair5ijzb3j') /* 内容 */}
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
                      label: this.i18n('i18n-w8mwq8gtr08') /* 全部 */,
                      value: 'ALL',
                    },
                    {
                      label: this.i18n('i18n-ldhfyodm92n') /* 已投票 */,
                      value: 'Voted',
                    },
                    {
                      disabled: false,
                      label: this.i18n('i18n-tu47rri2uk') /* 未投票 */,
                      value: 'NotVoted',
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
                      this.i18n('i18n-pjire30gfe') /* 输入投票人搜索 */
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
                    dataIndex: 'organizationAdmin',
                    key: 'organizationAdmin',
                    title: this.i18n('i18n-dt2juiko79s') /* 投票人 */,
                  },
                  {
                    dataIndex: 'organizationName',
                    key: 'organizationName',
                    title: this.i18n('i18n-nkfizmvwbzo') /* 所属组织 */,
                  },
                  {
                    dataIndex: 'voteTime',
                    key: 'voteTime',
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
                    title: this.i18n('i18n-kcfnvyebgwr') /* 投票时间 */,
                  },
                  {
                    dataIndex: 'decision',
                    key: 'decision',
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
                            text
                              ? __$$context.i18n('i18n-mwsw0gqsjf')
                              : text + '' === 'false'
                              ? __$$context.i18n('i18n-n7pr8w2kqpn')
                              : '-'
                          )}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-sndszzqhg7j') /* 决定 */,
                  },
                  {
                    dataIndex: 'description',
                    key: 'description',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                        >
                          {__$$eval(() => text || '-')}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this.i18n('i18n-7s50z0jhy96') /* 原因 */,
                  },
                  {
                    dataIndex: 'status',
                    key: 'status',
                    title: this.i18n('i18n-9j32uhzao7') /* 阶段 */,
                  },
                  {
                    dataIndex: 'op',
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Button
                          __component_name="Button"
                          __events={{
                            eventDataList: [
                              {
                                name: 'onClick',
                                paramStr: '{\n \t "record": this.record\n}',
                                relatedEventName: 'openEditModal',
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
                              record.organizationAdmin !==
                                __$$context.props.authData?.user?.name ||
                              new Date(
                                __$$context.props.useGetProposal?.data?.proposal?.endAt
                              ).getTime() < new Date().getTime() ||
                              ['Voted', 'Finished'].includes(record.status)
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
                          {this.i18n('i18n-eirr55ndhxk') /* 投票 */}
                        </Button>
                      ))(
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
                dataSource={__$$eval(
                  () =>
                    this.props.useGetProposal?.data?.proposal?.votes
                      ?.filter((item) => {
                        if (this.state.filter === 'ALL') {
                          return true;
                        }
                        if (this.state.filter === 'NotVoted') {
                          return item.status === 'NotVoted';
                        }
                        if (this.state.filter === 'Voted') {
                          return item.status === 'Voted';
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
                  size: 'default',
                  total: __$$eval(
                    () =>
                      (
                        this.props.useGetProposal?.data?.proposal?.votes
                          ?.filter((item) => {
                            if (this.state.filter === 'ALL') {
                              return true;
                            }
                            if (this.state.filter === 'NotVoted') {
                              return item.status === 'NotVoted';
                            }
                            if (this.state.filter === 'Voted') {
                              return item.status === 'Voted';
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
                relatedEventName: 'confirmEditModal',
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
            this.confirmEditModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.isOpenModal)}
          title={this.i18n('i18n-r2egx18xw9c') /* 更新投票 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 4,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef('formily_create')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': { bordered: true, placeholder: '请输入' },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'VariableSetter',
                default: __$$eval(
                  () => this.props.useGetProposal?.data?.proposal?.name
                ),
                name: 'name',
                required: false,
                title: this.i18n('i18n-d3zo18q4hrn') /* 提议名称 */,
                'x-pattern': 'disabled',
                'x-validator': [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  bordered: true,
                  placeholder: this.i18n('i18n-f83f1t03e') /* 请选择提议类型 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'VariableSetter',
                default: __$$eval(
                  () => this.props.useGetProposal?.data?.proposal?.type
                ),
                name: 'type',
                required: false,
                title: this.i18n('i18n-6bj0f7fay8') /* 提议类型 */,
                'x-pattern': 'disabled',
                'x-validator': [],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: false,
                  placeholder: this.i18n('i18n-onidezp69vb') /* 请选择决定 */,
                },
              }}
              fieldProps={{
                enum: [
                  { children: [], label: '同意', value: 'true' },
                  { children: [], label: '不同意', value: 'false' },
                ],
                name: 'decision',
                required: true,
                title: this.i18n('i18n-sndszzqhg7j') /* 决定 */,
                'x-validator': [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-21s244w63fc') /* 请输入原因 */,
                },
              }}
              fieldProps={{
                name: 'description',
                title: this.i18n('i18n-7s50z0jhy96') /* 原因 */,
                'x-component': 'Input.TextArea',
                'x-validator': [
                  {
                    message:
                      this.i18n(
                        'i18n-l0t1y311yy'
                      ) /* 原因描述由 0 ~ 200 字符组成 */,
                    pattern: '^.{0,200}$',
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

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/proposal/:id' }, location.pathname);
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
      sdkInitFunc={{
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[
        {
          func: 'useGetProposal',
          params: function applyThis() {
            return {
              name: this.match?.params?.id,
            };
          }.apply(self),
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
