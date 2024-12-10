import { IBlock } from '../../../../types/IBlock';
import { TransactionDependenciesType, MiningDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';
import { ITransaction } from '../../../../types/ITransaction';

export type BlockCreationType = {
  create(
    height: number,
    previousHash: string,
    transactions: ITransaction[],
    target: string,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock;
};
