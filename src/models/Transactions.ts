import { sha256 } from 'js-sha256';

import { TransactionsType } from '../types/transactions.types';
export class Transactions implements TransactionsType {
  txId: string;
  status: string;
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
    this.status = 'Pending';
    this.timestamp = new Date();
    this.txId = this.createTxId();
  }

  getData(): string {
    return this.timestamp.toString() + this.status + this.from + this.to + this.amount.toString() + this.fee.toString();
  }

  createTxId(): string {
    return sha256(this.getData());
  }

  changeStatus(): void {
    if (this.status === 'Pending') {
      this.status = 'Confirmed';
    } else {
      this.status = 'Pending';
    }
  }
}
