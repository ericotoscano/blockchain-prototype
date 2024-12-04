import { HashCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { TransactionDTO } from '../../types/dto.types';
import { ITransaction } from '../../types/transaction.types';
import { Sha256HashCreation } from '../../utils/creation/Sha256HashCreation';
import { TransactionCreation } from '../creation/TransactionCreation';
import { TransactionIdCreation } from '../creation/TransactionIdCreation';

export class TransactionConversion {
  static convertToClass(transactionDTO: TransactionDTO, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType): ITransaction {
    const { sender, recipient, amount, fee, txId, status, timestamp } = transactionDTO;

    return TransactionCreation.create(sender, recipient, amount, fee, hashCreation, transactionIdCreation, txId, status, timestamp);
  }

  static convertAllToClass(transactionsDTO: TransactionDTO[]): ITransaction[] {
    const transactions: ITransaction[] = [];

    for (const transaction of transactionsDTO) {
      transactions.push(TransactionConversion.convertToClass(transaction, Sha256HashCreation, TransactionIdCreation));
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
