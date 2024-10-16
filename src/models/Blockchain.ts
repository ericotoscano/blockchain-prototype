import { sha256 } from 'js-sha256';

import { BlockchainType } from '../types/blockchain.types';

import { Block } from './Block';
import { Transaction } from './Transaction';
import { Node } from './Node';
export class Blockchain implements BlockchainType {
  blocks: Block[];
  mempool: Transaction[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  nodes: Node;

  constructor() {
    this.blocks = [];
    this.mempool = [];
    this.targetDifficulty = '';
    this.maxTransactionsPerBlock = 1;
    this.nodes = { currentNodeUrl: (process.env.BASE_URL || 'http://localhost:') + process.argv[2], connectedNodes: [] };

    this.setTargetDifficulty(3);
    this.setMaxTransactionsPerBlock(10);
    this.addBlock(this.mineGenesisBlock());
  }

  mineGenesisBlock(): Block {
    let genesisBlock = new Block();

    genesisBlock.previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
    genesisBlock.hash = this.generateHash(genesisBlock);

    return genesisBlock;
  }

  addNode(nodeUrl: string): void {
    this.nodes.connectedNodes.push(nodeUrl);
  }

  addBlock(block: Block): void {
    this.blocks.push(block);
  }

  addTransactionToMempool(transaction: Transaction): void {
    this.mempool.push(transaction);
  }

  getPendingTransactions(): Transaction[] {
    return structuredClone(this.mempool.filter((transaction) => transaction.status === 'Pending'));
  }

  createNextBlock(transactions: Transaction[]): Block {
    let block = new Block();

    transactions.forEach((transaction) => {
      block.addTransaction(transaction);
    });

    let previousBlock = this.getPreviousBlock();

    block.height = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  getPreviousBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  generateHash(block: Block): string {
    let hash = sha256(block.getData());

    while (BigInt('0x' + hash) >= BigInt('0x' + this.targetDifficulty)) {
      block.nonce += 1;
      hash = sha256(block.getData());
    }

    return hash;
  }

  setTargetDifficulty(numberOfZeros: number): void {
    const ZERO_STRING = '0';
    const SIXTEEN_STRING = 'f';

    this.targetDifficulty = ZERO_STRING.repeat(numberOfZeros).concat(SIXTEEN_STRING.repeat(64 - numberOfZeros));
  }

  setMaxTransactionsPerBlock(numberOfBlocks: number) {
    this.maxTransactionsPerBlock = numberOfBlocks;
  }

  validateChain(): boolean {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      if (this.blocks[i].previousHash !== this.blocks[i - 1].hash) {
        return false;
      }
    }

    return true;
  }
}
