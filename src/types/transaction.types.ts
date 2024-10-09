export interface TransactionType {
  txId: string;
  status: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: Date;
}
