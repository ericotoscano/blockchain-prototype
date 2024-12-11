import { IBlock } from '../../../../../domain/types/IBlock';
import { ITransaction } from '../../../../../domain/types/ITransaction';

export interface IMempoolManagement {
  readonly mempool: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getTransactionsByFee(minFee: number): ITransaction[];
}
