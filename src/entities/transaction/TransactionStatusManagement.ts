import { ITransaction } from './Transaction';

export type TransactionStatusType = 'Pending' | 'Sent' | 'Confirmed';

export interface ITransactionStatusManagement {
  changeStatus(targetStatus: TransactionStatusType): void;
}

export class TransactionStatusManagement implements ITransactionStatusManagement {
  constructor(private readonly transaction: ITransaction) {}

  changeStatus(targetStatus: TransactionStatusType): void {
    this.transaction.status = targetStatus;
  }
}
