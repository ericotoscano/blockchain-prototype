import { IBlockchain } from '../../../../types/IBlockchain';
import { TransactionDependenciesType, MiningDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';
import { BlockDTO } from '../../../block/conversion/types/BlockDTO';

export type BlockchainManagementType = {
  getBlockchain(): IBlockchain;
  setBlockchain(blockchain: IBlockchain): void;
  addBlock(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): void;
};
