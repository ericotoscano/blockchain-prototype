import { IBlock } from '../block/Block';

export interface IBlocks {
  addBlock(block: IBlock): void;
  getPreviousBlock(): IBlock;
}

export class Blocks implements IBlocks {
  constructor(private readonly blocks: IBlock[]) {}

  addBlock(block: IBlock): void {
    this.blocks.push(block);
  }

  getPreviousBlock(): IBlock {
    return this.blocks[this.blocks.length - 1];
  }
}
