import crypto from 'crypto';
import { ITransactionId } from './ITransactionId';
import { ITransactionTimestamp } from './ITransactionTimestamp';

export class TransactionId implements ITransactionId {
  private readonly value: string;

  constructor(sender: string, recipient: string, amount: number, fee: number, timestamp: ITransactionTimestamp) {
    const transactionData: string = this.formatTransactionData(sender, recipient, amount, fee, timestamp);

    this.value = this.create(transactionData);
  }

  private create(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  private formatTransactionData(sender: string, recipient: string, amount: number, fee: number, timestamp: ITransactionTimestamp): string {
    return `${sender}${recipient}${amount}${fee}${timestamp.getValue()}`;
  }

  getValue(): string {
    return this.value;
  }

  equals(otherID: ITransactionId): boolean {
    if (!otherID) return false;

    return this.value === otherID.getValue();
  }
}
