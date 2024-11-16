import { ITransaction } from '../transaction/Transaction';

export type FeeCalculationType = {
  getTotalFee(transactions: ITransaction[]): number;
};

export class FeeCalculation {
  static getTotalFee(transactions: ITransaction[]): number {
    return transactions.reduce((sum, transaction) => sum + transaction.fee, 0);
  }
}
