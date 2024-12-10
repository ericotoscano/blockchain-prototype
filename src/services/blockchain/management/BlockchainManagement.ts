import '../../../global';
import { IBlockchain } from '../../../types/IBlockchain';

export class BlockchainManagement {
  static getBlockchain(): IBlockchain {
    return global.blockchain;
  }

  static getTarget(): string {
    return global.blockchain.target;
  }

  static setBlockchain(blockchain: IBlockchain): void {
    global.blockchain = blockchain;
  }
}
