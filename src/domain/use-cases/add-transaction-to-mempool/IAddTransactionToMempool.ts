import { ITransaction } from '../../types/ITransaction';

export interface IAddTransactionToMempool {
  execute(transaction: ITransaction): void;
}
