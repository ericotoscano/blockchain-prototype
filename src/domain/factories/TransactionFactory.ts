import { Transaction } from '../entities/Transaction';
import { ITransaction } from '../../types/ITransaction';
import { ITransactionId } from '../value-objects/ITransactionId';
import { ITransactionTimestamp } from '../value-objects/ITransactionTimestamp';
import { ITransactionFactory } from './ITransactionFactory';

export class TransactionFactory implements ITransactionFactory {
  constructor(private readonly id: ITransactionId, private readonly timestamp: ITransactionTimestamp) {}

  create(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    const txId = this.id;
    const timestamp = this.timestamp;

    return new Transaction(sender, recipient, amount, fee, txId, timestamp);
  }
}
