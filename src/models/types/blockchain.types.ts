import { Block } from '../Block';
import { Transaction } from '../Transaction';

export interface BlockchainType {
  chain: Block[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  addBlock(block: Block): void;
  getNextBlock(transactions: Transaction[]): Block;
  getPreviousBlock(): void;
  generateHash(block: Block): string;
  generateTarget(numberOfZeros: number): string;
  validateChain(): boolean;
}
