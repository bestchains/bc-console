// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Typography,
  Radio,
  Space,
  Input,
  Card,
  Table,
  UnifiedLink,
  Status,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class Proposal$$Page extends React.Component {
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
      isOpenModal: false,
      modalType: 'create',
      filter: 'ALL',
      searchValue: undefined,
      searchKey: 'name',
      size: 10,
      current: 1,
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
        {
          text: this.i18n('i18n-ygq2hyfs'),
          value: 'DeployChaincodeProposal',
        },
        {
          text: this.i18n('i18n-bkwwrk8c'),
          value: 'UpgradeChaincodeProposal',
        },
        {
          text: this.i18n('i18n-iu3csmhm'),
          value: 'UpdateChannelMemberProposal',
        },
        // ArchiveChannelProposal
        // UnarchiveChannelProposal
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

  openCreateModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'create',
    });
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  confirmCreateModal(e, payload) {
    var _this$$, _this$$$formRef, _this$$$formRef$curre;
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
      // await this.props.appHelper.utils.bff.createOrganization({ organization: v })
      // this.closeModal()
      // !this.props.useGetOrganizations.error && this.utils.message.success({
      //   content: this.i18n('i18n-1x4p2xt91ss'),
      // })
      // this.props.useGetOrganizations.mutate()
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
      current: 1,
    });
  }

  handleSearchValueChange(e) {
    this.setState({
      searchValue: e.target.value,
      current: 1,
    });
  }

  handlePaginationChange(c, s) {
    this.setState({
      size: s,
      current: c,
    });
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
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
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this.i18n('i18n-lu7m1mohwn') /* 提议列表 */}
            </Typography.Title>
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
                      label: this.i18n('i18n-22h13n1kd8vi') /* 全部提议 */,
                      value: 'ALL',
                    },
                    {
                      label: this.i18n('i18n-5jwxi1nlnsm') /* 我创建的 */,
                      value: 'my',
                    },
                    {
                      disabled: false,
                      label: this.i18n('i18n-krjfpdz3pfp') /* 待处理的 */,
                      value: 'voted',
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
                      this.i18n('i18n-95b8c48v1du') /* 输入提议名称搜索 */
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
                      name: 'pagination.onChange',
                      relatedEventName: 'handlePaginationChange',
                      type: 'componentEvent',
                    },
                    {
                      name: 'pagination.onShowSizeChange',
                      relatedEventName: 'handlePaginationChange',
                      type: 'componentEvent',
                    },
                    {
                      name: 'onChange',
                      relatedEventName: 'handleTableChange',
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
                        <UnifiedLink
                          __component_name="UnifiedLink"
                          target="_self"
                          to={__$$eval(() => '/proposal/' + record.name)}
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
                    title: this.i18n('i18n-d3zo18q4hrn') /* 提议名称 */,
                  },
                  {
                    _unsafe_MixedSetter_filters_select: 'ExpressionSetter',
                    dataIndex: 'type',
                    filters: __$$eval(() => this.state.types),
                    key: 'type',
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
                            () =>
                              __$$context.state.types?.find(
                                (item) => item.value === text
                              )?.text
                          )}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    sorter: false,
                    title: this.i18n('i18n-6bj0f7fay8') /* 提议类型 */,
                  },
                  {
                    dataIndex: 'policy',
                    key: 'policy',
                    title: this.i18n('i18n-g8rbmvh04cd') /* 提议策略 */,
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
                    dataIndex: 'endAt',
                    key: 'endAt',
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
                    title: this.i18n('i18n-v1ic8b3llyo') /* 截止时间 */,
                  },
                  {
                    dataIndex: 'status',
                    key: 'status',
                    render: /* 插槽容器*/ (text, record, index) =>
                      ((__$$context) => (
                        <Status
                          __component_name="Status"
                          id={__$$eval(() => text)}
                          types={[
                            {
                              children:
                                this.i18n('i18n-pmpcxrn4hxn') /* 等待中 */,
                              icon: 'ClockCircleFilled',
                              id: 'Pending',
                              type: 'warning',
                            },
                            {
                              children:
                                this.i18n('i18n-cj4k368h6p9') /* 投票中 */,
                              icon: 'CheckCircleFilled',
                              id: 'Voting',
                              type: 'success',
                            },
                            {
                              children:
                                this.i18n('i18n-6sh24mree') /* 提议成功 */,
                              icon: 'CheckCircleFilled',
                              id: 'Succeeded',
                              type: 'success',
                            },
                            {
                              children:
                                this.i18n('i18n-i94pxfwl0cb') /* 提议失败 */,
                              icon: 'CloseCircleFilled',
                              id: 'Failed',
                              type: 'error',
                            },
                            {
                              children:
                                this.i18n('i18n-6ojbq0y628y') /* 提议超时 */,
                              icon: 'CloseCircleFilled',
                              id: 'Expired',
                              type: 'error',
                            },
                            {
                              children:
                                this.i18n('i18n-ibaeqidf0n') /* 提议异常 */,
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
                    title: this.i18n('i18n-nfnc1vxid1') /* 当前状态 */,
                  },
                  {
                    dataIndex: 'voted',
                    key: 'voted',
                    title: this.i18n('i18n-ldhfyodm92n') /* 已投票 */,
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
                          <UnifiedLink
                            __component_name="UnifiedLink"
                            target="_self"
                            to={__$$eval(() => '/proposal/' + record.name)}
                          >
                            {this.i18n('i18n-4t70z9gdf8u') /* 查看详情 */}
                          </UnifiedLink>
                        </Space>
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
                    this.props.useGetProposals?.data?.proposals
                      ?.filter((item) => {
                        if (this.state.filter === 'ALL') {
                          return true;
                        }
                        if (this.state.filter === 'voted') {
                          return item.voted === 'NotVoted';
                        }
                        return (
                          this.props.authData?.user?.name ===
                          item?.initiator?.admin
                        );
                      })
                      ?.filter((item) => {
                        const arr = this.state.filters?.type;
                        return arr?.length > 0
                          ? arr.some((key) => item.type === key)
                          : true;
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
                loading={__$$eval(() => this.props.useGetProposals?.loading)}
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
                        this.props.useGetProposals?.data?.proposals
                          ?.filter((item) => {
                            if (this.state.filter === 'ALL') {
                              return true;
                            }
                            if (this.state.filter === 'voted') {
                              return votes.some(
                                (vote) =>
                                  vote.organizationAdmin ===
                                    this.props.authData?.user?.name &&
                                  vote.status === 'Created'
                              );
                            }
                            return (
                              this.props.authData?.user?.name ===
                              item?.initiator?.admin
                            );
                          })
                          ?.filter((item) => {
                            const arr = this.state.filters?.type;
                            return arr?.length > 0
                              ? arr.some((key) => item.type === key)
                              : true;
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
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath({ path: '/proposal' }, location.pathname);
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
          func: 'useGetProposals',
          params: undefined,
        },
      ]}
      render={(dataProps) => (
        <Proposal$$Page {...dataProps} self={self} appHelper={appHelper} />
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
