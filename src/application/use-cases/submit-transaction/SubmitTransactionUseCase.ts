import { ITransaction } from '../../../domain/types/ITransaction';
import { ITransactionService } from '../../../domain/services/ITransactionService';
import { ISubmitTransactionUseCase } from './ISubmitTransactionUseCase';

export class SubmitTransactionUseCase implements ISubmitTransactionUseCase {
  constructor(private readonly service: ITransactionService) {}

  execute(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    return this.service.submitTransaction(sender, recipient, amount, fee);
  }
}
