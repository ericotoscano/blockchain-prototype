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

export interface RegisterNodeData {
  registeredNode: string;
  registeredIn: string;
}
export interface ConnectNodesData {
  connectedTo: string[];
}

export interface UpdateConnectedNodesData {
  nodeUrl: string;
  connectedNodes: string[];
}
export interface NewTransactionData {
  newTransaction: Transactions;
}
export interface GetAllPendingTransactionsData {
  pendingTransactions: Transactions[];
}

export interface NextBlockData {
  nextBlock: Blocks;
}

export interface GetBlockchainData {
  blockchain: Blockchain;
}

export interface ErrorData {
  code: number;
  message: string;
}
