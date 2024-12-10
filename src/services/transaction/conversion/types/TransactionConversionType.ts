import { TransactionIdCreationType, HashCreationType } from '../../../../types/creation.types';
import { TransactionDTO } from '../../../../types/ResponseDTO';
import { ITransaction } from '../../../../types/ITransaction';

export type TransactionConversionType = {
  convertToClass(transactionDTO: TransactionDTO, transactionIdCreation: TransactionIdCreationType, hashCreation: HashCreationType): ITransaction;
  convertAllToClass(transactionsDTO: TransactionDTO[], transactionIdCreation: TransactionIdCreationType, hashCreation: HashCreationType): ITransaction[];
  convertToDTO(transaction: ITransaction): TransactionDTO;
  convertAllToDTO(transactions: ITransaction[]): TransactionDTO[];
};
