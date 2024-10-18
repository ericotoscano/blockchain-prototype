import { sha256 } from 'js-sha256';

import { BlockchainType } from '../types/blockchain.types';

import { Blocks } from './Blocks';
import { Transactions } from './Transactions';
import { Nodes } from './Nodes';
export class Blockchain implements BlockchainType {
  blocks: Blocks[];
  mempool: Transactions[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;
  nodes: Nodes;

  constructor() {
    this.blocks = [];
    this.mempool = [];
    this.targetDifficulty = '';
    this.maxTransactionsPerBlock = 1;
    this.nodes = new Nodes();

    this.setTargetDifficulty(3);
    this.setMaxTransactionsPerBlock(10);
    this.addBlock(this.mineGenesisBlock());
  }

  mineGenesisBlock(): Blocks {
    let genesisBlock = new Blocks();

    genesisBlock.previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
    genesisBlock.hash = this.generateHash(genesisBlock);

    return genesisBlock;
  }

  addBlock(block: Blocks): void {
    this.blocks.push(block);
  }

  getPreviousBlock(): Blocks {
    return this.blocks[this.blocks.length - 1];
  }

  createNextBlock(transactions: Transactions[]): Blocks {
    let block = new Blocks();

    transactions.forEach((transaction) => {
      block.addTransaction(transaction);
    });

    let previousBlock = this.getPreviousBlock();

    block.height = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  checkTransactionId(transaction: Transactions): boolean {
    return this.mempool.every((mempoolTransaction: Transactions) => mempoolTransaction.txId !== transaction.txId);
  }

  addTransactionToMempool(transaction: Transactions): void {
    this.mempool.push(transaction);
  }

  checkMempoolLength(): boolean {
    return this.mempool.length < this.maxTransactionsPerBlock;
  }

  getPendingTransactions(): Transactions[] {
    return structuredClone(this.mempool.filter((transaction) => transaction.status === 'Pending'));
  }

  generateHash(block: Blocks): string {
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

  setNetworkNodes(networkNodes: string[]) {
    this.nodes.networkNodes = structuredClone(networkNodes);
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
