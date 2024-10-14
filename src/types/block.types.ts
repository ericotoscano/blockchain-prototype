import { TransactionType } from './transaction.types';

export interface BlockType {
  height: number;
  hash: string;
  previousHash: string;
  transactions: TransactionType[];
  nonce: number;
  getData(): string;
  addTransaction(transaction: TransactionType): void;
}
