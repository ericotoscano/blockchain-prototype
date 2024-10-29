import { checkReturn } from '../types/return.types';

import { Transactions } from './Transactions';

import { isValidHexString } from '../utils/validation.utils';

export class Blocks {
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
      return { result: false, message: 'The block height is a negative number or is not a integer number.' };
    }

    if (this.height !== global.blockchain.blocks.length) {
      return { result: false, message: 'The block height is not the right next block height in blockchain.' };
    }

    return { result: true, message: 'The block height format is valid.' };
  }

  checkNonceFormat(): checkReturn {
    if (this.nonce < 0 || !Number.isInteger(this.nonce)) {
      return { result: false, message: 'The block nonce is a negative number or is not a integer number.' };
    }

    return { result: true, message: 'The block nonce format is valid.' };
  }

  checkHashFormat(): checkReturn {
    if (!isValidHexString(this.hash)) {
      return { result: false, message: 'The block hash is not a valid hex string.' };
    }

    //verificar se o hash bate com o hash esperado

    return { result: true, message: 'The block hash format is valid.' };
  }
  checkPreviousHashFormat(): checkReturn {
    if (!isValidHexString(this.previousHash)) {
      return { result: false, message: 'The block previous hash is not a valid hex string.' };
    }

    if (global.blockchain.getPreviousBlock().hash !== this.previousHash) {
      return { result: false, message: 'The block previous hash and the last valid block hash in blockchain are not the same.' };
    }

    return { result: true, message: 'The block previous hash format is valid.' };
  }
  checkTransactionsFormat(): checkReturn {
    if (this.transactions.length === 0) {
      return { result: false, message: 'The block transactions is an empty array.' };
    }

    //verificar se cada transação esta validada

    return { result: true, message: 'The block transactions are valid.' };
  }
}
