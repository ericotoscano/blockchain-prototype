import { ITransaction } from '../../types/ITransaction';
import { ITransactionService } from '../../services/ITransactionService';
import { IAddTransactionToMempool } from './IAddTransactionToMempool';

export class addTransactionToMempool implements IAddTransactionToMempool {
  constructor(private readonly service: ITransactionService) {}

  execute(transaction: ITransaction): void {
    this.service.addTransactionToMempool(transaction);
  }
}
