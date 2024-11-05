import { sha256 } from 'js-sha256';

import { Transaction } from './Transaction';
import { TransactionData } from '../types/data.types';

export class Block {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: (Transaction | TransactionData)[];

  constructor(height: number = 0, nonce: number = 0, previousHash: string = '', transactions: (Transaction | TransactionData)[] = []) {
    this.height = height;
    this.nonce = nonce;
    this.hash = '';
    this.previousHash = previousHash;
    this.transactions = transactions;
  }

  getData(): string {
    return `${this.height}${this.nonce}${this.previousHash}${JSON.stringify(this.transactions)}`;
  }

  generateHash(targetDifficulty: string): void {
    let hash = sha256(this.getData());

    while (BigInt('0x' + hash) >= BigInt('0x' + targetDifficulty)) {
      this.nonce += 1;
      hash = sha256(this.getData());
    }

    this.hash = hash;
  }

  addTransaction(transaction: Transaction | TransactionData): void {
    this.transactions.push(transaction);
  }

  addRewardTransaction(reward: number, nodeAddress: string): void {
    const totalFees = this.transactions.reduce((sum, transaction) => sum + transaction.fee, 0);

    const rewardTransaction = new Transaction('Reward', nodeAddress, reward + totalFees, 0);

    this.transactions.unshift(rewardTransaction);
  }
}
