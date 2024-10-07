import { NodeType } from '../types/node.types';
import { TransactionType } from '../types/transaction.types';
export class Node implements NodeType {
  url: string;
  mempool: TransactionType[];

  constructor(url: string) {
    this.url = url;
    this.mempool = [];
  }
}
