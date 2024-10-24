import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';

/* declare global {
  namespace Express {
    interface Request {
      formattedTransaction: Transactions;
    }
  }
} */
export interface NewNodeRequest {
  newNodeUrl: string;
}
export interface UpdateNetworkNodesRequest {
  networkNodes: string[];
}
export interface MineNextBlockRequest {
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
export interface BroadcastMinedBlockRequest {
  nextBlock: Blocks;
  origin: string;
}
