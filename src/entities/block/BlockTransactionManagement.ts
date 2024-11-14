import { ITransaction } from '../transaction/Transaction';

export interface IBlockTransactionManagement {
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
  getTransactions(): ITransaction[];
}

export class BlockTransactionManagement implements IBlockTransactionManagement {
  constructor(private readonly blockTransactions: ITransaction[]) {}

  addTransaction(transaction: ITransaction): void {
    this.blockTransactions.push(transaction);
  }

  addRewardTransaction(rewardTransaction: ITransaction): void {
    this.blockTransactions.unshift(rewardTransaction);
  }

  getTransactions(): ITransaction[] {
    return [...this.blockTransactions];
  }
}
