import { BlockData, TransactionData } from './data.types';

export interface NextBlockPostRequest {
  minFee: number;
}

export interface NextBlockPatchRequest {
  nextBlock: BlockData;
}

export interface NodesPostRequest {
  nodeUrl: string;
}

export interface NodesPutRequest {
  connectedNodes: string[];
}

export interface TransactionsPostRequest {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
}

export interface TransactionsPatchRequest {
  newTransaction: TransactionData;
}
