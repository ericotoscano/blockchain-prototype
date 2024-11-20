import { HashCreationType } from './crypto.types';

export type TransactionStatusType = 'Pending' | 'Sent' | 'Confirmed';

export type TransactionCalculationType = {
  getTotalFee(transactions: ITransaction[]): number;
};

export type NewTransactionInputType = {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
};

export type TransactionDataType = {
  txId: string;
  status: TransactionStatusType;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  timestamp: number;
};

export type TransactionIdCreationType = {
  create(data: string, hashCreation: HashCreationType): string;
};

export interface IRewardTransactionCreation {
  create(): ITransaction;
}

export interface ITransactionStatusManagement {
  changeStatus(targetStatus: TransactionStatusType): void;
}

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
