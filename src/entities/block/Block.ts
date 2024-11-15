import { ITransaction } from '../transaction/Transaction';

interface IBlockProps {
  height: number;
  previousHash: string;
  transactions: ITransaction[];
}

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: ITransaction[];
  getData(): string;
}

export class Block implements IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: ITransaction[];

  constructor(props: IBlockProps, nonce?: number, hash?: string, timestamp?: number) {
    this.height = props.height;
    this.nonce = 0 ?? nonce;
    this.hash = '' ?? hash;
    this.previousHash = props.previousHash;
    this.transactions = props.transactions;
    this.timestamp = timestamp ?? Date.now();
  }

  getData(): string {
    return `${this.height}${this.nonce}${this.previousHash}${JSON.stringify(this.transactions)}${this.timestamp}`;
  }
}
