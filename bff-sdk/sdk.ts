import { GraphQLClient } from 'graphql-request';
import { ClientError } from 'graphql-request/dist/types';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { Key as SWRKeyInterface, SWRConfiguration as SWRConfigInterface } from 'swr';
import useSWR from './useSWR';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
  Upload: any;
};

export type Chaincodebuild = {
  __typename?: 'Chaincodebuild';
  /** 通道 */
  channels?: Maybe<Array<Channel>>;
  /** 创建时间 */
  creationTimestamp?: Maybe<Scalars['String']>;
  /** 名称 */
  displayName: Scalars['String'];
  /** 节点 */
  ibppeers?: Maybe<Array<SpecPeer>>;
  /** 发起者（组织） */
  initiator?: Maybe<Scalars['String']>;
  /** metadata.name */
  name: Scalars['ID'];
  /** 所在网络 */
  network?: Maybe<Scalars['String']>;
  /** 组织 */
  organizations?: Maybe<Array<Organization>>;
  /** 状态（Created时，才能部署升级） */
  status?: Maybe<CrdStatusType>;
  /** 版本 */
  version?: Maybe<Scalars['String']>;
};

export type Channel = {
  __typename?: 'Channel';
  /** 我创建的 */
  createdByMe?: Maybe<Scalars['Boolean']>;
  /** 合约数量 */
  creationTimestamp?: Maybe<Scalars['String']>;
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 背书策略 */
  epolicy?: Maybe<Array<Epolicy>>;
  /** 我参与的 */
  iamInvolved?: Maybe<Scalars['Boolean']>;
  /** 组织数量 */
  members?: Maybe<Array<SpecMember>>;
  /** name */
  name: Scalars['ID'];
  /** 我的节点 */
  peers?: Maybe<Array<SpecPeer>>;
  /** 状态 */
  status?: Maybe<CrdStatusType>;
};

export type ChannelPeer = {
  /** 名称 */
  name: Scalars['String'];
  /** 命名空间（所属组织） */
  namespace: Scalars['String'];
};

/** IBPCR 状态 */
export enum CrdStatusType {
  /** ChannelArchived */
  ChannelArchived = 'ChannelArchived',
  /** ChannelCreated */
  ChannelCreated = 'ChannelCreated',
  /** 正常 */
  Created = 'Created',
  /** Deployed is the status when the component's deployment is done successfully */
  Deployed = 'Deployed',
  /** Deploying is the status when component is being deployed */
  Deploying = 'Deploying',
  /** 异常 */
  Error = 'Error',
  /** 已激活 */
  FederationActivated = 'FederationActivated',
  /** 已解散 */
  FederationDissolved = 'FederationDissolved',
  /** 组建失败 */
  FederationFailed = 'FederationFailed',
  /** 组建中 */
  FederationPending = 'FederationPending',
  /** Initializing is the status when a component is initializing */
  Initializing = 'Initializing',
  /** 正常 */
  NetworkCreated = 'NetworkCreated',
  /** 已解散 */
  NetworkDissolved = 'NetworkDissolved',
  /** Precreated is the status of the orderers when they are waiting for config block */
  Precreated = 'Precreated',
  /** Warning is the status when a component is running, but will fail in future */
  Warning = 'Warning',
}

/** 背书策略 */
export type Epolicy = {
  __typename?: 'Epolicy';
  /** 所在通道 */
  channel: Scalars['String'];
  /** 创建时间 */
  creationTimestamp?: Maybe<Scalars['String']>;
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 更新时间 */
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['ID'];
  /** 策略内容 */
  value: Scalars['String'];
};

/** 联盟 */
export type Federation = {
  __typename?: 'Federation';
  /** 创建时间 */
  creationTimestamp: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 发起者 */
  initiator?: Maybe<Organization>;
  /** 加入时间（当前用户所属组织加入此联盟的时间） */
  joinedAt?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['ID'];
  /** 网络个数 */
  networks?: Maybe<Array<Network>>;
  /** 组织 */
  organizations?: Maybe<Array<Organization>>;
  /** 提议策略 */
  policy?: Maybe<ProposalPolicy>;
  /** 状态 */
  status?: Maybe<CrdStatusType>;
};

export type Ibppeer = {
  __typename?: 'Ibppeer';
  /** 加入的通道 */
  channels?: Maybe<Array<Scalars['String']>>;
  /** 我创建的 */
  createdByMe?: Maybe<Scalars['Boolean']>;
  /** 创建时间 */
  creationTimestamp: Scalars['String'];
  /** 节点配置 */
  limits?: Maybe<SpecResource>;
  /** name */
  name: Scalars['ID'];
  /** 加入的网络 */
  networks?: Maybe<Array<Scalars['String']>>;
  /** 运行状态 */
  status?: Maybe<CrdStatusType>;
};

/** 操作状态 */
export type K8sV1Status = {
  __typename?: 'K8sV1Status';
  apiVersion?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  details?: Maybe<K8sV1StatusDetails>;
  kind?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** 操作状态详情 */
export type K8sV1StatusDetails = {
  __typename?: 'K8sV1StatusDetails';
  group?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 部署合约（返回true，只表示这个操作触发成功，而不是部署合约成功） */
  chaincodeDeploy: Scalars['Boolean'];
  /** 创建合约 */
  chaincodebuildCreate: Chaincodebuild;
  /** 删除合约 */
  chaincodebuildDelete: Array<K8sV1Status>;
  /** 升级合约 */
  chaincodebuildUpgrade: Chaincodebuild;
  /** 创建通道 */
  channelCreate: Channel;
  /** 加入/去除Peer节点 */
  channelUpdate: Channel;
  /** 创建策略 */
  epolicyCreate: Epolicy;
  /** 删除策略 */
  epolicyDelete: K8sV1Status;
  /** 向联盟中添加组织（返回true：只表示这个操作触发成功，而不是添加组织成功） */
  federationAddOrganization: Scalars['Boolean'];
  /** 创建联盟 */
  federationCreate: Federation;
  /** 删除联盟（FederationDissolved） */
  federationDelete: K8sV1Status;
  /** 解散联盟（返回true：只表示这个操作触发成功，而不是解散联盟成功) */
  federationDissolve: Scalars['Boolean'];
  /** 从联盟中驱逐一个组织（返回true：只表示这个操作触发成功，而不是驱逐组织成功） */
  federationRemoveOrganization: Scalars['Boolean'];
  /** 创建IBPPeer节点 */
  ibppeerCreate: Array<Ibppeer>;
  /** 创建网络 */
  networkCreate: Network;
  /** 删除网络 */
  networkDelete: K8sV1Status;
  /** 释放网络（返回true：只表示这个操作触发成功，而不是释放网络成功） */
  networkDissolve: Scalars['Boolean'];
  /** 新增组织 */
  organizationCreate: Organization;
  /** 删除组织 */
  organizationDelete: K8sV1Status;
  /** 修改组织 */
  organizationUpdate: Organization;
  /** 更新投票 */
  voteUpdate: Vote;
};

export type MutationChaincodeDeployArgs = {
  chaincode: NewChaincode;
};

export type MutationChaincodebuildCreateArgs = {
  chaincodebuild: NewChaincodebuild;
};

export type MutationChaincodebuildDeleteArgs = {
  displayName: Scalars['String'];
  network: Scalars['String'];
};

export type MutationChaincodebuildUpgradeArgs = {
  chaincodebuild: UpgradeChaincodebuild;
};

export type MutationChannelCreateArgs = {
  channel: NewChannel;
  network: Scalars['String'];
};

export type MutationChannelUpdateArgs = {
  channel: UpdateChannel;
  name: Scalars['String'];
};

export type MutationEpolicyCreateArgs = {
  epolicy: NewEpolicyInput;
};

export type MutationEpolicyDeleteArgs = {
  name: Scalars['String'];
};

export type MutationFederationAddOrganizationArgs = {
  name: Scalars['String'];
  organizations: Array<Scalars['String']>;
};

export type MutationFederationCreateArgs = {
  federation: NewFederationInput;
};

export type MutationFederationDeleteArgs = {
  name: Scalars['String'];
};

export type MutationFederationDissolveArgs = {
  name: Scalars['String'];
};

export type MutationFederationRemoveOrganizationArgs = {
  name: Scalars['String'];
  organization: Scalars['String'];
};

export type MutationIbppeerCreateArgs = {
  count?: InputMaybe<Scalars['Float']>;
  organization: Scalars['String'];
};

export type MutationNetworkCreateArgs = {
  network: NewNetworkInput;
};

export type MutationNetworkDeleteArgs = {
  name: Scalars['String'];
};

export type MutationNetworkDissolveArgs = {
  federation: Scalars['String'];
  initiator: Scalars['String'];
  name: Scalars['String'];
};

export type MutationOrganizationCreateArgs = {
  organization: NewOrganizationInput;
};

export type MutationOrganizationDeleteArgs = {
  name: Scalars['String'];
};

export type MutationOrganizationUpdateArgs = {
  name: Scalars['String'];
  organization: UpdateOrganization;
};

export type MutationVoteUpdateArgs = {
  name: Scalars['String'];
  organization: Scalars['String'];
  vote: UpdateVote;
};

/** 网络 */
export type Network = {
  __typename?: 'Network';
  /** 通道列表 */
  channels?: Maybe<Array<Channel>>;
  /** 我的节点数 */
  clusterSize?: Maybe<Scalars['Float']>;
  /** 创建时间 */
  creationTimestamp?: Maybe<Scalars['String']>;
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 到期时间 */
  expiredTime?: Maybe<Scalars['String']>;
  /** 所属联盟 */
  federation?: Maybe<Scalars['String']>;
  /** 网络发起者（组织） */
  initiator?: Maybe<Organization>;
  /** 更新时间 */
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  /** 节点配置 */
  limits?: Maybe<SpecResource>;
  /** name */
  name: Scalars['ID'];
  /** 引擎类型 */
  ordererType?: Maybe<Scalars['String']>;
  /** 网络中组织 */
  organizations?: Maybe<Array<Organization>>;
  /** 网络中的所有节点 */
  peers?: Maybe<Array<Ibppeer>>;
  /** 状态 */
  status?: Maybe<CrdStatusType>;
  /** 节点存储 */
  storage?: Maybe<Scalars['String']>;
  /** 节点版本 */
  version?: Maybe<OrderVersion>;
};

export type NewChaincode = {
  /** 通道 */
  channel: Scalars['String'];
  /** 背书策略 */
  epolicy: Scalars['String'];
  /** 安装节点（暂不支持） */
  ibppeer?: InputMaybe<Scalars['String']>;
  /** 合约name */
  name: Scalars['String'];
  /** 合约版本号 */
  version: Scalars['String'];
};

export type NewChaincodebuild = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 合约名称（规则：^[a-z][a-z0-9]{7,63}$） */
  displayName: Scalars['String'];
  /** 合约文件 */
  file?: InputMaybe<Scalars['Upload']>;
  /** 文件夹内文件的相对路径 */
  fileRelativePaths?: InputMaybe<Array<Scalars['String']>>;
  /** 合约文件夹 */
  files?: InputMaybe<Array<Scalars['Upload']>>;
  /** 选择语言 */
  language?: InputMaybe<Scalars['String']>;
  /** 此合约构建所在网络 */
  network: Scalars['String'];
  /** 合约版本号 */
  version: Scalars['String'];
};

