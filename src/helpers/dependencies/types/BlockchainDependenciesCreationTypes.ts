import { NodeDependenciesType, KeyDependenciesType, MiningDependenciesType, TransactionDependenciesType } from './DependenciesTypes';

export type BlockchainDependenciesCreationType = {
  createBlockchain(): CreateBlockchainDependenciesType;
};

export type CreateBlockchainDependenciesType = {
  nodeDependencies: NodeDependenciesType;
  keyDependencies: KeyDependenciesType;
  miningDependencies: MiningDependenciesType;
  transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>;
};
