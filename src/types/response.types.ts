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
export interface ConnectNodesData {
  connectedTo: string[];
}
export interface RegisterNodeData {
  registeredNode: string;
  registeredIn: string;
}

export interface UpdateConnectedNodesData {
  node: string;
  connectedNodes: string[];
}

export interface GetAllPendingTransactionsData {
  pendingTransactions: Transactions[];
}
export interface SendTransactionToMempoolData {
  transaction: { txId: string; status: string; timestamp: Date; sender: string; recipient: string; amount: number; fee: number };
}

export interface RegisterTransactionInMempoolData {
  transaction: Transactions;
}

export interface GetBlockchainData {
  blockchain: Blockchain;
}

export interface CreateNextBlockData {
  block: {
    height: number;
    hash: string;
    previousHash: string;
    transactions: Transactions[];
    nonce: number;
  };
}

export interface RegisterCreatedBlockData {
  block: Blocks;
}

export interface ErrorData {
  code: number;
  message: string;
}
