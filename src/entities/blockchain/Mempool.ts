import { ITransaction } from '../transaction/Transaction';
import { IBlock } from '../block/Block';

export interface IMempool {
  addTransaction(transaction: ITransaction): void;
  removeConfirmedTransactions(nextBlock: IBlock): void;
  getPendingTransactions(minFee: number): ITransaction[];
}

export class Mempool implements IMempool {
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

  getPendingTransactions(minFee: number): ITransaction[] {
    return this.mempoolTransactions.filter((mempoolTransaction) => mempoolTransaction.status === 'Pending' && mempoolTransaction.fee > minFee);
  }
}
