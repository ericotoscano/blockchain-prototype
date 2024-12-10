import { TransactionStatusType } from '../../../../types/ITransaction';

export type TransactionDTO = {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  txId: string;
  status: TransactionStatusType;
  timestamp: number;
};
