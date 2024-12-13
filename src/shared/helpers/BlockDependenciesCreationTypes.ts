import { MiningDependenciesType, TransactionDependenciesType } from './DependenciesTypes';

export type BlockDependenciesCreationType = {
  addBlock(): AddBlockDependenciesType;
};

export type AddBlockDependenciesType = {
  miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>;
  transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>;
};
