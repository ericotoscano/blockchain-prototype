import { ITransaction } from '../types/ITransaction';

export interface ITransactionFactory {
  createTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction;
}
