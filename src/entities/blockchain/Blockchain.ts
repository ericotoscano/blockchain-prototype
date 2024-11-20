import { INode } from '../../types/node.types';
import { BlockchainInputType, IBlockchain, IBlocks, IGenesisBlockCreation, IMempool, TargetManagementType } from '../../types/blockchain.types';
import { NodeManagement } from '../node/NodeManagement';

export class Blockchain implements IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  mempool: IMempool;
  blocks: IBlocks;

  constructor(
    props: BlockchainInputType,
    readonly node: INode,
    mempool: IMempool,
    blocks: IBlocks,
    readonly targetManagement: TargetManagementType,
    readonly nodeManagement: NodeManagement,
    readonly genesisBlockCreation: IGenesisBlockCreation
  ) {
    this.target = targetManagement.calculate(props.targetZeros);
    this.reward = props.reward;
    this.maxTransactionsPerBlock = props.maxTransactionsPerBlock;
    this.mempool = mempool;
    this.blocks = blocks;

    this.blocks.addBlock(this.genesisBlockCreation.create(this.target));
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
