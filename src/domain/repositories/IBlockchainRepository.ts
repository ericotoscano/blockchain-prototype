import { IBlockchain } from '../types/IBlockchain';
import { ITransaction } from '../types/ITransaction';

export interface IBlockchainRepository {
  getBlockchain(): IBlockchain;
  getTarget(): string;
  updateBlockchain(blockchain: IBlockchain): void;
  addTransactionToMempool(transaction: ITransaction): void;
}
