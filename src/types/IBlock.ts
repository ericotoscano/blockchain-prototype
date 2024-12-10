import { IBlockTransactionsManagement } from '../services/block/management/types/IBlockTransactionsManagement';
import { ITransaction } from './ITransaction';

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly transactions: ITransaction[];
  readonly blockTransactionsManagement: IBlockTransactionsManagement;
  getData(): string;
}
