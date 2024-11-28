import { IBlock } from './block.types';
import { IConnectedNodes } from './node.types';
import { ITransaction, TransactionStatusType } from './transaction.types';

export interface INodeManagement {
  addToConnectedNodes(nodeUrl: string, nodeAddress: string): void;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNodes[];
  SortConnectedNodes(): void;
}

export interface IBlocksManagement {
  addBlock(block: IBlock): void;
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
}

export interface IMempoolManagement {
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getTransactionsByFee(minFee: number): ITransaction[];
}

export interface IBlockTransactionsManagement {
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
  getTransactions(): ITransaction[];
}

export type TargetManagementType = {
  calculate(targetZeros: number): string;
};
