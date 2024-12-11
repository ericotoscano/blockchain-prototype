import { IBlockTransactionsManagement } from './types/IBlockTransactionsManagement';
import { ITransaction } from '../../../domain/types/ITransaction';

export class BlockTransactionsManagement implements IBlockTransactionsManagement {
  private _blockTransactions: ITransaction[];

  constructor(blockTransactions: ITransaction[]) {
    this._blockTransactions = blockTransactions;
  }

  get transactions(): ITransaction[] {
    return [...this._blockTransactions];
  }

  addTransaction(transaction: ITransaction): void {
    this._blockTransactions.push(transaction);
  }

  addRewardTransaction(rewardTransaction: ITransaction): void {
    this._blockTransactions.unshift(rewardTransaction);
  }
}
