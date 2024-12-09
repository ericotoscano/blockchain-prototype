import { IBlockchain } from '../../../../types/BlockchainType';
import { NodeDependenciesType, KeyDependenciesType, MiningDependenciesType, TransactionDependenciesType } from '../../../../types/dependencies.types';

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
