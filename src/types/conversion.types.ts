import { IBlock } from './block.types';
import { ITransaction } from './transaction.types';
import { BlockDTO, TransactionDTO } from './dto.types';
import { HashCreationType, TransactionIdCreationType } from './creation.types';

export type BlockDataConversionType = {
  convert(data: BlockDTO, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType, transactionDataConversion: ITransactionDataConversion): IBlock;
};

export interface ITransactionDataConversion {
  readonly hashCreation: HashCreationType;
  readonly transactionIdCreation: TransactionIdCreationType;
  convert(data: TransactionDTO): ITransaction;
  convertAll(data: TransactionDTO[]): ITransaction[];
}
