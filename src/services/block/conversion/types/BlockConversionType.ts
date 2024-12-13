import { IBlock } from '../../../../domain/types/IBlock';
import { TransactionDependenciesType, MiningDependenciesType } from '../../../../shared/helpers/DependenciesTypes';
import { TransactionConversionType } from '../../../transaction/conversion/types/TransactionConversionType';
import { BlockDTO } from './BlockDTO';

export type BlockConversionType = {
  convertToClass(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock;
  convertAllToClass(
    blocksDTO: BlockDTO[],
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock[];
  convertToDTO(block: IBlock, transactionConversion: TransactionConversionType): BlockDTO;
  convertAllToDTO(blocks: IBlock[], transactionConversion: TransactionConversionType): BlockDTO[];
};
