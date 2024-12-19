import { IBlock } from '../domain/types/IBlock';
import { ITransaction } from '../domain/types/ITransaction';

export interface IBlocksService {
  readonly blocks: IBlock[];
  getPreviousBlock(): IBlock;
  getAllBlocksTransactions(): ITransaction[];
  getChainLength(): number;
  addBlock(block: IBlock): void;
}
