import { BlockData, TransactionData } from '../types/data.types';

import { CheckReturn } from '../types/return.types';

export const checkNextBlockDataFormat = (nextBlock: BlockData): CheckReturn => {
  if (!nextBlock || typeof nextBlock !== 'object' || Array.isArray(nextBlock)) {
    return { result: false, message: 'The next block is not valid or was not provided.' };
  }

  const { height, nonce, hash, previousHash, transactions } = nextBlock;

  if (!height || typeof height !== 'number') {
    return { result: false, message: 'The next block height is zero or was not provided.' };
  }

  if (!nonce || typeof nonce !== 'number') {
    return { result: false, message: 'The next block nonce is zero or was not provided.' };
  }

  if (!hash || typeof hash !== 'string') {
    return { result: false, message: 'The next block hash is not a string or was not provided.' };
  }

  if (!previousHash || typeof nonce !== 'number') {
    return { result: false, message: 'The next block previous hash is not a string or was not provided.' };
  }

  if (!transactions || !Array.isArray(transactions)) {
    return { result: false, message: 'The next block transactions is not an array or was not provided.' };
  }

  return { result: true, message: 'The next block format is valid.' };
};

export const checkNewNodeDataFormat = (nodeUrl: string): CheckReturn => {
  if (!nodeUrl || typeof nodeUrl !== 'string') {
    return { result: false, message: 'The node url is not a string or was not provided.' };
  }

  return { result: true, message: 'The node url format is valid.' };
};

export const checkNewTransactionFormat = (newTransaction: TransactionData): CheckReturn => {
  if (!newTransaction || typeof newTransaction !== 'object' || Array.isArray(newTransaction)) {
    return { result: false, message: 'The new transaction is not valid or was not provided.' };
  }

  return { result: true, message: 'The new transaction format is valid.' };
};

export const checkNewTransactionDataFormat = (sender: string, recipient: string, amount: number, fee: number): CheckReturn => {
  if (!sender || typeof sender !== 'string') {
    return { result: false, message: 'The sender is not a string or was not provided.' };
  }

  if (!recipient || typeof recipient !== 'string') {
    return { result: false, message: 'The recipient is not a string or was not provided.' };
  }

  if (!amount || typeof amount !== 'number') {
    return { result: false, message: 'The amount is not a positive number or was not provided.' };
  }

  if (!fee || typeof fee !== 'number') {
    return { result: false, message: 'The fee is not a positive number or was not provided.' };
  }

  return { result: true, message: 'The data format is valid.' };
};
