import { IBlock } from '../../../../../types/block.types';
import { ITransaction } from '../../../../../types/transaction.types';

export interface IBlocksManagement {
  readonly blocks: IBlock[];
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
  getChainLength(): number;
  addBlock(block: IBlock): void;
}
