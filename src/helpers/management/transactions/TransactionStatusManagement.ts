import { ITransactionStatusManagement } from '../../../interfaces/management/ITransactonStatusManagement';
import { ITransaction } from '../../../interfaces/transactions/ITransaction';

import { TransactionStatusType } from '../../../types/transactions/TransactionStatusType';

export class TransactionStatusManagement implements ITransactionStatusManagement {
  constructor(private readonly transaction: ITransaction) {}

  changeStatus(targetStatus: TransactionStatusType): void {
    this.transaction.status = targetStatus;
  }
}
