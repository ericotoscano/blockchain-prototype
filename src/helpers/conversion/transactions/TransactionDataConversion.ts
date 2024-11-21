import { Transaction } from '../../../entities/transaction/Transaction';

import { ITransaction, TransactionIdCreationType, TransactionDataType, NewTransactionInputType } from '../../../types/transaction.types';
import { HashCreationType } from '../../../types/crypto.types';

export class TransactionDataConversion {
  static convert(data: TransactionDataType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType): ITransaction {
    const { sender, recipient, amount, fee, status, timestamp, txId } = data;

    const input: NewTransactionInputType = { sender, recipient, amount, fee };

    return new Transaction(input, hashCreation, transactionIdCreation, txId, status, timestamp);
  }
}
