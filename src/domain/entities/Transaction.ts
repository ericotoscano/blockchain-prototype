import { ITransaction, TransactionStatusType } from '../../types/ITransaction';
import { ITransactionId } from '../value-objects/ITransactionId';
import { ITransactionTimestamp } from '../value-objects/ITransactionTimestamp';

export class Transaction implements ITransaction {
  private status: TransactionStatusType = 'Pending';

  constructor(readonly sender: string, readonly recipient: string, readonly amount: number, readonly fee: number, readonly txId: ITransactionId, readonly timestamp: ITransactionTimestamp) {}

  getStatus(): TransactionStatusType {
    return this.status;
  }

  setStatus(newStatus: TransactionStatusType): void {
    this.status = newStatus;
  }
}
