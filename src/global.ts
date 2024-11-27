import 'dotenv/config';

import { IBlockchain } from './types/blockchain.types';

declare global {
  var blockchain: IBlockchain;
}

export {};