export type NewChannel = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 发起者（组织） */
  initiator: Scalars['String'];
  /** 通道名称（channel name） */
  name: Scalars['String'];
  /** 配置成员（组织） */
  organizations?: InputMaybe<Array<Scalars['String']>>;
  /** Peer节点，仅能选Deployed的（通过「getIbppeersForCreateChannel」API获取） */
  peers: Array<ChannelPeer>;
  /** 准入门槛 */
  policy?: InputMaybe<Scalars['String']>;
};

export type NewEpolicyInput = {
  /** 通道（当前用户组织参与的channel，使用接口：getChannelsForCreateEpolicy） */
  channel?: InputMaybe<Scalars['String']>;
  /** 策略描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 策略名称，规则：小写字母、数字、“-”，开头和结尾只能是字母或数字（[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*） */
  name: Scalars['String'];
  /** 策略内容：可选组织为已选通道内的成员，语法参考（https://hyperledger-fabric.readthedocs.io/en/latest/endorsement-policies.html#endorsement-policy-syntax） */
  value?: InputMaybe<Scalars['String']>;
};

export type NewFederationInput = {
  /** 联盟描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 发起者（当前用户所在的组织） */
  initiator: Scalars['String'];
  /** 联盟名称，规则：小写字母、数字、“-”，开头和结尾只能是字母或数字（[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*） */
  name: Scalars['String'];
  /** 选择组织 */
  organizations?: InputMaybe<Array<Scalars['String']>>;
  /** 提议投票策略 */
  policy: ProposalPolicy;
};

export type NewNetworkInput = {
  /** 共识集群节点数（要求单数，默认1） */
  clusterSize: Scalars['Float'];
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 所属联盟 */
  federation: Scalars['String'];
  /** 发起者（当前用户所在的组织） */
  initiator: Scalars['String'];
  /** 网络名称，规则：小写字母、数字、“-”，开头和结尾只能是字母或数字（[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*） */
  name: Scalars['String'];
  /** 共识算法 */
  ordererType?: InputMaybe<Scalars['String']>;
  /** 选择版本 */
  version?: InputMaybe<OrderVersion>;
};

export type NewOrganizationInput = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 展示名 */
  displayName?: InputMaybe<Scalars['String']>;
  /** 组织名称，规则：小写字母、数字、“-”，开头和结尾只能是字母或数字（[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*） */
  name: Scalars['String'];
};

/** 操作 */
export enum Operator {
  /** 加入节点 */
  Add = 'add',
  /** 移除节点 */
  Remove = 'remove',
}

/** 新建网络的版本 */
export enum OrderVersion {
  /** 企业版 */
  Enterprise = 'Enterprise',
  /** 金融安全版 */
  Finance = 'Finance',
  /** 标准版 */
  Standard = 'Standard',
}

/** 组织 */
export type Organization = {
  __typename?: 'Organization';
  /** 管理员 */
  admin?: Maybe<Scalars['String']>;
  /** 加入的通道 */
  channels?: Maybe<Array<Scalars['String']>>;
  /** 创建时间 */
  creationTimestamp: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 名称 */
  displayName?: Maybe<Scalars['String']>;
  /** 所在联盟 */
  federations?: Maybe<Array<Scalars['String']>>;
  /** 所有节点 */
  ibppeers?: Maybe<Array<Ibppeer>>;
  /** 加入时间（只在联盟中使用） */
  joinedAt?: Maybe<Scalars['String']>;
  /** 更新时间 */
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['ID'];
  /** 所在网络 */
  networks?: Maybe<Array<Network>>;
  /** 原因 */
  reason?: Maybe<Scalars['String']>;
  /** 状态 */
  status?: Maybe<CrdStatusType>;
  /** 成员 */
  users?: Maybe<Array<User>>;
};

export type Proposal = {
  __typename?: 'Proposal';
  /** 创建时间 */
  creationTimestamp: Scalars['String'];
  /** 截止时间 */
  endAt?: Maybe<Scalars['String']>;
  /** 相关联盟 */
  federation?: Maybe<Scalars['String']>;
  /** 相关内容 */
  information?: Maybe<Scalars['JSONObject']>;
  /** 发起者 */
  initiator?: Maybe<Organization>;
  /** name */
  name: Scalars['ID'];
  /** 提议策略 */
  policy?: Maybe<ProposalPolicy>;
  /** 当前状态 */
  status?: Maybe<ProposalStatus>;
  /** 提议类型 */
  type?: Maybe<ProposalType>;
  /** 当前用户所在组织的投票状态 */
  voted?: Maybe<VotePhase>;
  /** 提议内的所有投票 */
  votes?: Maybe<Array<Vote>>;
};

/** 提议策略 */
export enum ProposalPolicy {
  All = 'All',
  Majority = 'Majority',
  OneVoteVeto = 'OneVoteVeto',
}

/** 「提议」状态 */
export enum ProposalStatus {
  /** 提议异常 */
  Error = 'Error',
  /** 提议超时 */
  Expired = 'Expired',
  /** 提议异常 */
  Failed = 'Failed',
  /** 等待中 */
  Pending = 'Pending',
  /** 提议成功 */
  Succeeded = 'Succeeded',
  /** 投票中 */
  Voting = 'Voting',
}

