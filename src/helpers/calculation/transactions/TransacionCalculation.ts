import { ITransaction } from '../../../interfaces/transactions/ITransaction';

export class TransactionCalculation {
  static getTotalFee(transactions: ITransaction[]): number {
    return transactions.reduce((sum, transaction) => sum + transaction.fee, 0);
  }
}
