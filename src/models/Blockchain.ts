import { Transaction } from './Transaction';
import { Block } from './Block';

import { BlockData, TransactionData } from '../types/data.types';

import { generateNodeAddress } from '../utils/addresses.utils';

export class Blockchain {
  nodeUrl: string;
  nodeAddress: string;
  connectedNodes: string[];
  targetDifficulty: string;
  reward: number;
  maxTransactionsPerBlock: number;
  mempool: (Transaction | TransactionData)[];
  blocks: (Block | BlockData)[];

  constructor() {
    this.nodeUrl = (process.env.BASE_URL || 'http://localhost:') + process.argv[2];
    this.nodeAddress = generateNodeAddress(process.argv[2]);
    this.connectedNodes = [];
    this.targetDifficulty = '0'.repeat(3).concat('f', '0'.repeat(61));
    this.reward = 3.125;
    this.mempool = [];
    this.maxTransactionsPerBlock = 10;
    this.blocks = [];

    this.addBlock(this.createGenesisBlock());
  }

  createGenesisBlock(): Block | BlockData {
    const genesisBlock = new Block(0, 0, '0'.repeat(64), []);

    genesisBlock.generateHash(this.targetDifficulty);

    return genesisBlock;
  }

  addBlock(block: Block | BlockData): void {
    this.blocks.push(block);

    this.removeTransactionsFromMempool(block);
  }

  getPreviousBlock(): Block | BlockData {
    return this.blocks[this.blocks.length - 1];
  }

  createNextBlock(transactions: Transaction[] | TransactionData[]): Block | BlockData {
    const previousHash = this.getPreviousBlock().hash;
    let block = new Block(this.blocks.length, 0, previousHash, transactions);

    block.addRewardTransaction(this.reward, this.nodeAddress);
    block.generateHash(this.targetDifficulty);

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

  addTransactionToMempool(transaction: Transaction | TransactionData): void {
    this.mempool.push(transaction);
  }

  removeTransactionsFromMempool(nextBlock: Block | BlockData): void {
    const transactionsIdsToRemove = nextBlock.transactions.map((transaction) => transaction.txId);

    const filteredMempool = this.mempool.filter((mempoolTransaction) => !transactionsIdsToRemove.includes(mempoolTransaction.txId));

    this.mempool = filteredMempool;
  }

  setMaxTransactionsPerBlock(maxNumber: number): void {
    this.maxTransactionsPerBlock = maxNumber;
  }

  setTargetDifficulty(zeros: number): void {
    this.targetDifficulty = '0'.repeat(zeros).concat('f', '0'.repeat(64 - zeros));
  }

  setReward(blockReward: number): void {
    this.reward = blockReward;
  }

  getPendingTransactions(): Transaction[] | TransactionData[] {
    return this.mempool.filter((transaction) => transaction.status === 'Pending');
  }

  getNextBlockTransactionsByFee(minFee: number): Transaction[] | TransactionData[] {
    return this.mempool.filter((mempoolTransaction) => mempoolTransaction.fee >= minFee).slice(0, this.maxTransactionsPerBlock - 1);
  }
}
