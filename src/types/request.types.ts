import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface MineNextBlockRequest {
  nextBlockTransactions: Transactions[];
}
export interface UpdateNetworkNodesRequest {
  networkNodes: string[];
}
export interface ConnectNodeRequest {
  newNodeUrl: string;
}
export interface SendTransactionToMempoolRequest {
  from: string;
  to: string;
  amount: number;
  fee: number;
}
export interface RegisterTransactionInMempoolRequest {
  transaction: Transactions;
  originNode: string;
}
export interface BroadcastMinedBlockRequest {
  nextBlock: Blocks;
  origin: string;
}
