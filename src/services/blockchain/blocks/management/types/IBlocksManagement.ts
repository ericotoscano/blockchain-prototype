import { IBlock } from '../../../../../types/IBlock';
import { ITransaction } from '../../../../../types/ITransaction';

export interface IBlocksManagement {
  readonly blocks: IBlock[];
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
  getChainLength(): number;
  addBlock(block: IBlock): void;
}
