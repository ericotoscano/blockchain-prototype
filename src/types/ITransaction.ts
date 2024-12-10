import { ITransactionId } from '../domain/value-objects/ITransactionId';
import { ITransactionTimestamp } from '../domain/value-objects/ITransactionTimestamp';

export interface ITransaction {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly txId: ITransactionId;
  readonly timestamp: ITransactionTimestamp;
  getStatus(): TransactionStatusType;
  setStatus(targetStatus: TransactionStatusType): void;
}

export type TransactionStatusType = 'Pending' | 'Sent' | 'Confirmed';
