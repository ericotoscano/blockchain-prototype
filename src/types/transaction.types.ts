export interface TransactionType {
  txId: string;
  timestamp: Date;
  from: string;
  to: string;
  amount: number;
  fee: number;
}
