import { BlockForPatchRequest, TransactionForPatchRequest } from '../types/request.types';

import { TimestampFormatValidation } from '../utils/DateFomatValidation';
import { HexStringFormatValidation } from '../utils/HexStringFormatValidation';

export type ValidationData = { title: string; result: boolean; type: string; code: number; message: string };

export type ErrorData = { type: string; code: number; message: string };

export class BlockValidation {
  static validateFormat(block: BlockForPatchRequest): ValidationData {
    if (!block || typeof block !== 'object' || Array.isArray(block)) {
      const failData = { title: 'Block Format Validation', result: false, type: 'Format Fail', code: 12, message: 'The block was not provided or has an invalid format.' };

      return failData;
    }

    const successData = { title: 'Block Format Validation', result: true, type: 'Format Success', code: 10, message: 'The block has a valid format.' };

    return successData;
  }
}

export class BlockHeightValidation {
  static validateFormat(height: number): ValidationData {
    if (!height || height < 0 || !Number.isInteger(height) || typeof height !== 'number') {
      const failData = {
        title: 'Block Height Format Validation',
        result: false,
        type: 'Format Fail',
        code: 13,
        message: 'The block height was not provided or has an invalid format (it should be a positive integer number).',
      };

      return failData;
    }

    const successData = { title: 'Block Height Format Validation', result: true, type: 'Format Success', code: 13, message: 'The block height has a valid format.' };

    return successData;
  }
}

export class BlockNonceValidation {
  static validateFormat(nonce: number): ValidationData {
    if (!nonce || nonce < 0 || !Number.isInteger(nonce) || typeof nonce !== 'number') {
      const failData = {
        title: 'Block Nonce Format Validation',
        result: false,
        type: 'Format Fail',
        code: 13,
        message: 'The block nonce was not provided or has an invalid format (it should be a positive integer number).',
      };

      return failData;
    }

    const successData = { title: 'Block Nonce Format Validation', result: true, type: 'Format Success', code: 13, message: 'The block nonce has a valid format.' };

    return successData;
  }
}

export class BlockHashValidation {
  static validateFormat(hash: string): ValidationData {
    if (!hash || !HexStringFormatValidation.validate(hash, 64)) {
      const failData = {
        title: 'Block Hash Format Validation',
        result: false,
        type: 'Format Fail',
        code: 13,
        message: 'The block hash was not provided or has an invalid format (it should be an hex 64 string).',
      };

      return failData;
    }

    const successData = { title: 'Block Hash Format Validation', result: true, type: 'Format Success', code: 13, message: 'The block hash has a valid format.' };

    return successData;
  }
}

export class BlockPreviousHashValidation {
  static validateFormat(previousHash: string): ValidationData {
    if (!previousHash || !HexStringFormatValidation.validate(previousHash, 64)) {
      const failData = {
        title: 'Block Previous Hash Format Validation',
        result: false,
        type: 'Format Fail',
        code: 13,
        message: 'The block previous hash was not provided or has an invalid format (it should be an hex 64 string).',
      };

      return failData;
    }

    const successData = { title: 'Block Previous Hash Format Validation', result: true, type: 'Format Success', code: 13, message: 'The block previous hash has a valid format.' };

    return successData;
  }
}

export class BlockTransactionsValidation {
  static validateFormat(transactions: TransactionForPatchRequest[]): ValidationData {
    if (!transactions || !Array.isArray(transactions)) {
      const failData = {
        title: 'Block Transactions Format Validation',
        result: false,
        type: 'Format Fail',
        code: 13,
        message: 'The block transactions was not provided or has an invalid format (it should be an array).',
      };

      return failData;
    }

    const successData = { title: 'Block Transactions Format Validation', result: true, type: 'Format Success', code: 13, message: 'The block transactions has a valid format.' };

    return successData;
  }
}

export class BlockTimestampValidation {
  static validateFormat(timestamp: number): ValidationData {
    if (!timestamp || TimestampFormatValidation.validate(timestamp)) {
      const failData = {
        title: 'Block Timestamp Format Validation',
        result: false,
        type: 'Format Fail',
        code: 13,
        message: 'The block timestamp was not provided or has an invalid format (it should be a number representing a timestamp).',
      };

      return failData;
    }

    const successData = { title: 'Block Timestamp Format Validation', result: true, type: 'Format Success', code: 13, message: 'The block timestamp has a valid format.' };

    return successData;
  }
}

//ADICIONAR A CADA CLASSE SEUS METODOS AI DEBAIXO

export const checkNextBlockNewTransactionsTimestamp = (timestamp: Date, txId: string): CheckReturn => {
  if (!timestamp || !isValidTimestamp(timestamp)) {
    return { result: false, message: `In next block transactions, at transaction ${txId}, the timestamp was not provided or is not valid.` };
  }

  return { result: true, message: 'All next block transactions timestamp are valid.' };
};

/*   const expectedHash = sha256(`${height}${nonce}${previousHash}${JSON.stringify(transactions)}`);

  if (BigInt('0x' + expectedHash) >= BigInt('0x' + global.blockchain.targetDifficulty)) {
    return { result: false, message: 'The next block hash does not meet the required difficulty.' };
  }

  if (expectedHash !== hash) {
    return { result: false, message: 'The next block hash does not match with the expected hash.' };
  } */

/*   if (global.blockchain.getPreviousBlock().hash !== previousHash) {
    return { result: false, message: 'The next block previous hash and the last valid block hash in blockchain are not the same.' };
  } */

/*   const transactionsCheckers: CheckerFunction[] = [() => checkNextBlockTransactionsLength(transactions)];

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
}; */

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
      return { result: false, message: `In next block's transactions, the amount in the reward transaction ${txId} it should be greater than the current blockchain reward value.` };
    }

    if (fee !== 0) {
      return { result: false, message: `In the next block's transactions, the fee in the reward transaction ${txId} it should be equal to zero.` };
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
