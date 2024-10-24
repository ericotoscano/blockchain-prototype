export interface TransactionsType {
  txId: string;
  status: string;
  timestamp: Date;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  getData(): string;
  createTxId(): string;
  changeStatus(): void;
}
