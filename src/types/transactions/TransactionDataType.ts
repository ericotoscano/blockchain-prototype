import { TransactionStatusType } from './TransactionStatusType';

export type TransactionDataType = {
  txId: string;
  status: TransactionStatusType;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  timestamp: number;
};
