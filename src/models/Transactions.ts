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

  checkAddressesFormat(): checkReturn {
    if (!isValidHexString(this.sender) || !isValidHexString(this.recipient)) {
      return { result: false, message: 'The transaction sender address or the transaction recipient address is not a valid hex string.' };
    }

    if (this.sender === this.recipient) {
      return { result: false, message: 'The transaction sender address and the transaction recipient address are the same.' };
    }

    return { result: true, message: 'The transaction sender address format and the transaction recipient address format are valid.' };
  }

  checkValuesFormat(): checkReturn {
    if (this.amount < 0 || this.fee < 0) {
      return { result: false, message: 'The transaction amount or the transaction fee is a negative number.' };
    }

    //amount e fee são valores que batem com o saldo do endereço do sender

    return { result: true, message: 'The transaction values format are valid.' };
  }

  checkStatusFormat(): checkReturn {
    if (!this.status) {
      return { result: false, message: 'The transaction status was not provided.' };
    }

    if (this.status !== 'Pending') {
      return { result: false, message: "The transaction status is not valid (must be 'Pending')." };
    }

    return { result: true, message: 'The transaction status format is valid.' };
  }

  checkTimestampFormat(): checkReturn {
    if (!this.timestamp || !isValidTimestamp(this.timestamp)) {
      return { result: false, message: 'The transaction timestamp was not provided or is not valid.' };
    }

    return { result: true, message: 'The transaction timestamp format is valid.' };
  }

  checkTxIdFormat(): checkReturn {
    if (!this.txId || !isValidHexString(this.txId)) {
      return { result: false, message: 'The transaction txId was not provided or is not valid.' };
    }

    if (!global.blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== this.txId)) {
      return { result: false, message: 'The transaction is already on the blockchain mempool.' };
    }

    return { result: true, message: 'The transaction txId format is valid.' };
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
