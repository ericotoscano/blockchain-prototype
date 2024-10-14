import { BlockType } from '../types/block.types';
import { Transaction } from './Transaction';

export class Block implements BlockType {
  height: number;
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
  }

  getData(): string {
    return JSON.stringify(this.transactions) + this.height + this.previousHash + this.nonce;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
}
