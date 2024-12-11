import { ITransactionFactory } from '../factories/ITransactionFactory';
import { IBlockchainRepository } from '../repositories/IBlockchainRepository';
import { ITransaction } from '../types/ITransaction';
import { ITransactionService } from './ITransactionService';

export class TransactionService implements ITransactionService {
  constructor(private readonly factory: ITransactionFactory, private readonly repository: IBlockchainRepository) {}

  createTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    return this.factory.create(sender, recipient, amount, fee);
  }

  addTransactionToMempool(transaction: ITransaction): void {
    this.repository.addTransactionToMempool(transaction);
  }
}
