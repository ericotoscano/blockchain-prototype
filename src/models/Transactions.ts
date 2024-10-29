import { sha256 } from 'js-sha256';

import { checkReturn } from '../types/return.types';

import { isValidHexString, isValidTimestamp } from '../utils/validation.utils';

export class Transactions {
  txId: string;
  status: string;
  timestamp: Date;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;

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
    return this.timestamp.toString() + this.status + this.sender + this.recipient + this.amount.toString() + this.fee.toString();
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
