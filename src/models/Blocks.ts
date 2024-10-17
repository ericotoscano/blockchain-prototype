import { BlocksType } from '../types/blocks.types';
import { Transactions } from './Transactions';

export class Blocks implements BlocksType {
  height: number;
  hash: string;
  previousHash: string;
  transactions: Transactions[];
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

  addTransaction(transaction: Transactions): void {
    this.transactions.push(transaction);
  }
}
