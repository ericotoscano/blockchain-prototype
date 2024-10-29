import { sha256 } from 'js-sha256';

import { checkReturn } from '../types/return.types';

import { Blocks } from './Blocks';
import { Transactions } from './Transactions';

import { getNodesUrlOptions } from '../helpers/ports.helpers';

export class Blockchain {
  nodeUrl: string;
  connectedNodes: string[];
  targetDifficulty: string;
  reward: number;
  transactionsInMempool: number;
  maxTransactionsPerBlock: number;
  mempool: Transactions[];
  blocks: Blocks[];

  constructor() {
    this.nodeUrl = (process.env.BASE_URL || 'http://localhost:') + process.argv[2];
    this.connectedNodes = [];
    this.targetDifficulty = '';
    this.reward = 0;
    this.mempool = [];
    this.transactionsInMempool = this.mempool.length;
    this.maxTransactionsPerBlock = 0;
    this.blocks = [];

    this.setMaxTransactionsPerBlock(10);
    this.setTargetDifficulty(3);
    this.setReward(3.125);
    this.addBlock(this.createGenesisBlock());
  }

  createGenesisBlock(): Blocks {
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

    block.addRewardTransaction();

    let previousBlock = this.getPreviousBlock();

    block.height = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  addNode(nodeUrl: string): void {
    this.connectedNodes.push(nodeUrl);
  }

  broadcastNodesTo(nodeUrl: string): string[] {
    const otherNodes = this.connectedNodes.filter((connectedNodeUrl) => connectedNodeUrl !== nodeUrl);
    const nodesToBroadcast = [...otherNodes, this.nodeUrl];

    return nodesToBroadcast;
  }

  setConnectedNodes(connectedNodes: string[]) {
    this.connectedNodes = structuredClone(connectedNodes);
  }

  addTransactionToMempool(transaction: Transactions): void {
    this.mempool.push(transaction);
    this.setTransactionsInMempool();
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

  validateChain(): boolean {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      if (this.blocks[i].previousHash !== this.blocks[i - 1].hash) {
        return false;
      }
    }

    return true;
  }

  setTargetDifficulty(numberOfZeros: number): void {
    const ZERO_STRING = '0';
    const SIXTEEN_STRING = 'f';

    this.targetDifficulty = ZERO_STRING.repeat(numberOfZeros).concat(SIXTEEN_STRING.repeat(64 - numberOfZeros));
  }

  setMaxTransactionsPerBlock(numberOfBlocks: number): void {
    this.maxTransactionsPerBlock = numberOfBlocks;
  }

  setTransactionsInMempool(): void {
    this.transactionsInMempool = this.mempool.length;
  }

  setReward(blockReward: number): void {
    this.reward = blockReward;
  }
}
