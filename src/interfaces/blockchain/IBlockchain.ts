import { IBlocksManagement } from '../management/IBlocksManagement';
import { INode } from '../nodes/INode';
import { ITransaction } from '../transactions/ITransaction';
import { IBlock } from '../block/IBlock';

import { BlockMiningType } from '../../types/mining/BlockMiningType';
import { TargetManagementType } from '../../types/management/TargetManagementType';
import { BlockCreationType } from '../../types/creation/BlockCreationType';

export interface IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  readonly node: INode;
  mempool: ITransaction[];
  blocks: IBlock[];
  readonly blockMining: BlockMiningType;
  readonly targetManagement: TargetManagementType;
  readonly blockCreation: BlockCreationType;
  readonly blocksManagement: IBlocksManagement;
  setTarget(targetZeros: number): void;
  setReward(blockReward: number): void;
  setMaxTransactionsPerBlock(maxNumber: number): void;
}
