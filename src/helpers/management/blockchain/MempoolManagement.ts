import { IMempoolManagement } from '../../../interfaces/management/IMempoolManagement';
import { ITransaction } from '../../../interfaces/transactions/ITransaction';
import { IBlock } from '../../../interfaces/block/IBlock';

export class MempoolManagement implements IMempoolManagement {
  private mempoolTransactions: ITransaction[];

  constructor(mempoolTransacions: ITransaction[]) {
    this.mempoolTransactions = mempoolTransacions;
  }

  addTransaction(transaction: ITransaction): void {
    this.mempoolTransactions.push(transaction);
  }

  removeConfirmedTransactions(nextBlock: IBlock): void {
    const transactionsIdsToRemove = new Set(nextBlock.transactions.map((transaction) => transaction.txId));

    const filteredMempool = this.mempoolTransactions.filter((mempoolTransaction) => !transactionsIdsToRemove.has(mempoolTransaction.txId));

    this.mempoolTransactions = filteredMempool;
  }

  getTransactionsByFee(minFee: number): ITransaction[] {
    return this.mempoolTransactions.filter((mempoolTransaction) => mempoolTransaction.fee >= minFee);
  }
}
