import { HashCreationType } from '../../types/crypto.types';
import { TransactionStatusType, NewTransactionInputType, TransactionIdCreationType, ITransaction } from '../../types/transaction.types';

export class Transaction implements ITransaction {
  readonly txId: string;
  status: TransactionStatusType;
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly timestamp: number;

  constructor(
    input: NewTransactionInputType,
    readonly transactionIdCreation: TransactionIdCreationType,
    readonly hashCreation: HashCreationType,
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
