import { IBlock } from '../types/IBlock';
import { IBlockchain } from '../types/blockchain.types';
import { INode } from '../types/INode';
import { ITransaction } from '../types/ITransaction';
import { IBlocksManagement, IMempoolManagement, INodeManagement } from '../types/management.types';

export class Blockchain implements IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;

  constructor(
    target: string,
    reward: number,
    maxTransactionsPerBlock: number,
    readonly node: INode,
    readonly mempool: ITransaction[],
    readonly blocks: IBlock[],
    readonly nodeManagement: INodeManagement,
    readonly mempoolManagement: IMempoolManagement,
    readonly blocksManagement: IBlocksManagement
  ) {
    this.target = target;
    this.reward = reward;
    this.maxTransactionsPerBlock = maxTransactionsPerBlock;
  }
}
