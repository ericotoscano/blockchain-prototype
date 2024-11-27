import { IBlockchain } from '../types/blockchain.types';
import { IBlock } from '../interfaces/block/IBlock';
import { INode } from '../interfaces/nodes/INode';
import { ITransaction } from '../types/ITransaction';
import { INodeManagement } from '../interfaces/management/INodeManagement';
import { IMempoolManagement } from '../interfaces/management/IMempoolManagement';
import { IBlocksManagement } from '../interfaces/management/IBlocksManagement';

import { BlockchainInputType } from '../types/input.types';

export class Blockchain implements IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  mempool: ITransaction[];
  blocks: IBlock[];

  constructor(
    input: BlockchainInputType,
    readonly node: INode,
    mempool: ITransaction[],
    blocks: IBlock[],
    target: string,
    readonly nodeManagement: INodeManagement,
    readonly mempoolManagement: IMempoolManagement,
    readonly blocksManagement: IBlocksManagement
  ) {
    this.target = target;
    this.reward = input.reward;
    this.maxTransactionsPerBlock = input.maxTransactionsPerBlock;
    this.mempool = mempool;
    this.blocks = blocks;
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
