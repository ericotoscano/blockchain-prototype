export interface TransactionsType {
  txId: string;
  status: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: Date;
  getData(): string;
  createTxId(): string;
  changeStatus(): void;
}
