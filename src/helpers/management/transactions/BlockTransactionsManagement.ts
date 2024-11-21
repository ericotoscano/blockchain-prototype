import { ITransaction } from '../../../types/transaction.types';
import { IBlockTransactionsManagement } from '../../../types/block.types';

export class BlockTransactionsManagement implements IBlockTransactionsManagement {
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
