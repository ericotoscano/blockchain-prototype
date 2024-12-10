import { IBlockchain } from '../../../../types/IBlockchain';
import { NodeDependenciesType, KeyDependenciesType, MiningDependenciesType, TransactionDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';

export type BlockchainCreationType = {
  create(
    targetZeros: number,
    reward: number,
    maxTransactionsPerBlock: number,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>
  ): IBlockchain;
};