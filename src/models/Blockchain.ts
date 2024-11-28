import { IBlock } from '../types/block.types';
import { IBlockchain } from '../types/blockchain.types';
import { INode } from '../types/node.types';
import { ITransaction } from '../types/transaction.types';
import { IBlocksManagement, IMempoolManagement, INodeManagement } from '../types/management.types';

export class Blockchain implements IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  mempool: ITransaction[];
  blocks: IBlock[];

  constructor(
    target: string,
    reward: number,
    maxTransactionsPerBlock: number,
    readonly node: INode,
    mempool: ITransaction[],
    blocks: IBlock[],
    readonly nodeManagement: INodeManagement,
    readonly mempoolManagement: IMempoolManagement,
    readonly blocksManagement: IBlocksManagement
  ) {
    this.target = target;
    this.reward = reward;
    this.maxTransactionsPerBlock = maxTransactionsPerBlock;
    this.mempool = mempool;
    this.blocks = blocks;
  }

  getTarget(): string {
    return this.target;
  }

  setTarget(target: string): void {
    this.target = target;
  }

  setReward(blockReward: number): void {
    this.reward = blockReward;
  }

  setMaxTransactionsPerBlock(maxNumber: number): void {
    this.maxTransactionsPerBlock = maxNumber;
  }
}