/** 「提议」类型 */
export enum ProposalType {
  /** 联盟添加组织时创建的提议 */
  AddMemberProposal = 'AddMemberProposal',
  /** ArchiveChannelProposal */
  ArchiveChannelProposal = 'ArchiveChannelProposal',
  /** 创建联盟时创建的提议 */
  CreateFederationProposal = 'CreateFederationProposal',
  /** 联盟驱逐组织时创建的提议 */
  DeleteMemberProposal = 'DeleteMemberProposal',
  /** 创建合约时创建的提议 */
  DeployChaincodeProposal = 'DeployChaincodeProposal',
  /** 解散联盟的时候创建的提议 */
  DissolveFederationProposal = 'DissolveFederationProposal',
  /** 释放网络时创建的提议 */
  DissolveNetworkProposal = 'DissolveNetworkProposal',
  /** UnarchiveChannelProposal */
  UnarchiveChannelProposal = 'UnarchiveChannelProposal',
  /** 更新合约时创建的提议 */
  UpgradeChaincodeProposal = 'UpgradeChaincodeProposal',
}

export type Query = {
  __typename?: 'Query';
  /** 合约详情 */
  chaincodebuild: Chaincodebuild;
  /** 合约列表 */
  chaincodebuilds: Array<Chaincodebuild>;
  /** 通道详情 */
  channel: Channel;
  /** 创建策略时，可选的通道 */
  channelsForCreateEpolicy: Array<Channel>;
  /** 策略列表 */
  epolicies: Array<Epolicy>;
  /** 联盟详情 */
  federation: Federation;
  /** 联盟列表 */
  federations: Array<Federation>;
  /** 获取组织下的节点列表 */
  ibppeers: Array<Ibppeer>;
  /** 获取「创建/更新通道」时的可选节点列表 */
  ibppeersForCreateChannel: Array<Organization>;
  /** 网络详情 */
  network: Network;
  /** 网络列表 */
  networks: Array<Network>;
  /** 组织详情 */
  organization: Organization;
  /** 组织列表 */
  organizations: Array<Organization>;
  /** 提议详情 */
  proposal: Proposal;
  /** 提议列表 */
  proposals: Array<Proposal>;
};

export type QueryChaincodebuildArgs = {
  name: Scalars['String'];
};

export type QueryChaincodebuildsArgs = {
  network: Scalars['String'];
};

export type QueryChannelArgs = {
  name: Scalars['String'];
};

export type QueryChannelsForCreateEpolicyArgs = {
  network: Scalars['String'];
};

export type QueryEpoliciesArgs = {
  network?: InputMaybe<Scalars['String']>;
};

export type QueryFederationArgs = {
  name: Scalars['String'];
};

export type QueryIbppeersArgs = {
  organization: Scalars['String'];
};

export type QueryIbppeersForCreateChannelArgs = {
  members: Array<Scalars['String']>;
};

export type QueryNetworkArgs = {
  name: Scalars['String'];
};

export type QueryOrganizationArgs = {
  name: Scalars['String'];
};

export type QueryOrganizationsArgs = {
  admin?: InputMaybe<Scalars['String']>;
};

export type QueryProposalArgs = {
  name?: InputMaybe<Scalars['String']>;
};

/** 成员个数 */
export type SpecMember = {
  __typename?: 'SpecMember';
  /** 是否为发起者 */
  initiator?: Maybe<Scalars['Boolean']>;
  /** 加入时间 */
  joinedAt?: Maybe<Scalars['String']>;
  joinedBy?: Maybe<Scalars['String']>;
  /** 组织名称 */
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
};

export type SpecPeer = {
  __typename?: 'SpecPeer';
  /** 名称 */
  name?: Maybe<Scalars['String']>;
  /** 命名空间（所属组织） */
  namespace?: Maybe<Scalars['String']>;
};

export type SpecResource = {
  __typename?: 'SpecResource';
  /** CPU */
  cpu: Scalars['String'];
  /** Memory */
  memory: Scalars['String'];
};

export type UpdateChannel = {
  /** 操作类型 */
  operate: Operator;
  /** 被操作的节点，若是添加节点，则Peer节点仅能选Deployed的（通过「getIbppeersForCreateChannel」API获取） */
  peers: Array<ChannelPeer>;
};

