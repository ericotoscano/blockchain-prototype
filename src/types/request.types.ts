import { Transactions } from '../models/Transactions';

export interface UpdateNetworkNodesRequest {
  networkNodes: string[];
}

export interface ConnectNodeRequest {
  newNodeUrl: string;
}
export interface RegisterNodeRequest {
  from: string;
  to: string;
}

export interface MineNextBlockRequest {
  nextBlockTransactions: Transactions[];
}

export interface CreateTransactionRequest {
  from: string;
  to: string;
  amount: number;
  fee: number;
}
