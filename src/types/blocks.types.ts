import { TransactionsType } from './transactions.types';

export interface BlocksType {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionsType[];
  getData(): string;
  addTransaction(transaction: TransactionsType): void;
  checkHeightFormat(): checkReturn;
  checkNonceFormat(): checkReturn;
  checkHashFormat(): checkReturn
  checkPreviousHashFormat(): checkReturn
  checkTransactionsFormat(): checkReturn
}

export interface checkReturn {
  result: boolean;
  message: string;
}
