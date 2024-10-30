import { Transactions } from './Transactions';

export class Blocks {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: Transactions[];

  constructor(height: number = 0, nonce: number = 0, hash: string = '', previousHash: string = '', transactions: Transactions[] = []) {
    this.height = height;
    this.nonce = nonce;
    this.hash = hash;
    this.previousHash = previousHash;
    this.transactions = transactions;
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
