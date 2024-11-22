import { TransactionIdCreationType } from '../../types/creation/TransactionIdCreationType';
import { TransactionStatusType } from '../../types/transactions/TransactionStatusType';

export interface ITransaction {
  readonly txId: string;
  status: TransactionStatusType;
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly timestamp: number;
  readonly transactionIdCreation: TransactionIdCreationType;
  getData(): string;
}
