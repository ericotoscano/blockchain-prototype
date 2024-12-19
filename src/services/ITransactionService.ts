import { ITransaction } from '../domain/types/ITransaction';

export interface ITransactionService {
  submitTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction;
}
