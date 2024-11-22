import { TransactionStatusType } from '../../types/transactions/TransactionStatusType';

export interface ITransactionStatusManagement {
  changeStatus(targetStatus: TransactionStatusType): void;
}
