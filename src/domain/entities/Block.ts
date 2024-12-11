import { IBlockTransactionsManagement } from '../../services/block/management/types/IBlockTransactionsManagement';
import { IBlock } from '../types/IBlock';
import { ITransaction } from '../types/ITransaction';

export class Block implements IBlock {
  private nonce: number = 0;
  private hash: string = '';

  constructor(
    readonly height: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly transactions: ITransaction[],
    readonly blockTransactionsManagement: IBlockTransactionsManagement
  ) {}

  getNonce(): number {
    return this.nonce;
  }

  getHash(): string {
    return this.hash;
  }

  getData(): string {
    const blockData = {
      height: this.height,
      nonce: this.nonce,
      previousHash: this.previousHash,
      transactions: this.transactions,
      timestamp: this.timestamp,
    };
    return JSON.stringify(blockData);
  }

  setNonce(blockNonce: number): void {
    this.nonce = blockNonce;
  }

  setHash(blockHash: string): void {
    this.hash = blockHash;
  }
}
