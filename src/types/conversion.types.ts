import { BlockDataType, IBlock } from './block.types';
import { ITransaction, TransactionDataType, TransactionIdCreationType } from './transaction.types';
import { HashCreationType } from './crypto.types';

export type BlockDataConversionType = {
  convert(data: BlockDataType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType, transactionDataConversion: TransactionDataConversionType): IBlock;
};

export type TransactionDataConversionType = {
  convert(data: TransactionDataType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType): ITransaction;
};
