import { TransactionStatusType } from './transaction.types';

export type CreateBlockchainRequestDTO = {
  targetZeros: number;
  reward: number;
  maxTransactionsPerBlock: number;
};

export type CreateBlockchainResponseDTO = {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  node: GetNodeDTO;
  mempool: TransactionDTO[];
  blocks: BlockDTO[];
};

export type GetNodeDTO = {
  nodeUrl: string;
  nodeAddress: string;
  connectedNodes: ConnectedNodesDTO;
};

export type ConnectedNodesDTO = {
  connectedNodes: string[];
};

export type BlockDTO = {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionDTO[];
  timestamp: number;
};

export type GetTransactionsToMineBlockDTO = {
  minFee: number;
};

export type TransactionDTO = {
  txId: string;
  status: TransactionStatusType;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  timestamp: number;
};

export type ResponseDTO<T> = {
  type: string;
  code: number;
  message: string;
  data: T;
};

export type ValidationDTO = {
  type: string;
  result: boolean;
  code: number;
  message: string;
};

export type ErrorDTO = {
  type: string;
  code: number;
  message: string;
};
