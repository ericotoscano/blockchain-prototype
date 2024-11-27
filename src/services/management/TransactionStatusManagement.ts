import { ITransactionStatusManagement } from '../../types/management.types';
import { ITransaction, TransactionStatusType } from '../../types/transaction.types';

export class TransactionStatusManagement implements ITransactionStatusManagement {
  constructor(private readonly transaction: ITransaction) {}

  changeStatus(targetStatus: TransactionStatusType): void {
    this.transaction.status = targetStatus;
  }
}
