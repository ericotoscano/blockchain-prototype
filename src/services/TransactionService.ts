import { ITransactionFactory } from '../domain/factories/ITransactionFactory';
import { IBlockchainRepository } from '../domain/repositories/IBlockchainRepository';
import { ITransaction } from '../domain/types/ITransaction';
import { ITransactionService } from './ITransactionService';

export class TransactionService implements ITransactionService {
  constructor(private readonly factory: ITransactionFactory, private readonly repository: IBlockchainRepository) {}
  submitTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    const transaction: ITransaction = this.createTransaction(sender, recipient, amount, fee);

    this.addTransactionToMempool(transaction);

    return transaction;
  }

  private createTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    return this.factory.createTransaction(sender, recipient, amount, fee);
  }

  private addTransactionToMempool(transaction: ITransaction): void {
    this.repository.addTransactionToMempool(transaction);
  }
}
