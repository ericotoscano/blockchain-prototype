import { IBlock } from './block.types';
import { IBlockchain } from './blockchain.types';
import { AddBlockDependenciesType } from './dependencies.types';
import { BlockDTO } from './dto.types';
import { IConnectedNode, INode } from './node.types';
import { ITransaction } from './transaction.types';

export interface IBlockchainManagement {
  readonly blockchain: IBlockchain;
  addBlock(blockDTO: BlockDTO, dependencies: AddBlockDependenciesType): void
}

export interface INodeManagement {
  readonly node: INode;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNode[];
  setNodeToConnect(nodeToConnect: INode): IConnectedNode;
  setConnectedNodes(connectedNodes: IConnectedNode[]): void;
  addToConnectedNodes(nodeToConnect: IConnectedNode): void;
}

export interface IBlocksManagement {
  readonly blocks: IBlock[];
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
  getChainLength(): number;
  addBlock(block: IBlock): void;
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
