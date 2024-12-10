import { IBlockchain } from '../../../../types/IBlockchain';
import { NodeDependenciesType, KeyDependenciesType, MiningDependenciesType, TransactionDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';
import { BlockConversionType } from '../../../block/conversion/types/BlockConversionType';
import { NodeConversionType } from '../../../node/conversion/types/NodeConversionType';
import { TransactionConversionType } from '../../../transaction/conversion/types/TransactionConversionType';
import { BlockchainDTOInput, BlockchainDTOOutput } from './BlockchainDTO';

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
