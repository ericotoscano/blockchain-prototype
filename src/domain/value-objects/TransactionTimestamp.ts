import { ITransactionTimestamp } from './ITransactionTimestamp';

export class TransactionTimestamp implements ITransactionTimestamp {
  private readonly value: number;

  constructor(value?: number) {
    this.value = value || this.create();
  }

  private create(): number {
    return Date.now();
  }

  getValue(): number {
    return this.value;
  }
}