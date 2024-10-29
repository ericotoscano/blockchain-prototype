import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';

import { checkReturn } from '../types/return.types';

export const validateNewBlockFormat = (newBlock: Blocks): checkReturn => {
  if (!newBlock || typeof newBlock !== 'object' || Array.isArray(newBlock)) {
    return { result: false, message: 'The new block is not an object or was not provided.' };
  }

  const { height, nonce, hash, previousHash, transactions } = newBlock;

  if (!height || typeof height !== 'number') {
    return { result: false, message: 'The new block height is zero or was not provided.' };
  }

  if (!nonce || typeof nonce !== 'number') {
    return { result: false, message: 'The new block nonce is zero or was not provided.' };
  }

  if (!hash || typeof hash !== 'string') {
    return { result: false, message: 'The new block hash is not a string or was not provided.' };
  }

  if (!previousHash || typeof nonce !== 'number') {
    return { result: false, message: 'The new block previous hash is not a string or was not provided.' };
  }

  if (!transactions || !Array.isArray(transactions)) {
    return { result: false, message: 'The new block transactions is not an array or was not provided.' };
  }

  return { result: true, message: 'The new block format is valid.' };
};

export const validateNewNodeFormat = (nodeUrl: string): checkReturn => {
  if (!nodeUrl || typeof nodeUrl !== 'string') {
    return { result: false, message: 'The node url is not a string or was not provided.' };
  }

  return { result: true, message: 'The node url format is valid.' };
};

export const validateNewTransactionFormat = (sender: string, recipient: string, amount: number, fee: number): checkReturn => {
  if (!sender || typeof sender !== 'string') {
    return { result: false, message: 'The sender of the new transaction data is not a string or was not provided.' };
  }

  if (!recipient || typeof recipient !== 'string') {
    return { result: false, message: 'The recipient of the new transaction data is not a string or was not provided.' };
  }

  if (!amount || typeof amount !== 'number') {
    return { result: false, message: 'The amount of the new transaction data is not a positive number or was not provided.' };
  }

  if (!fee || typeof fee !== 'number') {
    return { result: false, message: 'The fee of the new transaction data is not a positive number or was not provided.' };
  }

  return { result: true, message: 'The new transaction data format is valid.' };
};
