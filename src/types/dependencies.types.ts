import { BlockMiningType } from './block.types';
import { TransactionConversionType } from './conversion.types';
import { BlockCreationType, HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType, RewardTransactionCreationType, TransactionIdCreationType } from './creation.types';
import { TargetManagementType } from './management.types';
import { TransactionCalculationType } from './transaction.types';

export type CreateBlockchainDependenciesType = {
  targetManagement: TargetManagementType;
  keyCurveOption: string;
  keyCreation: KeyCreationType;
  mainHashCreation: HashCreationType;
  secondHashCreation: HashCreationType;
  nodeUrlCreation: NodeUrlCreationType;
  nodeAddressCreation: NodeAddressCreationType;
  blockMining: BlockMiningType;
  blockCreation: BlockCreationType;
  transactionCalculation: TransactionCalculationType;
  transactionIdCreation: TransactionIdCreationType;
  rewardTransactionCreation: RewardTransactionCreationType;
};

export type AddBlockDependenciesType = {
  transactionConversion: TransactionConversionType;
  transactionCalculation: TransactionCalculationType;
  transactionIdCreation: TransactionIdCreationType;
  rewardTransactionCreation: RewardTransactionCreationType;
  blockMining: BlockMiningType;
  hashCreation: HashCreationType;
};
