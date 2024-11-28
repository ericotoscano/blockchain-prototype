import { ITransaction, TransactionStatusType } from '../types/transaction.types';

export class Transaction implements ITransaction {
  status: TransactionStatusType;

  constructor(readonly sender: string, readonly recipient: string, readonly amount: number, readonly fee: number, readonly txId: string, status: TransactionStatusType, readonly timestamp: number) {
    this.status = status;
  }

  setStatus(targetStatus: TransactionStatusType): void {
    this.status = targetStatus;
  }
}
