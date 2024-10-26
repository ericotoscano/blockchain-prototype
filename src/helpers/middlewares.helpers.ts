import { Blocks } from '../models/Blocks';
import { checkReturn } from '../types/blocks.types';

export const validateNextBlockFormat = (nextBlock: Blocks): checkReturn => {
  
  const { height, nonce, hash, previousHash, transactions } = nextBlock;

  if (!nextBlock || typeof nextBlock !== 'object' || Array.isArray(nextBlock)) {
    return { result: false, message: 'The next block is not an object or was not provided.' };
  }

  if (!height || typeof height !== 'number') {
    return { result: false, message: 'The height of the sent block is not a positive number or was not provided.' };
  }

  if (!nonce || typeof nonce !== 'number') {
    return { result: false, message: 'The nonce of the sent block is not a positive number or was not provided.' };
  }

  if (!hash || typeof hash !== 'string') {
    return { result: false, message: 'The hash of the sent block is not a string or was not provided.' };
  }

  if (!previousHash || typeof nonce !== 'number') {
    return { result: false, message: 'The previous hash of the sent block is not a string or was not provided.' };
  }

  if (!transactions || !Array.isArray(transactions)) {
    return { result: false, message: 'The transactions of the sent block is not an array or was not provided.' };
  }

  return { result: true, message: 'The format of the sent block is valid.' };
};
