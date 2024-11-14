import { INode } from '../node/Node';
import { IMempool } from './Mempool';
import { IGenesisBlockCreation } from './GenesisBlockCreation';

import { TargetManagementType } from './TargetManagement';
import { IBlocks } from './Blocks';

interface IBlockchainProps {
  targetZeros: number;
  reward: number;
  maxTransactionsPerBlock: number;
}

export interface IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  readonly node: INode;
  mempool: IMempool;
  blocks: IBlocks;
  readonly targetManagement: TargetManagementType;
  readonly genesisBlockCreation: IGenesisBlockCreation;
  setTarget(targetZeros: number): void;
  setReward(blockReward: number): void;
  setMaxTransactionsPerBlock(maxNumber: number): void;
}

export class Blockchain implements IBlockchain {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  mempool: IMempool;
  blocks: IBlocks;

  constructor(
    props: IBlockchainProps,
    readonly node: INode,
    mempool: IMempool,
    blocks: IBlocks,
    readonly targetManagement: TargetManagementType,
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
