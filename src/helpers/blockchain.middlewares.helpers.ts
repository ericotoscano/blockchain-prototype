import { sha256 } from 'js-sha256';

import { BlockchainData, BlockData, TransactionData } from '../types/data.types';
import { CheckerFunction, CheckReturn } from '../types/check.types';

import { checkAll } from './checkers.helpers';
import { isValidTimestamp, isValidHex40String, isValidHex64String } from '../utils/DateFomatValidation';

export const checkBlockchainFormat = (blockchain: BlockchainData): CheckReturn => {
  if (!blockchain || typeof blockchain !== 'object' || Array.isArray(blockchain)) {
    return { result: false, message: 'The blockchain is not valid or was not provided.' };
  }

  return { result: true, message: 'The blockchain format is valid.' };
};

export const checkNextBlockFormat = (nextBlock: BlockData): CheckReturn => {
  if (!nextBlock || typeof nextBlock !== 'object' || Array.isArray(nextBlock)) {
    return { result: false, message: 'The next block is not valid or was not provided.' };
  }

  return { result: true, message: 'The next block format is valid.' };
};

export const checkNextBlockHeigth = (height: number): CheckReturn => {
  if (!height || height < 0 || !Number.isInteger(height) || typeof height !== 'number') {
    return { result: false, message: 'The next block height is not a positive integer number or was not provided.' };
  }

  return { result: true, message: 'The next block height is valid.' };
};

export const checkNextBlockNonce = (nonce: number): CheckReturn => {
  if (!nonce || nonce < 0 || !Number.isInteger(nonce) || typeof nonce !== 'number') {
    return { result: false, message: 'The next block nonce is not a positive integer number or was not provided.' };
  }

  return { result: true, message: 'The next block nonce is valid.' };
};

export const checkNextBlockHash = (height: number, nonce: number, hash: string, previousHash: string, transactions: TransactionData[]): CheckReturn => {
  if (!hash || !isValidHex64String(hash)) {
    return { result: false, message: 'The next block hash is not an hex 64 string or was not provided.' };
  }

  const expectedHash = sha256(`${height}${nonce}${previousHash}${JSON.stringify(transactions)}`);

  if (BigInt('0x' + expectedHash) >= BigInt('0x' + global.blockchain.targetDifficulty)) {
    return { result: false, message: 'The next block hash does not meet the required difficulty.' };
  }

  if (expectedHash !== hash) {
    return { result: false, message: 'The next block hash does not match with the expected hash.' };
  }

  return { result: true, message: 'The next block hash is valid.' };
};

export const checkNextBlockPreviousHash = (previousHash: string): CheckReturn => {
  if (!previousHash || !isValidHex64String(previousHash)) {
    return { result: false, message: 'The next block previous hash is not an hex 64 string or was not provided.' };
  }

  if (global.blockchain.getPreviousBlock().hash !== previousHash) {
    return { result: false, message: 'The next block previous hash and the last valid block hash in blockchain are not the same.' };
  }

  return { result: true, message: 'The next block previous hash is valid.' };
};

export const checkNextBlockTransactions = (transactions: TransactionData[]): CheckReturn => {
  if (!transactions || !Array.isArray(transactions)) {
    return { result: false, message: 'The next block transactions is not an array or was not provided.' };
  }

  const transactionsCheckers: CheckerFunction[] = [() => checkNextBlockTransactionsLength(transactions)];

  const { result, message } = checkAll(transactionsCheckers);

  if (!result) {
    return { result, message };
  }

  for (let i = 0; i < transactions.length - 1; i++) {
    const { sender, recipient, amount, fee, status, timestamp, txId } = transactions[i];

    const checkers: CheckerFunction[] = [
      () => checkNextBlockNewTransactionsFormat(transactions[i], i),
      () => checkNextBlockNewTransactionsAddresses(sender, recipient, txId),
      () => checkNextBlockNewTransactionsValues(sender, amount, fee, txId),
      () => checkNextBlockNewTransactionsStatus(status, txId),
      () => checkNextBlockNewTransactionsTimestamp(timestamp, txId),
      () => checkNextBlockNewTransactionsTxId(txId, i),
      () => checkNextBlockNewTransactionsDuplicity(transactions[i], txId),
    ];

    const { result, message } = checkAll(checkers);

    if (!result) {
      return { result, message };
    }
  }

  return { result: true, message: 'The next block transactions are valid.' };
};

