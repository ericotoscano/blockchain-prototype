import { Blocks } from "../models/Blocks";
import { Transactions } from "../models/Transactions";

export interface SendNextBlockRequest {
  minFee: number;
}

export interface UpdateBlockchainRequest {
  nextBlock: Blocks;
}

export interface SendNewNodeRequest {
  nodeUrl: string;
}

export interface UpdateConnectedNodesRequest {
  connectedNodes: string[];
}

export interface SendNewTransactionRequest {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
}

export interface AddNewTransactionRequest {
  newTransaction: Transactions;
}
