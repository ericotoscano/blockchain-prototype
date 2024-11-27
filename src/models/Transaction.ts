import { ITransaction } from '../types/ITransaction';

import { HashCreationType } from '../types/creation/HashCreationType';
import { TransactionIdCreationType } from '../types/creation/TransactionIdCreationType';
import { TransactionInputType } from '../types/transactions/TransactionInputType';
import { TransactionStatusType } from '../types/transaction.types';

export class Transaction implements ITransaction {
  readonly txId: string;
  status: TransactionStatusType;
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly timestamp: number;

  constructor(
    readonly input: TransactionInputType,
    readonly hashCreation: HashCreationType,
    readonly transactionIdCreation: TransactionIdCreationType,
    txId?: string,
    status?: TransactionStatusType,
    timestamp?: number
  ) {
    this.sender = input.sender;
    this.recipient = input.recipient;
    this.amount = input.amount;
    this.fee = input.fee;
    this.status = status ?? 'Pending';
    this.timestamp = timestamp ?? Date.now();
    this.txId = txId ?? this.transactionIdCreation.create(this.getData(), hashCreation);
  }

  getData(): string {
    return `${this.sender}${this.recipient}${this.amount}${this.fee}${this.timestamp}`;
  }
}
