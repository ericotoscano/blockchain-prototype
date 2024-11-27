import { IBlockchain } from './blockchain.types';
import { TransactionStatusType } from './transaction.types';

export type BlockchainDTO = {
  blockchain: IBlockchain;
};

export type NodeDTO = {
  nodeUrl: string;
};

export type ConnectedNodesDTO = {
  connectedNodes: string[];
};

export type BlockDTO = {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionDTO[];
  timestamp: number;
};

export type MineBlockDTO = {
  minFee: number;
  selectedTransactions: TransactionDTO[];
};

export type TransactionDTO = {
  txId: string;
  status: TransactionStatusType;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  timestamp: number;
};

export type ResponseDTO<T> = {
  type: string;
  code: number;
  message: string;
  data: T;
};

export type ValidationDTO = {
  type: string;
  result: boolean;
  code: number;
  message: string;
};

export type ErrorDTO = {
  type: string;
  code: number;
  message: string;
};
