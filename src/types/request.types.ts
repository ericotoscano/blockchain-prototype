import { PreTransactionData, BlockData, TransactionData } from './data.types';

export type NextBlockPostRequest = {
  minFee: number;
};

export type BlockchainPatchRequest = {
  nextBlock: BlockData;
};

export type NodesPostRequest = {
  nodeUrl: string;
};

export type NodesPutRequest = {
  connectedNodes: string[];
};

export type TransactionsPostRequest = {
  newPreTransaction: PreTransactionData;
};

export type TransactionsPatchRequest = {
  newTransaction: TransactionData;
};
