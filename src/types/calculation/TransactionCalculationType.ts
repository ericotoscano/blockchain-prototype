import { ITransaction } from '../../interfaces/transactions/ITransaction';

export type TransactionCalculationType = {
  getTotalFee(transactions: ITransaction[]): number;
};
