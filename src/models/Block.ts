import { IBlock } from '../types/IBlock';
import { IBlockTransactionsManagement } from '../types/management.types';
import { ITransaction } from '../types/ITransaction';

export class Block implements IBlock {
  nonce: number;
  hash: string;

  constructor(
    readonly height: number,
    readonly previousHash: string,
    nonce: number,
    hash: string,
    readonly timestamp: number,
    readonly transactions: ITransaction[],
    readonly blockTransactionsManagement: IBlockTransactionsManagement
  ) {
    this.nonce = nonce;
    this.hash = hash;
  }

  getData(): string {
    return `${this.height}${this.nonce}${this.previousHash}${JSON.stringify(this.transactions)}${this.timestamp}`;
  }
}
