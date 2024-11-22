import { ITransaction } from '../transactions/ITransaction';

import { TransactionIdCreationType } from '../../types/creation/TransactionIdCreationType';
import { TransactionDataType } from '../../types/transactions/TransactionDataType';
import { HashCreationType } from '../../types/creation/HashCreationType';

export interface ITransactionDataConversion {
  readonly hashCreation: HashCreationType;
  readonly transactionIdCreation: TransactionIdCreationType;
  convert(data: TransactionDataType): ITransaction;
  convertAll(data: TransactionDataType[]): ITransaction[];
}
