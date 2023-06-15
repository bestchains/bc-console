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
  FormilyRadio,
  FormilyInput,
  FormilyUpload,
  Image,
  Space,
  FormilyTextArea,
  FormilyFormItem,
  Button,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import DataProvider from '../../components/DataProvider';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createAxiosHandler as __$$createAxiosRequestHandler } from '@yunti/lowcode-datasource-axios-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DepositoryManagementCreate$$Page extends React.Component {
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

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: {
      axios: __$$createAxiosRequestHandler(utils.getAxiosHanlderConfig?.()),
    },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { contentID: undefined, loading: false };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: 'createDepository',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {
                contentType: 'application/json',
              },
              isCors: true,
              method: 'POST',
              params: {
                value: '123',
              },
              timeout: 5000,
              uri: `${this.constants?.BC_SAAS_API_URL}/basic/putUntrustValue`,
            };
          }.bind(_this),
          type: 'axios',
          willFetch: function (options) {
            return options;
          },
        },
        {
          id: 'uploadFile',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {
                'Content-Type': ' multipart/form-data',
              },
              isCors: true,
              method: 'POST',
              params: {
                bucket: 'depository',
              },
              timeout: 5000,
              uri: `${this.constants.BC_CONSOLE_API_URL}/minio/upload`,
            };
          }.bind(_this),
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {}

  beforeUpload(file) {
    this.uploadFile(file);
    return false;
  }

  cancel() {
    this.history.go(-1);
  }

  createDepository() {
    const form = this.$('formily_create')?.formRef?.current?.form;
    this.setState({
      loading: true,
    });
    form.submit(async (v) => {
      const { contentType, description, file, name } = v || {};
      const params = {
        name,
        contentName: file?.file?.name,
        contentType,
        contentID: this.state.contentID,
        contentSize: file?.file?.size,
        trustedTimestamp: (new Date().getTime() + '').slice(0, 10),
        platform: 'bestchains',
        description,
      };
      this.dataSourceMap.createDepository
        .load({
          value: btoa(JSON.stringify(params)),
        })
        .then((res) => {
          this.utils.notification.success({
            message: this.i18n('i18n-0551qmvy'),
          });
          this.cancel();
          this.setState({
            loading: false,
          });
        })
        .catch((error) => {
          this.utils.notification.warnings({
            message: this.i18n('i18n-93ncjudc'),
            description: error?.response?.data,
          });
          this.setState({
            loading: false,
          });
        });
    });
  }

  uploadFile(file) {
    this.dataSourceMap.uploadFile
      .load({
        file,
      })
      .then((res) => {
        this.setState({
          contentID: res.id,
        });
        this.utils.notification.success({
          message: this.i18n('i18n-tb7xvssk'),
        });
      })
      .catch((error) => {
        this.utils.notification.warnings({
          message: this.i18n('i18n-qrhs3amh'),
          description: error?.response?.data,
        });
      });
  }

  validateFileSize(v, b) {
    if ((v?.file?.size || 0) / 1024 / 1024 > 20) {
      return b.message;
    }
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Page>
          <Row
            __component_name="Row"
            ref={this._refsManager.linkRef('row-8ad20313')}
            wrap={true}
          >
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
                {this.i18n('i18n-am198ty7') /* 新增存证 */}
              </Typography.Title>
            </Col>
            <Col __component_name="Col" span={24}>
              <Card
                __component_name="Card"
                actions={[]}
                bordered={false}
                hoverable={false}
                loading={false}
                ref={this._refsManager.linkRef('card-60e10bf8')}
                size="default"
                type="default"
              >
                <FormilyForm
                  __component_name="FormilyForm"
                  componentProps={{
                    colon: false,
                    labelAlign: 'left',
                    labelCol: 4,
                    labelWidth: '100px',
                    layout: 'horizontal',
                    wrapperCol: 20,
                    wrapperWidth: '',
                  }}
                  ref={this._refsManager.linkRef('formily_create')}
                >
                  <FormilyRadio
                    __component_name="FormilyRadio"
                    componentProps={{
                      'x-component-props': {
                        buttonStyle: 'outline',
                        disabled: false,
                        size: 'middle',
                      },
                    }}
                    fieldProps={{
                      _unsafe_MixedSetter_default_select: 'StringSetter',
                      default: 'file',
                      enum: [
                        {
                          label: this.i18n('i18n-z7h6bfwp') /* 文件存证 */,
                          value: 'file',
                        },
                        {
                          label: this.i18n('i18n-2p4k6vs2') /* 文本存证 */,
                          value: 'text',
                        },
                      ],
                      name: 'contentType',
                      required: true,
                      title: this.i18n('i18n-cke99h2r') /* 存证类型 */,
                      'x-validator': [],
                    }}
                    ref={this._refsManager.linkRef('formilyradio-afddd36b')}
                  />
                  <FormilyInput
                    __component_name="FormilyInput"
                    componentProps={{
                      'x-component-props': {
                        placeholder:
                          this.i18n('i18n-7ngnbed5') /* 请输入存证名称 */,
                      },
                    }}
                    decoratorProps={{
                      'x-decorator-props': {
                        labelWidth: '100px',
                        wrapperWidth: '447px',
                      },
                    }}
                    fieldProps={{
                      name: 'name',
                      required: true,
                      title: this.i18n('i18n-vwy778ef') /* 存证名称 */,
                      'x-validator': [
                        {
                          children: '未知',
                          icon: 'tenx-ui-icon:Circle',
                          id: 'disabled',
                          message:
                            this.i18n('i18n-7ngnbed5') /* 请输入存证名称 */,
                          required: true,
                          type: 'disabled',
                        },
                        {
                          children: '未知',
                          icon: 'tenx-ui-icon:Circle',
                          id: 'disabled',
                          message:
                            this.i18n(
                              'i18n-u3i1bfbj'
                            ) /* 存证名称由 3 ~20 个小写字母, 数字, 下划线组成 */,
                          pattern: __$$eval(
                            () => this.constants.NAME_LENGTH_REG
                          ),
                          type: 'disabled',
                        },
                      ],
                    }}
                    ref={this._refsManager.linkRef('formilyinput-66f35e8f')}
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
                        maxCount: 1,
                      },
                    }}
                    fieldProps={{
                      _unsafe_MixedSetter_title_select: 'I18nSetter',
                      name: 'file',
                      required: true,
                      title: this.i18n('i18n-1htpwweq') /* 文件 */,
                      'x-component': 'FormilyUpload',
                      'x-display':
                        "{{$form.values.contentType === 'file' ? 'visible': 'hidden'}}",
                      'x-validator': [
                        {
                          children: '未知',
                          icon: 'tenx-ui-icon:Circle',
                          id: 'disabled',
                          message: this.i18n('i18n-9nvgrvip') /* 请上传文件 */,
                          required: true,
                          type: 'disabled',
                        },
                        {
                          children: '未知',
                          icon: 'tenx-ui-icon:Circle',
                          id: 'disabled',
                          message:
                            this.i18n(
                              'i18n-pjqdvh2i'
                            ) /* 文件大小不能超过 20 M */,
                          type: 'disabled',
                          validator: function () {
                            return this.validateFileSize.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                        },
                      ],
                    }}
                    ref={this._refsManager.linkRef('formilyupload-6245ec63')}
                    style={{}}
                  >
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={false}
                      hoverable={false}
                      loading={false}
                      ref={this._refsManager.linkRef('card-ff285cb0')}
                      size="default"
                      style={{
                        borderColor: '#dcdcdc',
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        width: '100%',
                      }}
                      type="default"
                    >
                      <Row __component_name="Row" wrap={true}>
                        <Col
                          __component_name="Col"
                          span={24}
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Image
                            __component_name="Image"
                            fallback=""
                            height={37}
                            preview={false}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAFQZJREFUeF7tnQ2UXVV1x/e+b4akBVIaKw0sMJN39p0kRCiBAFagSxqiSz4KIlIxgdYvoFIliPKxkBirgEUo0FZbVIxtED+oRSQuKuVLEBu+pGgHZuaeOxMcAgFrmwC2CTNzd9cJM9NJMm/y3n33nHfOu/uulRWBc/be57fP33Puu+cDQR4hIARqEkBhIwSEQG0CIhDpHUJgGgIiEOkeQkAEIn1ACOQjICNIPm5SqyQERCAlSbQ0Mx8BEUg+blKrJAREICVJtDQzHwERSD5uUqskBEQgJUm0NDMfARFIPm5SqyQERCAtTHSapgdnWXZUFEVVAJjFzLPM32N/9p70v82/mwEAL+/055Xxf0bEl7Mse6VSqTy8ZcuWxxYvXry5hU1rG9ciEEepHBwcnDMyMmLEcBQALGHmIwBgH1vumfmpKIoeZubHRkdHn5w/f/5Ttny1s10RiKXs9vb27t3Z2XkSMx9nBAEAiy25qtfs8wDwODM/iYh3EtET9VYsczkRSMHZT9PUiOJkADgJAPYv2HyR5h4AgHVGLEqp/iINt5MtEUgB2UyS5G2IaARhhNFdgEmnJoxImHldR0fHnV1dXS84de65MxFIzgRt2LBhv+Hh4XPHhHF4TjO+VTMv/WZUuVUptc634FoRjwikQeqThPFhz6dQDbZsx+JmVAGAL5ddKCKQOrtRWYSxM46yC0UEshuBlFUYIpTXCYhAaghk9erV0fLly1chYltPpeocQCeKjb3Q30BE9zVaN8TyIpApspam6fHMvAoAjg0xqY5ivgYRr1JKbXHkryVuRCCTsA8ODs7MsmwVM1/WkmwE5hQRn8qy7Ko4jr8TWOh1hysCGUPV399/YqVSuYKZzVIQeRogwMxfY+Yru7u7BxqoFkTR0gskTdPfMqMGIn48iIx5GiQzb4yi6Eql1N95GmKusEotkIGBgSOZ+SZmPjQXPam0CwFE/C4AfLBd3k1KK5C+vr4Toihai4izpZ8XS4CZH0HEFUSki7Xs3lopBZIkyVmI+I/ucZfK43PM/J44jteH3OrSCSRJkgsR8a9CTlpIsSPiySEvVymVQJIkuQURl4fUwdohVkT8gFJqTYhtKY1AtNa9ADA/xCS1ScwXE9EXQmtLKQSitf5fAJgZWnLaLd4ois6pVqtfCaldbS8QrXUPABwUUlLaOVazJ79arT4aShvbWiBpmpqdcmannzweEejs7FRz584N4qt72wpEa/3XAPBRj/qFhPL/BIYQ8eAQPia2pUDSNF3JzNdLj/SawO1EdJrXEbbjfpAkSU5BxO/5Dl7i207gJiI6z2cWbTWCmJMKmfkHAHCgz9Alth0IXElEn/KVSbsJ5PtjZ1L5ylvimoIAIp6ulDKLHL172kYgaZpewsyf946wBFQPgWdee+21pQcddJB3Z3K1hUDSND2Gmc0e6c56siFlvCTwVSIy+/+9eoIXiDlcYcWKFfcCwNu8IivB5CHwfiL6ep6KtuoELxCt9ecA4HJbgMSuUwLPDQ8PL124cKE3ZwUHLRCz6alSqZhfreRpHwLfJqL3+tKcYAVi9pIzs5latcu5uL70iZbHkWXZBd3d3WYlRMufYAWSJMlqRPx0ywlKADYIPN/R0bHEh5PmgxSIOQ50ZGTk8XY+PNpGrwvJJjN/Jo7j1a2OOUiByOjR6m7jxL8Xo0hwApHRw0nn9MKJD6NIcAKR0cOLvusqiJaPIkEJREYPV/3SHz+tHkWCEoiMHv50XIeRtHQUCUYgMno47JKeuWrlKBKMQJIkWYmIskvQs87rKJxUKTUfEUcd+ZtwE4xAtNb3AMBS14DEnzcE3kVEzneKBiGQ/v7+Q6MoetKbVEkgzgkg4s1KqQ+5dhyEQLTWZkvmZ13DEX9eEXipUqnMnzdv3maXUQUhkCRJzHH6R7oEI778IxBF0VnVavUWl5F5L5C+vr5jK5XKgy6hiC9vCXyHiP7YZXTeC0Rr/ZcAcLFLKOLLTwKI+D/MvICIhlxF6L1AkiR5GhEXugIifvwmgIgfcXkPotcCGRgYWJZl2d1+p0yic0zgLiI6wZVPrwWSpumFzFyW26D6mfmxKIpmydle03b/F4lojggEANI0vZmZP+AKRov8/DcAXEpEXx73r7U+3EwlStD2XMgR8RCl1M9zVW6wktcjiNba7Bps5z3nZnWAEccTU+UtTVNzuPOlzHxEg3lt6+LMfHYcx2tdNNJbgfT29u7d0dHxsgsILfKxlojO3p3vJElmAMBlsv9+B1LXEtEnd8euiP/urUCSJPl9RPxJEY30zQYirlFKNTR11FpfBADX+taWVsSDiHcrpd7hwre3AtFan2OOx3cBwbGPO4jo1Dw+0zQ9iZnvzFO3zeo4e1H3WSBGHEYk7fT8GxG9tZkGjZ0H5nQ9UjPx2qobRVFXtVp91pb9cbs+C6TdXtB/QURzi0jo008/PXePPfbYUIStUG0w86lxHN9hO36fBcK2G+/Q/q/MTbtE9FJRPgcHB98xOjr6L0XZC82Oq12GXgokSZJZiLgltKTViHcrAJxGRHcV3Z4y38WIiF9USv150Ux3tuerQA5ARGcL0mxCjqLoPdVq9Z9s+dBat+O7Wj24nKzs9VIgGzZsWDgyMvJ0PZQ8L3MNEV1iM8bBwcF9siy7n5kPtenHQ9v3E9Ef2o7LS4EMDg4eNTo6ut524y3bf2jz5s1LlyxZMmzZD2itzc/Gt9v245n9nxPRIbZj8lIg/f39y6IoCnkV73AURUur1epDthM4bj9N0+uZeaUrfx742URE+9mOw1eBvDuKImvzdttQAeASIrrGgZ8JFyWcao0SUYdtxl4KRGv9pwCwxnbjLdn/HhG9y5Ltac2WbarV2dk5e+7cuWY1tLXHV4F8DAButNZqS4YRcVNHR8fSuXPntuwHhjJNtRBxvlLK6n2GvgokyGN+oij6ULVavdmS/uoyW7Kp1jFE9HBdYHIW8lIgIR5Szcw3x3Hs/GCzqfJeoqnWklp7aXLqYZdqIpBiSPZs27bt+EWLFm0qxlzzVsow1RoZGakuWLBgsHlatS2IQIqh25JzY6cLvQxTLUTcRylldUmSCKR5gVj/Wp43xDafamVEVMnLpt56IpB6SU1dztnX8rxhaq3NfeMfzVvf43r/SURvtB2fCCQ/Yedfy/OE2tvbu3+lUnkIEat56ntcJyGibtvxtUQgWus3A0CMiL+bZdkc8zcA7PxnL9uNb9K+86/leePVWn8YACaOFcprx6d6iPiIUuottmNyJpD+/v4/QMRTEPGPAIBsN8yy/ZZ9Lc/bLq21WcyYay98Xp+W64W/3F1r/U4AGP8Tuii259uHr+V5Ol5/f/9RURSZxZOdeep7WGcVEVm/M8bKCKK1fi8AXAAA1odA14nz4Wt53jZrrf8CAK7IW9+zemaXpvUl/oUKJEmStyGiEUY7DeUT/cKnr+V5OuvQ0NBvbNu2zYwiwZ9WiYjdSqkkD4dG6hQikL6+vgUdHR0XMPN5jTgPrKx3X8vz8EuS5HREvC1PXY/qbCOimS7iaVogY+umzKixj4uAW+jDu6/leVlorc1WArOlINTnCSJa4iL4pgSitf57ADjXRaAt9vFZIlrV4hgKc5+maTczm6nWvoUZdWvoH4jIicBzCURrvS8i3sLMy9xyce+NmdfFcXyye892PSZJciEiBnn3CiJeqJS6wS6h1603LJC+vr7fq1Qq5rh+6+tgXADYjY+NzPz2OI5btgHKJgOttbl+YalNH5ZsW1/mPh53QwLRWv8JAHzdUqO9M8vMK+I4/oZ3gRUUUJqmS5nZiCSk51dE9DuuAq5bIAMDAxdlWVaa4/cR8fNKqctcJaJVftI0vY6ZP94q/436Nafbx3FsVmM4eeoSSJqmy5nZ6QXuTlpf28m3iOjMFsfgxH2SJG9ERPPCPt+JwyadIOKlSilzNbiTZ7cCCXQYbgbe+uHh4ZMWLlxoDpwuxRPY1Nn6PvTJSZ9WIM8+++xBw8PDZlN8u3/jGGdiTiU5saur66elUMakRmqtvw0AZ3je7o1EdIDLGGsKZGhoaPbWrVvvQcTFLgNqpS9EfLdS6p9bGUOrfA8ODh46Ojr6IwCY1aoY6vDr7PvHeCw1BaK1/q45tr+OoNulyHlE1I5XvtWdH631JwDgC3VXcFwQEU9WSq1z6XZKgZTwLrxPEdGVLsH76ktrbS7lcXJBZoMMnBxWvXNMtQTyfWZuu6/HNRLyS2Y+MI7jbQ0mrC2La62PRsQfMbNvH4KvIKLPuYa+i0DKNnow85fiOD7fNXif/fl4cF8URQuq1Wqfa25TCaRMowe4uuvOdWKb9ae1Nj9WtOQQ7l2mOYh3KqWcfRyc7H8HgZRt9DAgRCBTSylJEgUAjyLi7GbF1mz9KIrOYubRLMsmPmYi4gvMvMn8qVQqL2zdunXTokWLXmvW17TvIGmalmr0GIOxMYqiw6vV6otFww3dXoD7Rn7MzLcz833d3d3/XgT/iRFEa222YZq7ycv4mP9juD6O4wfK2Pip2jy2BMXs9wnyp35mfiqKInN3481E9B958zohkCRJLkXEq/MaapN6d5khGwB+scM8FPFVZt4MAJvN34g4Uqu9WZZtmj9/fm8reZizAer0v4c5j8ycS8bMk88hewMingQAXXXa8bYYM/8aEc1dMzfmuad+8ghyPwDUC9ZbIJ4Etp6ZfxjH8WpX8Yy9M3zGHLPkw3uDq3bX64eZB6MoulEp1dDFTNsForU2Z1ZZPyGi3sa0SzlXPwD09PTsNWPGjLsA4Jh2YWerHYh49+jo6J91d3cP1ONju0DSNP0IM3+xngpSpn4CiLg1y7I3xXH8y/prNV4ySZLrEDGYPR2Nt7DwGi8i4gql1G43i42PIDK9KjwHrxtExPOVUl+yZH67Wa21WXH9Vps+2tT2uUQ07ZnFOPZrxUttCqDlzbI9zerp6Zk9Y8aM0uxdsZDQjxHR39Syi2X8OGgBck2TtgVSwg1thaevUqm8Zd68eY9MZRi11ucAQKmXeRdOfJJBBwI5jZnN1gR5miDQ0dFR7erq2uW+QzPFWo2In27CtlSdhoADgbyfmb8mSWiOACLeu+eee54yZ86cX0+2ZEYQM3qYUUQeCwQcCGSlWQVgIfQymvwKEe2gBfMOUsb1V86Sb1sgMgMoPJVHE9FPxq2aEcSsvwr+OPzCMRVkUARSEEhHZpj51jiOl08WyEYA2N+R/9K5EYGEl/Ioit5erVb/1URuRhAOrwnhRCwCCSdXkyKduIPSvIM8z8z7BdmMAIIWgQSQpClCRMQjlFKPm595f1qms69cp0sE4pp4Mf6Y+fI4jq8yU6wfAMAJxZgVKzsTEIEE2yceIKLjzBTrq8z8wWCb4XngIhDPEzRNeDNmzHiDGUHMWUOXh9sMvyMXgfidn+miM0vizTvI+Yj4t+E2w/vIP0FE19mKUj4U2iK73e61Zooli92sMobd7jloxr0IpBl6u627FseuOOjZbVEpkIsAIr5PKfXNXJXrqCQCqQNSziJme+74jkJzLMqinHak2jQEbJ9ILgKx2v1+tl0gAtkeZGY+zuZ5W5I7e7kDgBfHD204gpkfteqqpMZFIGEnfvK5WDLNspBLEYgFqO5MbpwsEHNz6MXufJfDkwgk3Dwj4qMTAunv718WRdHd4TbHz8hFIH7mpZ6oEPH2na8/eJSZj6inspSpj4AIpD5OPpYyhynuLBA5AKDgTNkWiNb6GgD4ZMFhi7nXD/1bOdUNUw8y87FCqBgCzHxGHMe3FWNtVytaa3NFwbm27Jfc7sFTCeRMsy+35GAKa77to0fTNL2Vmc8sLGAxNE5AE1Fc65bbu5l5mbBqnoDt1byyn6f5HNWwsP0IoCkForU2lzeaSxzlaZ7Ak0R0WPNmpragtTYfeOWHleIBn0lE35pSIMaX1tocZxnk9VvFs2rOIjMfFsfxk81ZqSmQ/wKA37Zhu6w2EfFn1Wr1MEQcrSmQoaGh2Vu3br1H9qs3301sTbOeeeaZrs7Ozl3Ok20+4nJbQMQLlVI3GAo1BWL+49hSeHP3xD7lRlZI680deSsLsTRmRKbCRdJ83dbYVW2LlVJbdisQU0CO1y80CWuHh4dXLVy4cEOzVsduJV4HAHOatSX1dyBwBRGZbejbn2lHkPFCaZouZ+ZbBGQhBLYBwDeZ+dla1qIoeinLsucA4OVJZSZupAWAowHg1EKiESOTCayfNWvWsn333ffVhgRiCg8MDFyUZdm1wlMItCmB16IoWlatVh+c3L66RpDxCnLZTpt2DWmWWVYy8WKeWyBj7yTHMPNDwlQItBGBtUR09lTtaWgEmTSSvBkAfiinwrdRFylpUxDxNqXUGbWan0sgxliSJAdEUbSGmY8vKVtpduAEdieOun/FqsWhp6dnr5kzZxqRnB44Kwm/ZATqEUfTAhln2t/f/75KpXIBMx9ZMs7S3PAIvIqIVymlrq4n9NxTrJ2NM3OktV6JiBcAwJvqcS5lhIBLAmbUyLLs6kbWxRUmkPGG9vb27t/Z2WlGE7OswnzckkcItJQAIj4CADcppdY0GkjhAhkPIEmSw6IoOhkA3snMRzUamJQXAgUQuBcR1yilvpHXljWBTA5oYGDgkCzLTkHEE0UseVMl9eokkALAj5n59jiO76izTs1iTgQy2bvW+kAAOAUAus3diFEUzRm7I9Hck/ibzTZI6pePACLeycyPZVm2Po7j+8w+jqIoOBfIdIEnSTKrUqnsNzo6uv1SUUR8hYieKKqxYkcINErAK4E0GryUFwK2CYhAbBMW+0ETEIEEnT4J3jYBEYhtwmI/aAIikKDTJ8HbJiACsU1Y7AdNQAQSdPokeNsERCC2CYv9oAmIQIJOnwRvm4AIxDZhsR80ARFI0OmT4G0TEIHYJiz2gyYgAgk6fRK8bQIiENuExX7QBEQgQadPgrdNQARim7DYD5qACCTo9EnwtgmIQGwTFvtBExCBBJ0+Cd42ARGIbcJiP2gCIpCg0yfB2yYgArFNWOwHTUAEEnT6JHjbBEQgtgmL/aAJiECCTp8Eb5uACMQ2YbEfNAERSNDpk+BtExCB2CYs9oMmIAIJOn0SvG0CIhDbhMV+0AREIEGnT4K3TUAEYpuw2A+agAgk6PRJ8LYJiEBsExb7QRMQgQSdPgneNgERiG3CYj9oAiKQoNMnwdsm8H8Cx2UAiJG08gAAAABJRU5ErkJggg=="
                            width={37}
                          />
                        </Col>
                        <Col
                          __component_name="Col"
                          span={24}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '-18px',
                          }}
                        >
                          <Space align="center" direction="horizontal">
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              {
                                this.i18n(
                                  'i18n-7n4v6vvj'
                                ) /* 将文件拖到此处，或 */
                              }
                            </Typography.Text>
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                              type="primary"
                            >
                              {this.i18n('i18n-wi12s1z4') /* 点击上传 */}
                            </Typography.Text>
                          </Space>
                        </Col>
                        <Col
                          __component_name="Col"
                          span={24}
                          style={{ marginTop: '-16px' }}
                        >
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{
                              display: 'flex',
                              fontSize: '',
                              justifyContent: 'center',
                            }}
                          >
                            {
                              this.i18n(
                                'i18n-b08uc4tq'
                              ) /* 文件上传大小限制：20M以内 */
                            }
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Card>
                  </FormilyUpload>
                  <FormilyTextArea
                    __component_name="FormilyTextArea"
                    componentProps={{
                      'x-component-props': {
                        placeholder:
                          this.i18n(
                            'i18n-v0y4ybl7'
                          ) /* 请输入需要存证的文本，不支持图片 */,
                        rows: 5,
                      },
                    }}
                    decoratorProps={{
                      'x-decorator-props': { wrapperWidth: '447px' },
                    }}
                    fieldProps={{
                      _unsafe_MixedSetter_title_select: 'I18nSetter',
                      name: 'text',
                      required: true,
                      title: this.i18n('i18n-1htpwweq') /* 文件 */,
                      'x-component': 'Input.TextArea',
                      'x-display':
                        "{{$form.values.contentType === 'file' ? 'hidden': 'visible'}}",
                      'x-validator': [],
                    }}
                    ref={this._refsManager.linkRef('formilytextarea-8f126fbd')}
                    style={{}}
                  />
                  <FormilyTextArea
                    __component_name="FormilyTextArea"
                    componentProps={{
                      'x-component-props': {
                        placeholder:
                          this.i18n('i18n-sy8jjjyy') /* 请输入文件备注 */,
                      },
                    }}
                    decoratorProps={{
                      'x-decorator-props': { wrapperWidth: '447px' },
                    }}
                    fieldProps={{
                      name: 'description',
                      title: this.i18n('i18n-3mnzh9hd') /* 文件备注 */,
                      'x-component': 'Input.TextArea',
                      'x-validator': [
                        {
                          children: '未知',
                          icon: 'tenx-ui-icon:Circle',
                          id: 'disabled',
                          message:
                            this.i18n(
                              'i18n-qz6z64yg'
                            ) /* 文件备注由 0 ~ 200 字符组成 */,
                          pattern: __$$eval(
                            () => this.constants.DESCRIPTION_LENGTH_REG
                          ),
                          type: 'disabled',
                          whitespace: false,
                        },
                      ],
                    }}
                  />
                  <FormilyFormItem
                    __component_name="FormilyFormItem"
                    componentProps={{ 'x-component-props': {} }}
                    fieldProps={{
                      _unsafe_MixedSetter_default_select: 'StringSetter',
                      _unsafe_MixedSetter_title_select: 'VariableSetter',
                      default: '',
                      name: 'FormilyFormItem',
                      title: __$$eval(() => `  `),
                      'x-component': 'FormilyFormItem',
                      'x-validator': [],
                    }}
                    style={{ marginLeft: '20%px' }}
                  >
                    <Button
                      __component_name="Button"
                      __events={{
                        eventDataList: [
                          {
                            name: 'onClick',
                            relatedEventName: 'createDepository',
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
                      loading={__$$eval(() => this.state.loading)}
                      onClick={function () {
                        return this.createDepository.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      style={{}}
                      type="primary"
                    >
                      {this.i18n('i18n-0yztaq7t') /* 立即存证 */}
                    </Button>
                  </FormilyFormItem>
                </FormilyForm>
              </Card>
            </Col>
          </Row>
        </Page>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath(
    { path: '/depository/management/create' },
    location.pathname
  );
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
      sdkSwrFuncs={[]}
      render={(dataProps) => (
        <DepositoryManagementCreate$$Page
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
