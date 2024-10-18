import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
import { Nodes } from '../models/Nodes';
export interface BlockchainType {
  blocks: Blocks[];
  mempool: Transactions[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  nodes: Nodes;
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
