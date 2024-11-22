import { TransactionDataType } from '../transactions/TransactionDataType';

export type BlockDataType = {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionDataType[];
  timestamp: number;
};
