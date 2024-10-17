import { TransactionsType } from './transactions.types';

export interface BlocksType {
  height: number;
  hash: string;
  previousHash: string;
  transactions: TransactionsType[];
  nonce: number;
  getData(): string;
  addTransaction(transaction: TransactionsType): void;
}
