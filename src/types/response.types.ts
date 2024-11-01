import { Blockchain } from '../models/Blockchain';
import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface MiddlewareResponse {
  message: string;
}
export interface CustomResponse<T> {
  message: string;
  data: T;
}

export interface NewTransactionData {
  newTransaction: Transactions;
}

export interface RemoveTransactionsData {
  txIds: string[];
}

export interface GetBlockchainData {
  blockchain: Blockchain;
}

export interface NextBlockData {
  nextBlock: Blocks;
}

export interface ConnectNodesData {
  connectedTo: string[];
}

export interface AddNewNodeData {
  addedNode: string;
  addedIn: string;
}

export interface UpdateConnectedNodesData {
  nodeUrl: string;
  connectedNodes: string[];
}

export interface ErrorData {
  code: number;
  message: string;
}
