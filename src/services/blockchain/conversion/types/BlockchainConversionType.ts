import { IBlockchain } from '../../../../types/BlockchainType';
import { NodeConversionType, BlockConversionType, TransactionConversionType } from '../../../../types/conversion.types';
import { NodeDependenciesType, KeyDependenciesType, MiningDependenciesType, TransactionDependenciesType } from '../../../../types/dependencies.types';
import { BlockchainDTOInput, BlockchainDTOOutput } from '../../../../types/dto.types';

export type BlockchainConversionType = {
  convertToClass(
    blockchainDTOInput: BlockchainDTOInput,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>
  ): IBlockchain;
  convertToDTO(blockchain: IBlockchain, nodeConversion: NodeConversionType, blockConversion: BlockConversionType, transactionConversion: TransactionConversionType): BlockchainDTOOutput;
};
