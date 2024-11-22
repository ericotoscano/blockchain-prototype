import { IBlock } from '../block/IBlock';
import { ITransaction } from '../transactions/ITransaction';

export interface IBlocksManagement {
  addBlock(block: IBlock): void;
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
}
