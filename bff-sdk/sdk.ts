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
  status?: Maybe<FederationStatus>;
};

/** 「联盟」状态 */
export enum FederationStatus {
  /** 失败 */
  Error = 'Error',
  /** 已激活 */
  FederationActivated = 'FederationActivated',
  /** 已解散 */
  FederationDissolved = 'FederationDissolved',
  /** 组建失败 */
  FederationFailed = 'FederationFailed',
  /** 组建中 */
  FederationPending = 'FederationPending',
}

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
  /** 创建网络 */
  networkCreate: Network;
  /** 释放网络（返回true：只表示这个操作触发成功，而不是释放网络成功） */
  networkDissolve: Scalars['Boolean'];
  /** 新增组织 */
  organizationCreate: Organization;
  /** 修改组织 */
  organizationUpdate: Organization;
  /** 更新投票 */
  voteUpdate: Vote;
};

export type MutationFederationAddOrganizationArgs = {
  initiator: Scalars['String'];
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
  initiator: Scalars['String'];
  name: Scalars['String'];
};

export type MutationFederationRemoveOrganizationArgs = {
  initiator: Scalars['String'];
  name: Scalars['String'];
  organization: Scalars['String'];
};

export type MutationNetworkCreateArgs = {
  network: NewNetworkInput;
};

export type MutationNetworkDissolveArgs = {
  federation: Scalars['String'];
  initiator: Scalars['String'];
  name: Scalars['String'];
};

export type MutationOrganizationCreateArgs = {
  organization: NewOrganizationInput;
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
  /** 我的节点数 */
  clusterSize?: Maybe<Scalars['Float']>;
  /** 创建时间 */
  creationTimestamp?: Maybe<Scalars['String']>;
  /** 到期时间 */
  expiredTime?: Maybe<Scalars['String']>;
  /** 所属联盟 */
  federation?: Maybe<Scalars['String']>;
  /** 网络发起者（组织） */
  initiator?: Maybe<Organization>;
  /** 更新时间 */
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['ID'];
  /** 引擎类型 */
  ordererType?: Maybe<Scalars['String']>;
  /** 网络中组织 */
  organizations?: Maybe<Array<Organization>>;
  /** 状态 */
  status?: Maybe<StatusType>;
};

export type NewFederationInput = {
  /** 联盟描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 发起者（当前用户所在的组织） */
  initiator: Scalars['String'];
  /** 联盟名称，规则：小写字母、数字、“-”，开头和结尾只能是字母或数字（[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*） */
  name: Scalars['String'];
  /** 选择组织 */
  organizations: Array<Scalars['String']>;
  /** 提议投票策略 */
  policy: ProposalPolicy;
};

export type NewNetworkInput = {
  /** 共识集群节点数（要求单数，默认1） */
  clusterSize: Scalars['Float'];
  /** 所属联盟 */
  federation: Scalars['String'];
  /** 发起者（当前用户所在的组织） */
  initiator: Scalars['String'];
  /** 共识算法 */
  ordererType?: InputMaybe<Scalars['String']>;
  /** 选择组织 */
  organizations: Array<Scalars['String']>;
  /** 选择版本 */
  version?: InputMaybe<OrderVersion>;
};

export type NewOrganizationInput = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 展示名 */
  displayName?: InputMaybe<Scalars['String']>;
  /** 组织名称，规则：小写字母、数字、“-”，开头和结尾只能是字母或数字（[a-z0-9]([-a-z0-9]*[a-z0-9])?） */
  name: Scalars['String'];
};

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
  /** 创建时间 */
  creationTimestamp: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 名称 */
  displayName?: Maybe<Scalars['String']>;
  /** 加入时间（只在联盟中使用） */
  joinedAt?: Maybe<Scalars['String']>;
  /** 更新时间 */
  lastHeartbeatTime?: Maybe<Scalars['String']>;
  /** name */
  name: Scalars['ID'];
  /** 原因（状态为非Deplyed时） */
  reason?: Maybe<Scalars['String']>;
  /** 状态 */
  status?: Maybe<StatusType>;
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
  /** 创建联盟时创建的提议 */
  CreateFederationProposal = 'CreateFederationProposal',
  /** 联盟驱逐组织时创建的提议 */
  DeleteMemberProposal = 'DeleteMemberProposal',
  /** 解散联盟的时候创建的提议 */
  DissolveFederationProposal = 'DissolveFederationProposal',
  /** 释放网络时创建的提议 */
  DissolveNetworkProposal = 'DissolveNetworkProposal',
}

