import { Transaction } from '../../../models/Transaction';
import { ITransaction, TransactionStatusType } from '../../../types/ITransaction';
import { TransactionIdCreationType } from './types/TransactionIdCreationType';
import { HashCreationType } from '../../../utils/creation/types/HashCreationType';

export class TransactionCreation {
  static create(
    sender: string,
    recipient: string,
    amount: number,
    fee: number,
    transactionIdCreation: TransactionIdCreationType,
    hashCreation: HashCreationType,
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
