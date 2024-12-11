import { IBlock } from '../../../../domain/types/IBlock';
import { ITransaction } from '../../../../domain/types/ITransaction';
import { IMempoolManagement } from './types/MempoolManagementType';

export class MempoolManagement implements IMempoolManagement {
  private _mempoolTransactions: ITransaction[];

  constructor(mempoolTransacions: ITransaction[]) {
    this._mempoolTransactions = mempoolTransacions;
  }

  get mempool(): ITransaction[] {
    return [...this._mempoolTransactions];
  }

  addTransaction(transaction: ITransaction): void {
    this._mempoolTransactions.push(transaction);
  }

  removeConfirmedTransactions(nextBlock: IBlock): void {
    const transactionsIdsToRemove = new Set(nextBlock.transactions.map((transaction) => transaction.txId));

    const filteredMempool = this._mempoolTransactions.filter((mempoolTransaction) => !transactionsIdsToRemove.has(mempoolTransaction.txId));

    this._mempoolTransactions = filteredMempool;
  }

  getTransactionsByFee(minFee: number): ITransaction[] {
    return this._mempoolTransactions.filter((mempoolTransaction) => mempoolTransaction.fee >= minFee);
  }
}
