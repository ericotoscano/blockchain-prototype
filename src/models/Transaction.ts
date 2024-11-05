import { sha256 } from 'js-sha256';

export class Transaction {
  txId: string;
  status: string;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  timestamp: Date;

  constructor(sender: string, recipient: string, amount: number, fee: number) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.fee = fee;
    this.status = 'Pending';
    this.timestamp = new Date();
    this.txId = this.createTxId();
  }

  getData(): string {
    return `${this.status}${this.sender}${this.recipient}${this.amount.toString()}${this.fee.toString()}${this.timestamp}`;
  }

  createTxId(): string {
    return sha256(this.getData());
  }

  changeStatus(): void {
    if (this.status === 'Pending') {
      this.status = 'Confirmed';
    } else {
      this.status = 'Pending';
    }
  }
}
