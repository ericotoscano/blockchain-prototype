import { Transaction } from '../transaction/Transaction';

interface IBlockProps {
  height: number;
  previousHash: string;
  transactions: Transaction[];
}

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: Transaction[];
  getData(): string;
}

export class Block implements IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: Transaction[];

  constructor(props: IBlockProps, timestamp?: number) {
    this.height = props.height;
    this.nonce = 0;
    this.hash = '';
    this.previousHash = props.previousHash;
    this.transactions = props.transactions;
    this.timestamp = timestamp ?? Date.now();
  }

  getData(): string {
    return `${this.height}${this.nonce}${this.previousHash}${JSON.stringify(this.transactions)}${this.timestamp}`;
  }
}
