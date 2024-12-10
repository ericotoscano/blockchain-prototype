export interface ITransaction {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly txId: string;
  status: TransactionStatusType;
  readonly timestamp: number;
  setStatus(targetStatus: TransactionStatusType): void;
}

export type TransactionStatusType = 'Pending' | 'Sent' | 'Confirmed';