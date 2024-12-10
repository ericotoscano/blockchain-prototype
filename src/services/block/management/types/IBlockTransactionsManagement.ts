import { ITransaction } from '../../../../types/ITransaction';

export interface IBlockTransactionsManagement {
  readonly transactions: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
}
