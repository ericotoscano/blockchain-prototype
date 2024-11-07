import { sha256 } from 'js-sha256';

import { BlockchainData, BlockData, PreTransactionData, TransactionData } from '../types/data.types';
import { CheckerFunction, CheckReturn } from '../types/check.types';

import { checkNodeUrl } from '../helpers/ports.helpers';
import { checkAll } from './checkers.helpers';
import { isValidTimestamp, isValidHex40String, isValidHex64String } from '../utils/validation.utils';

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

  for (const newTransaction of transactions) {
    const { sender, recipient, amount, fee, status, timestamp, txId } = newTransaction;
    //criar funcoes especificas para checar as transacoes do next block, por conta do reward transaction
    const checkers: CheckerFunction[] = [
      () => checkNextBlockNewTransactionsFormat(newTransaction),
      //COMECAR DAQUI E LEMBRAR DA REWARD TRANSACTION
      //() => checkNewTransactionAddresses(sender, recipient),
      //() => checkNewTransactionValues(amount, fee),
      () => checkNewTransactionStatus(status),
      () => checkNewTransactionTimestamp(timestamp),
      () => checkNewTransactionTxId(txId), //no next block, ele vai estar no mempool ainda (erro)
      () => checkNewTransactionDuplicity(newTransaction),
    ];

    const { result, message } = checkAll(checkers);

    if (!result) {
      return { result, message };
    }
  }

  return { result: true, message: 'The next block transactions are valid.' };
};

export const checkMinFeeFormat = (minFee: number): CheckReturn => {
  if (!minFee || minFee < 0 || typeof minFee !== 'number') {
    return { result: false, message: 'The minFee is not a positive number or was not provided.' };
  }

  return { result: true, message: 'The minimun fee is valid.' };
};

export const checkMempoolPendingTransactions = () => {
  if (global.blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.status !== 'Pending')) {
    return { result: false, message: 'There are no pending transactions on mempool.' };
  }

  return { result: true, message: 'There are pending transactions on mempool.' };
};

export const checkNewNodeFormat = (nodeUrl: string): CheckReturn => {
  if (!nodeUrl || typeof nodeUrl !== 'string') {
    return { result: false, message: 'The new node url is not a string or was not provided.' };
  }

  return { result: true, message: 'The new node url format is valid.' };
};

export const checkNewNodeUrlOption = (newNodeUrl: string): CheckReturn => {
  if (!checkNodeUrl(newNodeUrl)) {
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
  const invalidNodeUrl = connectedNodes.filter((connectedNodeUrl) => !checkNodeUrl(connectedNodeUrl));

  if (invalidNodeUrl.length !== 0) {
    return { result: false, message: 'The connected nodes include one or more invalid nodes.' };
  }

  if (connectedNodes.includes(blockchain.nodeUrl)) {
    return { result: false, message: 'The connected nodes include the target node.' };
  }

  return { result: true, message: 'The new connected nodes are valid.' };
};

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

  if (!global.blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== txId)) {
    return { result: false, message: 'The new transaction is already on the blockchain mempool.' };
  }

  return { result: true, message: 'The new transaction txId is valid.' };
};

export const checkNextBlockNewTransactionsFormat = (newTransaction: TransactionData): CheckReturn => {
  if (!newTransaction || typeof newTransaction !== 'object' || Array.isArray(newTransaction)) {
    return { result: false, message: 'Some of transactions in next block is not valid or was not provided.' };
  }
  return { result: true, message: 'All next block transactions format is valid.' };
};

export const checkNextBlockTransactionsLength = (transactions: TransactionData[]): CheckReturn => {
  if (transactions.length === 0) {
    return { result: false, message: 'The next block transactions is an empty array.' };
  }

  if (transactions.length > blockchain.maxTransactionsPerBlock - 1) {
    return {
      result: false,
      message: "Considering the miner's reward transaction, the number of next block transactions must be equal to the maximum number of transactions per block, minus one.",
    };
  }

  return { result: true, message: 'The transactions length is valid.' };
};

export const checkNewTransactionDuplicity = (newTransaction: TransactionData): CheckReturn => {
  const allConfirmedTransactions = global.blockchain.getConfirmedTransactions();

  const hasDuplicateTransactions = allConfirmedTransactions.some((confirmedTransaction) => confirmedTransaction.txId === newTransaction.txId);

  if (hasDuplicateTransactions) {
    return {
      result: false,
      message: `Some of the next block new transactions has the same txId of a confirmed transaction in blockchain.`,
    };
  }

  return { result: true, message: 'The new transaction uniqueness is valid.' };
};
