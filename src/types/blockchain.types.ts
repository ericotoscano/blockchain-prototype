import { IBlock } from './block.types';
import { INode } from './node.types';
import { ITransaction } from './transaction.types';
import { IBlocksManagement, IMempoolManagement, INodeManagement } from './management.types';

export interface IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  readonly node: INode;
  mempool: ITransaction[];
  blocks: IBlock[];
  nodeManagement: INodeManagement;
  mempoolManagement: IMempoolManagement;
  blocksManagement: IBlocksManagement;
  getTarget(): string
  setTarget(target: string): void;
  setReward(blockReward: number): void;
  setMaxTransactionsPerBlock(maxNumber: number): void;
}
