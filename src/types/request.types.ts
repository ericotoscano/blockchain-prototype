import { Transaction } from '../models/Transaction';

export interface UpdateNetworkNodesRequest {
  connectedNodes: string[];
}

export interface ConnectNodeRequest {
  newNodeUrl: string;
}
export interface RegisterNodeRequest {
  origin: string;
  target: string;
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
