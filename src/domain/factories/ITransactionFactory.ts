import { ITransaction } from '../types/ITransaction';

export interface ITransactionFactory {
  create(sender: string, recipient: string, amount: number, fee: number): ITransaction;
}
