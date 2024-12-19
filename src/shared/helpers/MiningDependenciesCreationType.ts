import { BlockDependenciesType, MiningDependenciesType, TransactionDependenciesType } from './DependenciesTypes';

export type MiningDependenciesCreationType = {
  mineBlock(): MineBlockDependenciesType;
};

export type MineBlockDependenciesType = {
  blockHeight: number;
  previousBlockHash: string;
  target: string;
  blockDependencies: BlockDependenciesType;
  miningDependencies: Omit<MiningDependenciesType, 'targetManagement'>;
  transactionsDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>;
};
