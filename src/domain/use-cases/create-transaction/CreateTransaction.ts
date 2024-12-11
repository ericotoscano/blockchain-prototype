import { ITransaction } from '../../types/ITransaction';
import { ITransactionService } from '../../services/ITransactionService';
import { ICreateTransaction } from './ICreateTransaction';

export class CreateTransaction implements ICreateTransaction {
  constructor(private readonly service: ITransactionService) {}

  execute(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    return this.service.createTransaction(sender, recipient, amount, fee);
  }
}
