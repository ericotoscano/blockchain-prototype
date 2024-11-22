import { ITransaction } from '../transactions/ITransaction';

export interface IBlockTransactionsManagement {
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
  getTransactions(): ITransaction[];
}
