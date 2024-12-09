import { IBlock } from './block.types';
import { INodeManagement } from './management.types';
import { INode } from './node.types';
import { ITransaction } from './transaction.types';
import { IBlocksManagement } from '../services/blockchain/blocks/management/types/IBlocksManagement';
import { IMempoolManagement } from '../services/blockchain/mempool/management/types/MempoolManagementType';

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
