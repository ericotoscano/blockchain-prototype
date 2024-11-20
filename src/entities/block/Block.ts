import { NewBlockInputType, IBlock } from '../../types/block.types';
import { ITransaction } from '../../types/transaction.types';

export class Block implements IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: ITransaction[];

  constructor(input: NewBlockInputType, nonce?: number, hash?: string, timestamp?: number) {
    this.height = input.height;
    this.nonce = 0 ?? nonce;
    this.hash = '' ?? hash;
    this.previousHash = input.previousHash;
    this.transactions = input.transactions;
    this.timestamp = timestamp ?? Date.now();
  }

  getData(): string {
    return `${this.height}${this.nonce}${this.previousHash}${JSON.stringify(this.transactions)}${this.timestamp}`;
  }
}
