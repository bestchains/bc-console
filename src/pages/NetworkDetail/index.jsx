// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilyTextArea,
  FormilySelect,
  FormilyFormItem,
  FormilyArrayCards,
  FormilyUpload,
  Button,
  Icon,
  Alert,
  Space,
  Typography,
  UnifiedLink,
  Row,
  Col,
  Transfer,
  Tabs,
  Spin,
  Card,
  Divider,
  Descriptions,
  Status,
  Table,
  Input,
  Dropdown,
  Steps,
} from '@tenx-ui/materials';

import { useLocation, history, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

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
      },
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
    var _payload$record;
    this.setState({
      initVersions: {
        ...this.state.initVersions,
        [payload === null || payload === void 0
          ? void 0
          : (_payload$record = payload.record) === null ||
            _payload$record === void 0
          ? void 0
          : _payload$record.displayName]: e.key,
      },
    });
  }

  async channelAddModalConfirm(e, payload) {
    var _this$props$useGetNet, _this$props$useGetNet2;
    const network =
      ((_this$props$useGetNet = this.props.useGetNetwork) === null ||
      _this$props$useGetNet === void 0
        ? void 0
        : (_this$props$useGetNet2 = _this$props$useGetNet.data) === null ||
          _this$props$useGetNet2 === void 0
        ? void 0
        : _this$props$useGetNet2.network) || {};
    try {
      var _this$state, _this$state$channel, _this$state$channelPe;
      const res = await this.props.appHelper.utils.bff.createChannel({
        network: network === null || network === void 0 ? void 0 : network.name,
        channel: {
          ...(((_this$state = this.state) === null || _this$state === void 0
            ? void 0
            : (_this$state$channel = _this$state.channel) === null ||
              _this$state$channel === void 0
            ? void 0
            : _this$state$channel.addData) || {}),
          peers:
            (_this$state$channelPe = this.state.channelPeers) === null ||
            _this$state$channelPe === void 0
              ? void 0
              : _this$state$channelPe.map((key) => {
                  var _this$state$allPeers;
                  const item =
                    (_this$state$allPeers = this.state.allPeers) === null ||
                    _this$state$allPeers === void 0
                      ? void 0
                      : _this$state$allPeers.find((item) => item.key === key);
                  return {
                    name: item.name,
                    namespace: item.namespace,
                  };
                }),
        },
      });
      // this.closeModal()
      // this.utils.notification.success({
      //   message: this.i18n('i18n-l8fybssesij'),
      // })
      this.openAddChannelSuccessModal();
      this.props.useGetNetwork.mutate();
    } catch (error) {
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n('i18n-85kkwp67i5u'),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response = error.response) === null ||
              _error$response === void 0
            ? void 0
            : _error$response.errors,
      });
    }
  }

  channelAddModalNext() {
    var _this$$, _this$$$formRef, _this$$$formRef$curre;
    const form =
      (_this$$ = this.$('formily_create_channel')) === null ||
      _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
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
        var _this$$, _this$$$formRef, _this$$$formRef$curre;
        const form =
          (_this$$ = this.$('formily_create_channel')) === null ||
          _this$$ === void 0
            ? void 0
            : (_this$$$formRef = _this$$.formRef) === null ||
              _this$$$formRef === void 0
            ? void 0
            : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
              _this$$$formRef$curre === void 0
            ? void 0
            : _this$$$formRef$curre.form;
        form.setValues(this.state.channel.addData);
      }
    );
  }

  channelAddOrganizationModalConfirm(e, payload) {
    this.openAddChannelOrganizationSuccessModal();
    // const network = this.props.useGetNetwork?.data?.network || {}
    // const form = this.$('formily_create')?.formRef?.current?.form
    // form.submit(async v => {
    //   console.log(v)
    //   try {
    //     // const res = await this.props.appHelper.utils.bff.updateChannel({
    //     //   name: network?.name,
    //     //   organizations: v.organizations,
    //     //   initiator: network?.initiator?.name
    //     // })
    //     // this.closeModal()
    //     // this.utils.notification.success({
    //     //   message: this.i18n('i18n-l8fybssesij'),
    //     // })
    //     this.openAddChannelSuccessModal()
    //     this.props.useGetNetwork.mutate()
    //   } catch (error) {
    //     this.utils.notification.warnings({
    //       message: this.i18n('i18n-85kkwp67i5u'),
    //       errors: error?.response?.errors
    //     })
    //   }
    // })
  }

  async channelAddPeerModalConfirm(e, payload) {
    var _this$props$useGetNet, _this$props$useGetNet2;
    const network =
      ((_this$props$useGetNet = this.props.useGetNetwork) === null ||
      _this$props$useGetNet === void 0
        ? void 0
        : (_this$props$useGetNet2 = _this$props$useGetNet.data) === null ||
          _this$props$useGetNet2 === void 0
        ? void 0
        : _this$props$useGetNet2.network) || {};
    try {
      var _this$state$channel, _this$state$channel$r, _this$state$channelPe;
      const res = await this.props.appHelper.utils.bff.updateChannel({
        name:
          (_this$state$channel = this.state.channel) === null ||
          _this$state$channel === void 0
            ? void 0
            : (_this$state$channel$r = _this$state$channel.record) === null ||
              _this$state$channel$r === void 0
            ? void 0
            : _this$state$channel$r.name,
        channel: {
          operate: 'add',
          // remove
          peers:
            (_this$state$channelPe = this.state.channelPeers) === null ||
            _this$state$channelPe === void 0
              ? void 0
              : _this$state$channelPe.map((key) => {
                  var _this$state$allPeers;
                  const item =
                    (_this$state$allPeers = this.state.allPeers) === null ||
                    _this$state$allPeers === void 0
                      ? void 0
                      : _this$state$allPeers.find((item) => item.key === key);
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
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n('i18n-sunw6qwy'),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response = error.response) === null ||
              _error$response === void 0
            ? void 0
            : _error$response.errors,
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
      (_this$$ = this.$('formily_create_contract')) === null ||
      _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      try {
        var _this$match, _this$match$params, _v$files, _v$files$fileList;
        const res = await this.props.appHelper.utils.bff.createChaincodebuild({
          ...v,
          network:
            (_this$match = this.match) === null || _this$match === void 0
              ? void 0
              : (_this$match$params = _this$match.params) === null ||
                _this$match$params === void 0
              ? void 0
              : _this$match$params.id,
          files:
            (_v$files = v.files) === null || _v$files === void 0
              ? void 0
              : (_v$files$fileList = _v$files.fileList) === null ||
                _v$files$fileList === void 0
              ? void 0
              : _v$files$fileList.map((item) => item.originFileObj),
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-5eg2znpg'),
        });
        this.props.useGetChaincodebuilds.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n('i18n-rw4x2dt7'),
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

  confirmAddStrategyModal(e, payload) {
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
      (_this$$ = this.$('formily_create_strategy')) === null ||
      _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      var _JSON$parse, _v$content, _v$content$value, _v$content$value$map;
      const epolicy = {
        channel:
          (_JSON$parse = JSON.parse(v.channel || '{}')) === null ||
          _JSON$parse === void 0
            ? void 0
            : _JSON$parse.name,
        description: v.description,
        name: v.name,
        value:
          'OR(' +
          ((_v$content = v.content) === null || _v$content === void 0
            ? void 0
            : (_v$content$value = _v$content.value) === null ||
              _v$content$value === void 0
            ? void 0
            : (_v$content$value$map = _v$content$value.map((valueitem) => {
                var _valueitem$item, _valueitem$item$map;
                return (_valueitem$item = valueitem.item) === null ||
                  _valueitem$item === void 0
                  ? void 0
                  : (_valueitem$item$map = _valueitem$item.map((item, i) => {
                      item = `'${item}.member'`;
                      if (i === 0) {
                        return 'AND(' + item;
                      }
                      if (i === valueitem.item.length - 1) {
                        return item + ')';
                      }
                      return item;
                    })) === null || _valueitem$item$map === void 0
                  ? void 0
                  : _valueitem$item$map.join(',');
              })) === null || _v$content$value$map === void 0
            ? void 0
            : _v$content$value$map.join(',')) +
          ')',
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
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n('i18n-sivjo10j'),
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

  async confirmDeleteContractModal(e, payload) {
    try {
      var _this$match,
        _this$match$params,
        _this$state$contract,
        _this$state$contract$;
      await this.props.appHelper.utils.bff.deleteChaincodebuild({
        network:
          (_this$match = this.match) === null || _this$match === void 0
            ? void 0
            : (_this$match$params = _this$match.params) === null ||
              _this$match$params === void 0
            ? void 0
            : _this$match$params.id,
        displayName:
          (_this$state$contract = this.state.contract) === null ||
          _this$state$contract === void 0
            ? void 0
            : (_this$state$contract$ = _this$state$contract.record) === null ||
              _this$state$contract$ === void 0
            ? void 0
            : _this$state$contract$.displayName,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-5m5bdexs'),
      });
      this.props.useGetChaincodebuilds.mutate();
    } catch (error) {
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n('i18n-esbyfrwe'),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response = error.response) === null ||
              _error$response === void 0
            ? void 0
            : _error$response.errors,
      });
    }
  }

  confirmDeploymentContractModal(e, payload) {
    var _this$$, _this$$$formRef, _this$$$formRef$curre;
    const form =
      (_this$$ = this.$('formily_contract_deploy')) === null ||
      _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      const chaincode = {
        channel: v.channel,
        epolicy: v.epolicy,
        name: v.name,
        version: v.version,
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
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n('i18n-ekujezos'),
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

  confirmUpgradeContractModal(e, payload) {
    var _this$$, _this$$$formRef, _this$$$formRef$curre;
    const form =
      (_this$$ = this.$('formily_contract_upgrade')) === null ||
      _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      const { versoin, ...params } = v;
      try {
        var _this$match, _this$match$params, _v$files, _v$files$fileList;
        const res = await this.props.appHelper.utils.bff.upgradeChaincodebuild({
          ...params,
          network:
            (_this$match = this.match) === null || _this$match === void 0
              ? void 0
              : (_this$match$params = _this$match.params) === null ||
                _this$match$params === void 0
              ? void 0
              : _this$match$params.id,
          files:
            (_v$files = v.files) === null || _v$files === void 0
              ? void 0
              : (_v$files$fileList = _v$files.fileList) === null ||
                _v$files$fileList === void 0
              ? void 0
              : _v$files$fileList.map((item) => item.originFileObj),
        });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n('i18n-a4rcftyd'),
        });
        this.openAddChannelSuccessModal();
        this.props.useGetChaincodebuilds.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n('i18n-7fxj402s'),
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

  formatContract() {
    var _ref,
      _ref$filter,
      _this$props$useGetCha,
      _this$props$useGetCha2,
      _Object$keys,
      _Object$keys2,
      _Object$keys3;
    const list =
      (_ref =
        ((_this$props$useGetCha = this.props.useGetChaincodebuilds) === null ||
        _this$props$useGetCha === void 0
          ? void 0
          : (_this$props$useGetCha2 = _this$props$useGetCha.data) === null ||
            _this$props$useGetCha2 === void 0
          ? void 0
          : _this$props$useGetCha2.chaincodebuilds) || []) === null ||
      _ref === void 0
        ? void 0
        : (_ref$filter = _ref.filter((item) => {
            var _item$displayName;
            return this.state.contract.searchValue
              ? (_item$displayName = item.displayName) === null ||
                _item$displayName === void 0
                ? void 0
                : _item$displayName.includes(this.state.contract.searchValue)
              : true;
          })) === null || _ref$filter === void 0
        ? void 0
        : _ref$filter.sort((a, b) => {
            var _this$state$sorter;
            if (
              ((_this$state$sorter = this.state.sorter) === null ||
              _this$state$sorter === void 0
                ? void 0
                : _this$state$sorter.order) !== 'ascend'
            ) {
              return (
                new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
              );
            }
            return (
              new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
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
    const formatList =
      (_Object$keys = Object.keys(result)) === null || _Object$keys === void 0
        ? void 0
        : _Object$keys.map((displayName) => {
            var _versions$, _Object$values;
            const versions = Object.values(result[displayName]);
            initVersions[displayName] =
              versions === null || versions === void 0
                ? void 0
                : (_versions$ = versions[0]) === null || _versions$ === void 0
                ? void 0
                : _versions$.name;
            const record =
              (versions === null || versions === void 0
                ? void 0
                : versions.find((item) => {
                    var _this$state$initVersi;
                    return (
                      item.name ===
                      ((_this$state$initVersi = this.state.initVersions) ===
                        null || _this$state$initVersi === void 0
                        ? void 0
                        : _this$state$initVersi[displayName])
                    );
                  })) ||
              (versions === null || versions === void 0 ? void 0 : versions[0]);
            return {
              displayName,
              ...record,
              versions:
                (_Object$values = Object.values(result[displayName])) ===
                  null || _Object$values === void 0
                  ? void 0
                  : _Object$values.map((item) => ({
                      ...item,
                      label: item.version,
                      key: item.name,
                    })),
            };
          });
    if (
      !this.state.initVersions ||
      ((_Object$keys2 = Object.keys(this.state.initVersions || {})) === null ||
      _Object$keys2 === void 0
        ? void 0
        : _Object$keys2.length) !==
        ((_Object$keys3 = Object.keys(result || {})) === null ||
        _Object$keys3 === void 0
          ? void 0
          : _Object$keys3.length)
    ) {
      this.setState({
        initVersions,
      });
    }
    return formatList;
  }

  async getChannelsForCreateEpolicy(callback) {
    var _this$match,
      _this$match$params,
      _res$channelsForCreat,
      _this$$,
      _this$$$formRef,
      _this$$$formRef$curre,
      _res$channelsForCreat2;
    const res =
      await this.props.appHelper.utils.bff.getChannelsForCreateEpolicy({
        network:
          (_this$match = this.match) === null || _this$match === void 0
            ? void 0
            : (_this$match$params = _this$match.params) === null ||
              _this$match$params === void 0
            ? void 0
            : _this$match$params.id,
      });
    this.setState(
      {
        strategy: {
          ...this.state.strategy,
          channels:
            (res === null || res === void 0
              ? void 0
              : (_res$channelsForCreat = res.channelsForCreateEpolicy) ===
                  null || _res$channelsForCreat === void 0
              ? void 0
              : _res$channelsForCreat.map((item) => ({
                  value: JSON.stringify(item),
                  label: item.name,
                }))) || [],
        },
      },
      callback
    );
    const form =
      (_this$$ = this.$('formily_create_strategy')) === null ||
      _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.setFieldState('channel', {
      dataSource:
        (res === null || res === void 0
          ? void 0
          : (_res$channelsForCreat2 = res.channelsForCreateEpolicy) === null ||
            _res$channelsForCreat2 === void 0
          ? void 0
          : _res$channelsForCreat2.map((item) => ({
              value: JSON.stringify(item),
              label: item.name,
            }))) || [],
    });
  }

  getContractVersion(record) {
    var _this$state$initVersi, _record$versions, _record$versions$find;
    const name =
      (_this$state$initVersi = this.state.initVersions) === null ||
      _this$state$initVersi === void 0
        ? void 0
        : _this$state$initVersi[
            record === null || record === void 0 ? void 0 : record.displayName
          ];
    return record === null || record === void 0
      ? void 0
      : (_record$versions = record.versions) === null ||
        _record$versions === void 0
      ? void 0
      : (_record$versions$find = _record$versions.find(
          (item) => item.name === name
        )) === null || _record$versions$find === void 0
      ? void 0
      : _record$versions$find.version;
  }

  getContractVersions(record) {
    return (
      (record === null || record === void 0 ? void 0 : record.versions) || []
    );
  }

  async getEpolicies() {
    var _this$match, _this$match$params;
    const res = await this.props.appHelper.utils.bff.getEpolicies({
      network:
        (_this$match = this.match) === null || _this$match === void 0
          ? void 0
          : (_this$match$params = _this$match.params) === null ||
            _this$match$params === void 0
          ? void 0
          : _this$match$params.id,
    });
    this.setState({
      strategy: {
        ...this.state.strategy,
        list: (res === null || res === void 0 ? void 0 : res.epolicies) || [],
      },
    });
  }

  async getPeers(v, callback, usedPeers) {
    var _ref,
      _res$ibppeersForCreat,
      _res$ibppeersForCreat2,
      _res$ibppeersForCreat3;
    const { initiator, organizations } = v;
    const res =
      await this.props.appHelper.utils.bff.getIbppeersForCreateChannel({
        members:
          (_ref = [initiator, ...organizations]) === null || _ref === void 0
            ? void 0
            : _ref.filter((item) => item),
      });
    const allPeers = [];
    res === null || res === void 0
      ? void 0
      : (_res$ibppeersForCreat = res.ibppeersForCreateChannel) === null ||
        _res$ibppeersForCreat === void 0
      ? void 0
      : _res$ibppeersForCreat.forEach((item) => {
          var _item$ibppeers;
          (_item$ibppeers = item.ibppeers) === null || _item$ibppeers === void 0
            ? void 0
            : _item$ibppeers.forEach((peer) => {
                allPeers.push({
                  name: peer.name,
                  namespace: item.name,
                  key: item.name + peer.name,
                });
              });
        });
    const peers =
      (res === null || res === void 0
        ? void 0
        : (_res$ibppeersForCreat2 = res.ibppeersForCreateChannel) === null ||
          _res$ibppeersForCreat2 === void 0
        ? void 0
        : (_res$ibppeersForCreat3 = _res$ibppeersForCreat2.map((item) => {
            var _item$ibppeers2, _item$ibppeers2$filte, _item$ibppeers2$filte2;
            return {
              key: item.name,
              title: item.name,
              children:
                (_item$ibppeers2 = item.ibppeers) === null ||
                _item$ibppeers2 === void 0
                  ? void 0
                  : (_item$ibppeers2$filte = _item$ibppeers2.filter(
                      (item) => item.status === 'Deployed'
                    )) === null || _item$ibppeers2$filte === void 0
                  ? void 0
                  : (_item$ibppeers2$filte2 = _item$ibppeers2$filte.map(
                      (peer) => ({
                        key: item.name + peer.name,
                        title: peer.name,
                      })
                    )) === null || _item$ibppeers2$filte2 === void 0
                  ? void 0
                  : _item$ibppeers2$filte2.filter((peer) => {
                      return usedPeers !== null &&
                        usedPeers !== void 0 &&
                        usedPeers.length
                        ? usedPeers.every(
                            (used) =>
                              !(
                                used.name === peer.title &&
                                used.namespace === item.name
                              )
                          )
                        : true;
                    }),
            };
          })) === null || _res$ibppeersForCreat3 === void 0
        ? void 0
        : _res$ibppeersForCreat3.filter((item) => {
            var _item$children;
            return (
              (item === null || item === void 0
                ? void 0
                : (_item$children = item.children) === null ||
                  _item$children === void 0
                ? void 0
                : _item$children.length) > 0
            );
          })) || [];
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
    var _payload$record, _payload$record$membe;
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
        organizations:
          (payload === null || payload === void 0
            ? void 0
            : (_payload$record = payload.record) === null ||
              _payload$record === void 0
            ? void 0
            : (_payload$record$membe = _payload$record.members) === null ||
              _payload$record$membe === void 0
            ? void 0
            : _payload$record$membe.map((item) => item.name)) || [],
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
    this.setState({
      isOpenModal: true,
      modalType: 'addstrategy',
    });
    this.getChannelsForCreateEpolicy(() => {});
  }

  openDeleteChannelModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: 'delete',
      channel: {
        ...this.state.channel,
        record:
          payload === null || payload === void 0 ? void 0 : payload.record,
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
          var _this$$,
            _this$$$formRef,
            _this$$$formRef$curre,
            _payload$record,
            _payload$record2,
            _payload$record3;
          const form =
            (_this$$ = this.$('formily_contract_deploy')) === null ||
            _this$$ === void 0
              ? void 0
              : (_this$$$formRef = _this$$.formRef) === null ||
                _this$$$formRef === void 0
              ? void 0
              : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
                _this$$$formRef$curre === void 0
              ? void 0
              : _this$$$formRef$curre.form;
          form.setValues({
            displayName:
              (_payload$record = payload.record) === null ||
              _payload$record === void 0
                ? void 0
                : _payload$record.displayName,
            // edit
            version:
              (_payload$record2 = payload.record) === null ||
              _payload$record2 === void 0
                ? void 0
                : _payload$record2.version,
            name:
              (_payload$record3 = payload.record) === null ||
              _payload$record3 === void 0
                ? void 0
                : _payload$record3.name,
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
          var _this$$,
            _this$$$formRef,
            _this$$$formRef$curre,
            _payload$record,
            _payload$record2;
          const form =
            (_this$$ = this.$('formily_contract_upgrade')) === null ||
            _this$$ === void 0
              ? void 0
              : (_this$$$formRef = _this$$.formRef) === null ||
                _this$$$formRef === void 0
              ? void 0
              : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
                _this$$$formRef$curre === void 0
              ? void 0
              : _this$$$formRef$curre.form;
          form.setValues({
            displayName:
              (_payload$record = payload.record) === null ||
              _payload$record === void 0
                ? void 0
                : _payload$record.displayName,
            // edit
            version:
              (_payload$record2 = payload.record) === null ||
              _payload$record2 === void 0
                ? void 0
                : _payload$record2.version,
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
    this.getEpolicies();
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
                relatedEventName: 'confirmAddStrategyModal',
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
                name: 'name',
                required: true,
                title: this.i18n('i18n-87kp314f') /* 策略名称 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message:
                      this.i18n(
                        'i18n-1icnfyd1'
                      ) /* 策略名称由 3 ~ 10 个大小写字母, 数字, 下划线组成 */,
                    pattern: '^[a-z0-9_]{3,10}$',
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
                  directory: true,
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
                            value: item.name,
                            label: item.name,
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
                      _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      allowClear: false,
                      disabled: false,
                      enum: __$$eval(() =>
                        this.state.strategy?.list?.map((item) => ({
                          value: item.name,
                          label: item.name,
                        }))
                      ),
                      notFoundContent: {},
                      placeholder:
                        this.i18n('i18n-e0gcsyat') /* 请选择背书策略 */,
                    },
                  }}
                  fieldProps={{
                    name: 'epolicy',
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
                  {__$$eval(() => this.state.channel?.record?.name || '-')}
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
                                          to="/network/detail/${this.match?.params?.id}?tab=&#39;channel&#39;"
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
                                          to="/network/detail/${this.match?.params?.id}?tab=&#39;contract&#39;"
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
                                        <UnifiedLink target="_blank" to="/">
                                          {
                                            this.i18n(
                                              'i18n-5ne2amb2'
                                            ) /* API 指南 */
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
                                        <UnifiedLink target="_blank" to="/">
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
                                            0
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
                                            text
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
                                            text
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
                                                    'i18n-1vangoko4yf'
                                                  ) /* 正常 */,
                                                icon: 'CheckCircleFilled',
                                                id: 'Created',
                                                type: 'success',
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
                                      {__$$eval(() => record.name || '-')}
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
                                      {__$$eval(() => record.displayName)}
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
                                      {__$$eval(() => record?.length || '0')}
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
                                      disabled={false}
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
                                dataIndex: 'name',
                                key: 'name',
                                title:
                                  this.i18n('i18n-87kp314f') /* 策略名称 */,
                              },
                              {
                                dataIndex: 'channel',
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
                      name: 'name',
                      required: true,
                      title: this.i18n('i18n-9e87qfos') /* 名称 */,
                      'x-validator': [
                        {
                          message:
                            this.i18n(
                              'i18n-0u5pwt0jtl4'
                            ) /* 通道名称由 3 ~ 50 个大小写字母, 数字, 下划线组成 */,
                          pattern: '^[a-z0-9_]{3,50}$',
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
                      this.props.useGetNetwork?.data?.network?.organizations?.map(
                        (item) => ({
                          value: item.name,
                          label: `${item.name}(${item.admin})`,
                        })
                      ) || []
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
                name: 'Select',
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
                      this.i18n(
                        'i18n-1h2618xx'
                      ) /* 合约名称由 3 ~ 10 个大小写字母, 数字, 下划线组成 */,
                    pattern: '^[a-z0-9_]{3,10}$',
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
                  directory: true,
                  multiple: false,
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

export default () => {
  const location = useLocation();
  const match = matchPath({ path: '/network/detail/:id' }, location.pathname);
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
