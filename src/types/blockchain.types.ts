import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface BlockchainType {
  blocks: Blocks[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  mempool: Transactions[];
  mineGenesisBlock(): Blocks;
  addBlock(block: Blocks): void;
  getPreviousBlock(): void;
  createNextBlock(transactions: Transactions[]): Blocks;
  addTransactionToMempool(transaction: Transactions): void;
  getPendingTransactions(): Transactions[];
  generateHash(block: Blocks): string;
  setTargetDifficulty(numberOfZeros: number): void;
  setMaxTransactionsPerBlock(numberOfBlocks: number): void;
  validateChain(): boolean;
}
