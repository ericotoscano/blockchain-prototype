import { IBlock } from '../../../../../types/block.types';
import { ITransaction } from '../../../../../types/transaction.types';

export interface IMempoolManagement {
  readonly mempool: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getTransactionsByFee(minFee: number): ITransaction[];
}
