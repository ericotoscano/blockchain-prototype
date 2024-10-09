import { BlockType } from '../types/block.types';
import { Transaction } from './Transaction';

export class Block implements BlockType {
  height: number;
  timestamp: Date;
  hash: string;
  previousHash: string;
  transactions: Transaction[];
  nonce: number;

  constructor() {
    this.height = 0;
    this.nonce = 0;
    this.hash = '';
    this.previousHash = '';
    this.transactions = [];
    this.timestamp = new Date();
  }

  getData(): string {
    return this.height + JSON.stringify(this.timestamp) + this.previousHash + JSON.stringify(this.transactions) + this.nonce;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
}
