import { Block } from '../models/Block';
import { Transaction } from '../models/Transaction';

export interface BlockchainType {
  chain: Block[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  mempool: Transaction[];
  createGenesisBlock(): Block;
  addBlock(block: Block): void;
  createNextBlock(transactions: Transaction[]): Block;
  getPreviousBlock(): void;
  generateHash(block: Block): string;
  setTargetDifficulty(numberOfZeros: number): void;
  setMaxTransactionsPerBlock(numberOfBlocks: number): void;
  validateChain(): boolean;
}
