import { TransactionType } from './types/transaction.types';

export class Transaction implements TransactionType {
  from: string;
  to: string;
  amount: number;

  constructor(from: string, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
