import { sha256 } from 'js-sha256';

import { TransactionsType } from '../types/transactions.types';

export class Transactions implements TransactionsType {
  txId: string;
  status: string;
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
    this.txId = this.createTxId();
  }

  getData(): string {
    return this.status + this.from + this.to + this.amount.toString() + this.fee.toString();
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
