import { sha256 } from 'js-sha256';

import { TransactionsType } from '../types/transactions.types';

export class Transactions implements TransactionsType {
  txId: string;
  status: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: Date;

  constructor(from: string, to: string, amount: number, fee: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.fee = fee;
    this.timestamp = new Date();
    this.status = 'Pending';
    this.txId = this.createTxId();
  }

  getData(): string {
    return JSON.stringify(this.timestamp) + this.status + this.from + this.to + this.amount + this.fee;
  }

  createTxId(): string {
    return sha256(this.getData());
  }

  changeStatus() {
    if (this.status === 'Pending') {
      this.status = 'Confirmed';
    } else {
      this.status = 'Pending';
    }
  }
}
