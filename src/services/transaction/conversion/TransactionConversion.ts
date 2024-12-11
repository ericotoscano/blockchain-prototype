import { ITransaction } from '../../../domain/types/ITransaction';
import { HashCreationType } from '../../../shared/utils/HashCreationType';
import { TransactionCreation } from '../creation/TransactionCreation';
import { TransactionIdCreationType } from '../creation/types/TransactionIdCreationType';
import { TransactionDTO } from './types/TransactionDTO';

export class TransactionConversion {
  static convertToClass(transactionDTO: TransactionDTO, transactionIdCreation: TransactionIdCreationType, hashCreation: HashCreationType): ITransaction {
    const { sender, recipient, amount, fee, txId, status, timestamp } = transactionDTO;

    return TransactionCreation.create(sender, recipient, amount, fee, transactionIdCreation, hashCreation, txId, status, timestamp);
  }

  static convertAllToClass(transactionsDTO: TransactionDTO[], transactionIdCreation: TransactionIdCreationType, hashCreation: HashCreationType): ITransaction[] {
    const transactions: ITransaction[] = [];

    for (const transaction of transactionsDTO) {
      transactions.push(TransactionConversion.convertToClass(transaction, transactionIdCreation, hashCreation));
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
