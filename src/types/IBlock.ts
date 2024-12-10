import { IBlockTransactionsManagement } from '../services/block/management/types/IBlockTransactionsManagement';
import { ITransaction } from './ITransaction';

export interface IBlock {
  readonly height: number;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly transactions: ITransaction[];
  readonly blockTransactionsManagement: IBlockTransactionsManagement;
  getNonce(): number;
  getHash(): string;
  getData(): string;
  setNonce(blockNonce: number): void;
  setHash(blockHash: string): void;
}
