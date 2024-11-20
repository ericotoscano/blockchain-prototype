import { BlockDataType, IBlock } from './block.types';
import { ITransaction, TransactionDataType, TransactionIdCreationType } from './transaction.types';

export type AddressVerificationType = {
  verify(publicKey: string, expectedAddress: string): boolean;
};

export type DateFormatValidationType = {
  validate(data: Date): boolean;
};

export type HexStringFormatValidationType = {
  validate(data: string, numberOfChar: number): boolean;
};

export type BlockDataConversionType = {
  convert(data: BlockDataType, transactionDataConversion: TransactionDataConversionType, transactionIdCreation: TransactionIdCreationType): IBlock;
};

export type TransactionDataConversionType = {
  convert(data: TransactionDataType, transactionIdCreation: TransactionIdCreationType): ITransaction;
};
