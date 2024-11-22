import { Block } from '../../../entities/block/Block';

import { IBlock } from '../../../interfaces/block/IBlock';

import { Sha256HashCreation } from '../../../utils/creation/Sha256HashCreation';

import { BlockInputType } from '../../../types/block/BlockInputType';
import { BlockMiningType } from '../../../types/mining/BlockMiningType';
import { MineBlockResultsType } from '../../../types/results/MineBlockResultsType';

export class BlockCreation {
  static create(input: BlockInputType, target: string, blockMining: BlockMiningType): IBlock {
    const block: IBlock = new Block(input);

    const data: string = block.getData();

    const { hash, nonce }: MineBlockResultsType = blockMining.mine(data, target, Sha256HashCreation);

    block.hash = hash;
    block.nonce = nonce;

    return block;
  }
}
