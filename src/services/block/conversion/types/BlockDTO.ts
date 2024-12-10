import { TransactionDTO } from '../../../transaction/conversion/types/TransactionDTO';

export type BlockDTO = {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionDTO[];
  timestamp: number;
};
