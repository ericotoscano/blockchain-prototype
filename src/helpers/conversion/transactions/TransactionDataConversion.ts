import { Transaction } from '../../../entities/transaction/Transaction';

import { ITransaction } from '../../../interfaces/transactions/ITransaction';
import { ITransactionDataConversion } from '../../../interfaces/conversion/ITransactionDataConversion';

import { TransactionIdCreationType } from '../../../types/creation/TransactionIdCreationType';
import { TransactionDataType } from '../../../types/transactions/TransactionDataType';
import { TransactionInputType } from '../../../types/transactions/TransactionInputType';
import { HashCreationType } from '../../../types/creation/HashCreationType';

export class TransactionDataConversion implements ITransactionDataConversion {
  constructor(readonly hashCreation: HashCreationType, readonly transactionIdCreation: TransactionIdCreationType) {}

  convert(data: TransactionDataType): ITransaction {
    const { sender, recipient, amount, fee, status, timestamp, txId } = data;

    const input: TransactionInputType = { sender, recipient, amount, fee };

    return new Transaction(input, this.hashCreation, this.transactionIdCreation, txId, status, timestamp);
  }

  convertAll(data: TransactionDataType[]): ITransaction[] {
    const transactions: ITransaction[] = [];

    for (const transaction of data) {
      transactions.push(this.convert(transaction));
    }

    return transactions;
  }
}
