import { IBlock } from './block.types';
import { IConnectedNode, INode } from './node.types';
import { ITransaction } from './transaction.types';

export interface INodeManagement {
  readonly node: INode;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNode[];
  setNodeToConnect(nodeToConnect: INode): IConnectedNode;
  setConnectedNodes(connectedNodes: IConnectedNode[]): void;
  addToConnectedNodes(nodeToConnect: IConnectedNode): void;
}

export interface IBlocksManagement {
  readonly blocks: IBlock[];
  addBlock(block: IBlock): void;
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
}

export interface IMempoolManagement {
  readonly mempool: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getTransactionsByFee(minFee: number): ITransaction[];
}

export interface IBlockTransactionsManagement {
  readonly transactions: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
}

export type TargetManagementType = {
  calculate(targetZeros: number): string;
};
