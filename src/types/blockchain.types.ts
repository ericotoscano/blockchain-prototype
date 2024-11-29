import { IBlock } from './block.types';
import { INode } from './node.types';
import { ITransaction } from './transaction.types';
import { IBlocksManagement, IMempoolManagement, INodeManagement } from './management.types';

export interface IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  readonly node: INode;
  readonly mempool: ITransaction[];
  readonly blocks: IBlock[];
  readonly nodeManagement: INodeManagement;
  readonly mempoolManagement: IMempoolManagement;
  readonly blocksManagement: IBlocksManagement;
}
