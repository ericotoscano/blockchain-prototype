import { IBlock } from '../../interfaces/block/IBlock';
import { ITransactionDataConversion } from '../../interfaces/conversion/ITransactionDataConversion';

import { BlockDataType } from '../block/BlockDataType';
import { HashCreationType } from '../creation/HashCreationType';
import { TransactionIdCreationType } from '../creation/TransactionIdCreationType';

export type BlockDataConversionType = {
  convert(data: BlockDataType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType, transactionDataConversion: ITransactionDataConversion): IBlock;
};
