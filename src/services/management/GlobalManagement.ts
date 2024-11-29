import '../../global';

import { IBlockchain } from '../../types/blockchain.types';

export class GlobalManagement {
  static setBlockchain(blockchain: IBlockchain): void {
    global.blockchain = blockchain;
  }

  static getBlockchain(): IBlockchain {
    return { ...global.blockchain };
  }
}
