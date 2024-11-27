import { TransactionIdCreationType } from './creation.types';

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

export type TransactionInputType = {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
};

export type TransactionCalculationType = {
  getTotalFee(transactions: ITransaction[]): number;
};

export type TransactionStatusType = 'Pending' | 'Sent' | 'Confirmed';
