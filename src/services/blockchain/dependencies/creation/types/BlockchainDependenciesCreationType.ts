import { NodeDependenciesType, KeyDependenciesType, MiningDependenciesType, TransactionDependenciesType } from '../../../../../types/dependencies.types';

export type BlockchainDependenciesCreationType = {
  createBlockchain(): CreateBlockchainDependenciesType;
};

export type CreateBlockchainDependenciesType = {
  nodeDependencies: NodeDependenciesType;
  keyDependencies: KeyDependenciesType;
  miningDependencies: MiningDependenciesType;
  transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>;
};
