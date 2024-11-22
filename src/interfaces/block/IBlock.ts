import { ITransaction } from '../transactions/ITransaction';

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: ITransaction[];
  getData(): string;
}
