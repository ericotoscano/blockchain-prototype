import { Transaction } from '../models/Transaction';

export interface UpdateNetworkNodesRequest {
  allNetworkNodes: string[];
}

export interface RegisterNodeRequest {
  newNodeUrl: string;
}

export interface MineNextBlockRequest {
  nextBlockTransactions: Transaction[];
}

export interface CreateTransactionRequest {
  from: string;
  to: string;
  amount: number;
  fee: number;
}
