import { TransactionStatusType } from '../../domain/types/ITransaction';

export interface SubmitTransactionOutputDTO {
  txId: string;
  status: TransactionStatusType;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;

  timestamp: number;
}
