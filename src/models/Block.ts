import { IBlock } from '../types/block.types';
import { ITransaction } from '../types/transaction.types';

export class Block implements IBlock {
  nonce: number;
  hash: string;

  constructor(readonly height: number, readonly previousHash: string, nonce: number, hash: string, readonly timestamp: number, readonly transactions: ITransaction[]) {
    this.nonce = nonce;
    this.hash = hash;
  }

  setNonce(blockNonce: number): void {
    this.nonce = blockNonce;
  }

  setHash(blockHash: string): void {
    this.hash = blockHash;
  }

  getData(): string {
    return `${this.height}${this.nonce}${this.previousHash}${JSON.stringify(this.transactions)}${this.timestamp}`;
  }
}
