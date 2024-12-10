import { IBlock } from './IBlock';
import { INodeManagement } from './management.types';
import { INode } from './INode';
import { ITransaction } from './ITransaction';
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
