export interface TransactionsType {
  txId: string;
  status: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  getData(): string;
  createTxId(): string;
  changeStatus(): void;
}
