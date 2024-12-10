import { TransactionStatusType, ITransaction } from '../../../../types/ITransaction';
import { TransactionIdCreationType } from '../../../../types/creation.types';
import { HashCreationType } from '../../../../utils/creation/types/HashCreationType';

export type TransactionCreationType = {
  create(
    sender: string,
    recipient: string,
    amount: number,
    fee: number,
    transactionIdCreation: TransactionIdCreationType,
    hashCreation: HashCreationType,
    txId?: string,
    status?: TransactionStatusType,
    timestamp?: number
  ): ITransaction;
};
