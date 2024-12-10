import crypto from 'crypto';
import { ITransactionId } from './ITransactionId';

export class TransactionId implements ITransactionId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value || TransactionId.create();
  }

  static create(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  getValue(): string {
    return this.value;
  }
}
