import { TransactionDTO } from '../../types/dto.types';
import { ITransaction } from '../../types/transaction.types';

export class MempoolTransactionsSelection {
  static selectMempoolTransactionsByFee(minFee: number): TransactionDTO[] {
    const transactions: ITransaction[] = global.blockchain.mempoolManagement.getTransactionsByFee(minFee);
    const maxTransactionsPerBlock: number = global.blockchain.maxTransactionsPerBlock;

    const selectedTransactions: ITransaction[] = transactions.sort((a, b) => b.fee - a.fee).slice(0, maxTransactionsPerBlock - 1);

    return selectedTransactions;
  }
}
