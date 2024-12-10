import { IBlocksManagement } from '../../services/blockchain/blocks/management/types/IBlocksManagement';
import { IMempoolManagement } from '../../services/blockchain/mempool/management/types/MempoolManagementType';
import { INodeManagement } from '../../services/node/management/types/INodeManagement';
import { IBlock } from '../../types/IBlock';
import { IBlockchain } from '../../types/IBlockchain';
import { INode } from '../../types/INode';
import { ITransaction } from '../../types/ITransaction';

export class Blockchain implements IBlockchain {
  private _target: string;
  private _reward: number;
  private _maxTransactionsPerBlock: number;

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
    this._target = target;
    this._reward = reward;
    this._maxTransactionsPerBlock = maxTransactionsPerBlock;
  }

  getTarget(): string {
    return this._target;
  }

  getReward(): number {
    return this._reward;
  }

  getmaxTransactionsPerBlock(): number {
    return this._maxTransactionsPerBlock;
  }

  setTarget(newTarget: string): void {
    this._target = newTarget;
  }

  setReward(newReward: number): void {
    this._reward = newReward;
  }

  setMaxTransactionsPerBlock(newMaxTransactionsPerBlock: number): void {
    this._maxTransactionsPerBlock = newMaxTransactionsPerBlock;
  }
}
