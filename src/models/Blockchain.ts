import { sha256 } from 'js-sha256';

import { BlockchainType } from '../types/blockchain.types';

import { Block } from './Block';
import { Transaction } from './Transaction';

export class Blockchain implements BlockchainType {
  genesisBlock: Block;
  chain: Block[];
  targetDifficulty: string;
  maxTransactionsPerBlock: number;

  constructor(difficultyLevel: number, maxTransactionsPerBlock: number) {
    this.targetDifficulty = this.generateTarget(difficultyLevel);
    this.maxTransactionsPerBlock = maxTransactionsPerBlock;

    this.chain = [];

    this.genesisBlock = new Block();
    this.genesisBlock.previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
    this.genesisBlock.hash = this.generateHash(this.genesisBlock);

    this.addBlock(this.genesisBlock);
  }

  addBlock(block: Block): void {
    this.chain.push(block);
  }

  getNextBlock(transactions: Transaction[]): Block {
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
      console.log(hash);
    }

    return hash;
  }

  generateTarget(numberOfZeros: number): string {
    const ZERO_STRING = '0';
    const SIXTEEN_STRING = 'f';

    return ZERO_STRING.repeat(numberOfZeros).concat(SIXTEEN_STRING.repeat(64 - numberOfZeros));
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
