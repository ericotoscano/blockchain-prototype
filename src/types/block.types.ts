import { TransactionDataType, ITransaction } from './transaction.types';

export type MineBlockResultsType = {
  hash: string;
  nonce: number;
};

export type BlockDataType = {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionDataType[];
  timestamp: number;
};

export type NewBlockInputType = {
  height: number;
  previousHash: string;
  transactions: ITransaction[];
};

export interface IBlockMining {
  mine(data: string, target: string): MineBlockResultsType;
}

export interface IBlockTransactionsManagement {
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
  getTransactions(): ITransaction[];
}

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: ITransaction[];
  getData(): string;
}
