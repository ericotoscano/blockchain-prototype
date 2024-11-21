import { PreTransactionData } from '../types/data.types';
import { CheckReturn } from '../types/check.types';

import { isValidTimestamp, isValidHex40String, isValidHex64String } from '../utils/validation/DateFomatValidation';

export const checkNewPreTransactionFormat = (newPreTransaction: PreTransactionData): CheckReturn => {
  if (!newPreTransaction || typeof newPreTransaction !== 'object' || Array.isArray(newPreTransaction)) {
    return { result: false, message: 'The new transaction is not valid or was not provided.' };
  }
  return { result: true, message: 'The new transaction format is valid.' };
};

export const checkNewPreTransactionAddresses = (sender: string, recipient: string): CheckReturn => {
  if (!sender || !isValidHex40String(sender)) {
    return { result: false, message: 'The new transaction sender is not an hex 40 string or was not provided.' };
  }

  if (!recipient || !isValidHex40String(recipient)) {
    return { result: false, message: 'The new transaction recipient is not an hex 40 string or was not provided.' };
  }

  if (sender === recipient) {
    return { result: false, message: 'The new transaction has matching sender and recipient address.' };
  }

  return { result: true, message: 'The new transaction addresses are valid.' };
};

export const checkNewPreTransactionValues = (amount: number, fee: number): CheckReturn => {
  if (!amount || amount < 0 || typeof amount !== 'number') {
    return { result: false, message: 'The new transaction amount is not a positive number or was not provided.' };
  }

  if (!fee || fee < 0 || typeof fee !== 'number') {
    return { result: false, message: 'The new transaction fee is not a positive number or was not provided.' };
  }

  return { result: true, message: 'The new transaction values are valid.' };
};

export const checkNewTransactionStatus = (status: string): CheckReturn => {
  if (!status || status !== 'Pending') {
    return { result: false, message: "The new transaction status was not provided or is not 'Pending'." };
  }
  return { result: true, message: 'The new transaction status is valid.' };
};

export const checkNewTransactionTimestamp = (timestamp: Date): CheckReturn => {
  if (!timestamp || !isValidTimestamp(timestamp)) {
    return { result: false, message: 'The new transaction timestamp was not provided or is not valid.' };
  }

  return { result: true, message: 'The new transaction timestamp is valid.' };
};

export const checkNewTransactionTxId = (txId: string): CheckReturn => {
  if (!txId || !isValidHex64String(txId)) {
    return { result: false, message: 'The new transaction txId was not provided or is not valid.' };
  }

  return { result: true, message: 'The new transaction txId is valid.' };
};
