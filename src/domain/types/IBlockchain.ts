import { IBlock } from './IBlock';
import { INode } from './INode';
import { ITransaction } from './ITransaction';
import { IBlocksManagement } from '../services/IBlocksService';
import { IMempoolManagement } from '../../services/blockchain/mempool/management/types/MempoolManagementType';
import { INodeManagement } from '../../services/node/management/types/INodeManagement';

export interface IBlockchain {
  readonly node: INode;
  readonly mempool: ITransaction[];
  readonly blocks: IBlock[];
  readonly nodeManagement: INodeManagement;
  readonly mempoolManagement: IMempoolManagement;
  readonly blocksManagement: IBlocksManagement;
  getTarget(): string;
  getReward(): number;
  getmaxTransactionsPerBlock(): number;
  setTarget(newTarget: string): void;
  setReward(newReward: number): void;
  setMaxTransactionsPerBlock(newMaxTransactionsPerBlock: number): void;
}
