import { IBlocksManagement } from '../services/IBlocksService';
import { IMempoolManagement } from '../../services/blockchain/mempool/management/types/MempoolManagementType';
import { INodeManagement } from '../../services/node/management/types/INodeManagement';
import { IBlock } from '../types/IBlock';
import { IBlockchain } from '../types/IBlockchain';
import { INode } from '../types/INode';
import { ITransaction } from '../types/ITransaction';

export class Blockchain implements IBlockchain {
  constructor(
    private target: string,
    private reward: number,
    private maxTransactionsPerBlock: number,
    readonly node: INode,
    readonly mempool: ITransaction[],
    readonly blocks: IBlock[],
    readonly nodeManagement: INodeManagement,
    readonly mempoolManagement: IMempoolManagement,
    readonly blocksManagement: IBlocksManagement
  ) {}

  getTarget(): string {
    return this.target;
  }

  getReward(): number {
    return this.reward;
  }

  getmaxTransactionsPerBlock(): number {
    return this.maxTransactionsPerBlock;
  }

  setTarget(newTarget: string): void {
    this.target = newTarget;
  }

  setReward(newReward: number): void {
    this.reward = newReward;
  }

  setMaxTransactionsPerBlock(newMaxTransactionsPerBlock: number): void {
    this.maxTransactionsPerBlock = newMaxTransactionsPerBlock;
  }
}
