import { Transaction } from '../../models/Transaction';
import { HashCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { ITransaction, TransactionStatusType } from '../../types/transaction.types';

export class TransactionCreation {
  static create(
    sender: string,
    recipient: string,
    amount: number,
    fee: number,
    hashCreation: HashCreationType,
    transactionIdCreation: TransactionIdCreationType,
    txId?: string,
    status?: TransactionStatusType,
    timestamp?: number
  ): ITransaction {
    const transactionStatus = status ?? 'Pending';
    
    const transactionTimestamp = timestamp ?? Date.now();

    const transactionData = `${sender}${recipient}${amount}${fee}${timestamp}`;

    const transactionId = txId ?? transactionIdCreation.create(transactionData, hashCreation);

    return new Transaction(sender, recipient, amount, fee, transactionId, transactionStatus, transactionTimestamp);
  }
}
