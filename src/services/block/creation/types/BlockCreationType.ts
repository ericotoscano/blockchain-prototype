import { IBlock } from '../../../../types/IBlock';
import { TransactionDependenciesType, MiningDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';
import { ITransaction } from '../../../../types/ITransaction';

export type BlockCreationType = {
  create(
    height: number,
    previousHash: string,
    target: string,
    transactions: ITransaction[],
    transactionsDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock;
};
