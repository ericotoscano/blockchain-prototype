import { ITransaction } from '../../../domain/types/ITransaction';

export interface ISubmitTransactionUseCase {
  execute(sender: string, recipient: string, amount: number, fee: number): ITransaction;
}
