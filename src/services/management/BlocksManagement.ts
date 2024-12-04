import { IBlock } from '../../types/block.types';
import { IBlocksManagement } from '../../types/management.types';
import { ITransaction } from '../../types/transaction.types';

export class BlocksManagement implements IBlocksManagement {
  private _blocks: IBlock[];

  constructor(blockchainBlocks: IBlock[]) {
    this._blocks = blockchainBlocks;
  }

  get blocks(): IBlock[] {
    return [...this._blocks];
  }

  getPreviousBlock(): IBlock {
    return this._blocks[this.blocks.length - 1];
  }

  getAllBlocksTransactions(): ITransaction[] {
    return this._blocks.flatMap((block) => block.transactions);
  }

  getChainLength(): number {
    return this._blocks.length;
  }

  addBlock(block: IBlock): void {
    this._blocks.push(block);
  }
}
