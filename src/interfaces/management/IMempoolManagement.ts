import { IBlock } from '../block/IBlock';
import { ITransaction } from '../transactions/ITransaction';

export interface IMempoolManagement {
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getTransactionsByFee(minFee: number): ITransaction[];
}
