// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  FormilyUpload,
  Button,
  Icon,
  FormilyTextArea,
  FormilyFormItem,
  FormilyArrayCards,
  Descriptions,
  Typography,
  Row,
  Col,
  Alert,
  Space,
  UnifiedLink,
  Transfer,
  Tabs,
  Spin,
  Card,
  Divider,
  Status,
  Table,
  Input,
  Dropdown,
  Steps,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import * as qs from 'querystring';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class NetworkDetail$$Page extends React.Component {
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
      activeKey: 'network',
      allPeers: [],
      channel: {
        filter: 'ALL',
        searchValue: undefined,
        searchKey: 'name',
        size: 10,
        current: 1,
        record: {},
        step: 0,
      },
      channelPeers: [],
      contract: {
        filter: 'ALL',
        searchValue: undefined,
        searchKey: 'name',
        size: 10,
        current: 1,
        record: {},
        createLoading: false,
      },
      contractUpgradeLoading: false,
      isOpenModal: false,
      modalType: 'addchannel',
      organization: {
        filter: 'ALL',
        searchValue: undefined,
        searchKey: 'name',
        size: 10,
        current: 1,
        record: {},
      },
      organizations: [],
      peers: [],
      strategy: {
        filter: 'ALL',
        searchValue: undefined,
        searchKey: 'name',
        size: 10,
        current: 1,
        record: {},
        list: [],
        channels: [],
      },
    };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  beforeUpload() {
    return false;
  }

  changeContractVersion(e, payload) {
    this.setState({
      initVersions: {
        ...this.state.initVersions,
        [payload?.record?.displayName]: e.key,
      },
    });
  }

  async channelAddModalConfirm(e, payload) {
    const network = this.props.useGetNetwork?.data?.network || {};
    try {
      const res = await this.props.appHelper.utils.bff.createChannel({
        network: network?.name,
        channel: {
          ...(this.state?.channel?.addData || {}),
          peers: this.state.channelPeers?.map((key) => {
            const item = this.state.allPeers?.find((item) => item.key === key);
            return {
              name: item.name,
              namespace: item.namespace,
            };
          }),
        },
      });
      // if (this.state?.channel?.addData?.organizations?.length > 0) {
      //   this.openAddChannelSuccessModal()
      // } else {
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-l8fybssesij'),
      });
      // }
      setTimeout(() => {
        this.props.useGetNetwork.mutate();
      }, 200);
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-85kkwp67i5u'),
        errors: error?.response?.errors,
      });
    }
  }

  channelAddModalNext() {
    const form = this.$('formily_create_channel')?.formRef?.current?.form;
    form.submit(async (v) => {
      this.setState({
        channel: {
          ...this.state.channel,
          addData: v,
          step: 1,
        },
      });
      this.getPeers(v, () => {});
    });
  }

  channelAddModalPre() {
    this.setState(
      {
        channel: {
          ...this.state.channel,
          step: 0,
        },
      },
      () => {
        const form = this.$('formily_create_channel')?.formRef?.current?.form;
        form.setValues(this.state.channel.addData);
      }
    );
  }

  channelAddOrganizationModalConfirm(e, payload) {
    const form = this.$('formily_create_channel_organization')?.formRef?.current
      ?.form;
    form.submit(async (v) => {
      try {
        const res = await this.props.appHelper.utils.bff.updateMemberChannel({
          name: this.state.channel?.record?.name,
          members: v.members,
        });
        // this.closeModal()
        // this.utils.notification.success({
        //   message: this.i18n('i18n-t4zc5jan'),
        // })
        this.openAddChannelOrganizationSuccessModal();
        this.props.useGetNetwork.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-2hz9pwzp'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  async channelAddPeerModalConfirm(e, payload) {
    const network = this.props.useGetNetwork?.data?.network || {};
    if (this.state.channelPeers?.length < 1) {
      return;
    }
    try {
      const res = await this.props.appHelper.utils.bff.updateChannel({
        name: this.state.channel?.record?.name,
        channel: {
          operate: 'add',
          // remove
          peers: this.state.channelPeers?.map((key) => {
            const item = this.state.allPeers?.find((item) => item.key === key);
            return {
              name: item.name,
              namespace: item.namespace,
            };
          }),
        },
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-knuex06q'),
      });
      // this.openAddChannelSuccessModal()
      this.props.useGetNetwork.mutate();
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-sunw6qwy'),
        errors: error?.response?.errors,
      });
    }
  }

  channelPeersChange(channelPeers) {
    this.setState({
      channelPeers,
    });
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
      channelPeers: [],
    });
  }

  confirmAddContractModal(e, payload) {
    const network = this.props.useGetNetwork?.data?.network || {};
    const form = this.$('formily_create_contract')?.formRef?.current?.form;
    form.submit(async (v) => {
      this.setState({
        contract: {
          ...this.state.contract,
          createLoading: true,
        },
      });
      const { format, files, ...params } = v;
      const query = {
        ...params,
        network: this.match?.params?.id,
      };
      if (format === 'zip') {
        query.file = v.files?.fileList?.[0]?.originFileObj;
      } else {
        query.files = v.files?.fileList?.map((item) => item.originFileObj);
        query.fileRelativePaths = v.files?.fileList?.map((item) => {
          const file = item.originFileObj;
          return file.webkitRelativePath;
        });
      }
      try {
        const res = await this.props.appHelper.utils.bff.createChaincodebuild(
          query
        );
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-5eg2znpg'),
        });
        this.props.useGetChaincodebuilds.mutate();
        this.setState({
          contract: {
            ...this.state.contract,
            createLoading: false,
          },
        });
      } catch (error) {
        this.setState({
          contract: {
            ...this.state.contract,
            createLoading: false,
          },
        });
        this.utils.notification.warnings({
          message: this.i18n('i18n-rw4x2dt7'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  confirmAddStrategyModal(e, payload) {
    const network = this.props.useGetNetwork?.data?.network || {};
    const form = this.$('formily_create_strategy')?.formRef?.current?.form;
    form.submit(async (v) => {
      const getValue = () => {
        const values = v.content?.value?.map((valueitem) =>
          valueitem.item
            ?.map((item, i) => {
              item = `'${item}.member'`;
              if (i === 0) {
                item = 'AND(' + item;
              }
              if (i === valueitem.item.length - 1) {
                item = item + ')';
              }
              return item;
            })
            ?.join(',')
        );
        return values?.length > 1
          ? 'OR(' + values?.join(',') + ')'
          : values?.join(',');
      };
      const epolicy = {
        channel: JSON.parse(v.channel || '{}')?.name,
        description: v.description,
        displayName: v.displayName,
        value: getValue(),
      };
      try {
        const res = await this.props.appHelper.utils.bff.createEpolicy({
          epolicy,
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-636u5idg'),
        });
        this.props.useGetNetwork.mutate();
        this.getEpolicies();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-sivjo10j'),
          errors: error?.response?.errors,
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

  async confirmDeleteContractModal(e, payload) {
    try {
      await this.props.appHelper.utils.bff.deleteChaincodebuild({
        name: this.state.contract?.record?.name,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-5m5bdexs'),
      });
      await this.props.useGetChaincodebuilds.mutate();
      setTimeout(() => {
        this.formatContract(_, {
          initVersions: true,
        });
      });
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-esbyfrwe'),
        errors: error?.response?.errors,
      });
    }
  }

  async confirmDeleteStrategyModal(e, payload) {
    try {
      await this.props.appHelper.utils.bff.deleteEpolicy({
        name: this.state.strategy?.record?.name,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-u1byeit6'),
      });
      this.getEpolicies();
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-ctwrr17g'),
        errors: error?.response?.errors,
      });
    }
  }

  confirmDeploymentContractModal(e, payload) {
    const form = this.$('formily_contract_deploy')?.formRef?.current?.form;
    form.submit(async (v) => {
      const chaincode = {
        channel: JSON.parse(v.channel || '{}')?.name,
        epolicy: v.epolicy,
        name: v.name,
        displayName: v.displayName,
        // edit
        // ibppeer: v.ibppeer
      };

      try {
        const res = await this.props.appHelper.utils.bff.deployChaincode({
          chaincode,
        });
        // this.closeModal()
        // this.utils.notification.success({
        //   message: this.i18n('i18n-l8fybssesij'),
        // })
        this.openDeploymentContractSuccessModal();
        this.props.useGetChaincodebuilds.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-ekujezos'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  confirmUpgradeContractModal(e, payload) {
    const form = this.$('formily_contract_upgrade')?.formRef?.current?.form;
    form.submit(async (v) => {
      this.setState({
        contractUpgradeLoading: true,
      });
      const { versoin, format, files, ...params } = v;
      try {
        const query = {
          ...params,
          network: this.match?.params?.id,
        };
        if (format === 'zip') {
          query.file = v.files?.fileList?.[0]?.originFileObj;
        } else {
          query.files = v.files?.fileList?.map((item) => item.originFileObj);
          query.fileRelativePaths = v.files?.fileList?.map((item) => {
            const file = item.originFileObj;
            return file.webkitRelativePath;
          });
        }
        const res = await this.props.appHelper.utils.bff.upgradeChaincodebuild(
          query
        );
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-a4rcftyd'),
        });
        // this.openAddChannelSuccessModal()
        this.props.useGetChaincodebuilds.mutate();
        this.setState({
          contractUpgradeLoading: false,
        });
      } catch (error) {
        this.setState({
          contractUpgradeLoading: false,
        });
        this.utils.notification.warnings({
          message: this.i18n('i18n-7fxj402s'),
          errors: error?.response?.errors,
        });
      }
    });
  }

  formatContract(e, payload) {
    const list = (this.props.useGetChaincodebuilds?.data?.chaincodebuilds || [])
      ?.filter((item) => {
        return this.state.contract.searchValue
          ? item.displayName?.includes(this.state.contract.searchValue)
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
      });
    const result = {};
    const initVersions = {};
    list.forEach((item) => {
      if (!result[item.displayName]) {
        result[item.displayName] = {};
      }
      if (!result[item.displayName][item.name]) {
        result[item.displayName][item.name] = item;
      }
    });
    const formatList = Object.keys(result)?.map((displayName) => {
      const versions = Object.values(result[displayName])?.sort((a, b) =>
        b.version.localeCompare(a.version)
      );
      initVersions[displayName] = versions?.[0]?.name;
      const record =
        versions?.find(
          (item) => item.name === this.state.initVersions?.[displayName]
        ) || versions?.[0];
      return {
        displayName,
        ...record,
        versions: versions?.map((item) => ({
          ...item,
          label: item.version,
          key: item.name,
        })),
      };
    });
    if (
      !this.state.initVersions ||
      Object.keys(this.state.initVersions || {})?.length !==
        Object.keys(result || {})?.length ||
      payload?.initVersions
    ) {
      this.setState({
        initVersions,
      });
    }
    return formatList;
  }

  async getChannelsForCreateEpolicy(callback) {
    const res =
      await this.props.appHelper.utils.bff.getChannelsForCreateEpolicy({
        network: this.match?.params?.id,
      });
    this.setState(
      {
        strategy: {
          ...this.state.strategy,
          channels:
            res?.channelsForCreateEpolicy?.map((item) => ({
              value: JSON.stringify(item),
              label: item.displayName || '-',
            })) || [],
        },
      },
      callback
    );
    const form = this.$('formily_create_strategy')?.formRef?.current?.form;
    form.setFieldState('channel', {
      dataSource:
        res?.channelsForCreateEpolicy?.map((item) => ({
          value: JSON.stringify(item),
          label: item.displayName || '-',
        })) || [],
    });
  }

  getContractVersion(record) {
    const name = this.state.initVersions?.[record?.displayName];
    return record?.versions?.find((item) => item.name === name)?.version;
  }

  getContractVersions(record) {
    return record?.versions || [];
  }

  async getEpolicies() {
    const res = await this.props.appHelper.utils.bff.getEpolicies({
      network: this.match?.params?.id,
    });
    this.setState({
      strategy: {
        ...this.state.strategy,
        list: res?.epolicies || [],
      },
    });
  }

  async getPeers(v, callback, usedPeers) {
    const { initiator, organizations } = v;
    const res =
      await this.props.appHelper.utils.bff.getIbppeersForCreateChannel({
        members: [initiator, ...(organizations || [])]?.filter((item) => item),
      });
    const allPeers = [];
    res?.ibppeersForCreateChannel?.forEach((item) => {
      item.ibppeers?.forEach((peer) => {
        allPeers.push({
          name: peer.name,
          namespace: item.name,
          key: item.name + peer.name,
        });
      });
    });
    const peers =
      res?.ibppeersForCreateChannel
        ?.map((item) => ({
          key: item.name,
          title: item.name,
          children: item.ibppeers
            ?.filter((item) => item.status === 'Deployed')
            ?.map((peer) => ({
              key: item.name + peer.name,
              title: peer.name,
            }))
            ?.filter((peer) => {
              return usedPeers?.length
                ? usedPeers.every(
                    (used) =>
                      !(
                        used.name === peer.title && used.namespace === item.name
                      )
                  )
                : true;
            }),
        }))
        ?.filter((item) => item?.children?.length > 0) || [];
    this.setState(
      {
        peers,
        allPeers,
      },
      callback
    );
  }

  handleChannelPaginationChange(c, s) {
    this.setState({
      channel: {
        ...this.state.channel,
        size: s,
        current: c,
      },
    });
  }

  handleChannelSearchValueChange(e) {
    this.setState({
      channel: {
        ...this.state.channel,
        searchValue: e.target.value,
      },
    });
  }

  handleChannelTableChange(pagination, filters, sorter, extra) {
    this.setState({
      channel: {
        ...this.state.channel,
        pagination,
        filters,
        sorter,
      },
    });
  }

  handleContractPaginationChange(c, s) {
    this.setState({
      contract: {
        ...this.state.contract,
        size: s,
        current: c,
      },
    });
  }

  handleContractSearchValueChange(e) {
    this.setState({
      contract: {
        ...this.state.contract,
        searchValue: e.target.value,
      },
    });
  }

  handleContractTableChange(pagination, filters, sorter, extra) {
    this.setState({
      contract: {
        ...this.state.contract,
        pagination,
        filters,
        sorter,
      },
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  handleOrganizationPaginationChange(c, s) {
    this.setState({
      organization: {
        ...this.state.organization,
        size: s,
        current: c,
      },
    });
  }

  handleOrganizationTableChange(pagination, filters, sorter, extra) {
    this.setState({
      organization: {
        ...this.state.organization,
        pagination,
        filters,
        sorter,
      },
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

  handleStrategyPaginationChange(c, s) {
    this.setState({
      strategy: {
        ...this.state.strategy,
        size: s,
        current: c,
      },
    });
  }

  handleStrategySearchValueChange(e) {
    this.setState({
      strategy: {
        ...this.state.strategy,
        searchValue: e.target.value,
      },
    });
  }

  handleStrategyTableChange(pagination, filters, sorter, extra) {
    this.setState({
      strategy: {
        ...this.state.strategy,
        pagination,
        filters,
        sorter,
      },
    });
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
    });
  }

  onFilesChange(files, payload) {
    const bcignore = files.fileList?.find((item) => item.name === '.bcignore');
    const readFile = async (file, callback) => {
      if (!file?.originFileObj) {
        return callback();
      }
      const reader = new FileReader();
      reader.readAsText(file?.originFileObj, 'UTF-8');
      reader.onload = (evt) => {
        callback(evt.target.result);
      };
    };
    readFile(bcignore, (v) => {
      const showList = files.fileList?.filter(
        (item) =>
          item.name !== '.bcignore' &&
          !v
            ?.split('\r\n')
            ?.some((path) =>
              item?.originFileObj.webkitRelativePath?.includes('/' + path + '/')
            )
      );
      const form = this.$(
        payload?.type === 'upgrade'
          ? 'formily_contract_upgrade'
          : 'formily_create_contract'
      )?.formRef?.current?.form;
      form.setValues({
        files: {
          fileList: showList,
        },
      });
    });
  }

  onTabsChange(activeKey) {
    this.history?.replace(
      this?.history?.location?.pathname + '?tab=' + activeKey
    );
    this.setState({
      activeKey,
    });
  }

  openAddChannelModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'addchannel',
    });
  }

  openAddChannelOrganizationModal(e, payload) {
    this.setState({
      channel: {
        ...this.state.channel,
        record: payload.record,
      },
      isOpenModal: true,
      modalType: 'addchannelorganization',
    });
  }

  openAddChannelOrganizationSuccessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'addchannelorganizationsuccess',
    });
  }

  openAddChannelPeerModal(e, payload) {
    this.setState({
      channel: {
        ...this.state.channel,
        record: payload.record,
      },
      isOpenModal: true,
      modalType: 'addchannelpeer',
      peers: [],
    });
    this.getPeers(
      {
        organizations: payload?.record?.members?.map((item) => item.name) || [],
      },
      () => {},
      payload.record.peers || []
    );
  }

  openAddChannelSuccessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'addchannelsuccess',
    });
  }

  openAddContractModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'addcontract',
    });
  }

  openAddStrategyModal() {
    this.setState(
      {
        isOpenModal: true,
        modalType: 'addstrategy',
      },
      () => {
        setTimeout(() => {
          const form = this.$('formily_create_strategy')?.formRef?.current
            ?.form;
          form &&
            form.setValues({
              content: {
                value: [
                  {
                    item: [],
                  },
                ],
              },
            });
        }, 200);
      }
    );
    this.getChannelsForCreateEpolicy(() => {});
  }

  openDeleteChannelModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: 'delete',
      channel: {
        ...this.state.channel,
        record: payload?.record,
      },
    });
  }

  openDeleteContractModal(e, payload) {
    this.setState({
      contract: {
        ...this.state.contract,
        record: payload.record,
      },
      isOpenModal: true,
      modalType: 'deletecontract',
    });
  }

  openDeleteStrategyModal(e, payload) {
    this.setState({
      strategy: {
        ...this.state.strategy,
        record: payload.record,
      },
      isOpenModal: true,
      modalType: 'deletestrategy',
    });
  }

  openDeploymentContractModal(e, payload) {
    this.setState(
      {
        contract: {
          ...this.state.contract,
          record: payload.record,
        },
        isOpenModal: true,
        modalType: 'deploymentcontract',
      },
      () => {
        setTimeout(() => {
          const form = this.$('formily_contract_deploy')?.formRef?.current
            ?.form;
          form.setValues({
            displayName: payload.record?.displayName,
            // edit
            version: payload.record?.version,
            name: payload.record?.name,
          });
        }, 0);
      }
    );
  }

  openDeploymentContractSuccessModal() {
    this.setState({
      isOpenModal: true,
      modalType: 'deploymentcontractsuccess',
    });
  }

  openStrategyDetailModal(e, payload) {
    this.setState({
      strategy: {
        ...this.state.strategy,
        record: payload.record,
      },
      isOpenModal: true,
      modalType: 'strategydetail',
    });
  }

  openUpgradeContractModal(e, payload) {
    this.setState(
      {
        contract: {
          ...this.state.contract,
          record: payload.record,
        },
        isOpenModal: true,
        modalType: 'upgradecontract',
      },
      () => {
        setTimeout(() => {
          const form = this.$('formily_contract_upgrade')?.formRef?.current
            ?.form;
          form.setValues({
            displayName: payload.record?.displayName,
            // edit
            version: payload.record?.version,
          });
        }, 0);
      }
    );
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-5xl7aihzcuy')} ${total} ${this.i18n(
      'i18n-v7xu122b9o'
    )}`;
  }

  async validatorChannelName(value) {
    try {
      const res = await this.props?.appHelper?.utils?.bff?.getChannel({
        name: value,
      });
      return this.i18n('i18n-0imredkn');
    } catch (error) {}
  }

  async validatorContractRepeat(value) {
    const form = this.$('formily_create_contract')?.formRef?.current?.form;
    const displayName =
      this.state.modalType === 'addcontract'
        ? form.getValuesIn('displayName')
        : this.state.contract?.record?.displayName;
    try {
      const res = await this.props?.appHelper?.utils?.bff?.getChaincodebuilds({
        network: this.match?.params?.id,
        version: value,
        displayName,
      });
      if (res?.chaincodebuilds?.length > 0) {
        return this.i18n('i18n-wc70jk7n');
      }
    } catch (error) {}
  }

  componentDidMount() {
    const getOrganizations = async () => {
      const res = await this.props.appHelper.utils.bff.getOrganizations();
      this.setState({
        organizations:
          res?.organizations?.map((item) => ({
            value: item.name,
            label: `${item.name}(${item.admin})`,
          })) || [],
      });
    };
    getOrganizations();
    this.getEpolicies();
    const tab = this?.location?.search
      ?.slice(1)
      ?.split('&')
      ?.map((item) => ({
        key: item?.split('=')?.[0],
        value: item?.split('=')?.[1],
      }))
      ?.find((item) => item.key === 'tab')?.value;
    this.setState({
      activeKey: tab || 'network',
    });
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
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
                relatedEventName: 'confirmUpgradeContractModal',
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
          confirmLoading={__$$eval(() => this.state.contractUpgradeLoading)}
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
            return this.confirmUpgradeContractModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'upgradecontract'
          )}
          title={this.i18n('i18n-nihrz6ys') /* 合约升级 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 5,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef('formily_contract_upgrade')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-b3d2mz7i') /* 请输入合约名称 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'VariableSetter',
                default: __$$eval(() => this.state.contract?.record?.name),
                name: 'displayName',
                required: true,
                title: this.i18n('i18n-7ws2ncyb') /* 合约名称 */,
                'x-pattern': 'disabled',
                'x-validator': [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder:
                    this.i18n(
                      'i18n-2ielocre'
                    ) /* 合约版本供识别与维护使用，建议格式： v1.0 */,
                },
              }}
              fieldProps={{
                name: 'version',
                required: true,
                title: this.i18n('i18n-a20yo7fz') /* 当前版本号 */,
                'x-pattern': 'disabled',
                'x-validator': [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder:
                    this.i18n(
                      'i18n-e0ey37p3'
                    ) /* 合约版本供识别与维护使用，建议和当前保持类型一致 */,
                },
              }}
              fieldProps={{
                name: 'newVersion',
                required: true,
                title: this.i18n('i18n-1qxjy0jv') /* 升级后版本号 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    type: 'disabled',
                    validator: function () {
                      return this.validatorContractRepeat.apply(
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
                  allowClear: false,
                  disabled: false,
                  notFoundContent: this.i18n('i18n-dy7hcp1k') /* 请选择 */,
                  placeholder: '请选择',
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'StringSetter',
                default: 'folder',
                enum: [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: this.i18n('i18n-9vjtx036') /* 文件夹 */,
                    type: 'disabled',
                    value: 'folder',
                  },
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: this.i18n('i18n-fhw8go0y') /* zip压缩包 */,
                    type: 'disabled',
                    value: 'zip',
                  },
                ],
                name: 'format',
                required: true,
                title: this.i18n('i18n-6jtfhc9d') /* 上传格式 */,
                'x-validator': [],
              }}
              ref={this._refsManager.linkRef('formilyselect-6c94a7fb')}
            />
            <FormilyUpload
              __component_name="FormilyUpload"
              componentProps={{
                'x-component-props': {
                  beforeUpload: function () {
                    return this.beforeUpload.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  directory: '{{!!($form?.values?.format === "folder")}}',
                  onChange: function () {
                    return this.onFilesChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([
                        {
                          type: 'upgrade',
                        },
                      ])
                    );
                  }.bind(this),
                },
              }}
              fieldProps={{
                enum: [],
                name: 'files',
                required: true,
                title: this.i18n('i18n-tp1bif8s') /* 合约文件 */,
                'x-component': 'FormilyUpload',
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message: this.i18n('i18n-9nvgrvip') /* 请上传文件 */,
                    type: 'disabled',
                    whitespace: true,
                  },
                ],
              }}
            >
              <Button
                __component_name="Button"
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
                shape="default"
                type="default"
              >
                {this.i18n('i18n-l9xc0l1g') /* 选择上传的文件 */}
              </Button>
            </FormilyUpload>
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: false,
                  placeholder: this.i18n('i18n-928f3hdn') /* 请选择语言 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'StringSetter',
                default: 'Go',
                enum: [
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: 'Go',
                    type: 'disabled',
                    value: 'Go',
                  },
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: 'Java',
                    type: 'disabled',
                    value: 'Java',
                  },
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: 'Node',
                    type: 'disabled',
                    value: 'Node',
                  },
                ],
                name: 'language',
                title: this.i18n('i18n-7usiozsk') /* 选择语言 */,
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
            return this.confirmAddStrategyModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal && this.state.modalType === 'addstrategy'
          )}
          title={this.i18n('i18n-6pygp0ks') /* 新增背书策略 */}
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
            ref={this._refsManager.linkRef('formily_create_strategy')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-iz3eoa9s') /* 请输入策略名称 */,
                },
              }}
              fieldProps={{
                name: 'displayName',
                required: true,
                title: this.i18n('i18n-87kp314f') /* 策略名称 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message:
                      this.i18n('i18n-o3gly28f') /* 长度为 3- 20 个字符 */,
                    pattern: __$$eval(() => this?.constants?.NAME_LENGTH_REG),
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
                    pattern: __$$eval(() => this?.constants?.NAME_K8S_REG),
                    type: 'disabled',
                  },
                ],
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
                required: true,
                title: this.i18n('i18n-w3qy6omh') /* 策略描述 */,
                'x-component': 'Input.TextArea',
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message:
                      this.i18n(
                        'i18n-0xg7a1uj'
                      ) /* 策略描述由 0 ~ 200 字符组成 */,
                    pattern: '^.{0,200}$',
                    type: 'disabled',
                  },
                ],
              }}
            />
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                  allowClear: false,
                  disabled: false,
                  enum: __$$eval(() => this.state.strategy.channels),
                  placeholder: this.i18n('i18n-59plmy1n') /* 请选择通道 */,
                },
              }}
              fieldProps={{
                name: 'channel',
                required: true,
                title: this.i18n('i18n-4wgfgnn6') /* 通道 */,
                'x-validator': [],
              }}
            />
            <FormilyFormItem
              __component_name="FormilyFormItem"
              componentProps={{ 'x-component-props': {} }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'VariableSetter',
                name: 'content',
                required: true,
                title: this.i18n('i18n-tcgbsroi') /* 策略内容 */,
                'x-component': 'FormilyFormItem',
                'x-validator': [],
              }}
            >
              <FormilyArrayCards
                __component_name="FormilyArrayCards"
                componentProps={{ 'x-component-props': {} }}
                fieldProps={{
                  items: {
                    properties: {
                      Index: {
                        type: 'void',
                        'x-component': 'FormilyArrayCards.Index',
                        'x-decorator': 'FormItem',
                      },
                      Remove: {
                        type: 'void',
                        'x-component': 'FormilyArrayCards.Remove',
                        'x-decorator': 'FormItem',
                      },
                    },
                    type: 'object',
                  },
                  name: 'value',
                  properties: {
                    add: {
                      title: this.i18n('i18n-z29zhp7a') /* 新增一行“or 条件” */,
                      type: 'void',
                      'x-component': 'FormilyArrayCards.Addition',
                    },
                  },
                  title: {},
                  type: 'array',
                  'x-validator': [],
                }}
              >
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _unsafe_MixedSetter_enum_select: 'StringSetter',
                      allowClear: false,
                      disabled: false,
                      enum: '{{ $form?.values?.channel ? (JSON.parse($form?.values?.channel)?.members?.map(item => ({ label: item.name, value: item.name })) ||[]) : []}}',
                      mode: 'multiple',
                      placeholder:
                        this.i18n('i18n-92kkrrjc') /* 添加“and 条件” */,
                    },
                  }}
                  fieldProps={{
                    _unsafe_MixedSetter_title_select: 'I18nSetter',
                    name: 'item',
                    title: {},
                    'x-validator': [],
                  }}
                />
              </FormilyArrayCards>
            </FormilyFormItem>
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
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={6} />
              <Col __component_name="Col" span={6} />
              <Col __component_name="Col" span={6} />
              <Col __component_name="Col" span={6} />
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
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'strategydetail'
          )}
          ref={this._refsManager.linkRef('modal-f48ee40c')}
          title={this.i18n('i18n-5ruzwlr4') /* 背书策略详情 */}
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
                    style={{ fontSize: '' }}
                  >
                    {__$$eval(() => this.state.strategy?.record?.name || '-')}
                  </Typography.Text>
                ),
                key: '2xnokcznohl',
                label: this.i18n('i18n-87kp314f') /* 策略名称 */,
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
                      () => this.state.strategy?.record?.description || '-'
                    )}
                  </Typography.Text>
                ),
                key: '0h2dnnfyj23',
                label: this.i18n('i18n-tcgbsroi') /* 策略内容 */,
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
                      () => this.state.strategy?.record?.content || '-'
                    )}
                  </Typography.Text>
                ),
                key: '3k9rb4ji034',
                label: this.i18n('i18n-w3qy6omh') /* 策略描述 */,
                span: 1,
              },
            ]}
            labelStyle={{ width: 100 }}
            layout="horizontal"
            size="default"
            title=" "
          >
            <Descriptions.Item
              key="2xnokcznohl"
              label={this.i18n('i18n-87kp314f') /* 策略名称 */}
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
                      `${this.state.strategy?.record?.displayName || '-'}(${
                        this.state.strategy?.record?.name
                      })`
                  )}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="0h2dnnfyj23"
              label={this.i18n('i18n-tcgbsroi') /* 策略内容 */}
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
                    () => this.state.strategy?.record?.description || '-'
                  )}
                </Typography.Text>
              }
            </Descriptions.Item>
            <Descriptions.Item
              key="3k9rb4ji034"
              label={this.i18n('i18n-w3qy6omh') /* 策略描述 */}
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
                  {__$$eval(() => this.state.strategy?.record?.value || '-')}
                </Typography.Text>
              }
            </Descriptions.Item>
          </Descriptions>
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
                relatedEventName: 'confirmDeleteStrategyModal',
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
            return this.confirmDeleteStrategyModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'deletestrategy'
          )}
          title={this.i18n('i18n-ppwtxqzo') /* 策略删除 */}
        >
          <Alert
            __component_name="Alert"
            message={
              <Space align="center" direction="horizontal">
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-ol5t1k5q') /* 确认删除策略 */}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {__$$eval(
                    () => this.state.strategy?.record?.displayName || '-'
                  )}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-88tr11kq') /* 吗？ */}
                </Typography.Text>
              </Space>
            }
            showIcon={true}
            type="warning"
          />
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
                relatedEventName: 'confirmDeleteContractModal',
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
            return this.confirmDeleteContractModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'deletecontract'
          )}
          title={this.i18n('i18n-kllir0y1') /* 合约删除 */}
        >
          <Alert
            __component_name="Alert"
            message={
              <Space align="center" direction="horizontal">
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-12xa4wid') /* 确认删除合约 */}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {__$$eval(
                    () => this.state.contract?.record?.displayName || '-'
                  )}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-88tr11kq') /* 吗？ */}
                </Typography.Text>
              </Space>
            }
            showIcon={true}
            type="warning"
          />
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
            <Button
              __component_name="Button"
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
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'deploymentcontractsuccess'
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
                {this.i18n('i18n-2rnclk3j') /* 部署中，请等待投票 */}
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
              {__$$eval(() => this.state.contract?.record?.name)}
            </Typography.Text>
            <Typography.Text
              disabled={false}
              ellipsis={true}
              strong={false}
              style={{ fontSize: '' }}
            >
              {this.i18n('i18n-5kpzkt0b') /* 合约部署提议已发送， */}
            </Typography.Text>
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
                paramStr: '{\n \t "record":this.record \n}',
                relatedEventName: 'confirmDeploymentContractModal',
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
            return this.confirmDeploymentContractModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([
                {
                  record: this.record,
                },
              ])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'deploymentcontract'
          )}
          title={this.i18n('i18n-tqaysbds') /* 安装部署合约 */}
        >
          <Row __component_name="Row" wrap={true}>
            <Col __component_name="Col" span={24}>
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ color: '', fontSize: '' }}
                type="danger"
              >
                {
                  this.i18n(
                    'i18n-sc2b0neb'
                  ) /* 合约安装部署提交后，组织需要根据投票策略进行投票 */
                }
              </Typography.Text>
            </Col>
            <Col __component_name="Col" span={24}>
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelCol: 4,
                  layout: 'horizontal',
                  wrapperCol: 20,
                }}
                ref={this._refsManager.linkRef('formily_contract_deploy')}
              >
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      placeholder:
                        this.i18n('i18n-b3d2mz7i') /* 请输入合约名称 */,
                    },
                  }}
                  fieldProps={{
                    name: 'displayName',
                    title: this.i18n('i18n-7ws2ncyb') /* 合约名称 */,
                    'x-pattern': 'disabled',
                    'x-validator': [],
                  }}
                />
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      allowClear: false,
                      disabled: false,
                      enum: __$$eval(() =>
                        this.props.useGetNetwork?.data?.network?.peers
                          ?.filter((item) => item.createdByMe)
                          ?.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))
                      ),
                      mode: 'multiple',
                      notFoundContent: {},
                      placeholder:
                        this.i18n('i18n-o4a5p44k') /* 选择自己的节点，可多选 */,
                    },
                  }}
                  fieldProps={{
                    name: 'ibppeer',
                    required: true,
                    title: this.i18n('i18n-wlv4nr0d') /* 安装节点 */,
                    'x-validator': [],
                  }}
                />
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      allowClear: false,
                      disabled: false,
                      enum: __$$eval(() =>
                        this.props.useGetNetwork?.data?.network?.channels?.map(
                          (item) => ({
                            value: JSON.stringify({
                              ...item,
                              strategy: this.state.strategy?.list
                                ?.filter((s) => s.channel === item.name)
                                ?.map((s) => ({
                                  value: s.name,
                                  label: `${s.displayName || '-'}(${s.name})`,
                                })),
                            }),
                            label: item.displayName || '-',
                          })
                        )
                      ),
                      mode: 'single',
                      notFoundContent: {},
                      placeholder: this.i18n('i18n-59plmy1n') /* 请选择通道 */,
                    },
                  }}
                  fieldProps={{
                    name: 'channel',
                    required: true,
                    title: this.i18n('i18n-uyu5gd4c') /* 部署通道 */,
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
                      enum: '{{$form?.values?.channel ? (JSON.parse($form?.values?.channel)?.strategy ||[]) : []}}',
                      notFoundContent: {},
                      placeholder:
                        this.i18n('i18n-e0gcsyat') /* 请选择背书策略 */,
                    },
                  }}
                  fieldProps={{
                    name: 'epolicy',
                    required: true,
                    title: this.i18n('i18n-wh9bw5j9') /* 背书策略 */,
                    'x-validator': [],
                  }}
                />
              </FormilyForm>
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
                relatedEventName: 'channelAddPeerModalConfirm',
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
            return this.channelAddPeerModalConfirm.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'addchannelpeer'
          )}
          title={this.i18n('i18n-bxsxgogh') /* 加入节点 */}
        >
          <Row __component_name="Row" wrap={true}>
            <Col __component_name="Col" span={24}>
              <Space align="center" direction="horizontal">
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-xcopya8d') /* 请选择加入通道 */}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {__$$eval(
                    () => this.state.channel?.record?.displayName || '-'
                  )}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-4r61pybs') /* 的节点 */}
                </Typography.Text>
              </Space>
            </Col>
            <Col __component_name="Col" span={24}>
              <Transfer
                __component_name="Transfer"
                __events={{
                  eventDataList: [
                    {
                      name: 'onChange',
                      relatedEventName: 'channelPeersChange',
                      type: 'componentEvent',
                    },
                  ],
                  eventList: [
                    {
                      disabled: true,
                      name: 'onChange',
                      template:
                        "onChange(targetKeys,direction,moveKeys,${extParams}){\n// 选项在两栏之间转移时的回调函数\nconsole.log('onChange',targetKeys,direction,moveKeys);}",
                    },
                    {
                      disabled: false,
                      name: 'onScroll',
                      template:
                        "onScroll(direction,event,${extParams}){\n// 选项列表滚动时的回调函数\nconsole.log('onScroll',direction,event);}",
                    },
                    {
                      disabled: false,
                      name: 'onSearch',
                      template:
                        "onSearch(direction,value,${extParams}){\n// 搜索框内容时改变时的回调函数\nconsole.log('onSearch',direction,value);}",
                    },
                    {
                      disabled: false,
                      name: 'onSelectChange',
                      template:
                        "onSelectChange(sourceSelectedKeys,targetSelectedKeys,${extParams}){\n// 选中项发生改变时的回调函数\nconsole.log('onSelectChange',sourceSelectedKeys,targetSelectedKeys);}",
                    },
                  ],
                }}
                dataSource={__$$eval(() => this.state.peers)}
                disabled={false}
                onChange={function () {
                  return this.channelPeersChange.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                oneWay={false}
                render={function () {
                  const self = this;
                  try {
                    return function renderItem(record, extParams) {
                      return record.title;
                    }.apply(self, arguments);
                  } catch (e) {
                    logger.warn(
                      'call function which parsed by lowcode failed: ',
                      e
                    );
                    return e.message;
                  }
                }}
                selectAllLabels={[]}
                showSearch={false}
                showSelectAll={true}
                titles={[]}
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
            <Button
              __component_name="Button"
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
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'addchannelsuccess'
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
                {this.i18n('i18n-s4aho8fc') /* 邀请加入通道已发送 */}
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
        <Row __component_name="Row" wrap={true}>
          <Col
            __component_name="Col"
            span={24}
            style={{ paddingBottom: '12px' }}
          >
            <Button.Back
              __component_name="Button.Back"
              title={this.i18n('i18n-hpj9pfyfpq') /* 网络详情 */}
              type="simple"
            />
          </Col>
          <Col __component_name="Col" span={24}>
            <Tabs
              __component_name="Tabs"
              __events={{
                eventDataList: [
                  {
                    name: 'onChange',
                    relatedEventName: 'onTabsChange',
                    type: 'componentEvent',
                  },
                ],
                eventList: [
                  {
                    disabled: true,
                    name: 'onChange',
                    template:
                      "onChange(activeKey,${extParams}){\n// 切换面板的回调\nconsole.log('onChange',activeKey);}",
                  },
                  {
                    disabled: true,
                    name: 'onEdit',
                    template:
                      "onEdit(targetKey,action,${extParams}){\n// 新增和删除页签的回调\nconsole.log('onEdit',targetKey,action);}",
                  },
                  {
                    disabled: false,
                    name: 'onTabClick',
                    template:
                      "onTabClick(key,event,${extParams}){\n// tab 被点击的回调\nconsole.log('onTabClick',key,event);}",
                  },
                  {
                    disabled: false,
                    name: 'onTabScroll',
                    template:
                      "onTabScroll({direction},${extParams}){\n// tab 滚动时触\nconsole.log('onTabScroll',direction);}",
                  },
                ],
              }}
              activeKey={__$$eval(() => this.state.activeKey)}
              defaultActiveKey={__$$eval(
                () => this.props?.location?.query?.tab || 'network'
              )}
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
                      <Row
                        style={{ marginLeft: '-30px', marginTop: '-16px' }}
                        wrap={true}
                      >
                        <Col span={24}>
                          <Card
                            actions={[]}
                            bordered={false}
                            hoverable={false}
                            loading={false}
                            size="default"
                            type="default"
                          >
                            <Row wrap={true}>
                              <Col span={24}>
                                <Row justify="space-between" wrap={false}>
                                  <Col>
                                    <Typography.Title
                                      bold={true}
                                      bordered={false}
                                      ellipsis={true}
                                      level={1}
                                    >
                                      {
                                        this.i18n(
                                          'i18n-9erhew6n'
                                        ) /* 快速上链 */
                                      }
                                    </Typography.Title>
                                  </Col>
                                  <Col>
                                    <Space
                                      align="center"
                                      direction="horizontal"
                                    >
                                      <Icon
                                        color="#9b9b9b"
                                        size={12}
                                        type="EyeInvisibleOutlined"
                                      />
                                      <Typography.Text
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: '' }}
                                        type="secondary"
                                      >
                                        {this.i18n('i18n-v1exwbga') /* 隐藏 */}
                                      </Typography.Text>
                                    </Space>
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24}>
                                <Row gutter={[0, 0]} h-gutter={0} wrap={true}>
                                  <Col
                                    span={1}
                                    style={{ paddingTop: '28px' }}
                                  />
                                  <Col span={4}>
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      style={{ textAlign: 'center' }}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          paddingBottom: '8px',
                                        }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{
                                            alignItems: 'center',
                                            backgroundColor:
                                              'rgba(254,143,53,0.1)',
                                            borderRadius: '30px',
                                            borderWidth: '0px',
                                            color: '#fe8f35',
                                            display: 'flex',
                                            fontSize: '18',
                                            height: '33px',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            width: '33px',
                                          }}
                                        >
                                          1
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-snaon3b2fni'
                                            ) /* 新建通道 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-vx0dwibl'
                                            ) /* 每一个通道即为一条逻 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-i4bwnz1b'
                                            ) /* 辑上的区块链 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <UnifiedLink
                                          target="_blank"
                                          to={__$$eval(
                                            () =>
                                              `/network/detail/${this.match?.params?.id}?tab=channel`
                                          )}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-pjvvvoe9'
                                            ) /* 通道管理 */
                                          }
                                        </UnifiedLink>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col span={2} style={{ paddingTop: '28px' }}>
                                    <Divider
                                      __component_name="Divider"
                                      dashed={true}
                                      defaultOpen={false}
                                      mode="line"
                                    />
                                  </Col>
                                  <Col span={4}>
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      style={{ textAlign: 'center' }}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          paddingBottom: '8px',
                                        }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{
                                            alignItems: 'center',
                                            backgroundColor:
                                              'rgba(254,143,53,0.1)',
                                            borderRadius: '30px',
                                            borderWidth: '0px',
                                            color: '#fe8f35',
                                            display: 'flex',
                                            fontSize: '18',
                                            height: '33px',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            width: '33px',
                                          }}
                                        >
                                          2
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-4nr880g9'
                                            ) /* 编写并部署合约 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-ni3p31po'
                                            ) /* 只能合约是用户与区块 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-hzr79mlu'
                                            ) /* 链进行交互的重要途径 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <UnifiedLink
                                          target="_blank"
                                          to={__$$eval(
                                            () =>
                                              `/network/detail/${this.match?.params?.id}?tab=contract`
                                          )}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-5wdi9bc5'
                                            ) /* 合约管理 */
                                          }
                                        </UnifiedLink>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col span={2} style={{ paddingTop: '28px' }}>
                                    <Divider
                                      __component_name="Divider"
                                      dashed={true}
                                      defaultOpen={false}
                                      mode="line"
                                    />
                                  </Col>
                                  <Col span={4}>
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      style={{ textAlign: 'center' }}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          paddingBottom: '8px',
                                        }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{
                                            alignItems: 'center',
                                            backgroundColor:
                                              'rgba(254,143,53,0.1)',
                                            borderRadius: '30px',
                                            borderWidth: '0px',
                                            color: '#fe8f35',
                                            display: 'flex',
                                            fontSize: '18',
                                            height: '33px',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            width: '33px',
                                          }}
                                        >
                                          3
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-zj5zwqud'
                                            ) /* 业务对接 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-popfra0p'
                                            ) /* SDK 开发性能优越 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-7s93ic9s'
                                            ) /* API 开发上手轻便 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        {!!false && (
                                          <UnifiedLink
                                            ref={this._refsManager.linkRef(
                                              'unifiedlink-d8ba05f6'
                                            )}
                                            target="_blank"
                                            to="/"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-5ne2amb2'
                                              ) /* API 指南 */
                                            }
                                          </UnifiedLink>
                                        )}
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col span={2} style={{ paddingTop: '28px' }}>
                                    <Divider
                                      __component_name="Divider"
                                      dashed={true}
                                      defaultOpen={false}
                                      mode="line"
                                    />
                                  </Col>
                                  <Col span={4}>
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      style={{ textAlign: 'center' }}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          paddingBottom: '8px',
                                        }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{
                                            alignItems: 'center',
                                            backgroundColor:
                                              'rgba(254,143,53,0.1)',
                                            borderRadius: '30px',
                                            borderWidth: '0px',
                                            color: '#fe8f35',
                                            display: 'flex',
                                            fontSize: '18',
                                            height: '33px',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            width: '33px',
                                          }}
                                        >
                                          4
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-akik0eji'
                                            ) /* 查看浏览器 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-sluhnzoa'
                                            ) /* 发起交易后，即可在浏 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <Typography.Text
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          type="secondary"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-ey0ypm67'
                                            ) /* 览器查看详细数据 */
                                          }
                                        </Typography.Text>
                                      </Col>
                                      <Col span={24}>
                                        <UnifiedLink
                                          target="_blank"
                                          to="/browser"
                                        >
                                          {
                                            this.i18n(
                                              'i18n-gyh9gtql'
                                            ) /* 区块链浏览器 */
                                          }
                                        </UnifiedLink>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Card
                            actions={[]}
                            bordered={false}
                            hoverable={false}
                            loading={false}
                            size="default"
                            style={{ height: '210px' }}
                            type="default"
                          >
                            <Row wrap={true}>
                              <Col span={24}>
                                <Typography.Title
                                  bold={true}
                                  bordered={false}
                                  ellipsis={true}
                                  level={1}
                                >
                                  {this.i18n('i18n-ob165u7p') /* 关键指标 */}
                                </Typography.Title>
                              </Col>
                              <Col span={24}>
                                <Row gutter={[0, 0]} h-gutter={0} wrap={true}>
                                  <Col
                                    span={6}
                                    style={{
                                      borderRightColor: 'rgba(49,62,89,0.2)',
                                      borderRightStyle: 'solid',
                                      borderRightWidth: '1px',
                                      paddingLeft: '56px',
                                    }}
                                  >
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{ marginBottom: '8px' }}
                                      >
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-groe806b'
                                            ) /* 我的通道 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '34px' }}
                                            type="default"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.channels?.filter(
                                                  (item) =>
                                                    item.createdByMe ||
                                                    item.iamInvolved
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="default"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-hui8agoc'
                                              ) /* 个 */
                                            }
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-5jwxi1nlnsm'
                                              ) /* 我创建的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.channels?.filter(
                                                  (item) => item.createdByMe
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-55qv32wl'
                                              ) /* 我加入的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.channels?.filter(
                                                  (item) => item.iamInvolved
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col
                                    span={6}
                                    style={{
                                      borderRightColor: 'rgba(49,62,89,0.2)',
                                      borderRightStyle: 'solid',
                                      borderRightWidth: '1px',
                                      paddingLeft: '56px',
                                    }}
                                  >
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{ marginBottom: '8px' }}
                                      >
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-fwad0qrg'
                                            ) /* 智能合约 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '34px' }}
                                            type="default"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.chaincode?.filter(
                                                  (item) => item.createdByMe
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="default"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-hui8agoc'
                                              ) /* 个 */
                                            }
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-ailf3q4x'
                                              ) /* 我发起的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.chaincode?.filter(
                                                  (item) => item.createdByMe
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-0oad4726'
                                              ) /* 他人发起的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.chaincode?.filter(
                                                  (item) => !item.createdByMe
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col
                                    span={6}
                                    style={{
                                      borderRightColor: 'rgba(49,62,89,0.2)',
                                      borderRightStyle: 'solid',
                                      borderRightWidth: '1px',
                                      paddingLeft: '56px',
                                    }}
                                  >
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{ marginBottom: '8px' }}
                                      >
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-hyuo2wtk'
                                            ) /* 网络节点 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '34px' }}
                                            type="default"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data
                                                  ?.network?.peers?.length ||
                                                '0'
                                            )}
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="default"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-hui8agoc'
                                              ) /* 个 */
                                            }
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-5jwxi1nlnsm'
                                              ) /* 我创建的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.peers?.filter(
                                                  (item) => item.createdByMe
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-9hsvtpuh'
                                              ) /* 他人创建的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.peers?.filter(
                                                  (item) => !item.createdByMe
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col span={6} style={{ paddingLeft: '56px' }}>
                                    <Row
                                      gutter={[0, 0]}
                                      h-gutter={0}
                                      v-gutter={0}
                                      wrap={true}
                                    >
                                      <Col
                                        span={24}
                                        style={{ marginBottom: '8px' }}
                                      >
                                        <Typography.Title
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={2}
                                        >
                                          {
                                            this.i18n(
                                              'i18n-tmdw6s6q'
                                            ) /* 网络组织 */
                                          }
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '34px' }}
                                            type="default"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data
                                                  ?.network?.organizations
                                                  ?.length || '0'
                                            )}
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="default"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-hui8agoc'
                                              ) /* 个 */
                                            }
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-5jwxi1nlnsm'
                                              ) /* 我创建的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.organizations?.filter(
                                                  (item) =>
                                                    item.admin ===
                                                    this.props.authData?.user
                                                      ?.name
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                      <Col span={24}>
                                        <Space
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {
                                              this.i18n(
                                                'i18n-9hsvtpuh'
                                              ) /* 他人创建的 */
                                            }
                                          </Typography.Text>
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            type="secondary"
                                          >
                                            {__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data?.network?.organizations?.filter(
                                                  (item) =>
                                                    item.admin !==
                                                    this.props.authData?.user
                                                      ?.name
                                                )?.length || '0'
                                            )}
                                          </Typography.Text>
                                        </Space>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Row wrap={true}>
                            <Col span={12}>
                              <Card
                                __component_name="Card"
                                actions={[]}
                                bordered={false}
                                hoverable={false}
                                loading={false}
                                size="default"
                                style={{ height: '300px' }}
                                type="default"
                              >
                                <Row wrap={true}>
                                  <Col span={24}>
                                    <Typography.Title
                                      bold={true}
                                      bordered={false}
                                      ellipsis={true}
                                      level={1}
                                    >
                                      {
                                        this.i18n(
                                          'i18n-w2pedy31'
                                        ) /* 网络基础信息 */
                                      }
                                    </Typography.Title>
                                  </Col>
                                  <Col span={24}>
                                    <Descriptions
                                      bordered={false}
                                      colon={false}
                                      column={1}
                                      items={[
                                        {
                                          children: __$$eval(
                                            () =>
                                              this.props.useGetNetwork?.data
                                                ?.network?.name || '-'
                                          ),
                                          key: 'qzw93o3a9x',
                                          label:
                                            this.i18n(
                                              'i18n-03e0p0acqmaf'
                                            ) /* 网络名称 */,
                                          span: 1,
                                        },
                                        {
                                          children: __$$eval(
                                            () =>
                                              this.props.useGetNetwork?.data
                                                ?.network?.federation || '-'
                                          ),
                                          key: '8471pte3l38',
                                          label:
                                            this.i18n(
                                              'i18n-dlxiuotq6z4'
                                            ) /* 所属联盟 */,
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
                                                  this.props.useGetNetwork?.data
                                                    ?.network?.creationTimestamp
                                              )}
                                            />
                                          ),
                                          key: '1rtg8bikh7x',
                                          label:
                                            this.i18n(
                                              'i18n-9ox4rx1wtwv'
                                            ) /* 创建时间 */,
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
                                                  this.props.useGetNetwork?.data
                                                    ?.network?.lastHeartbeatTime
                                              )}
                                            />
                                          ),
                                          key: 'kwee4p37z5',
                                          label:
                                            this.i18n(
                                              'i18n-watjije0jk'
                                            ) /* 更新时间 */,
                                          span: 1,
                                        },
                                        {
                                          children: (
                                            <Status
                                              __component_name="Status"
                                              id={__$$eval(
                                                () =>
                                                  this.props.useGetNetwork?.data
                                                    ?.network?.status
                                              )}
                                              types={[
                                                {
                                                  children:
                                                    this.i18n(
                                                      'i18n-zrowlr7zwx'
                                                    ) /* 运行中 */,
                                                  icon: 'CheckCircleFilled',
                                                  id: 'NetworkCreated',
                                                  type: 'success',
                                                },
                                                {
                                                  children:
                                                    this.i18n(
                                                      'i18n-j3czm9su41'
                                                    ) /* 已解散 */,
                                                  icon: 'CloseCircleFilled',
                                                  id: 'NetworkDissolved',
                                                  type: 'error',
                                                },
                                                {
                                                  children:
                                                    this.i18n(
                                                      'i18n-xtno2l9qqog'
                                                    ) /* 异常 */,
                                                  icon: 'CloseCircleFilled',
                                                  id: 'Error',
                                                  type: 'error',
                                                },
                                                {
                                                  children:
                                                    this.i18n(
                                                      'i18n-1vangoko4yf'
                                                    ) /* 正常 */,
                                                  icon: 'CheckCircleFilled',
                                                  id: 'Created',
                                                  type: 'success',
                                                },
                                              ]}
                                            />
                                          ),
                                          key: '63ec1gobtoj',
                                          label:
                                            this.i18n(
                                              'i18n-bik6xl952y6'
                                            ) /* 状态 */,
                                          span: 1,
                                        },
                                        {
                                          children: __$$eval(
                                            () =>
                                              this.props.useGetNetwork?.data
                                                ?.network?.description || '-'
                                          ),
                                          key: 't6buqal9rl7',
                                          label:
                                            this.i18n(
                                              'i18n-wlgvrke3jz9'
                                            ) /* 介绍 */,
                                          span: 1,
                                        },
                                      ]}
                                      labelStyle={{ width: 100 }}
                                      layout="horizontal"
                                      size="default"
                                      title=" "
                                    >
                                      <Descriptions.Item
                                        key="qzw93o3a9x"
                                        label={
                                          this.i18n(
                                            'i18n-03e0p0acqmaf'
                                          ) /* 网络名称 */
                                        }
                                        span={1}
                                      >
                                        {__$$eval(
                                          () =>
                                            this.props.useGetNetwork?.data
                                              ?.network?.name || '-'
                                        )}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="8471pte3l38"
                                        label={
                                          this.i18n(
                                            'i18n-dlxiuotq6z4'
                                          ) /* 所属联盟 */
                                        }
                                        span={1}
                                      >
                                        {__$$eval(
                                          () =>
                                            this.props.useGetNetwork?.data
                                              ?.network?.federation || '-'
                                        )}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="1rtg8bikh7x"
                                        label={
                                          this.i18n(
                                            'i18n-9ox4rx1wtwv'
                                          ) /* 创建时间 */
                                        }
                                        span={1}
                                      >
                                        {
                                          <Typography.Time
                                            __component_name="Typography.Time"
                                            format=""
                                            relativeTime={false}
                                            time={__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data
                                                  ?.network?.creationTimestamp
                                            )}
                                          />
                                        }
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="kwee4p37z5"
                                        label={
                                          this.i18n(
                                            'i18n-watjije0jk'
                                          ) /* 更新时间 */
                                        }
                                        span={1}
                                      >
                                        {
                                          <Typography.Time
                                            __component_name="Typography.Time"
                                            format=""
                                            relativeTime={false}
                                            time={__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data
                                                  ?.network?.lastHeartbeatTime
                                            )}
                                          />
                                        }
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="63ec1gobtoj"
                                        label={
                                          this.i18n(
                                            'i18n-bik6xl952y6'
                                          ) /* 状态 */
                                        }
                                        span={1}
                                      >
                                        {
                                          <Status
                                            __component_name="Status"
                                            id={__$$eval(
                                              () =>
                                                this.props.useGetNetwork?.data
                                                  ?.network?.status
                                            )}
                                            types={[
                                              {
                                                children:
                                                  this.i18n(
                                                    'i18n-zrowlr7zwx'
                                                  ) /* 运行中 */,
                                                icon: 'CheckCircleFilled',
                                                id: 'NetworkCreated',
                                                type: 'success',
                                              },
                                              {
                                                children:
                                                  this.i18n(
                                                    'i18n-j3czm9su41'
                                                  ) /* 已解散 */,
                                                icon: 'CloseCircleFilled',
                                                id: 'NetworkDissolved',
                                                type: 'error',
                                              },
                                              {
                                                children:
                                                  this.i18n(
                                                    'i18n-xtno2l9qqog'
                                                  ) /* 异常 */,
                                                icon: 'CloseCircleFilled',
                                                id: 'Error',
                                                type: 'error',
                                              },
                                              {
                                                children:
                                                  this.i18n(
                                                    'i18n-7xnyzmr7'
                                                  ) /* 创建中 */,
                                                icon: 'ClockCircleFilled',
                                                id: 'Created',
                                                type: 'warning',
                                              },
                                              {
                                                children:
                                                  this.i18n(
                                                    'i18n-1vangoko4yf'
                                                  ) /* 正常 */,
                                                icon: 'CheckCircleFilled',
                                                id: 'Deployed',
                                                type: 'success',
                                              },
                                            ]}
                                          />
                                        }
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="t6buqal9rl7"
                                        label={
                                          this.i18n(
                                            'i18n-wlgvrke3jz9'
                                          ) /* 介绍 */
                                        }
                                        span={1}
                                      >
                                        {__$$eval(
                                          () =>
                                            this.props.useGetNetwork?.data
                                              ?.network?.description || '-'
                                        )}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                            <Col span={12}>
                              <Card
                                actions={[]}
                                bordered={false}
                                hoverable={false}
                                loading={false}
                                size="default"
                                style={{ height: '300px' }}
                                type="default"
                              >
                                <Row wrap={true}>
                                  <Col span={24}>
                                    <Typography.Title
                                      bold={true}
                                      bordered={false}
                                      ellipsis={true}
                                      level={1}
                                    >
                                      {
                                        this.i18n(
                                          'i18n-9axrd1ro'
                                        ) /* 网络配置信息 */
                                      }
                                    </Typography.Title>
                                  </Col>
                                  <Col span={24}>
                                    <Descriptions
                                      __component_name="Descriptions"
                                      bordered={false}
                                      colon={false}
                                      column={1}
                                      items={[
                                        {
                                          children: __$$eval(
                                            () =>
                                              this.props.useGetNetwork?.data
                                                ?.network?.version || '-'
                                          ),
                                          key: 'mljbt4bcmo',
                                          label:
                                            this.i18n(
                                              'i18n-hbf63hki898'
                                            ) /* 版本 */,
                                          span: 1,
                                        },
                                        {
                                          children: (
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
                                                {__$$eval(
                                                  () =>
                                                    this.props.useGetNetwork
                                                      ?.data?.network?.limits
                                                      ?.cpu || '-'
                                                )}
                                              </Typography.Text>
                                              <Typography.Text
                                                __component_name="Typography.Text"
                                                disabled={false}
                                                ellipsis={true}
                                                strong={false}
                                                style={{ fontSize: '' }}
                                              >
                                                {
                                                  this.i18n(
                                                    'i18n-m8df8p4v'
                                                  ) /* 核CPU */
                                                }
                                              </Typography.Text>
                                              <Typography.Text
                                                __component_name="Typography.Text"
                                                disabled={false}
                                                ellipsis={true}
                                                strong={false}
                                                style={{ fontSize: '' }}
                                              >
                                                {__$$eval(
                                                  () =>
                                                    parseInt(
                                                      this.props.useGetNetwork
                                                        ?.data?.network?.limits
                                                        ?.memory
                                                    ) || '-'
                                                )}
                                              </Typography.Text>
                                              <Typography.Text
                                                __component_name="Typography.Text"
                                                children=""
                                                disabled={false}
                                                ellipsis={true}
                                                strong={false}
                                                style={{ fontSize: '' }}
                                              />
                                              <Typography.Text
                                                __component_name="Typography.Text"
                                                disabled={false}
                                                ellipsis={true}
                                                strong={false}
                                                style={{ fontSize: '' }}
                                              >
                                                {
                                                  this.i18n(
                                                    'i18n-3y2g20xr'
                                                  ) /* G内存 */
                                                }
                                              </Typography.Text>
                                            </Space>
                                          ),
                                          key: 'i1zeuy7pn4n',
                                          label:
                                            this.i18n(
                                              'i18n-zjmh7vtphh'
                                            ) /* 节点配置 */,
                                          span: 1,
                                        },
                                        {
                                          children: (
                                            <Typography.Text
                                              disabled={false}
                                              ellipsis={true}
                                              strong={false}
                                              style={{ fontSize: '' }}
                                            >
                                              200G
                                            </Typography.Text>
                                          ),
                                          key: 'kj2e1dpjaw9',
                                          label:
                                            this.i18n(
                                              'i18n-cbhoi5g6'
                                            ) /* 节点存储 */,
                                          span: 1,
                                        },
                                        {
                                          children: 'LevelDB',
                                          key: '5b1alq6y2aq',
                                          label:
                                            this.i18n(
                                              'i18n-dgb9yehb'
                                            ) /* 状态数据库类型 */,
                                          span: 1,
                                        },
                                      ]}
                                      labelStyle={{ width: 100 }}
                                      layout="horizontal"
                                      size="default"
                                    >
                                      <Descriptions.Item
                                        __component_name="Descriptions.Item"
                                        key="mljbt4bcmo"
                                        label={
                                          this.i18n(
                                            'i18n-hbf63hki898'
                                          ) /* 版本 */
                                        }
                                        span={1}
                                      >
                                        {__$$eval(
                                          () =>
                                            this.props.useGetNetwork?.data
                                              ?.network?.version || '-'
                                        )}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        __component_name="Descriptions.Item"
                                        key="i1zeuy7pn4n"
                                        label={
                                          this.i18n(
                                            'i18n-zjmh7vtphh'
                                          ) /* 节点配置 */
                                        }
                                        span={1}
                                      >
                                        {
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
                                              {__$$eval(
                                                () =>
                                                  this.props.useGetNetwork?.data
                                                    ?.network?.limits?.cpu ||
                                                  '-'
                                              )}
                                            </Typography.Text>
                                            <Typography.Text
                                              __component_name="Typography.Text"
                                              disabled={false}
                                              ellipsis={true}
                                              strong={false}
                                              style={{ fontSize: '' }}
                                            >
                                              {
                                                this.i18n(
                                                  'i18n-m8df8p4v'
                                                ) /* 核CPU */
                                              }
                                            </Typography.Text>
                                            <Typography.Text
                                              __component_name="Typography.Text"
                                              disabled={false}
                                              ellipsis={true}
                                              strong={false}
                                              style={{ fontSize: '' }}
                                            >
                                              {__$$eval(
                                                () =>
                                                  parseInt(
                                                    this.props.useGetNetwork
                                                      ?.data?.network?.limits
                                                      ?.memory
                                                  ) || '-'
                                              )}
                                            </Typography.Text>
                                            <Typography.Text
                                              __component_name="Typography.Text"
                                              children=""
                                              disabled={false}
                                              ellipsis={true}
                                              strong={false}
                                              style={{ fontSize: '' }}
                                            />
                                            <Typography.Text
                                              __component_name="Typography.Text"
                                              disabled={false}
                                              ellipsis={true}
                                              strong={false}
                                              style={{ fontSize: '' }}
                                            >
                                              {
                                                this.i18n(
                                                  'i18n-3y2g20xr'
                                                ) /* G内存 */
                                              }
                                            </Typography.Text>
                                          </Space>
                                        }
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="kj2e1dpjaw9"
                                        label={
                                          this.i18n(
                                            'i18n-cbhoi5g6'
                                          ) /* 节点存储 */
                                        }
                                        span={1}
                                      >
                                        {
                                          <Typography.Text
                                            disabled={false}
                                            ellipsis={true}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                          >
                                            {__$$eval(
                                              () =>
                                                parseInt(
                                                  this.props.useGetNetwork?.data
                                                    ?.network?.storage
                                                ) + 'G'
                                            )}
                                          </Typography.Text>
                                        }
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        key="5b1alq6y2aq"
                                        label={
                                          this.i18n(
                                            'i18n-dgb9yehb'
                                          ) /* 状态数据库类型 */
                                        }
                                        span={1}
                                      >
                                        LevelDB
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Spin>
                  ),
                  key: 'network',
                  label: this.i18n('i18n-frfw3d7j') /* 网络概览 */,
                },
                {
                  children: (
                    <Spin
                      __component_name="Spin"
                      spinning={__$$eval(
                        () => this.props.useGetNetwork?.loading
                      )}
                    >
                      <Card
                        actions={[]}
                        bordered={false}
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ marginLeft: '-20px', marginTop: '-16px' }}
                        type="default"
                      >
                        <Table
                          __component_name="Table"
                          __events={{
                            eventDataList: [
                              {
                                name: 'onChange',
                                relatedEventName:
                                  'handleOrganizationTableChange',
                                type: 'componentEvent',
                              },
                              {
                                name: 'pagination.onChange',
                                relatedEventName:
                                  'handleOrganizationPaginationChange',
                                type: 'componentEvent',
                              },
                              {
                                name: 'pagination.onShowSizeChange',
                                relatedEventName:
                                  'handleOrganizationPaginationChange',
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
                              title:
                                this.i18n('i18n-ycr2zketd3o') /* 组织名称 */,
                            },
                            {
                              dataIndex: 'admin',
                              key: 'age',
                              title: this.i18n('i18n-7ww60oxk') /* 创建者 */,
                            },
                            {
                              dataIndex: 'ibppeers',
                              key: 'num',
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
                                      () => record?.ibppeers?.length || '0'
                                    )}
                                  </Typography.Text>
                                ))(
                                  __$$createChildContext(__$$context, {
                                    text,
                                    record,
                                    index,
                                  })
                                ),
                              title:
                                this.i18n('i18n-tzncutaq') /* 组织节点数 */,
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
                                    time={__$$eval(() => record?.joinedAt)}
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
                                    __component_name="Status"
                                    id={__$$eval(() => record?.status)}
                                    types={[
                                      {
                                        children:
                                          this.i18n(
                                            'i18n-1vangoko4yf'
                                          ) /* 正常 */,
                                        icon: 'CheckCircleFilled',
                                        id: 'Deployed',
                                        type: 'success',
                                      },
                                      {
                                        _unsafe_MixedSetter_tooltip_select:
                                          'VariableSetter',
                                        children:
                                          this.i18n(
                                            'i18n-xtno2l9qqog'
                                          ) /* 异常 */,
                                        icon: 'CloseCircleFilled',
                                        id: 'Error',
                                        tooltip: __$$eval(() => record.reason),
                                        type: 'error',
                                      },
                                      {
                                        children:
                                          this.i18n(
                                            'i18n-5bhot42b'
                                          ) /* 部署中 */,
                                        icon: 'ClockCircleFilled',
                                        id: 'Deploying',
                                        type: 'warning',
                                      },
                                      {
                                        children:
                                          this.i18n(
                                            'i18n-1vangoko4yf'
                                          ) /* 正常 */,
                                        icon: 'CheckCircleFilled',
                                        id: 'Created',
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
                              key: 'op',
                              render: (text, record, index) =>
                                ((__$$context) => (
                                  <Button
                                    __component_name="Button"
                                    block={false}
                                    danger={false}
                                    disabled={__$$eval(() =>
                                      record?.admin ===
                                      __$$context.props.authData?.user?.name
                                        ? undefined
                                        : true
                                    )}
                                    ghost={false}
                                    href={__$$eval(
                                      () => `/organization/${record.name}`
                                    )}
                                    shape="default"
                                    type="link"
                                  >
                                    {this.i18n('i18n-m6n5fnxybu') /* 详情 */}
                                  </Button>
                                ))(
                                  __$$createChildContext(__$$context, {
                                    text,
                                    record,
                                    index,
                                  })
                                ),
                              title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                            },
                          ]}
                          dataSource={__$$eval(() =>
                            (
                              this.props.useGetNetwork?.data?.network
                                ?.organizations || []
                            )?.sort((a, b) => {
                              if (this.state.sorter?.order !== 'ascend') {
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
                            () => this.props.useGetNetwork?.loading
                          )}
                          onChange={function () {
                            return this.handleOrganizationTableChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          pagination={{
                            current: __$$eval(
                              () => this.state.organization.current
                            ),
                            onChange: function () {
                              return this.handleOrganizationPaginationChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            onShowSizeChange: function () {
                              return this.handleOrganizationPaginationChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            pageSize: __$$eval(
                              () => this.state.organization.size
                            ),
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
                                  this.props.useGetNetwork?.data?.network
                                    ?.organizations || []
                                )?.length
                            ),
                          }}
                          rowKey="name"
                          scroll={{ scrollToFirstRowOnChange: true }}
                          showHeader={true}
                          size="default"
                        />
                      </Card>
                    </Spin>
                  ),
                  key: 'organization',
                  label: this.i18n('i18n-54sfaqivd5i') /* 组织管理 */,
                },
                {
                  children: (
                    <Card
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      size="default"
                      style={{ marginLeft: '-20px', marginTop: '-16px' }}
                      type="default"
                    >
                      <Row wrap={true}>
                        <Col __component_name="Col" span={24}>
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
                                      relatedEventName: 'openAddChannelModal',
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
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                target="_self"
                                type="primary"
                              >
                                {this.i18n('i18n-snaon3b2fni') /* 新建通道 */}
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
                                          'handleChannelSearchValueChange',
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
                                    return this.handleChannelSearchValueChange.apply(
                                      this,
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([])
                                    );
                                  }.bind(this)}
                                  placeholder={
                                    this.i18n(
                                      'i18n-ajsvl5v284r'
                                    ) /* 输入通道名称查询 */
                                  }
                                />
                              </Space>
                            </Col>
                          </Row>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Table
                            __component_name="Table"
                            __events={{
                              eventDataList: [
                                {
                                  name: 'onChange',
                                  relatedEventName: 'handleChannelTableChange',
                                  type: 'componentEvent',
                                },
                                {
                                  name: 'pagination.onChange',
                                  relatedEventName:
                                    'handleChannelPaginationChange',
                                  type: 'componentEvent',
                                },
                                {
                                  name: 'pagination.onShowSizeChange',
                                  relatedEventName:
                                    'handleChannelPaginationChange',
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
                                      disabled={false}
                                      ghost={false}
                                      href={__$$eval(
                                        () =>
                                          `/network/detail/${__$$context.match?.params?.id}/channel/${record?.name}`
                                      )}
                                      shape="default"
                                      type="link"
                                    >
                                      {__$$eval(
                                        () => `${record.displayName || '-'}`
                                      )}
                                    </Button>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-6oadzcxin7k') /* 通道名称 */,
                              },
                              {
                                dataIndex: 'members',
                                key: 'members',
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
                                        () => record?.members?.length || '0'
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-76uxs6ht') /* 组织数量 */,
                              },
                              {
                                dataIndex: 'peers',
                                ellipsis: { showTitle: true },
                                key: 'peers',
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
                                          record?.peers
                                            ?.map((item) => item.name)
                                            ?.join(', ') || '-'
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-4cpogden') /* 我的节点 */,
                              },
                              {
                                dataIndex: 'hy',
                                key: 'hy',
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
                                        () => record?.chaincode?.length || '0'
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-4lrtaenb') /* 合约数量 */,
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
                                      time={__$$eval(() => record?.joinedAt)}
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
                                      __component_name="Status"
                                      id={__$$eval(() => record.status)}
                                      types={[
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-1vangoko4yf'
                                            ) /* 正常 */,
                                          icon: 'CheckCircleFilled',
                                          id: 'Deployed',
                                          type: 'success',
                                        },
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-1vangoko4yf'
                                            ) /* 正常 */,
                                          icon: 'CheckCircleFilled',
                                          id: 'Deploying',
                                          type: 'success',
                                        },
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-xtno2l9qqog'
                                            ) /* 异常 */,
                                          icon: 'CloseCircleFilled',
                                          id: 'Error',
                                          type: 'error',
                                        },
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-1vangoko4yf'
                                            ) /* 正常 */,
                                          icon: 'CheckCircleFilled',
                                          id: 'ChannelCreated',
                                          type: 'success',
                                        },
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-1vangoko4yf'
                                            ) /* 正常 */,
                                          icon: 'CheckCircleFilled',
                                          id: 'ChannelArchived',
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
                                key: 'op',
                                render: (text, record, index) =>
                                  ((__$$context) => [
                                    <Button
                                      __component_name="Button"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'onClick',
                                            paramStr:
                                              '{\n \t "record": this.record \n}',
                                            relatedEventName:
                                              'openAddChannelOrganizationModal',
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
                                      onClick={function () {
                                        return this.openAddChannelOrganizationModal.apply(
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
                                      {
                                        this.i18n(
                                          'i18n-ddvens87'
                                        ) /* 邀请组织 */
                                      }
                                    </Button>,
                                    <Button
                                      __component_name="Button"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'onClick',
                                            paramStr:
                                              '{\n \t "record":this.record \n}',
                                            relatedEventName:
                                              'openAddChannelPeerModal',
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
                                      onClick={function () {
                                        return this.openAddChannelPeerModal.apply(
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
                                      {
                                        this.i18n(
                                          'i18n-bxsxgogh'
                                        ) /* 加入节点 */
                                      }
                                    </Button>,
                                  ])(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                              },
                            ]}
                            dataSource={__$$eval(() =>
                              (
                                this.props.useGetNetwork?.data?.network
                                  ?.channels || []
                              )
                                ?.filter((item) => {
                                  return this.state.channel.searchValue
                                    ? item.name?.includes(
                                        this.state.channel.searchValue
                                      )
                                    : true;
                                })
                                ?.sort((a, b) => {
                                  if (this.state.sorter?.order !== 'ascend') {
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
                              () => this.props.useGetNetwork?.loading
                            )}
                            onChange={function () {
                              return this.handleChannelTableChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            pagination={{
                              current: __$$eval(
                                () => this.state.channel.current
                              ),
                              onChange: function () {
                                return this.handleChannelPaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              onShowSizeChange: function () {
                                return this.handleChannelPaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              pageSize: __$$eval(() => this.state.channel.size),
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
                                  ((
                                    this.props.useGetNetwork?.data?.network
                                      ?.channels || []
                                  )?.filter((item) => {
                                    return this.state.channel.searchValue
                                      ? item.name?.includes(
                                          this.state.channel.searchValue
                                        )
                                      : true;
                                  })).length
                              ),
                            }}
                            rowKey="name"
                            scroll={{ scrollToFirstRowOnChange: true }}
                            showHeader={true}
                            size="default"
                            style={{ marginTop: '-20px' }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  ),
                  key: 'channel',
                  label: this.i18n('i18n-pjvvvoe9') /* 通道管理 */,
                },
                {
                  children: (
                    <Card
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      size="default"
                      style={{ marginLeft: '-20px', marginTop: '-16px' }}
                      type="default"
                    >
                      <Row wrap={true}>
                        <Col __component_name="Col" span={24}>
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
                                      relatedEventName: 'openAddContractModal',
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
                                  return this.openAddContractModal.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                target="_self"
                                type="primary"
                              >
                                {this.i18n('i18n-2rczbtzx') /* 新建合约 */}
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
                                          'handleContractSearchValueChange',
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
                                    return this.handleContractSearchValueChange.apply(
                                      this,
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([])
                                    );
                                  }.bind(this)}
                                  placeholder={
                                    this.i18n(
                                      'i18n-rlwqgw1a'
                                    ) /* 输入合约名称查询 */
                                  }
                                />
                              </Space>
                            </Col>
                          </Row>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Table
                            __component_name="Table"
                            __events={{
                              eventDataList: [
                                {
                                  name: 'onChange',
                                  relatedEventName: 'handleChannelTableChange',
                                  type: 'componentEvent',
                                },
                                {
                                  name: 'pagination.onChange',
                                  relatedEventName:
                                    'handleChannelPaginationChange',
                                  type: 'componentEvent',
                                },
                                {
                                  name: 'pagination.onShowSizeChange',
                                  relatedEventName:
                                    'handleChannelPaginationChange',
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
                                dataIndex: 'displayName',
                                key: 'displayName',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      href={__$$eval(
                                        () =>
                                          `/network/detail/${__$$context.match?.params?.id}/contract/${record?.name}`
                                      )}
                                      shape="default"
                                      type="link"
                                    >
                                      {__$$eval(
                                        () =>
                                          `${record.displayName || '-'}(${
                                            record?.name || '-'
                                          })`
                                      )}
                                    </Button>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-7ws2ncyb') /* 合约名称 */,
                              },
                              {
                                dataIndex: 'version',
                                key: 'version',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Dropdown
                                      __component_name="Dropdown"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'menu.onClick',
                                            paramStr:
                                              '{\n \trecord: this.record\n}',
                                            relatedEventName:
                                              'changeContractVersion',
                                            type: 'componentEvent',
                                          },
                                        ],
                                        eventList: [
                                          {
                                            disabled: true,
                                            name: 'menu.onClick',
                                            template:
                                              "onDropDownClick({ item, key, keyPath, domEvent }, ${extParams}){\n// onClick\t点击 MenuItem 调用此函数 \nconsole.log('onDropDownClick', item, key, keyPath, domEvent);}",
                                          },
                                        ],
                                      }}
                                      destroyPopupOnHide={true}
                                      disabled={false}
                                      menu={{
                                        items: __$$eval(() =>
                                          __$$context.getContractVersions(
                                            record
                                          )
                                        ),
                                        onClick: function () {
                                          return this.changeContractVersion.apply(
                                            this,
                                            Array.prototype.slice
                                              .call(arguments)
                                              .concat([
                                                {
                                                  record: record,
                                                },
                                              ])
                                          );
                                        }.bind(__$$context),
                                      }}
                                      placement="bottomLeft"
                                      trigger={['hover']}
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
                                            style={{
                                              color: 'inherit',
                                              fontSize: '',
                                            }}
                                          >
                                            {__$$eval(() =>
                                              __$$context.getContractVersion(
                                                record
                                              )
                                            )}
                                          </Typography.Text>,
                                          <Icon
                                            __component_name="Icon"
                                            size={12}
                                            style={{
                                              marginLeft: 4,
                                              verticalAlign: 'middle',
                                            }}
                                            type="DownOutlined"
                                          />,
                                        ]}
                                      </Button>
                                    </Dropdown>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title: this.i18n('i18n-hbf63hki898') /* 版本 */,
                              },
                              {
                                dataIndex: 'source',
                                key: 'source',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ fontSize: '' }}
                                    >
                                      {__$$eval(() => record?.initiator || '-')}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-1vlhlgh9') /* 合约来源 */,
                              },
                              {
                                dataIndex: 'node',
                                key: 'node',
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
                                        () => record?.ibppeers?.length || '0'
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-jhpf4qg9') /* 部署节点 */,
                              },
                              {
                                dataIndex: 'channels',
                                key: 'channels',
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
                                        () => record?.channels?.length || '0'
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-dmz1d3cr') /* 部署通道数 */,
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
                                      time={__$$eval(
                                        () => record.creationTimestamp
                                      )}
                                    />
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-9ox4rx1wtwv') /* 创建时间 */,
                              },
                              {
                                dataIndex: 'status',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Status
                                      __component_name="Status"
                                      id={__$$eval(() => record?.status)}
                                      types={[
                                        {
                                          _unsafe_MixedSetter_children_select:
                                            'I18nSetter',
                                          children:
                                            this.i18n(
                                              'i18n-1vangoko4yf'
                                            ) /* 正常 */,
                                          icon: 'CheckCircleFilled',
                                          id: 'Created',
                                          type: 'success',
                                        },
                                        {
                                          _unsafe_MixedSetter_children_select:
                                            'I18nSetter',
                                          children:
                                            this.i18n(
                                              'i18n-xtno2l9qqog'
                                            ) /* 异常 */,
                                          icon: 'CloseCircleFilled',
                                          id: 'Error',
                                          type: 'error',
                                        },
                                        {
                                          children:
                                            this.i18n(
                                              'i18n-5bhot42b'
                                            ) /* 构建中 */,
                                          icon: 'ClockCircleFilled',
                                          id: 'Deploying',
                                          type: 'info',
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
                                  ((__$$context) => [
                                    <Button
                                      __component_name="Button"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'onClick',
                                            paramStr:
                                              '{\n \t "record": this.record \n}',
                                            relatedEventName:
                                              'openDeploymentContractModal',
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
                                          __$$context?.record?.status !==
                                          'Created'
                                      )}
                                      ghost={false}
                                      onClick={function () {
                                        return this.openDeploymentContractModal.apply(
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
                                      {this.i18n('i18n-7xujsaya') /* 部署 */}
                                    </Button>,
                                    <Button
                                      __component_name="Button"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'onClick',
                                            paramStr:
                                              '{\n \t "record": this.record \n}',
                                            relatedEventName:
                                              'openUpgradeContractModal',
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
                                      onClick={function () {
                                        return this.openUpgradeContractModal.apply(
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
                                      {this.i18n('i18n-w8nbxtmd') /* 升级 */}
                                    </Button>,
                                    <Button
                                      __component_name="Button"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'onClick',
                                            paramStr:
                                              '{\n \t "record":this.record \n}',
                                            relatedEventName:
                                              'openDeleteContractModal',
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
                                      onClick={function () {
                                        return this.openDeleteContractModal.apply(
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
                                      {this.i18n('i18n-ias68eipm18') /* 删除 */}
                                    </Button>,
                                  ])(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                              },
                            ]}
                            dataSource={__$$eval(() => this.formatContract())}
                            loading={__$$eval(
                              () => this.props.useGetChaincodebuilds?.loading
                            )}
                            onChange={function () {
                              return this.handleChannelTableChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            pagination={{
                              current: __$$eval(
                                () => this.state.contract.current
                              ),
                              onChange: function () {
                                return this.handleChannelPaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              onShowSizeChange: function () {
                                return this.handleChannelPaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              pageSize: __$$eval(
                                () => this.state.contract.size
                              ),
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
                                () => this.formatContract()?.length || 0
                              ),
                            }}
                            rowKey="name"
                            scroll={{ scrollToFirstRowOnChange: true }}
                            showHeader={true}
                            size="default"
                            style={{ marginTop: '-20px' }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  ),
                  key: 'contract',
                  label: this.i18n('i18n-5wdi9bc5') /* 合约管理 */,
                },
                {
                  children: (
                    <Card
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      size="default"
                      style={{ marginLeft: '-20px', marginTop: '-16px' }}
                      type="default"
                    >
                      <Row wrap={true}>
                        <Col __component_name="Col" span={24}>
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
                                      relatedEventName: 'openAddStrategyModal',
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
                                  return this.openAddStrategyModal.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                target="_self"
                                type="primary"
                              >
                                {this.i18n('i18n-6pygp0ks') /* 新增背书策略 */}
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
                                          'handleStrategySearchValueChange',
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
                                    return this.handleStrategySearchValueChange.apply(
                                      this,
                                      Array.prototype.slice
                                        .call(arguments)
                                        .concat([])
                                    );
                                  }.bind(this)}
                                  placeholder={
                                    this.i18n(
                                      'i18n-rlwqgw1a'
                                    ) /* 输入合约名称查询 */
                                  }
                                />
                              </Space>
                            </Col>
                          </Row>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Table
                            __component_name="Table"
                            __events={{
                              eventDataList: [
                                {
                                  name: 'onChange',
                                  relatedEventName: 'handleStrategyTableChange',
                                  type: 'componentEvent',
                                },
                                {
                                  name: 'pagination.onChange',
                                  relatedEventName:
                                    'handleStrategyPaginationChange',
                                  type: 'componentEvent',
                                },
                                {
                                  name: 'pagination.onShowSizeChange',
                                  relatedEventName:
                                    'handleStrategyPaginationChange',
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
                                dataIndex: 'displayName',
                                key: 'displayName',
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
                                        () => `${record.displayName || '-'}`
                                      )}
                                    </Typography.Text>
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-87kp314f') /* 策略名称 */,
                              },
                              {
                                dataIndex: 'channelDisplayName',
                                key: 'channel',
                                title:
                                  this.i18n('i18n-gnw09zuy') /* 应用通道 */,
                              },
                              {
                                dataIndex: 'source',
                                key: 'source',
                                render: '',
                                title:
                                  this.i18n('i18n-qg8otk6r') /* 应用合约 */,
                              },
                              {
                                dataIndex: 'description',
                                key: 'description',
                                title:
                                  this.i18n('i18n-w3qy6omh') /* 策略描述 */,
                              },
                              {
                                dataIndex: 'lastHeartbeatTime',
                                key: 'lastHeartbeatTime',
                                render: (text, record, index) =>
                                  ((__$$context) => (
                                    <Typography.Time
                                      __component_name="Typography.Time"
                                      format=""
                                      relativeTime={false}
                                      time={__$$eval(
                                        () => record?.lastHeartbeatTime
                                      )}
                                    />
                                  ))(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title:
                                  this.i18n('i18n-watjije0jk') /* 更新时间 */,
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
                                            relatedEventName:
                                              'openDeleteStrategyModal',
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
                                        return this.openDeleteStrategyModal.apply(
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
                                      {this.i18n('i18n-ias68eipm18') /* 删除 */}
                                    </Button>,
                                    <Button
                                      __component_name="Button"
                                      __events={{
                                        eventDataList: [
                                          {
                                            name: 'onClick',
                                            paramStr:
                                              '{\n \t "record":this.record \n}',
                                            relatedEventName:
                                              'openStrategyDetailModal',
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
                                        return this.openStrategyDetailModal.apply(
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
                                      ref={this._refsManager.linkRef(
                                        'button-6bf7990c'
                                      )}
                                      shape="default"
                                      type="link"
                                    >
                                      {this.i18n('i18n-m6n5fnxybu') /* 详情 */}
                                    </Button>,
                                  ])(
                                    __$$createChildContext(__$$context, {
                                      text,
                                      record,
                                      index,
                                    })
                                  ),
                                title: this.i18n('i18n-k5inn5jmnt9') /* 操作 */,
                              },
                            ]}
                            dataSource={__$$eval(() =>
                              (this.state?.strategy?.list || [])
                                ?.filter((item) => {
                                  return this.state.strategy.searchValue
                                    ? item.name?.includes(
                                        this.state.strategy.searchValue
                                      )
                                    : true;
                                })
                                ?.sort((a, b) => {
                                  if (this.state.sorter?.order !== 'ascend') {
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
                              () => this.props.useGetNetwork?.loading
                            )}
                            onChange={function () {
                              return this.handleStrategyTableChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            pagination={{
                              current: __$$eval(
                                () => this.state.strategy.current
                              ),
                              onChange: function () {
                                return this.handleStrategyPaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              onShowSizeChange: function () {
                                return this.handleStrategyPaginationChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this),
                              pageSize: __$$eval(
                                () => this.state.strategy.size
                              ),
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
                                  ((this.state?.strategy?.list || [])?.filter(
                                    (item) => {
                                      return this.state.strategy.searchValue
                                        ? item.name?.includes(
                                            this.state.strategy.searchValue
                                          )
                                        : true;
                                    }
                                  )).length
                              ),
                            }}
                            rowKey="name"
                            scroll={{ scrollToFirstRowOnChange: true }}
                            showHeader={true}
                            size="default"
                            style={{ marginTop: '-20px' }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  ),
                  key: 'policy',
                  label: this.i18n('i18n-7zhxmxra') /* 策略管理 */,
                },
              ]}
              onChange={function () {
                return this.onTabsChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this)}
              size="large"
              style={{ marginTop: '-20px', paddingLeft: '20px' }}
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
              {
                name: 'onOk',
                relatedEventName: 'confirmAddChannelModal',
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
            <Space align="center" direction="horizontal">
              {!!__$$eval(() => this.state.channel.step === 0) && (
                <Button
                  __component_name="Button"
                  __events={{
                    eventDataList: [
                      {
                        name: 'onClick',
                        relatedEventName: 'channelAddModalNext',
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
                    return this.channelAddModalNext.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  type="primary"
                >
                  {this.i18n('i18n-p17ll5b2') /* 下一步 */}
                </Button>
              )}
              {!!__$$eval(() => this.state.channel.step === 0) && (
                <Button
                  __component_name="Button"
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
                  type="default"
                >
                  {this.i18n('i18n-l8xumyvnlya') /* 取消 */}
                </Button>
              )}
              {!!__$$eval(() => this.state.channel.step === 1) && (
                <Button
                  __component_name="Button"
                  __events={{
                    eventDataList: [
                      {
                        name: 'onClick',
                        relatedEventName: 'channelAddModalPre',
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
                  onClick={function () {
                    return this.channelAddModalPre.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  type="primary"
                >
                  {this.i18n('i18n-o9r9z4vz') /* 上一步 */}
                </Button>
              )}
              {!!__$$eval(() => this.state.channel.step === 1) && (
                <Button
                  __component_name="Button"
                  __events={{
                    eventDataList: [
                      {
                        name: 'onClick',
                        relatedEventName: 'channelAddModalConfirm',
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
                  onClick={function () {
                    return this.channelAddModalConfirm.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  type="primary"
                >
                  {this.i18n('i18n-tixlz8m0le9') /* 确定 */}
                </Button>
              )}
            </Space>
          }
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
              this.state.isOpenModal && this.state.modalType === 'addchannel'
          )}
          title={this.i18n('i18n-snaon3b2fni') /* 新建通道 */}
        >
          <Row __component_name="Row" wrap={true}>
            <Col __component_name="Col" span={24}>
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={12}>
                  <Steps
                    __component_name="Steps"
                    current={__$$eval(() => this.state.channel.step)}
                    items={[
                      { title: this.i18n('i18n-fl4pb7jd') /* 通道信息 */ },
                      { title: this.i18n('i18n-bxsxgogh') /* 加入节点 */ },
                    ]}
                    size="small"
                    type="navigation"
                  />
                </Col>
              </Row>
            </Col>
            <Col __component_name="Col" span={24}>
              {!!__$$eval(() => this.state.channel.step === 0) && (
                <FormilyForm
                  __component_name="FormilyForm"
                  componentProps={{
                    colon: false,
                    labelAlign: 'left',
                    labelCol: 5,
                    layout: 'horizontal',
                    wrapperCol: 20,
                  }}
                  ref={this._refsManager.linkRef('formily_create_channel')}
                >
                  <FormilyInput
                    __component_name="FormilyInput"
                    componentProps={{
                      'x-component-props': {
                        bordered: true,
                        placeholder:
                          this.i18n('i18n-ienrgm2j5p9') /* 请输入通道名称 */,
                      },
                    }}
                    fieldProps={{
                      name: 'displayName',
                      required: true,
                      title: this.i18n('i18n-9e87qfos') /* 名称 */,
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
                            return this.validatorChannelName.apply(
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
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                        allowClear: false,
                        disabled: false,
                        enum: __$$eval(
                          () =>
                            this.props.useGetNetwork?.data?.network?.organizations?.map(
                              (item) => ({
                                value: item.name,
                                label: `${item.name}(${item.admin})`,
                              })
                            ) || []
                        ),
                        placeholder:
                          this.i18n('i18n-nezb9wehqyh') /* 请选择发起者 */,
                      },
                    }}
                    fieldProps={{
                      name: 'initiator',
                      required: true,
                      title: this.i18n('i18n-v6gmjbqnol') /* 设置发起者 */,
                      'x-validator': [],
                    }}
                  />
                  <FormilySelect
                    __component_name="FormilySelect"
                    componentProps={{
                      'x-component-props': {
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                        allowClear: false,
                        disabled: false,
                        enum: __$$eval(
                          () =>
                            this.props.useGetNetwork?.data?.network?.organizations?.map(
                              (item) => ({
                                value: item.name,
                                label: `${item.name}(${item.admin})`,
                              })
                            ) || []
                        ),
                        mode: 'multiple',
                        placeholder:
                          this.i18n('i18n-bko8c4ii1ad') /* 请选择成员 */,
                      },
                    }}
                    fieldProps={{
                      _unsafe_MixedSetter_description_select: 'SlotSetter',
                      description: (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '' }}
                          type="secondary"
                        >
                          {
                            this.i18n(
                              'i18n-dgsy7jhb'
                            ) /* 通道内成员组织的变更需要根据联盟投票策略，获得足够的组织同意 */
                          }
                        </Typography.Text>
                      ),
                      name: 'organizations',
                      required: false,
                      title: this.i18n('i18n-cprrxhrkty') /* 配置成员 */,
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
                      _unsafe_MixedSetter_default_select: 'StringSetter',
                      default: '',
                      name: 'description',
                      title: this.i18n('i18n-8weq4mfy9lf') /* 描述 */,
                      'x-component': 'Input.TextArea',
                      'x-validator': [
                        {
                          message:
                            this.i18n(
                              'i18n-5eitggraalr'
                            ) /* 通道描述由 0 ~ 200 字符组成 */,
                          pattern: '^.{0,200}$',
                        },
                      ],
                    }}
                  />
                </FormilyForm>
              )}
            </Col>
          </Row>
          {!!__$$eval(() => this.state.channel.step === 1) && (
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={24}>
                <Space align="center" direction="horizontal">
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {this.i18n('i18n-xcopya8d') /* 请选择加入通道 */}
                  </Typography.Text>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {__$$eval(() => this.state.channel.addData?.name)}
                  </Typography.Text>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    {this.i18n('i18n-4r61pybs') /* 的节点 */}
                  </Typography.Text>
                </Space>
              </Col>
              <Col __component_name="Col" span={24}>
                <Transfer
                  __component_name="Transfer"
                  __events={{
                    eventDataList: [
                      {
                        name: 'onChange',
                        relatedEventName: 'channelPeersChange',
                        type: 'componentEvent',
                      },
                    ],
                    eventList: [
                      {
                        disabled: true,
                        name: 'onChange',
                        template:
                          "onChange(targetKeys,direction,moveKeys,${extParams}){\n// 选项在两栏之间转移时的回调函数\nconsole.log('onChange',targetKeys,direction,moveKeys);}",
                      },
                      {
                        disabled: false,
                        name: 'onScroll',
                        template:
                          "onScroll(direction,event,${extParams}){\n// 选项列表滚动时的回调函数\nconsole.log('onScroll',direction,event);}",
                      },
                      {
                        disabled: false,
                        name: 'onSearch',
                        template:
                          "onSearch(direction,value,${extParams}){\n// 搜索框内容时改变时的回调函数\nconsole.log('onSearch',direction,value);}",
                      },
                      {
                        disabled: false,
                        name: 'onSelectChange',
                        template:
                          "onSelectChange(sourceSelectedKeys,targetSelectedKeys,${extParams}){\n// 选中项发生改变时的回调函数\nconsole.log('onSelectChange',sourceSelectedKeys,targetSelectedKeys);}",
                      },
                    ],
                  }}
                  dataSource={__$$eval(() => this.state.peers)}
                  disabled={false}
                  onChange={function () {
                    return this.channelPeersChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  oneWay={false}
                  render={function () {
                    const self = this;
                    try {
                      return function renderItem(record, extParams) {
                        return record.title;
                      }.apply(self, arguments);
                    } catch (e) {
                      logger.warn(
                        'call function which parsed by lowcode failed: ',
                        e
                      );
                      return e.message;
                    }
                  }}
                  selectAllLabels={[]}
                  selectedKeys={__$$eval(() => this.state.channelPeers)}
                  showSearch={false}
                  showSelectAll={true}
                  titles={[]}
                />
              </Col>
            </Row>
          )}
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
            <Button
              __component_name="Button"
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
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'addchannelorganizationsuccess'
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
                {this.i18n('i18n-s4aho8fc') /* 邀请加入通道已发送 */}
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
                relatedEventName: 'channelAddOrganizationModalConfirm',
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
            return this.channelAddOrganizationModalConfirm.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal &&
              this.state.modalType === 'addchannelorganization'
          )}
          title={this.i18n('i18n-ddvens87') /* 邀请组织 */}
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
            ref={this._refsManager.linkRef(
              'formily_create_channel_organization'
            )}
          >
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                  allowClear: false,
                  disabled: false,
                  enum: __$$eval(
                    () =>
                      this.props.useGetNetwork?.data?.network?.organizations
                        ?.filter((item) =>
                          this.state?.record?.channel?.members?.every(
                            (m) => m?.name !== item.name
                          )
                        )
                        ?.map((item) => ({
                          value: item.name,
                          label: `${item.name}(${item.admin})`,
                        })) || []
                  ),
                  placeholder: this.i18n('i18n-vg3668rl') /* 请选择组织 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_description_select: 'SlotSetter',
                description: (
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                    type="secondary"
                  >
                    {
                      this.i18n(
                        'i18n-xf6wcwuc'
                      ) /* 当通道中有其他用户组织时，需要其他用户投票同意，才能加入成功 */
                    }
                  </Typography.Text>
                ),
                name: 'members',
                required: true,
                title: this.i18n('i18n-ddvens87') /* 邀请组织 */,
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
                relatedEventName: 'confirmAddContractModal',
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
          confirmLoading={__$$eval(() => this.state.contract?.createLoading)}
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
            return this.confirmAddContractModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () =>
              this.state.isOpenModal && this.state.modalType === 'addcontract'
          )}
          title={this.i18n('i18n-2rczbtzx') /* 新建合约 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 5,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef('formily_create_contract')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-b3d2mz7i') /* 请输入合约名称 */,
                },
              }}
              fieldProps={{
                name: 'displayName',
                required: true,
                title: this.i18n('i18n-7ws2ncyb') /* 合约名称 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message:
                      this.i18n('i18n-o3gly28f') /* 长度为 3- 20 个字符 */,
                    pattern: __$$eval(() => this?.constants?.NAME_LENGTH_REG),
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
                    pattern: __$$eval(() => this?.constants?.NAME_K8S_REG),
                    type: 'disabled',
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder:
                    this.i18n(
                      'i18n-2ielocre'
                    ) /* 合约版本供识别与维护使用，建议格式： v1.0 */,
                },
              }}
              fieldProps={{
                name: 'version',
                required: true,
                title: this.i18n('i18n-6othsg2w') /* 合约版本号 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    type: 'disabled',
                    validator: function () {
                      return this.validatorContractRepeat.apply(
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
                  allowClear: false,
                  disabled: false,
                  notFoundContent: this.i18n('i18n-dy7hcp1k') /* 请选择 */,
                  placeholder: '请选择',
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'StringSetter',
                default: 'folder',
                enum: [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: this.i18n('i18n-9vjtx036') /* 文件夹 */,
                    type: 'disabled',
                    value: 'folder',
                  },
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    label: this.i18n('i18n-fhw8go0y') /* zip压缩包 */,
                    type: 'disabled',
                    value: 'zip',
                  },
                ],
                name: 'format',
                required: true,
                title: this.i18n('i18n-6jtfhc9d') /* 上传格式 */,
                'x-validator': [],
              }}
            />
            <FormilyUpload
              __component_name="FormilyUpload"
              componentProps={{
                'x-component-props': {
                  beforeUpload: function () {
                    return this.beforeUpload.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  directory: '{{!!($form?.values?.format === "folder")}}',
                  multiple: false,
                  onChange: function () {
                    return this.onFilesChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                },
              }}
              fieldProps={{
                name: 'files',
                required: true,
                title: this.i18n('i18n-tp1bif8s') /* 合约文件 */,
                'x-component': 'FormilyUpload',
                'x-validator': [],
              }}
            >
              <Button
                __component_name="Button"
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
                shape="default"
                type="default"
              >
                {this.i18n('i18n-l9xc0l1g') /* 选择上传的文件 */}
              </Button>
            </FormilyUpload>
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  allowClear: false,
                  disabled: false,
                  enum: [
                    {
                      _unsafe_MixedSetter_label_select: 'StringSetter',
                      disabled: false,
                      label: 'Go',
                      value: 'Go',
                    },
                    {
                      _unsafe_MixedSetter_label_select: 'StringSetter',
                      disabled: false,
                      label: 'Java',
                      value: 'Java',
                    },
                    {
                      _unsafe_MixedSetter_label_select: 'StringSetter',
                      disabled: false,
                      label: 'Node',
                      value: 'Node',
                    },
                  ],
                  notFoundContent: {},
                  placeholder: this.i18n('i18n-928f3hdn') /* 请选择语言 */,
                },
              }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'StringSetter',
                default: 'Go',
                name: 'language',
                title: this.i18n('i18n-7usiozsk') /* 选择语言 */,
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
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message:
                      this.i18n(
                        'i18n-ol5awdwa'
                      ) /* 合约描述由 0 ~ 200 字符组成 */,
                    pattern: '^.{0,200}$',
                    type: 'disabled',
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
  const match = matchPath({ path: '/network/detail/:id' }, location.pathname);
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
          func: 'useGetNetwork',
          params: {
            name: self.match?.params?.id,
          },
        },
        {
          func: 'useGetChaincodebuilds',
          params: {
            network: self.match?.params?.id,
          },
        },
      ]}
      render={(dataProps) => (
        <NetworkDetail$$Page {...dataProps} self={self} appHelper={appHelper} />
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
