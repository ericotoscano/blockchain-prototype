import { BlockData, TransactionData } from './data.types';

export type NextBlockPostRequest = {
  minFee: number;
};

export type NextBlockPatchRequest = {
  nextBlock: BlockData;
};

export type NodesPostRequest = {
  nodeUrl: string;
};

export type NodesPutRequest = {
  connectedNodes: string[];
};

export type TransactionsPostRequest = {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
};

export type TransactionsPatchRequest = {
  newTransaction: TransactionData;
};
