import { sha256 } from 'js-sha256';

import { TransactionType } from '../types/transaction.types';

export class Transaction implements TransactionType {
  txId: string;
  timestamp: Date;
  from: string;
  to: string;
  amount: number;
  fee: number;

  constructor(from: string, to: string, amount: number, fee: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.fee = fee;
    this.timestamp = new Date();
    this.txId = this.createTxId();
  }

  getData(): string {
    return JSON.stringify(this.timestamp) + this.from + this.to + this.amount + this.fee;
  }

  createTxId(): string {
    return sha256(this.getData());
  }
}
