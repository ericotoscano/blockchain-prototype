import { ITransaction } from '../../interfaces/transactions/ITransaction';

export type BlockInputType = {
  height: number;
  previousHash: string;
  transactions: ITransaction[];
};
