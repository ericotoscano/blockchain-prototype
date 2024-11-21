import { TransactionStatusType, ITransaction, ITransactionStatusManagement } from '../../../types/transaction.types';

export class TransactionStatusManagement implements ITransactionStatusManagement {
  constructor(private readonly transaction: ITransaction) {}

  changeStatus(targetStatus: TransactionStatusType): void {
    this.transaction.status = targetStatus;
  }
}
