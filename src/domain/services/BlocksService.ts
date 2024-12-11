import { IBlock } from '../types/IBlock';
import { ITransaction } from '../types/ITransaction';

export class BlocksService implements IBlocksService {
  constructor(private blocks: IBlock[]) {}

  get blocks(): IBlock[] {
    return [...this.blocks];
  }

  getPreviousBlock(): IBlock {
    return this.blocks[this.blocks.length - 1];
  }

  getAllBlocksTransactions(): ITransaction[] {
    return this.blocks.flatMap((block) => block.transactions);
  }

  getChainLength(): number {
    return this.blocks.length;
  }

  addBlock(block: IBlock): void {
    this.blocks.push(block);
  }
}
