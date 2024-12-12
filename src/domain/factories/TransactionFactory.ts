import { Transaction } from '../entities/Transaction';
import { ITransaction } from '../types/ITransaction';
import { ITransactionId } from '../value-objects/ITransactionId';
import { ITransactionTimestamp } from '../value-objects/ITransactionTimestamp';
import { TransactionId } from '../value-objects/TransactionId';
import { TransactionTimestamp } from '../value-objects/TransactionTimestamp';
import { ITransactionFactory } from './ITransactionFactory';

export class TransactionFactory implements ITransactionFactory {
  createTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    const timestamp: ITransactionTimestamp = this.createTransactionTimestamp();

    const txId: ITransactionId = this.createTransactionId(sender, recipient, amount, fee, timestamp);

    return new Transaction(sender, recipient, amount, fee, txId, timestamp);
  }

  private createTransactionTimestamp(): ITransactionTimestamp {
    return new TransactionTimestamp();
  }

  private createTransactionId(sender: string, recipient: string, amount: number, fee: number, timestamp: ITransactionTimestamp): ITransactionId {
    return new TransactionId(sender, recipient, amount, fee, timestamp);
  }
}
