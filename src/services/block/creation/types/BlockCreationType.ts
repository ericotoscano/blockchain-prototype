import { IBlock } from '../../../../domain/types/IBlock';
import { TransactionDependenciesType, MiningDependenciesType } from '../../../../shared/helpers/DependenciesTypes';
import { ITransaction } from '../../../../domain/types/ITransaction';

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
