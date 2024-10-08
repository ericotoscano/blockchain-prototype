import { sha256 } from 'js-sha256';

import { BlockchainType } from '../types/blockchain.types';

import { Block } from './Block';
import { Transaction } from './Transaction';
export class Blockchain implements BlockchainType {
  chain: Block[];
  mempool: Transaction[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;

  constructor() {
    this.chain = [];
    this.mempool = [];
    this.targetDifficulty = '';
    this.maxTransactionsPerBlock = 1;

    this.setTargetDifficulty(3);
    this.setMaxTransactionsPerBlock(10);
    this.addBlock(this.createGenesisBlock());
  }

  createGenesisBlock(): Block {
    let genesisBlock = new Block();

    genesisBlock.previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
    genesisBlock.hash = this.generateHash(genesisBlock);

    return genesisBlock;
  }

  addBlock(block: Block): void {
    this.chain.push(block);
  }

  createNextBlock(transactions: Transaction[]): Block {
    let block = new Block();

    transactions.forEach((transaction) => {
      block.addTransaction(transaction);
    });

    let previousBlock = this.getPreviousBlock();

    block.index = this.chain.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  getPreviousBlock(): Block {
    return this.chain[this.chain.length - 1];
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
    for (let i = this.chain.length - 1; i > 0; i--) {
      if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
        return false;
      }
    }

    return true;
  }
}
