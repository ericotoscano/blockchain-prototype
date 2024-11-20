import { BlockDataType } from './block.types';
import { IBlockchain } from './blockchain.types';

export type ResponseBaseType = {
  type: string;
  code: number;
  message: string;
};

export type ValidationResponseType = ResponseBaseType & {
  result: boolean;
};

export type BlockchainResponseType = ResponseBaseType & {
  data: { blockchain: IBlockchain };
};

export type NextBlockResponseType = ResponseBaseType & {
  data: { nextBlock: BlockDataType };
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
