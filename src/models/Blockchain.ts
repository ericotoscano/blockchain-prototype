import { sha256 } from 'js-sha256';

import { Blocks } from './Blocks';
import { Transactions } from './Transactions';

import { generateNodeAddress } from '../utils/addresses.utils';

export class Blockchain {
  nodeUrl: string;
  nodeAddress: string;
  nodes: { address: string; balance: number }[];
  users: { address: string; balance: number }[];
  connectedNodes: string[];
  targetDifficulty: string;
  reward: number;
  NumberOfTransactionsInMempool: number;
  maxTransactionsPerBlock: number;
  mempool: Transactions[];
  blocks: Blocks[];

  constructor() {
    this.nodeUrl = (process.env.BASE_URL || 'http://localhost:') + process.argv[2];
    this.nodeAddress = '';
    this.connectedNodes = [];
    this.nodes = [];
    this.users = [];
    this.targetDifficulty = '';
    this.reward = 0;
    this.mempool = [];
    this.NumberOfTransactionsInMempool = this.mempool.length;
    this.maxTransactionsPerBlock = 0;
    this.blocks = [];

    this.setNodeAddress();
    this.setNodes();
    this.setUsers();
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

    this.removeTransactionsFromMempool(block);
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
    this.setNumberOfTransactionsInMempool();
  }

  removeTransactionsFromMempool(nextBlock: Blocks): void {
    const transactionsIdsToRemove = nextBlock.transactions.map((transaction) => transaction.txId);

    const filteredMempool = this.mempool.filter((mempoolTransaction) => !transactionsIdsToRemove.includes(mempoolTransaction.txId));

    this.mempool = structuredClone(filteredMempool);
    this.setNumberOfTransactionsInMempool();
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

  setMaxTransactionsPerBlock(numberOfBlocks: number): void {
    this.maxTransactionsPerBlock = numberOfBlocks;
  }

  setNodeAddress(): void {
    this.nodeAddress = generateNodeAddress(process.argv[2]);
  }

  setNodes(): void {
    const availablePorts = process.env.AVAILABLE_PORTS ? process.env.AVAILABLE_PORTS.split(',') : ['3000', '3001', '3002', '3003', '3004'];

    for (const port of availablePorts) {
      const nodeAddress = generateNodeAddress(port);

      const node = { address: nodeAddress, balance: 100 };

      this.nodes.push(node);
    }
  }

  setUsers(): void {
    const usersAddresses = process.env.USERS_ADDRESSESS
      ? process.env.USERS_ADDRESSESS.split(',')
      : [
          '3f5c63a7d29a9b3bbd5646e2b5cd7b6f5f8c2b15',
          'b2a1cd9f632f4e1a5a384d5bd85fe813cd4ea5f3',
          'ae9b77b8c489f6f3b5f2e99c3d2c3e07b4a3b1a8',
          '12f7c9d12e88cbe5f1bc1a9f32e4c5d1e4f6d3a7',
          '5f6b7a9d8c2f4e3a6b2d9a3c5f7d6e8b9c5d4f1a',
        ];

    for (const address of usersAddresses) {
      this.users.push({ address, balance: 100 });
    }
  }

  setTargetDifficulty(numberOfZeros: number): void {
    const ZERO_STRING: string = '0';
    const SIXTEEN_STRING: string = 'f';

    this.targetDifficulty = ZERO_STRING.repeat(numberOfZeros).concat(SIXTEEN_STRING.repeat(64 - numberOfZeros));
  }

  setReward(blockReward: number): void {
    this.reward = blockReward;
  }

  setNumberOfTransactionsInMempool(): void {
    this.NumberOfTransactionsInMempool = this.mempool.length;
  }

  getNode(nodeAddress: string): { address: string; balance: number } {
    const node = this.nodes.find((item) => item.address === nodeAddress);

    return node ?? { address: '', balance: 0 };
  }

  getUser(userAddress: string): { address: string; balance: number } {
    const user = this.users.find((item) => item.address === userAddress);

    return user ?? { address: '', balance: 0 };
  }

  getBalance(address: string): number {
    return this.getNode(address).balance || this.getUser(address).balance;
  }

  getPendingTransactions(): Transactions[] {
    return structuredClone(this.mempool.filter((transaction) => transaction.status === 'Pending'));
  }

  getNextBlockTransactionsByFee(minFee: number): Transactions[] {
    return this.mempool.filter((mempoolTransaction) => mempoolTransaction.fee >= minFee).slice(0, this.maxTransactionsPerBlock - 1);
  }
}
