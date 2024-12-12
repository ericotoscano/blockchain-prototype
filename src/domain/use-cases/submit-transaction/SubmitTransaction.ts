import { ITransaction } from '../../types/ITransaction';
import { ITransactionService } from '../../services/ITransactionService';
import { ISubmitTransaction } from './ISubmitTransaction';

export class SubmitTransaction implements ISubmitTransaction {
  constructor(private readonly service: ITransactionService) {}

  execute(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    return this.service.submitTransaction(sender, recipient, amount, fee);
  }
}
