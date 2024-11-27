import { Transaction } from '../../models/Transaction';
import { ITransactionDataConversion } from '../../types/conversion.types';
import { HashCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { TransactionDTO } from '../../types/dto.types';
import { ITransaction, TransactionInputType } from '../../types/transaction.types';

export class TransactionDataConversion implements ITransactionDataConversion {
  constructor(readonly hashCreation: HashCreationType, readonly transactionIdCreation: TransactionIdCreationType) {}

  convert(data: TransactionDTO): ITransaction {
    const { sender, recipient, amount, fee, status, timestamp, txId } = data;

    const input: TransactionInputType = { sender, recipient, amount, fee };

    return new Transaction(input, this.hashCreation, this.transactionIdCreation, txId, status, timestamp);
  }

  convertAll(data: TransactionDTO[]): ITransaction[] {
    const transactions: ITransaction[] = [];

    for (const transaction of data) {
      transactions.push(this.convert(transaction));
    }

    return transactions;
  }
}
