import { IBlockchain } from '../../interfaces/blockchain/IBlockchain';
import { ResponseBaseType } from './ResponseBaseType';

export type BlockchainResponseType = ResponseBaseType & {
  data: { blockchain: IBlockchain };
};
