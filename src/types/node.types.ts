import { TransactionType } from './transaction.types';

export interface NodeType {
  url: string;
  mempool: TransactionType[];
}
