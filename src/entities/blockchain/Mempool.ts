import { IMempool } from '../../types/blockchain.types';
import { IBlock } from '../../types/block.types';
import { ITransaction } from '../../types/transaction.types';

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

  getTransactionsByFee(minFee: number): ITransaction[] {
    return this.mempoolTransactions.filter((mempoolTransaction) => mempoolTransaction.fee >= minFee);
  }
}
