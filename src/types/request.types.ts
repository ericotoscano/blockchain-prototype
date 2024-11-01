import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';

export interface SendNextBlockRequest {
  minFee: number;
}

export interface UpdateBlockchainRequest {
  nextBlock: Blocks;
}

export interface NewNodeRequest {
  nodeUrl: string;
}

export interface UpdateConnectedNodesRequest {
  connectedNodes: string[];
}

export interface NewTransactionRequest {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  newTransaction: Transactions;
}

export interface RemoveTransactionRequest {
  txIds: string[];
}
