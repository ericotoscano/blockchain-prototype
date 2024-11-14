import { ITransactionIdCreation } from './TransactionIdCreation';
import { TransactionStatusType } from './TransactionStatusManagement';

interface TransactionProps {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
}

export interface ITransaction {
  readonly txId: string;
  status: TransactionStatusType;
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly timestamp: number;
  readonly transactionIdCreation: ITransactionIdCreation;
  getData(): string;
}

export class Transaction implements ITransaction {
  readonly txId: string;
  status: TransactionStatusType;
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
  readonly fee: number;
  readonly timestamp: number;

  constructor(props: TransactionProps, readonly transactionIdCreation: ITransactionIdCreation, txId?: string, status?: TransactionStatusType, timestamp?: number) {
    this.sender = props.sender;
    this.recipient = props.recipient;
    this.amount = props.amount;
    this.fee = props.fee;
    this.status = status ?? 'Pending';
    this.timestamp = timestamp ?? Date.now();
    this.txId = txId ?? this.transactionIdCreation.create(this.getData());
  }

  getData(): string {
    return `${this.sender}${this.recipient}${this.amount}${this.fee}${this.timestamp}`;
  }
}
