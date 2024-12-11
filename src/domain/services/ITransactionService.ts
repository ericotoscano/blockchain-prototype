import { ITransaction } from '../types/ITransaction';

export interface ITransactionService {
  createTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction;
  addTransactionToMempool(transaction: ITransaction): void;
}
