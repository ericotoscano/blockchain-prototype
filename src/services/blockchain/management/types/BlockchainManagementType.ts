
import { IBlockchain } from '../../../../types/BlockchainType';
import { TransactionDependenciesType, MiningDependenciesType } from '../../../../types/dependencies.types';
import { BlockDTO } from '../../../../types/dto.types';

export type BlockchainManagementType = {
  getBlockchain(): IBlockchain;
  setBlockchain(blockchain: IBlockchain): void;
  addBlock(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): void;
};
