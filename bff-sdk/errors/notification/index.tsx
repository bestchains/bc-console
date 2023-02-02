import React, { isValidElement, useState } from 'react';
import { Collapse, notification, Typography, ConfigProvider } from 'antd';
import { globalConfig } from 'antd/es/config-provider';
import classNames from 'classnames';
import { ArgsProps } from 'antd/es/notification';
import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import Dangerous from '@tenx-ui/icon/lib/Dangerous';
import './index.less';

export * from './custom';

notification.config({
  top: 50 + 24,
});

const { Panel } = Collapse;
const { Link, Paragraph, Text } = Typography;
interface NoticeArgsProps extends ArgsProps {
  /** 如果不为空，则会以折叠面板的形式展示描述，展开后展示报错内容，可用来展示报错详情 */
  detail?: any;
  descKey?: string;
}

const NOTICE_MAP: { [key: string]: NoticeArgsProps[] } = {};
const setNoticeMap = (key: string, noticeProps: NoticeArgsProps) => {
  if (!NOTICE_MAP[key]) {
    NOTICE_MAP[key] = [];
  }
  NOTICE_MAP[key].push(noticeProps);
};
const removeNoticeMap = (key: string) => {
  delete NOTICE_MAP[key];
};

const reactNodeToString = function (reactNode: React.ReactNode): string {
  let string = '';
  if (typeof reactNode === 'string') {
    string = reactNode;
  } else if (typeof reactNode === 'number') {
    string = reactNode.toString();
  } else if (reactNode instanceof Array) {
    reactNode.forEach(function (child) {
      string += reactNodeToString(child);
    });
  } else if (isValidElement(reactNode)) {
    string += reactNodeToString(reactNode.props.children);
  }
  return string;
};

const Message = (props: { noticeKey: string; message: React.ReactNode }) => {
  const { noticeKey: key, message } = props;
  const count = NOTICE_MAP[key]?.length || 0;
  return (
    <>
      {message}
      {count > 1 && ` (${count})`}
    </>
  );
};

const Description = (props: { noticeKey: string }) => {
  const { getPrefixCls } = globalConfig();
  const prefixCls = getPrefixCls();
  ConfigProvider.config({
    prefixCls,
  });
  const { noticeKey: key } = props;
  const [activePanels, setActivePanels] = useState<string | string[]>();
  const descMap: { [key: string]: NoticeArgsProps } = {};
  NOTICE_MAP[key].forEach(noticeProps => {
    const descKey = reactNodeToString(noticeProps.description);
    noticeProps.descKey = descKey;
    descMap[descKey] = noticeProps;
  });
  return (
    <ConfigProvider prefixCls={prefixCls}>
      <Collapse
        ghost
        accordion
        className="tenx-notification-collapse"
        activeKey={activePanels}
        expandIcon={({ isActive }) => {
          return (
            <span className="tenx-notification-collapse-expand-icon">
              {isActive ? (
                <Link>
                  <MinusSquareOutlined title="点击关闭错误详情" />
                </Link>
              ) : (
                <PlusSquareOutlined title="点击查看错误详情" />
              )}
            </span>
          );
        }}
        onChange={keys => {
          setActivePanels(keys);
        }}
      >
        {Object.values(descMap).map(({ descKey, description, detail }) => (
          <Panel
            header={<Text ellipsis={{ tooltip: true }}>{description}</Text>}
            key={descKey as string}
          >
            <Paragraph
              className="tenx-notification-collapse-content-p"
              copyable={{ text: JSON.stringify(detail, null, 2) }}
              type="secondary"
            >
              <pre>{JSON.stringify(detail, null, 2)}</pre>
            </Paragraph>
          </Panel>
        ))}
      </Collapse>
    </ConfigProvider>
  );
};

const notice = (args: NoticeArgsProps) => {
  const { detail, message, description, onClose: onCloseFromProps, className, ...restArgs } = args;
  const key = reactNodeToString(message);
  setNoticeMap(key, args);
  const onClose = () => {
    onCloseFromProps?.();
    removeNoticeMap(key);
  };
  if (args.type === 'warning' && !args.icon) {
    restArgs.icon = <Dangerous style={{ color: '#ff7d00' }} />;
  }
  if (!detail) {
    return notification.open({
      key,
      message: <Message noticeKey={key} message={message} />,
      description,
      onClose,
      className: classNames('tenx-notification', className),
      ...restArgs,
    });
  }
  return notification.open({
    key,
    message: <Message noticeKey={key} message={message} />,
    description: <Description noticeKey={key} />,
    onClose,
    className: classNames('tenx-notification', className),
    ...restArgs,
  });
};

const NotificationApi = {
  ...notification,
  success: (args: NoticeArgsProps) => notice({ ...args, type: 'success' }),
  info: (args: NoticeArgsProps) => notice({ ...args, type: 'info' }),
  warning: (args: NoticeArgsProps) => notice({ ...args, type: 'warning' }),
  warn: (args: NoticeArgsProps) => notice({ ...args, type: 'warning' }),
  error: (args: NoticeArgsProps) => notice({ ...args, type: 'error' }),
};

export default NotificationApi;
