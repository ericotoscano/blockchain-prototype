import { BlockData, BlockchainData, TransactionData } from './data.types';

export interface CustomResponse<T> {
  message: string;
  data: T;
}

export interface ErrorDataResponse {
  code: number;
  message: string;
}

export interface BlockchainDataGetResponse {
  blockchain: BlockchainData;
}

export interface NextBlockDataPostResponse {
  nextBlock: BlockData;
}

export interface TransactionsPostResponseData {
  newTransaction: TransactionData;
}

export interface NodesDataPostResponse {
  connectedTo: string[];
}

export interface NodesDataPatchResponse {
  addedNode: string;
  addedIn: string;
}

export interface NodesDataPutResponse {
  nodeUrl: string;
  connectedNodes: string[];
}
