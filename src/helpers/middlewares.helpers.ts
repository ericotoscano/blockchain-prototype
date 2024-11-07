import { sha256 } from 'js-sha256';

import { BlockchainData, BlockData, TransactionData } from '../types/data.types';
import { CheckReturn } from '../types/check.types';

import { getNodesUrlOptions } from '../helpers/ports.helpers';
import { isValidHex64String } from '../utils/validation.utils';

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

  return { result: true, message: 'The new transaction data format is valid.' };
};

export const checkNewTransactionFormat = (newTransaction: TransactionData): CheckReturn => {
  if (!newTransaction || typeof newTransaction !== 'object' || Array.isArray(newTransaction)) {
    return { result: false, message: 'The new transaction is not valid or was not provided.' };
  }

  return { result: true, message: 'The new transaction format is valid.' };
};

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
  if (!height || typeof height !== 'number') {
    return { result: false, message: 'The next block height is zero or was not provided.' };
  }

  if (height < 0 || !Number.isInteger(height)) {
    return { result: false, message: 'The next block height is a negative number or is not a integer number.' };
  }

  return { result: true, message: 'The next block height is valid.' };
};

export const checkNextBlockNonce = (nonce: number): CheckReturn => {
  if (!nonce || typeof nonce !== 'number') {
    return { result: false, message: 'The next block nonce is zero or was not provided.' };
  }

  if (nonce < 0 || !Number.isInteger(nonce)) {
    return { result: false, message: 'The next block nonce is a negative number or is not a integer number.' };
  }

  return { result: true, message: 'The next block nonce is valid.' };
};

export const checkNextBlockHash = (height: number, nonce: number, hash: string, previousHash: string, transactions: TransactionData[]): CheckReturn => {
  if (!hash || typeof hash !== 'string') {
    return { result: false, message: 'The next block hash is not a string or was not provided.' };
  }

  if (!isValidHex64String(hash)) {
    return { result: false, message: 'The next block hash is not a valid hex string.' };
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
  if (!previousHash || typeof previousHash !== 'string') {
    return { result: false, message: 'The next block previous hash is not a string or was not provided.' };
  }

  if (!isValidHex64String(previousHash)) {
    return { result: false, message: 'The next block previous hash is not a valid hex string.' };
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

  if (transactions.length === 0) {
    return { result: false, message: 'The next block transactions is an empty array.' };
  }

  const allConfirmedTransactions = global.blockchain.getConfirmedTransactions();

  const hasDuplicateTransactions = transactions.some((transaction) => allConfirmedTransactions.some((confirmedTransaction) => transaction.txId === confirmedTransaction.txId));

  if (hasDuplicateTransactions) {
    return {
      result: false,
      message: `The next block transactions contain duplicate txId's with previously confirmed transactions.`,
    };
  }

  const notPendingStatus = transactions.filter((transaction) => transaction.status !== 'Pending');

  if (notPendingStatus.length > 0) {
    const transactionIds = notPendingStatus.map((transaction) => transaction.txId).join(', ');

    return {
      result: false,
      message: `The following txId's of the next block transactions are not with 'Pending' status: ${transactionIds}.`,
    };
  }

  if (transactions.length > blockchain.maxTransactionsPerBlock - 1) {
    return {
      result: false,
      message: "Considering the miner's reward transaction, the number of next block transactions must be equal to the maximum number of transactions per block, minus one.",
    };
  }

  return { result: true, message: 'The next block transactions are valid.' };
};

export const checkNewNodeFormat = (nodeUrl: string): CheckReturn => {
  if (!nodeUrl || typeof nodeUrl !== 'string') {
    return { result: false, message: 'The new node url is not a string or was not provided.' };
  }

  return { result: true, message: 'The new node url format is valid.' };
};

export const checkNewNodeUrlOption = (newNodeUrl: string): CheckReturn => {
  const nodeUrlOptions = getNodesUrlOptions();

  if (!nodeUrlOptions.includes(newNodeUrl)) {
    return { result: false, message: 'The new node url does not include one of the available ports in the .env file.' };
  }

  return { result: true, message: 'The new node url option is valid.' };
};

export const checkNewNodeConnections = (newNodeUrl: string): CheckReturn => {
  if (global.blockchain.connectedNodes.includes(newNodeUrl)) {
    return { result: false, message: 'The new node is already connected to the target node.' };
  }

  if (global.blockchain.nodeUrl === newNodeUrl) {
    return { result: false, message: 'The new node is the target node.' };
  }

  return { result: true, message: 'The new node connection is valid.' };
};

export const checkNewConnectedNodesFormat = (connectedNodes: string[]): CheckReturn => {
  if (!connectedNodes || !Array.isArray(connectedNodes)) {
    return { result: false, message: 'The new connected nodes is not an array or was not provided.' };
  }

  return { result: true, message: 'The new connected nodes are valid.' };
};

export const checkNewConnectedNodes = (connectedNodes: string[]): CheckReturn => {
  const nodeUrlOptions = getNodesUrlOptions();

  const invalidNodeUrl = connectedNodes.filter((connectedNodeUrl) => !nodeUrlOptions.includes(connectedNodeUrl));

  if (invalidNodeUrl.length !== 0) {
    return { result: false, message: 'The connected nodes include one or more invalid nodes.' };
  }

  if (connectedNodes.includes(blockchain.nodeUrl)) {
    return { result: false, message: 'The connected nodes include the target node.' };
  }

  return { result: true, message: 'The new connected nodes are valid.' };
};
