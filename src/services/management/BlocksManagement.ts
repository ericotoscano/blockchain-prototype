import { IBlock } from '../../types/block.types';
import { IBlocksManagement } from '../../types/management.types';
import { ITransaction } from '../../types/transaction.types';

export class BlocksManagement implements IBlocksManagement {
  private readonly blocks: IBlock[];

  constructor(blocks: IBlock[]) {
    this.blocks = blocks;
  }

  addBlock(block: IBlock): void {
    this.blocks.push(block);
  }

  getPreviousBlock(): IBlock {
    return this.blocks[this.blocks.length - 1];
  }

  getAllBlocksTransactions(): ITransaction[] {
    const allBlocksTransactions: ITransaction[] = [];

    for (let i = 0; i < this.blocks.length; i++) {
      allBlocksTransactions.push(...this.blocks[i].transactions);
    }

    return allBlocksTransactions;
  }
}
