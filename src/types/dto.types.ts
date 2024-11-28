import { ITransaction } from './transaction.types';

export type CreateBlockchainDTO = {
  targetZeros: number;
  reward: number;
  maxTransactionsPerBlock: number;
};

export type BlockchainDTO = {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  node: NodeDTO;
  mempool: TransactionDTO[];
  blocks: BlockDTO[];
};

export type NodeDTO = {
  nodeUrl: string;
  nodeAddress: string;
  connectedNodes: ConnectedNodeDTO[];
};

export type ConnectedNodeDTO = {
  nodeUrl: string;
  nodeAddress: string;
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

export type TransactionDTO = Omit<ITransaction, 'setStatus'>;

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