export type UpdateOrganization = {
  /** 管理员 */
  admin?: InputMaybe<Scalars['String']>;
  /** 组织成员 */
  users?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateVote = {
  /** 是否通过 */
  decision: Scalars['Boolean'];
  /** 备注 */
  description?: InputMaybe<Scalars['String']>;
};

export type UpgradeChaincodebuild = {
  /** 合约名称 */
  displayName: Scalars['String'];
  /** 合约文件 */
  file?: InputMaybe<Scalars['Upload']>;
  /** 文件夹内文件的相对路径 */
  fileRelativePaths?: InputMaybe<Array<Scalars['String']>>;
  /** 合约文件夹 */
  files?: InputMaybe<Array<Scalars['Upload']>>;
  /** 选择语言 */
  language?: InputMaybe<Scalars['String']>;
  /** 此合约构建所在网络 */
  network: Scalars['String'];
  /** 升级后版本号 */
  newVersion: Scalars['String'];
};

/** 用户 */
export type User = {
  __typename?: 'User';
  /** 创建时间 */
  creationTimestamp: Scalars['String'];
  /** 备注 */
  description?: Maybe<Scalars['String']>;
  /** 邮箱 */
  email: Scalars['String'];
  /** 是否为组织管理员（组织列表中） */
  isOrganizationAdmin?: Maybe<Scalars['Boolean']>;
  /** 加入组织时间（组织列表中） */
  joinedAt?: Maybe<Scalars['String']>;
  /** 用户名 */
  name: Scalars['ID'];
  /** 密码 */
  password?: Maybe<Scalars['String']>;
  /** 手机 */
  phone: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  /** 表决 */
  decision?: Maybe<Scalars['Boolean']>;
  /** 备注 */
  description?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['ID'];
  /** 投票人 */
  organizationAdmin?: Maybe<Scalars['String']>;
  /** 所属组织名称 */
  organizationName?: Maybe<Scalars['String']>;
  /** 所属提议名称 */
  proposalName?: Maybe<Scalars['String']>;
  /** 状态 */
  status?: Maybe<VotePhase>;
  /** 投票时间 */
  voteTime?: Maybe<Scalars['String']>;
};

/** 「Vote」状态 */
export enum VotePhase {
  /** The organization administrator has not yet participated in the voting. */
  Created = 'Created',
  /** The proposal has been finished. */
  Finished = 'Finished',
  /** 未投票 */
  NotVoted = 'NotVoted',
  /** The organization administrator has vote for the proposal. */
  Voted = 'Voted',
}

export type DeployChaincodeMutationVariables = Exact<{
  chaincode: NewChaincode;
}>;

export type DeployChaincodeMutation = {
  __typename?: 'Mutation';
  chaincodeDeploy: boolean;
};

export type CreateChaincodebuildMutationVariables = Exact<{
  displayName: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  network: Scalars['String'];
  version: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  files?: InputMaybe<Array<Scalars['Upload']> | Scalars['Upload']>;
  fileRelativePaths?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type CreateChaincodebuildMutation = {
  __typename?: 'Mutation';
  chaincodebuildCreate: {
    __typename?: 'Chaincodebuild';
    name: string;
    displayName: string;
    creationTimestamp?: string | null;
    version?: string | null;
    status?: CrdStatusType | null;
  };
};

export type GetChaincodebuildsQueryVariables = Exact<{
  network: Scalars['String'];
}>;

export type GetChaincodebuildsQuery = {
  __typename?: 'Query';
  chaincodebuilds: Array<{
    __typename?: 'Chaincodebuild';
    name: string;
    displayName: string;
    creationTimestamp?: string | null;
    version?: string | null;
    status?: CrdStatusType | null;
    network?: string | null;
    initiator?: string | null;
    ibppeers?: Array<{ __typename?: 'SpecPeer'; name?: string | null }> | null;
    channels?: Array<{ __typename?: 'Channel'; name: string }> | null;
  }>;
};

export type GetChaincodebuildQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type GetChaincodebuildQuery = {
  __typename?: 'Query';
  chaincodebuild: {
    __typename?: 'Chaincodebuild';
    name: string;
    displayName: string;
    creationTimestamp?: string | null;
    version?: string | null;
    status?: CrdStatusType | null;
    network?: string | null;
    initiator?: string | null;
    organizations?: Array<{ __typename?: 'Organization'; name: string }> | null;
    ibppeers?: Array<{
      __typename?: 'SpecPeer';
      name?: string | null;
      namespace?: string | null;
    }> | null;
    channels?: Array<{
      __typename?: 'Channel';
      name: string;
      epolicy?: Array<{
        __typename?: 'Epolicy';
        name: string;
        value: string;
      }> | null;
    }> | null;
  };
};

export type DeleteChaincodebuildMutationVariables = Exact<{
  displayName: Scalars['String'];
  network: Scalars['String'];
}>;

export type DeleteChaincodebuildMutation = {
  __typename?: 'Mutation';
  chaincodebuildDelete: Array<{
    __typename?: 'K8sV1Status';
    code?: number | null;
    status?: string | null;
    reason?: string | null;
  }>;
};

export type UpgradeChaincodebuildMutationVariables = Exact<{
  displayName: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  files?: InputMaybe<Array<Scalars['Upload']> | Scalars['Upload']>;
  language?: InputMaybe<Scalars['String']>;
  network: Scalars['String'];
  newVersion: Scalars['String'];
  fileRelativePaths?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type UpgradeChaincodebuildMutation = {
  __typename?: 'Mutation';
  chaincodebuildUpgrade: {
    __typename?: 'Chaincodebuild';
    name: string;
    displayName: string;
    creationTimestamp?: string | null;
    version?: string | null;
    status?: CrdStatusType | null;
  };
};

export type GetChannelQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type GetChannelQuery = {
  __typename?: 'Query';
  channel: {
    __typename?: 'Channel';
    name: string;
    description?: string | null;
    creationTimestamp?: string | null;
    epolicy?: Array<{
      __typename?: 'Epolicy';
      name: string;
      description?: string | null;
      creationTimestamp?: string | null;
    }> | null;
    members?: Array<{ __typename?: 'SpecMember'; name?: string | null }> | null;
    peers?: Array<{
      __typename?: 'SpecPeer';
      name?: string | null;
      namespace?: string | null;
    }> | null;
  };
};

export type CreateChannelMutationVariables = Exact<{
  network: Scalars['String'];
  channel: NewChannel;
}>;

export type CreateChannelMutation = {
  __typename?: 'Mutation';
  channelCreate: {
    __typename?: 'Channel';
    name: string;
    creationTimestamp?: string | null;
    status?: CrdStatusType | null;
    members?: Array<{ __typename?: 'SpecMember'; name?: string | null }> | null;
    peers?: Array<{
      __typename?: 'SpecPeer';
      name?: string | null;
      namespace?: string | null;
    }> | null;
  };
};

export type UpdateChannelMutationVariables = Exact<{
  channel: UpdateChannel;
  name: Scalars['String'];
}>;

export type UpdateChannelMutation = {
  __typename?: 'Mutation';
  channelUpdate: {
    __typename?: 'Channel';
    name: string;
    creationTimestamp?: string | null;
    status?: CrdStatusType | null;
    members?: Array<{ __typename?: 'SpecMember'; name?: string | null }> | null;
    peers?: Array<{
      __typename?: 'SpecPeer';
      name?: string | null;
      namespace?: string | null;
    }> | null;
  };
};

export type GetEpoliciesQueryVariables = Exact<{
  network?: InputMaybe<Scalars['String']>;
}>;

export type GetEpoliciesQuery = {
  __typename?: 'Query';
  epolicies: Array<{
    __typename?: 'Epolicy';
    name: string;
    description?: string | null;
    channel: string;
    value: string;
    creationTimestamp?: string | null;
    lastHeartbeatTime?: string | null;
  }>;
};

export type CreateEpolicyMutationVariables = Exact<{
  epolicy: NewEpolicyInput;
}>;

export type CreateEpolicyMutation = {
  __typename?: 'Mutation';
  epolicyCreate: {
    __typename?: 'Epolicy';
    name: string;
    value: string;
    description?: string | null;
    channel: string;
  };
};

export type DeleteEpolicyMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type DeleteEpolicyMutation = {
  __typename?: 'Mutation';
  epolicyDelete: {
    __typename?: 'K8sV1Status';
    status?: string | null;
    code?: number | null;
    message?: string | null;
  };
};

export type GetChannelsForCreateEpolicyQueryVariables = Exact<{
  network: Scalars['String'];
}>;

export type GetChannelsForCreateEpolicyQuery = {
  __typename?: 'Query';
  channelsForCreateEpolicy: Array<{
    __typename?: 'Channel';
    name: string;
    members?: Array<{ __typename?: 'SpecMember'; name?: string | null }> | null;
  }>;
};

export type GetFederationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFederationsQuery = {
  __typename?: 'Query';
  federations: Array<{
    __typename?: 'Federation';
    name: string;
    creationTimestamp: string;
    description?: string | null;
    policy?: ProposalPolicy | null;
    status?: CrdStatusType | null;
    joinedAt?: string | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    organizations?: Array<{
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
      joinedAt?: string | null;
    }> | null;
    networks?: Array<{ __typename?: 'Network'; name: string }> | null;
  }>;
};

export type GetFederationQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type GetFederationQuery = {
  __typename?: 'Query';
  federation: {
    __typename?: 'Federation';
    name: string;
    creationTimestamp: string;
    description?: string | null;
    policy?: ProposalPolicy | null;
    status?: CrdStatusType | null;
    joinedAt?: string | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    organizations?: Array<{
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
      joinedAt?: string | null;
    }> | null;
    networks?: Array<{
      __typename?: 'Network';
      name: string;
      creationTimestamp?: string | null;
      expiredTime?: string | null;
      federation?: string | null;
      clusterSize?: number | null;
      ordererType?: string | null;
      status?: CrdStatusType | null;
      organizations?: Array<{
        __typename?: 'Organization';
        name: string;
        admin?: string | null;
      }> | null;
      initiator?: {
        __typename?: 'Organization';
        name: string;
        admin?: string | null;
      } | null;
      channels?: Array<{ __typename?: 'Channel'; name: string }> | null;
    }> | null;
  };
};

export type CreateFederationMutationVariables = Exact<{
  federation: NewFederationInput;
}>;

export type CreateFederationMutation = {
  __typename?: 'Mutation';
  federationCreate: {
    __typename?: 'Federation';
    name: string;
    creationTimestamp: string;
    description?: string | null;
    policy?: ProposalPolicy | null;
    status?: CrdStatusType | null;
    joinedAt?: string | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    organizations?: Array<{
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
      joinedAt?: string | null;
    }> | null;
  };
};

export type AddOrganizationToFederationMutationVariables = Exact<{
  name: Scalars['String'];
  organizations: Array<Scalars['String']> | Scalars['String'];
}>;

export type AddOrganizationToFederationMutation = {
  __typename?: 'Mutation';
  federationAddOrganization: boolean;
};

export type RemoveOrganizationToFederationMutationVariables = Exact<{
  name: Scalars['String'];
  organization: Scalars['String'];
}>;

export type RemoveOrganizationToFederationMutation = {
  __typename?: 'Mutation';
  federationRemoveOrganization: boolean;
};

export type DissolveFederationMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type DissolveFederationMutation = {
  __typename?: 'Mutation';
  federationDissolve: boolean;
};

export type DeleteFederationMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type DeleteFederationMutation = {
  __typename?: 'Mutation';
  federationDelete: {
    __typename?: 'K8sV1Status';
    code?: number | null;
    status?: string | null;
    reason?: string | null;
    message?: string | null;
  };
};

export type GetIbppeersQueryVariables = Exact<{
  organization: Scalars['String'];
}>;

export type GetIbppeersQuery = {
  __typename?: 'Query';
  ibppeers: Array<{
    __typename?: 'Ibppeer';
    name: string;
    creationTimestamp: string;
    status?: CrdStatusType | null;
    channels?: Array<string> | null;
    networks?: Array<string> | null;
    limits?: {
      __typename?: 'SpecResource';
      cpu: string;
      memory: string;
    } | null;
  }>;
};

export type CreateIbppeerMutationVariables = Exact<{
  org: Scalars['String'];
  count?: InputMaybe<Scalars['Float']>;
}>;

export type CreateIbppeerMutation = {
  __typename?: 'Mutation';
  ibppeerCreate: Array<{
    __typename?: 'Ibppeer';
    name: string;
    creationTimestamp: string;
    status?: CrdStatusType | null;
    limits?: {
      __typename?: 'SpecResource';
      cpu: string;
      memory: string;
    } | null;
  }>;
};

export type GetNetworksQueryVariables = Exact<{ [key: string]: never }>;

export type GetNetworksQuery = {
  __typename?: 'Query';
  networks: Array<{
    __typename?: 'Network';
    name: string;
    creationTimestamp?: string | null;
    lastHeartbeatTime?: string | null;
    expiredTime?: string | null;
    federation?: string | null;
    clusterSize?: number | null;
    ordererType?: string | null;
    status?: CrdStatusType | null;
    organizations?: Array<{
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    }> | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    channels?: Array<{
      __typename?: 'Channel';
      name: string;
      createdByMe?: boolean | null;
      iamInvolved?: boolean | null;
    }> | null;
    peers?: Array<{
      __typename?: 'Ibppeer';
      name: string;
      createdByMe?: boolean | null;
    }> | null;
  }>;
};

export type GetNetworkQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type GetNetworkQuery = {
  __typename?: 'Query';
  network: {
    __typename?: 'Network';
    name: string;
    description?: string | null;
    creationTimestamp?: string | null;
    lastHeartbeatTime?: string | null;
    expiredTime?: string | null;
    federation?: string | null;
    clusterSize?: number | null;
    ordererType?: string | null;
    version?: OrderVersion | null;
    storage?: string | null;
    status?: CrdStatusType | null;
    limits?: {
      __typename?: 'SpecResource';
      cpu: string;
      memory: string;
    } | null;
    organizations?: Array<{
      __typename?: 'Organization';
      name: string;
      displayName?: string | null;
      admin?: string | null;
      creationTimestamp: string;
      lastHeartbeatTime?: string | null;
      status?: CrdStatusType | null;
      reason?: string | null;
      ibppeers?: Array<{ __typename?: 'Ibppeer'; name: string }> | null;
    }> | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    peers?: Array<{
      __typename?: 'Ibppeer';
      name: string;
      createdByMe?: boolean | null;
    }> | null;
    channels?: Array<{
      __typename?: 'Channel';
      name: string;
      creationTimestamp?: string | null;
      status?: CrdStatusType | null;
      createdByMe?: boolean | null;
      iamInvolved?: boolean | null;
      members?: Array<{
        __typename?: 'SpecMember';
        name?: string | null;
      }> | null;
      peers?: Array<{
        __typename?: 'SpecPeer';
        name?: string | null;
        namespace?: string | null;
      }> | null;
    }> | null;
  };
};

export type CreateNetworkMutationVariables = Exact<{
  network: NewNetworkInput;
}>;

export type CreateNetworkMutation = {
  __typename?: 'Mutation';
  networkCreate: {
    __typename?: 'Network';
    name: string;
    creationTimestamp?: string | null;
    lastHeartbeatTime?: string | null;
    expiredTime?: string | null;
    federation?: string | null;
    clusterSize?: number | null;
    ordererType?: string | null;
    status?: CrdStatusType | null;
  };
};

export type DissolveNetworkMutationVariables = Exact<{
  name: Scalars['String'];
  federation: Scalars['String'];
  initiator: Scalars['String'];
}>;

export type DissolveNetworkMutation = {
  __typename?: 'Mutation';
  networkDissolve: boolean;
};

export type DeleteNetworkMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type DeleteNetworkMutation = {
  __typename?: 'Mutation';
  networkDelete: {
    __typename?: 'K8sV1Status';
    code?: number | null;
    status?: string | null;
    message?: string | null;
  };
};

export type GetOrganizationsQueryVariables = Exact<{
  admin?: InputMaybe<Scalars['String']>;
}>;

export type GetOrganizationsQuery = {
  __typename?: 'Query';
  organizations: Array<{
    __typename?: 'Organization';
    name: string;
    displayName?: string | null;
    description?: string | null;
    creationTimestamp: string;
    lastHeartbeatTime?: string | null;
    admin?: string | null;
    status?: CrdStatusType | null;
    reason?: string | null;
    federations?: Array<string> | null;
    networks?: Array<{ __typename?: 'Network'; name: string }> | null;
  }>;
};

export type GetOrganizationQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type GetOrganizationQuery = {
  __typename?: 'Query';
  organization: {
    __typename?: 'Organization';
    name: string;
    displayName?: string | null;
    description?: string | null;
    creationTimestamp: string;
    lastHeartbeatTime?: string | null;
    admin?: string | null;
    status?: CrdStatusType | null;
    reason?: string | null;
    federations?: Array<string> | null;
    channels?: Array<string> | null;
    networks?: Array<{ __typename?: 'Network'; name: string }> | null;
    users?: Array<{
      __typename?: 'User';
      name: string;
      isOrganizationAdmin?: boolean | null;
      joinedAt?: string | null;
    }> | null;
    ibppeers?: Array<{ __typename?: 'Ibppeer'; name: string }> | null;
  };
};

export type CreateOrganizationMutationVariables = Exact<{
  organization: NewOrganizationInput;
}>;

export type CreateOrganizationMutation = {
  __typename?: 'Mutation';
  organizationCreate: {
    __typename?: 'Organization';
    name: string;
    displayName?: string | null;
    description?: string | null;
    creationTimestamp: string;
    lastHeartbeatTime?: string | null;
    admin?: string | null;
    status?: CrdStatusType | null;
    reason?: string | null;
  };
};

export type UpdateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  organization: UpdateOrganization;
}>;

export type UpdateOrganizationMutation = {
  __typename?: 'Mutation';
  organizationUpdate: {
    __typename?: 'Organization';
    name: string;
    displayName?: string | null;
    description?: string | null;
    creationTimestamp: string;
    lastHeartbeatTime?: string | null;
    admin?: string | null;
    status?: CrdStatusType | null;
    reason?: string | null;
  };
};

export type DeleteOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type DeleteOrganizationMutation = {
  __typename?: 'Mutation';
  organizationDelete: {
    __typename?: 'K8sV1Status';
    code?: number | null;
    status?: string | null;
    reason?: string | null;
    message?: string | null;
  };
};

export type GetIbppeersForCreateChannelQueryVariables = Exact<{
  members: Array<Scalars['String']> | Scalars['String'];
}>;

export type GetIbppeersForCreateChannelQuery = {
  __typename?: 'Query';
  ibppeersForCreateChannel: Array<{
    __typename?: 'Organization';
    name: string;
    ibppeers?: Array<{
      __typename?: 'Ibppeer';
      name: string;
      status?: CrdStatusType | null;
    }> | null;
  }>;
};

export type GetProposalsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProposalsQuery = {
  __typename?: 'Query';
  proposals: Array<{
    __typename?: 'Proposal';
    name: string;
    creationTimestamp: string;
    endAt?: string | null;
    type?: ProposalType | null;
    policy?: ProposalPolicy | null;
    status?: ProposalStatus | null;
    voted?: VotePhase | null;
    federation?: string | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    votes?: Array<{
      __typename?: 'Vote';
      name: string;
      organizationName?: string | null;
      organizationAdmin?: string | null;
      proposalName?: string | null;
      voteTime?: string | null;
      decision?: boolean | null;
      description?: string | null;
      status?: VotePhase | null;
    }> | null;
  }>;
};

export type GetProposalQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type GetProposalQuery = {
  __typename?: 'Query';
  proposal: {
    __typename?: 'Proposal';
    name: string;
    creationTimestamp: string;
    endAt?: string | null;
    type?: ProposalType | null;
    policy?: ProposalPolicy | null;
    status?: ProposalStatus | null;
    voted?: VotePhase | null;
    federation?: string | null;
    information?: any | null;
    initiator?: {
      __typename?: 'Organization';
      name: string;
      admin?: string | null;
    } | null;
    votes?: Array<{
      __typename?: 'Vote';
      name: string;
      organizationName?: string | null;
      organizationAdmin?: string | null;
      proposalName?: string | null;
      voteTime?: string | null;
      decision?: boolean | null;
      description?: string | null;
      status?: VotePhase | null;
    }> | null;
  };
};

export type UpdateVoteMutationVariables = Exact<{
  name: Scalars['String'];
  organization: Scalars['String'];
  vote: UpdateVote;
}>;

export type UpdateVoteMutation = {
  __typename?: 'Mutation';
  voteUpdate: {
    __typename?: 'Vote';
    name: string;
    description?: string | null;
    voteTime?: string | null;
    decision?: boolean | null;
    organizationName?: string | null;
    organizationAdmin?: string | null;
    proposalName?: string | null;
    status?: VotePhase | null;
  };
};

export const DeployChaincodeDocument = gql`
  mutation deployChaincode($chaincode: NewChaincode!) {
    chaincodeDeploy(chaincode: $chaincode)
  }
`;
export const CreateChaincodebuildDocument = gql`
  mutation createChaincodebuild(
    $displayName: String!
    $description: String
    $language: String
    $network: String!
    $version: String!
    $file: Upload
    $files: [Upload!]
    $fileRelativePaths: [String!]
  ) {
    chaincodebuildCreate(
      chaincodebuild: {
        displayName: $displayName
        description: $description
        language: $language
        network: $network
        version: $version
        file: $file
        files: $files
        fileRelativePaths: $fileRelativePaths
      }
    ) {
      name
      displayName
      creationTimestamp
      version
      status
    }
  }
`;
export const GetChaincodebuildsDocument = gql`
  query getChaincodebuilds($network: String!) {
    chaincodebuilds(network: $network) {
      name
      displayName
      creationTimestamp
      version
      status
      network
      initiator
      ibppeers {
        name
      }
      channels {
        name
      }
    }
  }
`;
export const GetChaincodebuildDocument = gql`
  query getChaincodebuild($name: String!) {
    chaincodebuild(name: $name) {
      name
      displayName
      creationTimestamp
      version
      status
      network
      initiator
      organizations {
        name
      }
      ibppeers {
        name
        namespace
      }
      channels {
        name
        epolicy {
          name
          value
        }
      }
    }
  }
`;
export const DeleteChaincodebuildDocument = gql`
  mutation deleteChaincodebuild($displayName: String!, $network: String!) {
    chaincodebuildDelete(displayName: $displayName, network: $network) {
      code
      status
      reason
    }
  }
`;
export const UpgradeChaincodebuildDocument = gql`
  mutation upgradeChaincodebuild(
    $displayName: String!
    $file: Upload
    $files: [Upload!]
    $language: String
    $network: String!
    $newVersion: String!
    $fileRelativePaths: [String!]
  ) {
    chaincodebuildUpgrade(
      chaincodebuild: {
        displayName: $displayName
        file: $file
        files: $files
        language: $language
        network: $network
        newVersion: $newVersion
        fileRelativePaths: $fileRelativePaths
      }
    ) {
      name
      displayName
      creationTimestamp
      version
      status
    }
  }
`;
export const GetChannelDocument = gql`
  query getChannel($name: String!) {
    channel(name: $name) {
      name
      description
      creationTimestamp
      epolicy {
        name
        description
        creationTimestamp
      }
      members {
        name
      }
      peers {
        name
        namespace
      }
    }
  }
`;
export const CreateChannelDocument = gql`
  mutation createChannel($network: String!, $channel: NewChannel!) {
    channelCreate(network: $network, channel: $channel) {
      name
      members {
        name
      }
      peers {
        name
        namespace
      }
      creationTimestamp
      status
    }
  }
`;
export const UpdateChannelDocument = gql`
  mutation updateChannel($channel: UpdateChannel!, $name: String!) {
    channelUpdate(channel: $channel, name: $name) {
      name
      members {
        name
      }
      peers {
        name
        namespace
      }
      creationTimestamp
      status
    }
  }
`;
export const GetEpoliciesDocument = gql`
  query getEpolicies($network: String) {
    epolicies(network: $network) {
      name
      description
      channel
      value
      creationTimestamp
      lastHeartbeatTime
    }
  }
`;
export const CreateEpolicyDocument = gql`
  mutation createEpolicy($epolicy: NewEpolicyInput!) {
    epolicyCreate(epolicy: $epolicy) {
      name
      value
      description
      channel
    }
  }
`;
export const DeleteEpolicyDocument = gql`
  mutation deleteEpolicy($name: String!) {
    epolicyDelete(name: $name) {
      status
      code
      message
    }
  }
`;
export const GetChannelsForCreateEpolicyDocument = gql`
  query getChannelsForCreateEpolicy($network: String!) {
    channelsForCreateEpolicy(network: $network) {
      name
      members {
        name
      }
    }
  }
`;
export const GetFederationsDocument = gql`
  query getFederations {
    federations {
      name
      creationTimestamp
      description
      policy
      status
      joinedAt
      initiator {
        name
        admin
      }
      organizations {
        name
        admin
        joinedAt
      }
      networks {
        name
      }
    }
  }
`;
export const GetFederationDocument = gql`
  query getFederation($name: String!) {
    federation(name: $name) {
      name
      creationTimestamp
      description
      policy
      status
      joinedAt
      initiator {
        name
        admin
      }
      organizations {
        name
        admin
        joinedAt
      }
      networks {
        name
        creationTimestamp
        expiredTime
        federation
        clusterSize
        ordererType
        organizations {
          name
          admin
        }
        status
        initiator {
          name
          admin
        }
        channels {
          name
        }
      }
    }
  }
`;
export const CreateFederationDocument = gql`
  mutation createFederation($federation: NewFederationInput!) {
    federationCreate(federation: $federation) {
      name
      creationTimestamp
      description
      policy
      status
      joinedAt
      initiator {
        name
        admin
      }
      organizations {
        name
        admin
        joinedAt
      }
    }
  }
`;
export const AddOrganizationToFederationDocument = gql`
  mutation addOrganizationToFederation($name: String!, $organizations: [String!]!) {
    federationAddOrganization(name: $name, organizations: $organizations)
  }
`;
export const RemoveOrganizationToFederationDocument = gql`
  mutation removeOrganizationToFederation($name: String!, $organization: String!) {
    federationRemoveOrganization(name: $name, organization: $organization)
  }
`;
export const DissolveFederationDocument = gql`
  mutation dissolveFederation($name: String!) {
    federationDissolve(name: $name)
  }
`;
export const DeleteFederationDocument = gql`
  mutation deleteFederation($name: String!) {
    federationDelete(name: $name) {
      code
      status
      reason
      message
    }
  }
`;
export const GetIbppeersDocument = gql`
  query getIbppeers($organization: String!) {
    ibppeers(organization: $organization) {
      name
      creationTimestamp
      status
      limits {
        cpu
        memory
      }
      channels
      networks
    }
  }
`;
export const CreateIbppeerDocument = gql`
  mutation createIbppeer($org: String!, $count: Float) {
    ibppeerCreate(organization: $org, count: $count) {
      name
      creationTimestamp
      status
      limits {
        cpu
        memory
      }
    }
  }
`;
export const GetNetworksDocument = gql`
  query getNetworks {
    networks {
      name
      creationTimestamp
      lastHeartbeatTime
      expiredTime
      federation
      clusterSize
      ordererType
      organizations {
        name
        admin
      }
      initiator {
        name
        admin
      }
      status
      channels {
        name
        createdByMe
        iamInvolved
      }
      peers {
        name
        createdByMe
      }
    }
  }
`;
export const GetNetworkDocument = gql`
  query getNetwork($name: String!) {
    network(name: $name) {
      name
      description
      creationTimestamp
      lastHeartbeatTime
      expiredTime
      federation
      clusterSize
      ordererType
      version
      storage
      limits {
        cpu
        memory
      }
      organizations {
        name
        displayName
        admin
        creationTimestamp
        lastHeartbeatTime
        status
        reason
        ibppeers {
          name
        }
      }
      initiator {
        name
        admin
      }
      status
      peers {
        name
        createdByMe
      }
      channels {
        name
        members {
          name
        }
        peers {
          name
          namespace
        }
        creationTimestamp
        status
        createdByMe
        iamInvolved
      }
    }
  }
`;
export const CreateNetworkDocument = gql`
  mutation createNetwork($network: NewNetworkInput!) {
    networkCreate(network: $network) {
      name
      creationTimestamp
      lastHeartbeatTime
      expiredTime
      federation
      clusterSize
      ordererType
      status
    }
  }
`;
export const DissolveNetworkDocument = gql`
  mutation dissolveNetwork($name: String!, $federation: String!, $initiator: String!) {
    networkDissolve(name: $name, federation: $federation, initiator: $initiator)
  }
`;
export const DeleteNetworkDocument = gql`
  mutation deleteNetwork($name: String!) {
    networkDelete(name: $name) {
      code
      status
      message
    }
  }
`;
export const GetOrganizationsDocument = gql`
  query getOrganizations($admin: String) {
    organizations(admin: $admin) {
      name
      displayName
      description
      creationTimestamp
      lastHeartbeatTime
      admin
      status
      reason
      networks {
        name
      }
      federations
    }
  }
`;
export const GetOrganizationDocument = gql`
  query getOrganization($name: String!) {
    organization(name: $name) {
      name
      displayName
      description
      creationTimestamp
      lastHeartbeatTime
      admin
      status
      reason
      networks {
        name
      }
      federations
      channels
      users {
        name
        isOrganizationAdmin
        joinedAt
      }
      ibppeers {
        name
      }
    }
  }
`;
export const CreateOrganizationDocument = gql`
  mutation createOrganization($organization: NewOrganizationInput!) {
    organizationCreate(organization: $organization) {
      name
      displayName
      description
      creationTimestamp
      lastHeartbeatTime
      admin
      status
      reason
    }
  }
`;
export const UpdateOrganizationDocument = gql`
  mutation updateOrganization($name: String!, $organization: UpdateOrganization!) {
    organizationUpdate(name: $name, organization: $organization) {
      name
      displayName
      description
      creationTimestamp
      lastHeartbeatTime
      admin
      status
      reason
    }
  }
`;
export const DeleteOrganizationDocument = gql`
  mutation deleteOrganization($name: String!) {
    organizationDelete(name: $name) {
      code
      status
      reason
      message
    }
  }
`;
export const GetIbppeersForCreateChannelDocument = gql`
  query getIbppeersForCreateChannel($members: [String!]!) {
    ibppeersForCreateChannel(members: $members) {
      name
      ibppeers {
        name
        status
      }
    }
  }
`;
export const GetProposalsDocument = gql`
  query getProposals {
    proposals {
      name
      creationTimestamp
      endAt
      type
      policy
      status
      voted
      federation
      initiator {
        name
        admin
      }
      votes {
        name
        organizationName
        organizationAdmin
        proposalName
        voteTime
        decision
        description
        status
      }
    }
  }
`;
export const GetProposalDocument = gql`
  query getProposal($name: String!) {
    proposal(name: $name) {
      name
      creationTimestamp
      endAt
      type
      policy
      status
      voted
      federation
      information
      initiator {
        name
        admin
      }
      votes {
        name
        organizationName
        organizationAdmin
        proposalName
        voteTime
        decision
        description
        status
      }
    }
  }
`;
export const UpdateVoteDocument = gql`
  mutation updateVote($name: String!, $organization: String!, $vote: UpdateVote!) {
    voteUpdate(name: $name, organization: $organization, vote: $vote) {
      name
      description
      voteTime
      decision
      organizationName
      organizationAdmin
      proposalName
      status
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    deployChaincode(
      variables: DeployChaincodeMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeployChaincodeMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeployChaincodeMutation>(DeployChaincodeDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deployChaincode',
        'mutation'
      );
    },
    createChaincodebuild(
      variables: CreateChaincodebuildMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateChaincodebuildMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateChaincodebuildMutation>(CreateChaincodebuildDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createChaincodebuild',
        'mutation'
      );
    },
    getChaincodebuilds(
      variables: GetChaincodebuildsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetChaincodebuildsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetChaincodebuildsQuery>(GetChaincodebuildsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getChaincodebuilds',
        'query'
      );
    },
    getChaincodebuild(
      variables: GetChaincodebuildQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetChaincodebuildQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetChaincodebuildQuery>(GetChaincodebuildDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getChaincodebuild',
        'query'
      );
    },
    deleteChaincodebuild(
      variables: DeleteChaincodebuildMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeleteChaincodebuildMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeleteChaincodebuildMutation>(DeleteChaincodebuildDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deleteChaincodebuild',
        'mutation'
      );
    },
    upgradeChaincodebuild(
      variables: UpgradeChaincodebuildMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpgradeChaincodebuildMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpgradeChaincodebuildMutation>(UpgradeChaincodebuildDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'upgradeChaincodebuild',
        'mutation'
      );
    },
    getChannel(
      variables: GetChannelQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetChannelQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetChannelQuery>(GetChannelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getChannel',
        'query'
      );
    },
    createChannel(
      variables: CreateChannelMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateChannelMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateChannelMutation>(CreateChannelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createChannel',
        'mutation'
      );
    },
    updateChannel(
      variables: UpdateChannelMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateChannelMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpdateChannelMutation>(UpdateChannelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'updateChannel',
        'mutation'
      );
    },
    getEpolicies(
      variables?: GetEpoliciesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetEpoliciesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetEpoliciesQuery>(GetEpoliciesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getEpolicies',
        'query'
      );
    },
    createEpolicy(
      variables: CreateEpolicyMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateEpolicyMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateEpolicyMutation>(CreateEpolicyDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createEpolicy',
        'mutation'
      );
    },
    deleteEpolicy(
      variables: DeleteEpolicyMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeleteEpolicyMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeleteEpolicyMutation>(DeleteEpolicyDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deleteEpolicy',
        'mutation'
      );
    },
    getChannelsForCreateEpolicy(
      variables: GetChannelsForCreateEpolicyQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetChannelsForCreateEpolicyQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetChannelsForCreateEpolicyQuery>(
            GetChannelsForCreateEpolicyDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getChannelsForCreateEpolicy',
        'query'
      );
    },
    getFederations(
      variables?: GetFederationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetFederationsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetFederationsQuery>(GetFederationsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getFederations',
        'query'
      );
    },
    getFederation(
      variables: GetFederationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetFederationQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetFederationQuery>(GetFederationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getFederation',
        'query'
      );
    },
    createFederation(
      variables: CreateFederationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateFederationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateFederationMutation>(CreateFederationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createFederation',
        'mutation'
      );
    },
    addOrganizationToFederation(
      variables: AddOrganizationToFederationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<AddOrganizationToFederationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<AddOrganizationToFederationMutation>(
            AddOrganizationToFederationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'addOrganizationToFederation',
        'mutation'
      );
    },
    removeOrganizationToFederation(
      variables: RemoveOrganizationToFederationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<RemoveOrganizationToFederationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<RemoveOrganizationToFederationMutation>(
            RemoveOrganizationToFederationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'removeOrganizationToFederation',
        'mutation'
      );
    },
    dissolveFederation(
      variables: DissolveFederationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DissolveFederationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DissolveFederationMutation>(DissolveFederationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'dissolveFederation',
        'mutation'
      );
    },
    deleteFederation(
      variables: DeleteFederationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeleteFederationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeleteFederationMutation>(DeleteFederationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deleteFederation',
        'mutation'
      );
    },
    getIbppeers(
      variables: GetIbppeersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetIbppeersQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetIbppeersQuery>(GetIbppeersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getIbppeers',
        'query'
      );
    },
    createIbppeer(
      variables: CreateIbppeerMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateIbppeerMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateIbppeerMutation>(CreateIbppeerDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createIbppeer',
        'mutation'
      );
    },
    getNetworks(
      variables?: GetNetworksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetNetworksQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetNetworksQuery>(GetNetworksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getNetworks',
        'query'
      );
    },
    getNetwork(
      variables: GetNetworkQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetNetworkQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetNetworkQuery>(GetNetworkDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getNetwork',
        'query'
      );
    },
    createNetwork(
      variables: CreateNetworkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateNetworkMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateNetworkMutation>(CreateNetworkDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createNetwork',
        'mutation'
      );
    },
    dissolveNetwork(
      variables: DissolveNetworkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DissolveNetworkMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DissolveNetworkMutation>(DissolveNetworkDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'dissolveNetwork',
        'mutation'
      );
    },
    deleteNetwork(
      variables: DeleteNetworkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeleteNetworkMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeleteNetworkMutation>(DeleteNetworkDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deleteNetwork',
        'mutation'
      );
    },
    getOrganizations(
      variables?: GetOrganizationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetOrganizationsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetOrganizationsQuery>(GetOrganizationsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getOrganizations',
        'query'
      );
    },
    getOrganization(
      variables: GetOrganizationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetOrganizationQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetOrganizationQuery>(GetOrganizationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getOrganization',
        'query'
      );
    },
    createOrganization(
      variables: CreateOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateOrganizationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateOrganizationMutation>(CreateOrganizationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createOrganization',
        'mutation'
      );
    },
    updateOrganization(
      variables: UpdateOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateOrganizationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpdateOrganizationMutation>(UpdateOrganizationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'updateOrganization',
        'mutation'
      );
    },
    deleteOrganization(
      variables: DeleteOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeleteOrganizationMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeleteOrganizationMutation>(DeleteOrganizationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deleteOrganization',
        'mutation'
      );
    },
    getIbppeersForCreateChannel(
      variables: GetIbppeersForCreateChannelQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetIbppeersForCreateChannelQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetIbppeersForCreateChannelQuery>(
            GetIbppeersForCreateChannelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getIbppeersForCreateChannel',
        'query'
      );
    },
    getProposals(
      variables?: GetProposalsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetProposalsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetProposalsQuery>(GetProposalsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getProposals',
        'query'
      );
    },
    getProposal(
      variables: GetProposalQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetProposalQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetProposalQuery>(GetProposalDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getProposal',
        'query'
      );
    },
    updateVote(
      variables: UpdateVoteMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateVoteMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpdateVoteMutation>(UpdateVoteDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'updateVote',
        'mutation'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  const sdk = getSdk(client, withWrapper);
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(
    name: string,
    object: V = {} as V
  ): SWRKeyInterface => [
    name,
    ...Object.keys(object)
      .sort()
      .map(key => object[key]),
  ];
  return {
    ...sdk,
    useGetChaincodebuilds(
      variables: GetChaincodebuildsQueryVariables,
      config?: SWRConfigInterface<GetChaincodebuildsQuery, ClientError>
    ) {
      return useSWR<GetChaincodebuildsQuery, ClientError>(
        genKey<GetChaincodebuildsQueryVariables>('GetChaincodebuilds', variables),
        () => sdk.getChaincodebuilds(variables),
        config
      );
    },
    useGetChaincodebuild(
      variables: GetChaincodebuildQueryVariables,
      config?: SWRConfigInterface<GetChaincodebuildQuery, ClientError>
    ) {
      return useSWR<GetChaincodebuildQuery, ClientError>(
        genKey<GetChaincodebuildQueryVariables>('GetChaincodebuild', variables),
        () => sdk.getChaincodebuild(variables),
        config
      );
    },
    useGetChannel(
      variables: GetChannelQueryVariables,
      config?: SWRConfigInterface<GetChannelQuery, ClientError>
    ) {
      return useSWR<GetChannelQuery, ClientError>(
        genKey<GetChannelQueryVariables>('GetChannel', variables),
        () => sdk.getChannel(variables),
        config
      );
    },
    useGetEpolicies(
      variables?: GetEpoliciesQueryVariables,
      config?: SWRConfigInterface<GetEpoliciesQuery, ClientError>
    ) {
      return useSWR<GetEpoliciesQuery, ClientError>(
        genKey<GetEpoliciesQueryVariables>('GetEpolicies', variables),
        () => sdk.getEpolicies(variables),
        config
      );
    },
    useGetChannelsForCreateEpolicy(
      variables: GetChannelsForCreateEpolicyQueryVariables,
      config?: SWRConfigInterface<GetChannelsForCreateEpolicyQuery, ClientError>
    ) {
      return useSWR<GetChannelsForCreateEpolicyQuery, ClientError>(
        genKey<GetChannelsForCreateEpolicyQueryVariables>('GetChannelsForCreateEpolicy', variables),
        () => sdk.getChannelsForCreateEpolicy(variables),
        config
      );
    },
    useGetFederations(
      variables?: GetFederationsQueryVariables,
      config?: SWRConfigInterface<GetFederationsQuery, ClientError>
    ) {
      return useSWR<GetFederationsQuery, ClientError>(
        genKey<GetFederationsQueryVariables>('GetFederations', variables),
        () => sdk.getFederations(variables),
        config
      );
    },
    useGetFederation(
      variables: GetFederationQueryVariables,
      config?: SWRConfigInterface<GetFederationQuery, ClientError>
    ) {
      return useSWR<GetFederationQuery, ClientError>(
        genKey<GetFederationQueryVariables>('GetFederation', variables),
        () => sdk.getFederation(variables),
        config
      );
    },
    useGetIbppeers(
      variables: GetIbppeersQueryVariables,
      config?: SWRConfigInterface<GetIbppeersQuery, ClientError>
    ) {
      return useSWR<GetIbppeersQuery, ClientError>(
        genKey<GetIbppeersQueryVariables>('GetIbppeers', variables),
        () => sdk.getIbppeers(variables),
        config
      );
    },
    useGetNetworks(
      variables?: GetNetworksQueryVariables,
      config?: SWRConfigInterface<GetNetworksQuery, ClientError>
    ) {
      return useSWR<GetNetworksQuery, ClientError>(
        genKey<GetNetworksQueryVariables>('GetNetworks', variables),
        () => sdk.getNetworks(variables),
        config
      );
    },
    useGetNetwork(
      variables: GetNetworkQueryVariables,
      config?: SWRConfigInterface<GetNetworkQuery, ClientError>
    ) {
      return useSWR<GetNetworkQuery, ClientError>(
        genKey<GetNetworkQueryVariables>('GetNetwork', variables),
        () => sdk.getNetwork(variables),
        config
      );
    },
    useGetOrganizations(
      variables?: GetOrganizationsQueryVariables,
      config?: SWRConfigInterface<GetOrganizationsQuery, ClientError>
    ) {
      return useSWR<GetOrganizationsQuery, ClientError>(
        genKey<GetOrganizationsQueryVariables>('GetOrganizations', variables),
        () => sdk.getOrganizations(variables),
        config
      );
    },
    useGetOrganization(
      variables: GetOrganizationQueryVariables,
      config?: SWRConfigInterface<GetOrganizationQuery, ClientError>
    ) {
      return useSWR<GetOrganizationQuery, ClientError>(
        genKey<GetOrganizationQueryVariables>('GetOrganization', variables),
        () => sdk.getOrganization(variables),
        config
      );
    },
    useGetIbppeersForCreateChannel(
      variables: GetIbppeersForCreateChannelQueryVariables,
      config?: SWRConfigInterface<GetIbppeersForCreateChannelQuery, ClientError>
    ) {
      return useSWR<GetIbppeersForCreateChannelQuery, ClientError>(
        genKey<GetIbppeersForCreateChannelQueryVariables>('GetIbppeersForCreateChannel', variables),
        () => sdk.getIbppeersForCreateChannel(variables),
        config
      );
    },
    useGetProposals(
      variables?: GetProposalsQueryVariables,
      config?: SWRConfigInterface<GetProposalsQuery, ClientError>
    ) {
      return useSWR<GetProposalsQuery, ClientError>(
        genKey<GetProposalsQueryVariables>('GetProposals', variables),
        () => sdk.getProposals(variables),
        config
      );
    },
    useGetProposal(
      variables: GetProposalQueryVariables,
      config?: SWRConfigInterface<GetProposalQuery, ClientError>
    ) {
      return useSWR<GetProposalQuery, ClientError>(
        genKey<GetProposalQueryVariables>('GetProposal', variables),
        () => sdk.getProposal(variables),
        config
      );
    },
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;
