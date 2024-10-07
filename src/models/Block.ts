import { BlockType } from './types/block.types';
import { Transaction } from './Transaction';

export class Block implements BlockType {
  index: number;
  timestamp: Date;
  hash: string;
  previousHash: string;
  transactions: Transaction[];
  nonce: number;

  constructor() {
    this.index = 0;
    this.timestamp = new Date();
    this.hash = '';
    this.previousHash = '';
    this.transactions = [];
    this.nonce = 0;
  }

  getData(): string {
    return this.index + JSON.stringify(this.timestamp) + this.previousHash + JSON.stringify(this.transactions) + this.nonce;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
}
