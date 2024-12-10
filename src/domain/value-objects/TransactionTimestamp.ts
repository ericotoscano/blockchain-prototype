import { ITransactionTimestamp } from './ITransactionTimestamp';

export class TransactionTimestamp implements ITransactionTimestamp {
  private readonly value: number;

  constructor(value?: number) {
    this.value = value || TransactionTimestamp.create();
  }

  static create(): number {
    return Date.now();
  }

  getValue(): number {
    return this.value;
  }
}
