import { TargetManagementType } from '../services/blockchain/target/management/types/TargetManagementType';
import { BlockMiningType } from './block.types';
import { TransactionConversionType } from './conversion.types';
import {
  BlockCreationType,
  HashCreationType,
  KeyCreationType,
  NodeAddressCreationType,
  NodeUrlCreationType,
  RewardTransactionCreationType,
  TransactionCreationType,
  TransactionIdCreationType,
} from './creation.types';

import { TransactionCalculationType } from './transaction.types';

export type KeyDependenciesType = {
  keyCurveOption: string;
  keyCreation: KeyCreationType;
  mainHashCreation: HashCreationType;
  secondHashCreation: HashCreationType;
};

export type NodeDependenciesType = {
  nodeUrlCreation: NodeUrlCreationType;
  nodeAddressCreation: NodeAddressCreationType;
};

export type MiningDependenciesType = {
  targetManagement: TargetManagementType;
  blockMining: BlockMiningType;
  blockCreation: BlockCreationType;
  hashCreation: HashCreationType;
};

export type TransactionDependenciesType = {
  transactionConversion: TransactionConversionType;
  transactionCalculation: TransactionCalculationType;
  transactionCreation: TransactionCreationType;
  transactionIdCreation: TransactionIdCreationType;
  rewardTransactionCreation: RewardTransactionCreationType;
};

export type AddBlockDependenciesType = {
  miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>;
  transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>;
};
