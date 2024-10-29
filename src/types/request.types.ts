import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface NewNodeRequest {
  nodeUrl: string;
}
export interface UpdateConnectedNodesRequest {
  connectedNodes: string[];
}
export interface RegisterNextBlockRequest {
  nextBlock: Blocks;
}
export interface BroadcastNextBlockRequest {
  nextBlockTransactions: Transactions[];
}

export interface NewTransactionRequest {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  newTransaction: Transactions;
}
