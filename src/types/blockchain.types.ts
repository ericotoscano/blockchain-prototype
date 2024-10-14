import { Block } from '../models/Block';
import { Transaction } from '../models/Transaction';
import { Node } from '../models/Node';

export interface BlockchainType {
  blocks: Block[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  mempool: Transaction[];
  nodes: Node;
  mineGenesisBlock(): Block;
  addNode(nodeUrl: string): void;
  addBlock(block: Block): void;
  addTransactionToMempool(transaction: Transaction): void;
  getPendingTransactions(): Transaction[];
  createNextBlock(transactions: Transaction[]): Block;
  getPreviousBlock(): void;
  generateHash(block: Block): string;
  setTargetDifficulty(numberOfZeros: number): void;
  setMaxTransactionsPerBlock(numberOfBlocks: number): void;
  validateChain(): boolean;
}
