import { ValidationResponseType } from '../../../types/response.types';
import { ITransaction } from '../../../types/transaction.types';

export class MempoolTransactionsValidation {
  static validateByFee(minFee: number): ValidationResponseType {
    const TYPE: string = 'Mempool Transactions Validation By Minimum Fee';

    const transactions: ITransaction[] = global.blockchain.mempool.getTransactionsByFee(minFee);

    const result: boolean = transactions.length > 0;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'There are transactions in the mempool with fees higher than the minimum fee.' : 'There are no transactions in the mempool with fees higher than the minimum fee.',
    };
  }
}
