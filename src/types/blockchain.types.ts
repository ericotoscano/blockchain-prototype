import { IBlock } from './block.types';
import { INode } from './node.types';
import { ITransaction } from './transaction.types';

export type TargetManagementType = {
  calculate(targetZeros: number): string;
};

export type BlockchainInputType = {
  targetZeros: number;
  reward: number;
  maxTransactionsPerBlock: number;
};

export interface IGenesisBlockCreation {
  create(target: string): IBlock;
}

export interface IMempool {
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getPendingTransactions(minFee: number): ITransaction[];
}

export interface IBlocks {
  addBlock(block: IBlock): void;
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
}

export interface IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  readonly node: INode;
  mempool: IMempool;
  blocks: IBlocks;
  readonly targetManagement: TargetManagementType;
  readonly genesisBlockCreation: IGenesisBlockCreation;
  setTarget(targetZeros: number): void;
  setReward(blockReward: number): void;
  setMaxTransactionsPerBlock(maxNumber: number): void;
}
