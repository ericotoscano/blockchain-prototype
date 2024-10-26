import { BlocksType, checkReturn } from '../types/blocks.types';
import { Transactions } from './Transactions';
import { Blockchain } from './Blockchain';

import { isValidHexString } from '../utils/time.utils';

export class Blocks implements BlocksType {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: Transactions[];

  constructor(height: number = 0, nonce: number = 0, hash: string = '', previousHash: string = '', transactions: Transactions[] = []) {
    this.height = height;
    this.nonce = nonce;
    this.hash = hash;
    this.previousHash = previousHash;
    this.transactions = transactions;
  }

  getData(): string {
    return JSON.stringify(this.transactions) + this.height + this.previousHash + this.nonce;
  }

  addTransaction(transaction: Transactions): void {
    this.transactions.push(transaction);
  }

  addRewardTransaction(): void {
    const allFees = this.transactions.reduce((sum, transaction) => sum + transaction.fee, 0);

    const rewardTransaction = new Transactions('Block Reward', 'Miner Address', blockchain.reward + allFees, 0);

    this.transactions.unshift(rewardTransaction);
  }

  checkHeightFormat(): checkReturn {
    if (this.height < 0 || !Number.isInteger(this.height)) {
      return { result: false, message: 'The height of the sent block is not a positive integer number.' };
    }

    if (this.height !== global.blockchain.blocks.length) {
      return { result: false, message: 'The height of sent block is not the right next block height in blockchain.' };
    }

    return { result: true, message: 'The height of the sent block is valid.' };
  }

  checkNonceFormat(): checkReturn {
    if (this.nonce < 0 || !Number.isInteger(this.nonce)) {
      return { result: false, message: 'The nonce of the sent block is not a positive integer number.' };
    }

    return { result: true, message: 'The nonce of the sent block is valid.' };
  }

  checkHashFormat(): checkReturn {
    if (!isValidHexString(this.hash)) {
      return { result: false, message: 'The hash of the sent block is not a valid hex string.' };
    }

    //verificar se o hash bate com o hash esperado

    return { result: true, message: 'The hash of the sent block is valid.' };
  }
  checkPreviousHashFormat(): checkReturn {
    if (!isValidHexString(this.previousHash)) {
      return { result: false, message: 'The previous hash of the sent block is not a valid hex string.' };
    }

    if (global.blockchain.getPreviousBlock().hash !== this.previousHash) {
      return { result: false, message: 'The previous hash of the sent block and the hash of the last valid block in blockchain are not the same.' };
    }

    return { result: true, message: 'The previous hash of the sent block is valid.' };
  }
  checkTransactionsFormat(): checkReturn {
    if (this.transactions.length === 0) {
      return { result: false, message: 'The transactions in the sent block is an empty array.' };
    }

    //verificar se cada transação esta validada

    return { result: true, message: 'The transactions of the sent block are valid.' };
  }
}
