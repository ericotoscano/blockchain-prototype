import { ITransaction } from '../../../domain/types/ITransaction';

export class TransactionCalculation {
  static getTotalFee(transactions: ITransaction[]): number {
    return transactions.reduce((sum, transaction) => sum + transaction.fee, 0);
  }
}