export const checkNextBlockTransactionsLength = (transactions: TransactionData[]): CheckReturn => {
  if (transactions.length === 0) {
    return { result: false, message: 'The next block transactions is an empty array.' };
  }

  if (transactions.length > blockchain.maxTransactionsPerBlock) {
    return {
      result: false,
      message: "Considering the miner's reward transaction, the number of next block transactions must be equal to the maximum number of transactions per block, minus one.",
    };
  }

  return { result: true, message: 'The transactions length is valid.' };
};

export const checkNextBlockNewTransactionsFormat = (transaction: TransactionData, transactionIndex: number): CheckReturn => {
  if (!transaction || typeof transaction !== 'object' || Array.isArray(transaction)) {
    return { result: false, message: `In next block transactions, at index ${transactionIndex}, the transaction was not provided or is not valid.` };
  }
  return { result: true, message: 'All next block transactions format are valid.' };
};

export const checkNextBlockNewTransactionsAddresses = (sender: string, recipient: string, txId: string): CheckReturn => {
  if (!sender || !isValidHex40String(sender)) {
    return { result: false, message: `In next block transactions, at transaction ${txId}, the sender was not provided or is not an hex 40 string.` };
  }

  if (!recipient || !isValidHex40String(recipient)) {
    return { result: false, message: `In next block transactions, at transaction ${txId}, the recipient was not provided or is not an hex 40 string.` };
  }

  if (sender === recipient) {
    return { result: false, message: `In next block transactions, at transaction ${txId}, the sender and recipient addresses are the same.` };
  }

  return { result: true, message: 'All next block transactions addresses are valid.' };
};

export const checkNextBlockNewTransactionsValues = (sender: string, amount: number, fee: number, txId: string): CheckReturn => {
  if (sender !== '0'.repeat(40)) {
    if (!amount || amount < 0 || typeof amount !== 'number') {
      return { result: false, message: `In next block transactions, at transaction ${txId}, the amount was not provided or is not a positive number.` };
    }

    if (!fee || fee < 0 || typeof fee !== 'number') {
      return { result: false, message: `In next block transactions, at transaction ${txId}, the fee was not provided or is not a positive number.` };
    }
  } else {
    if (amount <= global.blockchain.reward) {
      return { result: false, message: `In next block's transactions, the amount in the reward transaction ${txId} should be greater than the current blockchain reward value.` };
    }

    if (fee !== 0) {
      return { result: false, message: `In the next block's transactions, the fee in the reward transaction ${txId} should be equal to zero.` };
    }
  }

  return { result: true, message: 'All next block transactions values are valid.' };
};

export const checkNextBlockNewTransactionsStatus = (status: string, txId: string): CheckReturn => {
  if (!status || status !== 'Pending') {
    return { result: false, message: `In next block transactions, at transaction ${txId}, the status was not provided or is not 'Pending'.` };
  }
  return { result: true, message: 'All next block transactions status are valid.' };
};

export const checkNextBlockNewTransactionsTimestamp = (timestamp: Date, txId: string): CheckReturn => {
  if (!timestamp || !isValidTimestamp(timestamp)) {
    return { result: false, message: `In next block transactions, at transaction ${txId}, the timestamp was not provided or is not valid.` };
  }

  return { result: true, message: 'All next block transactions timestamp are valid.' };
};

export const checkNextBlockNewTransactionsTxId = (txId: string, transactionIndex: number): CheckReturn => {
  if (!txId || !isValidHex64String(txId)) {
    return { result: false, message: `In next block transactions, at index ${transactionIndex}, the txId was not provided or is not valid.` };
  }

  return { result: true, message: 'All next block transactions txId are valid.' };
};

export const checkNextBlockNewTransactionsDuplicity = (transaction: TransactionData, txId: string): CheckReturn => {
  const allConfirmedTransactions = global.blockchain.getConfirmedTransactions();

  if (allConfirmedTransactions.some((confirmedTransaction) => confirmedTransaction.txId === transaction.txId)) {
    return {
      result: false,
      message: `In the next block transactions, the transaction ${txId} has the same txId of a confirmed transaction in blockchain.`,
    };
  }

  return { result: true, message: 'All next block transactions uniquiness are valid.' };
};
