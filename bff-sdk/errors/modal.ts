import { Modal, ModalFuncProps } from 'antd';
import { GraphQLError } from 'graphql-request/dist/types';
import { removeAuthData } from '../constants';

export const logout = () => {
  removeAuthData();
  window.location.reload();
};

let InvalidTokenModal:
  | undefined
  | {
      destroy: () => void;
      update: (
        configUpdate: ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)
      ) => void;
    };

const onInvalidTokenModalCancel = () => {
  InvalidTokenModal?.destroy();
  InvalidTokenModal = undefined;
};

export const showInvalidTokenModal = (error: GraphQLError) => {
  if (InvalidTokenModal) {
    return;
  }
  InvalidTokenModal = Modal.warn({
    okText: '确定',
    content: '用户凭证可能已失效，点击确定重新登录',
    // @Todo: 简单兼容编辑时的弹框，后续需要把 sdk 改为通过 umd 方式引入
    onOk: document.querySelector('.lc-simulator') ? () => {} : logout,
    onCancel: onInvalidTokenModalCancel,
  });
};
