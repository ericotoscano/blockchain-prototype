import { IBlockchain } from '../../../types/IBlockchain';
import { IBlock } from '../../../types/IBlock';
import { MiningDependenciesType, TransactionDependenciesType } from '../../../helpers/dependencies/types/DependenciesTypes';

import { BlockConversion } from '../../block/conversion/BlockConversion';
import { BlockDTO } from '../../block/conversion/types/BlockDTO';

export class BlockchainManagement {
  static getBlockchain(): IBlockchain {
    return global.blockchain;
  }

  static setBlockchain(blockchain: IBlockchain): void {
    global.blockchain = blockchain;
  }

  static addBlock(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): void {
    const block: IBlock = BlockConversion.convertToClass(blockDTO, transactionDependencies, miningDependencies);

    global.blockchain.blocksManagement.addBlock(block);
  }
}
