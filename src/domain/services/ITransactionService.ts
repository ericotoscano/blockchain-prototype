import { ITransaction } from '../types/ITransaction';

export interface ITransactionService {
  submitTransaction(sender: string, recipient: string, amount: number, fee: number): ITransaction;
}

//organizar DTO de transacao, criar controller, criar rota seguindo DDD
