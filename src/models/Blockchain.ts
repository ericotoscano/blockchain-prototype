import { sha256 } from 'js-sha256';

import { checkReturn } from '../types/return.types';

import { Blocks } from './Blocks';
import { Transactions } from './Transactions';

import { getNodesUrlOptions } from '../helpers/ports.helpers';

export class Blockchain {
  node: string;
  connectedNodes: string[];
  maxTransactionsPerBlock: number;
  targetDifficulty: string;
  reward: number;
  mempool: Transactions[];
  blocks: Blocks[];

  constructor() {
    this.node = (process.env.BASE_URL || 'http://localhost:') + process.argv[2];
    this.connectedNodes = [];
    this.maxTransactionsPerBlock = 0;
    this.targetDifficulty = '';
    this.reward = 0;
    this.mempool = [];
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

  broadcastNodesTo(node: string): string[] {
    const otherNodes = this.connectedNodes.filter((nodeUrl) => nodeUrl !== node);
    const nodesToBroadcast = [...otherNodes, this.node];

    return nodesToBroadcast;
  }

  checkNodeUrlOptionFormat(node: string): checkReturn {
    const nodeUrlOptions = getNodesUrlOptions();

    if (!nodeUrlOptions.includes(node)) {
      return { result: false, message: 'The sent node does not contain one of the available port numbers in the .env file.' };
    }

    return { result: true, message: 'The sent node is valid.' };
  }

  checkNodeConnection(node: string): checkReturn {
    if (global.blockchain.connectedNodes.includes(node)) {
      return { result: false, message: 'The sent node is already connected to the target node.' };
    }

    if (global.blockchain.node === node) {
      return { result: false, message: 'The sent node is the target node.' };
    }

    return { result: true, message: 'The sent node connection is valid.' };
  }

  checkNodeRegistration(node: string): checkReturn {
    if (global.blockchain.connectedNodes.includes(node)) {
      return { result: false, message: 'The sent node is already registered to the target node connections.' };
    }

    if (global.blockchain.node === node) {
      return { result: false, message: 'The sent node is the target node.' };
    }

    return { result: true, message: 'The sent node registration is valid.' };
  }

  checkConnectedNodes(connectedNodes: string[]): checkReturn {
    const nodeUrlOptions = getNodesUrlOptions();

    const invalidNodeUrl = connectedNodes.filter((nodeUrl) => !nodeUrlOptions.includes(nodeUrl));

    if (invalidNodeUrl.length !== 0) {
      return { result: false, message: 'The sent connected nodes contain one or more invalid nodes.' };
    }

    if (connectedNodes.includes(global.blockchain.node)) {
      return { result: false, message: 'The sent connected nodes contain the target node.' };
    }

    return { result: true, message: 'The sent connected nodes is valid.' };
  }

  checkTransactionIsNotInMempool(transaction: Transactions): boolean {
    return this.mempool.every((mempoolTransaction: Transactions) => mempoolTransaction.txId !== transaction.txId);
  }

  addTransactionToMempool(transaction: Transactions): void {
    this.mempool.push(transaction);
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

  setMaxTransactionsPerBlock(numberOfBlocks: number) {
    this.maxTransactionsPerBlock = numberOfBlocks;
  }

  setReward(blockReward: number): void {
    this.reward = blockReward;
  }

  setConnectedNodes(connectedNodes: string[]) {
    this.connectedNodes = structuredClone(connectedNodes);
  }
}
