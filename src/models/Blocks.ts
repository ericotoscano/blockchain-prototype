import { BlocksType } from '../types/blocks.types';
import { Transactions } from './Transactions';
import { Blockchain } from './Blockchain';

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

  addRewardTransaction(): void {
    const allFees = this.transactions.reduce((sum, transaction) => sum + transaction.fee, 0);

    const rewardTransaction = new Transactions('Block Reward', 'Miner Address', blockchain.reward + allFees, 0);

    this.transactions.unshift(rewardTransaction);
  }
}
