import { IBlock } from '../types/block.types';
import { IBlockchain } from '../types/blockchain.types';
import { AddBlockDependenciesType } from '../types/dependencies.types';
import { BlockDTO } from '../types/dto.types';
import { BlockConversion } from './conversion/BlockConversion';

export class BlockchainManagement {
  static getBlockchain(): IBlockchain {
    return global.blockchain;
  }

  static setBlockchain(blockchain: IBlockchain): void {
    global.blockchain = blockchain;
  }

  static addBlock(blockDTO: BlockDTO, dependencies: AddBlockDependenciesType): void {
    const block: IBlock = BlockConversion.convertToClass(blockDTO, dependencies);

    global.blockchain.blocksManagement.addBlock(block);
  }
}