export type Query = {
  __typename?: 'Query';
  /** 联盟详情 */
  federation: Federation;
  /** 联盟列表 */
  federations: Array<Federation>;
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

export type QueryFederationArgs = {
  name: Scalars['String'];
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

export type QueryProposalsArgs = {
  type?: InputMaybe<ProposalType>;
};

/** IBPCR 状态 */
export enum StatusType {
  /** 正常 */
  Created = 'Created',
  /** Deployed is the status when the component's deployment is done successfully */
  Deployed = 'Deployed',
  /** Deploying is the status when component is being deployed */
  Deploying = 'Deploying',
  /** 异常 */
  Error = 'Error',
  /** FederationActivated means `Proposal-Vote` passed */
  FederationActivated = 'FederationActivated',
  /** FederationDissolved means `Federation` no longer active */
  FederationDissolved = 'FederationDissolved',
  /** FederationFailed means `Proposal-Vote` failed */
  FederationFailed = 'FederationFailed',
  /** FederationPending means `Proposal-Vote` not passed yet */
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

export type GetFederationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFederationsQuery = {
  __typename?: 'Query';
  federations: Array<{
    __typename?: 'Federation';
    name: string;
    creationTimestamp: string;
    description?: string | null;
    policy?: ProposalPolicy | null;
    status?: FederationStatus | null;
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
    status?: FederationStatus | null;
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
      status?: StatusType | null;
      organizations?: Array<{
        __typename?: 'Organization';
        name: string;
        admin?: string | null;
      }> | null;
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
    status?: FederationStatus | null;
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
  initiator: Scalars['String'];
}>;

export type AddOrganizationToFederationMutation = {
  __typename?: 'Mutation';
  federationAddOrganization: boolean;
};

export type RemoveOrganizationToFederationMutationVariables = Exact<{
  name: Scalars['String'];
  initiator: Scalars['String'];
  organization: Scalars['String'];
}>;

export type RemoveOrganizationToFederationMutation = {
  __typename?: 'Mutation';
  federationRemoveOrganization: boolean;
};

export type DissolveFederationMutationVariables = Exact<{
  name: Scalars['String'];
  initiator: Scalars['String'];
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
    status?: StatusType | null;
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
    creationTimestamp?: string | null;
    lastHeartbeatTime?: string | null;
    expiredTime?: string | null;
    federation?: string | null;
    clusterSize?: number | null;
    ordererType?: string | null;
    status?: StatusType | null;
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
    status?: StatusType | null;
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
    status?: StatusType | null;
    reason?: string | null;
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
    status?: StatusType | null;
    reason?: string | null;
    users?: Array<{
      __typename?: 'User';
      name: string;
      isOrganizationAdmin?: boolean | null;
    }> | null;
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
    status?: StatusType | null;
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
    status?: StatusType | null;
    reason?: string | null;
    users?: Array<{
      __typename?: 'User';
      name: string;
      isOrganizationAdmin?: boolean | null;
    }> | null;
  };
};

export type GetProposalsQueryVariables = Exact<{
  type?: InputMaybe<ProposalType>;
}>;

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
  mutation addOrganizationToFederation(
    $name: String!
    $organizations: [String!]!
    $initiator: String!
  ) {
    federationAddOrganization(name: $name, organizations: $organizations, initiator: $initiator)
  }
`;
export const RemoveOrganizationToFederationDocument = gql`
  mutation removeOrganizationToFederation(
    $name: String!
    $initiator: String!
    $organization: String!
  ) {
    federationRemoveOrganization(name: $name, initiator: $initiator, organization: $organization)
  }
`;
export const DissolveFederationDocument = gql`
  mutation dissolveFederation($name: String!, $initiator: String!) {
    federationDissolve(name: $name, initiator: $initiator)
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
    }
  }
`;
export const GetNetworkDocument = gql`
  query getNetwork($name: String!) {
    network(name: $name) {
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
      users {
        name
        isOrganizationAdmin
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
      users {
        name
        isOrganizationAdmin
      }
    }
  }
`;
export const GetProposalsDocument = gql`
  query getProposals($type: ProposalType) {
    proposals(type: $type) {
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
