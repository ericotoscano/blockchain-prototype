import { ITransaction } from '../../types/ITransaction';

export interface ICreateTransaction {
  execute(sender: string, recipient: string, amount: number, fee: number): ITransaction;
}
