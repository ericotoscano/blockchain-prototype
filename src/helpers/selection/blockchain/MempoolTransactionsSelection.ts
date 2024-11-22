import { ITransaction } from '../../../interfaces/transactions/ITransaction';
import { SelectionResponseType } from '../../../types/response/SelectionResponseType';

export class MempoolTransactionsSelection {
  static selectMempoolTransactionsByFee(minFee: number): SelectionResponseType {
    const transactions: ITransaction[] = global.blockchain.mempoolManagement.getTransactionsByFee(minFee);
    const maxTransactionsPerBlock: number = global.blockchain.maxTransactionsPerBlock;

    const selectedTransactions: ITransaction[] = transactions.sort((a, b) => b.fee - a.fee).slice(0, maxTransactionsPerBlock - 1);

    return { data: selectedTransactions };
  }
}
