import { BlockData, BlockchainData, TransactionData } from './data.types';

export type CustomResponse<T> = {
  message: string;
  data: T;
};

export type BlockchainDataGetResponse = {
  blockchain: BlockchainData;
};

export type NextBlockDataPostResponse = {
  nextBlock: BlockData;
};

export type TransactionsPostResponseData = {
  newTransaction: TransactionData;
};

export type NodesDataPostResponse = {
  connectedTo: string[];
};

export type NodesDataPatchResponse = {
  addedNode: string;
  addedIn: string;
};

export type NodesDataPutResponse = {
  nodeUrl: string;
  connectedNodes: string[];
};

export type ValidationData = { title: string; result: boolean; type: string; code: number; message: string };

export type ErrorData = { type: string; code: number; message: string };
