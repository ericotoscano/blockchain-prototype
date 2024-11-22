import { IBlockchain } from '../../interfaces/blockchain/IBlockchain';
import { IBlock } from '../../interfaces/block/IBlock';
import { INode } from '../../interfaces/nodes/INode';
import { ITransaction } from '../../interfaces/transactions/ITransaction';
import { INodeManagement } from '../../interfaces/management/INodeManagement';
import { IMempoolManagement } from '../../interfaces/management/IMempoolManagement';
import { IBlocksManagement } from '../../interfaces/management/IBlocksManagement';

import { BlockchainInputType } from '../../types/blockchain/BlockchainInputType';
import { TargetManagementType } from '../../types/management/TargetManagementType';
import { BlockMiningType } from '../../types/mining/BlockMiningType';
import { BlockCreationType } from '../../types/creation/BlockCreationType';

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
    readonly blockMining: BlockMiningType,
    readonly blockCreation: BlockCreationType,
    readonly targetManagement: TargetManagementType,
    readonly nodeManagement: INodeManagement,
    readonly mempoolManagement: IMempoolManagement,
    readonly blocksManagement: IBlocksManagement
  ) {
    this.target = targetManagement.calculate(input.targetZeros);
    this.reward = input.reward;
    this.maxTransactionsPerBlock = input.maxTransactionsPerBlock;
    this.mempool = mempool;
    this.blocks = blocks;

    this.blocksManagement.addBlock(this.blockCreation.create({ height: 0, previousHash: '0'.repeat(64), transactions: [] }, this.target, this.blockMining));
  }

  setTarget(targetZeros: number): void {
    this.target = this.targetManagement.calculate(targetZeros);
  }

  setReward(blockReward: number): void {
    this.reward = blockReward;
  }

  setMaxTransactionsPerBlock(maxNumber: number): void {
    this.maxTransactionsPerBlock = maxNumber;
  }
}
