import { HashCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { TransactionDTO } from '../../types/dto.types';
import { ITransaction } from '../../types/transaction.types';
import { TransactionCreation } from '../creation/TransactionCreation';

export class TransactionConversion {
  static convertToClass(transactionDTO: TransactionDTO, creationDependencies: { hashCreation: HashCreationType; transactionIdCreation: TransactionIdCreationType }): ITransaction {
    const { sender, recipient, amount, fee, txId, status, timestamp } = transactionDTO;

    return TransactionCreation.create(sender, recipient, amount, fee, creationDependencies, txId, status, timestamp);
  }

  static convertAllToClass(transactionsDTO: TransactionDTO[], creationDependencies: { hashCreation: HashCreationType; transactionIdCreation: TransactionIdCreationType }): ITransaction[] {
    const transactions: ITransaction[] = [];

    for (const transaction of transactionsDTO) {
      transactions.push(TransactionConversion.convertToClass(transaction, creationDependencies));
    }

    return transactions;
  }

  static convertToDTO(transaction: ITransaction): TransactionDTO {
    return {
      sender: transaction.sender,
      recipient: transaction.recipient,
      amount: transaction.amount,
      fee: transaction.fee,
      txId: transaction.txId,
      status: transaction.status,
      timestamp: transaction.timestamp,
    };
  }

  static convertAllToDTO(transactions: ITransaction[]): TransactionDTO[] {
    const transactionsDTO: TransactionDTO[] = [];

    for (const transaction of transactions) {
      transactionsDTO.push(TransactionConversion.convertToDTO(transaction));
    }

    return transactionsDTO;
  }
}
