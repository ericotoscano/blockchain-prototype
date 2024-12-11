import { ITransaction } from '../../../../domain/types/ITransaction';

export type TransactionCalculationType = {
  getTotalFee(transactions: ITransaction[]): number;
};
