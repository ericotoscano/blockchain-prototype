import { BlockMiningType } from "./block.types";
import {
  BlockConversionType,
  NodeConversionType,
  TransactionConversionType,
} from "./conversion.types";
import {
  BlockCreationType,
  HashCreationType,
  KeyCreationType,
  NodeAddressCreationType,
  NodeUrlCreationType,
  RewardTransactionCreationType,
  TransactionCreationType,
  TransactionIdCreationType,
} from "./creation.types";
import { TargetManagementType } from "./management.types";
import { TransactionCalculationType } from "./transaction.types";

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

export type BlockchainConversionDependenciesType = {
  nodeConversion: NodeConversionType;
  blockConversion: BlockConversionType;
  transactionConversion: TransactionConversionType;
};

export type CreateBlockchainDependenciesType = {
  nodeDependencies: NodeDependenciesType;
  keyDependencies: KeyDependenciesType;
  miningDependencies: Omit<MiningDependenciesType, "hashCreation">;
  transactionDependencies: Omit<
    TransactionDependenciesType,
    "transactionConversion" | "transactionCreation"
  >;
};

export type AddBlockDependenciesType = {
  miningDependencies: Omit<
    MiningDependenciesType,
    "targetManagement" | "blockCreation"
  >;
  transactionDependencies: Omit<
    TransactionDependenciesType,
    "transactionCreation"
  >;
};
