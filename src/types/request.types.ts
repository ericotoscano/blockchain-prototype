import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface NewNodeRequest {
  newNodeUrl: string;
}
export interface UpdateNetworkNodesRequest {
  networkNodes: string[];
}
export interface CreateNextBlockRequest {
  nextBlockTransactions: Transactions[];
}
export interface SendTransactionToMempoolRequest {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
}
export interface RegisterTransactionInMempoolRequest {
  transaction: Transactions;
}
export interface RegisterCreatedBlockRequest {
  nextBlock: Blocks;
}
