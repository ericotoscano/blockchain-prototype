import { TransactionType } from './transaction.types';

export interface BlockType {
  index: number;
  timestamp: Date;
  hash: string;
  previousHash: string;
  transactions: TransactionType[];
  nonce: number;
  getData(): string;
  addTransaction(transaction: TransactionType): void;
}
