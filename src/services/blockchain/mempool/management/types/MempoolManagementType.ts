import { IBlock } from '../../../../../types/IBlock';
import { ITransaction } from '../../../../../types/ITransaction';

export interface IMempoolManagement {
  readonly mempool: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getTransactionsByFee(minFee: number): ITransaction[];
}
