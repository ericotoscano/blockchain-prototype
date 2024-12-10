import { BlockCreationType } from "../../../services/block/creation/types/BlockCreationType";
import { BlockMiningType } from "../../../services/block/mining/types/BlockMiningType";
import { TargetManagementType } from "../../../services/blockchain/target/management/types/TargetManagementType";
import { NodeAddressCreationType } from "../../../services/node/creation/types/NodeAddressCreationType";
import { NodeUrlCreationType } from "../../../services/node/creation/types/NodeUrlCreationType";
import { TransactionCalculationType } from "../../../services/transaction/calculation/types/TransactionCalculationType";
import { TransactionConversionType } from "../../../services/transaction/conversion/types/TransactionConversionType";
import { RewardTransactionCreationType } from "../../../services/transaction/creation/types/RewardTransactionCreationType";
import { TransactionCreationType } from "../../../services/transaction/creation/types/TransactionCreationType";
import { TransactionIdCreationType } from "../../../services/transaction/creation/types/TransactionIdCreationType";
import { HashCreationType } from "../../../utils/creation/types/HashCreationType";
import { KeyCreationType } from "../../../utils/creation/types/KeyCreationType";

export type NodeDependenciesType = {
  nodeUrlCreation: NodeUrlCreationType;
  nodeAddressCreation: NodeAddressCreationType;
};

export type TransactionDependenciesType = {
  transactionConversion: TransactionConversionType;
  transactionCalculation: TransactionCalculationType;
  transactionCreation: TransactionCreationType;
  transactionIdCreation: TransactionIdCreationType;
  rewardTransactionCreation: RewardTransactionCreationType;
};

export type MiningDependenciesType = {
  targetManagement: TargetManagementType;
  blockMining: BlockMiningType;
  blockCreation: BlockCreationType;
  hashCreation: HashCreationType;
};

export type KeyDependenciesType = {
  keyCurveOption: string;
  keyCreation: KeyCreationType;
  mainHashCreation: HashCreationType;
  secondHashCreation: HashCreationType;
};
