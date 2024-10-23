import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
import { Nodes } from '../models/Nodes';
export interface BlockchainType {
  nodes: Nodes;
  maxTransactionsPerBlock: number;
  targetDifficulty: string;
  reward: number;
  mempool: Transactions[];
  blocks: Blocks[];
  mineGenesisBlock(): Blocks;
  addBlock(block: Blocks): void;
  getPreviousBlock(): void;
  mineNextBlock(transactions: Transactions[]): Blocks;
  checkTransactionId(transaction: Transactions): boolean;
  addTransactionToMempool(transaction: Transactions): void;
  getPendingTransactions(): Transactions[];
  generateHash(block: Blocks): string;
  setTargetDifficulty(numberOfZeros: number): void;
  setMaxTransactionsPerBlock(numberOfBlocks: number): void;
  setReward(blockReward: number): void;
  validateChain(): boolean;
}
