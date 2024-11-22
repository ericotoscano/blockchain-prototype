import { IBlock } from '../../interfaces/block/IBlock';
import { BlockMiningType } from '../mining/BlockMiningType';
import { BlockInputType } from '../block/BlockInputType';

export type BlockCreationType = {
  create(input: BlockInputType, target: string, blockMining: BlockMiningType): IBlock;
};
