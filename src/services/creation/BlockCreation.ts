import { Block } from '../../models/Block';
import { BlockInputType, BlockMiningType, IBlock, MineBlockResultsType } from '../../types/block.types';
import { HashCreationType } from '../../types/creation.types';

export class BlockCreation {
  static create(input: BlockInputType, target: string, blockMining: BlockMiningType, hashCreation: HashCreationType): IBlock {
    const block: IBlock = new Block(input);

    const data: string = block.getData();

    const { hash, nonce }: MineBlockResultsType = blockMining.mine(data, target, hashCreation);

    block.hash = hash;
    block.nonce = nonce;

    return block;
  }
}
