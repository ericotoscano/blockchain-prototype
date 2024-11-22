import { ITransaction } from '../transactions/ITransaction';

export interface IRewardTransactionCreation {
  create(): ITransaction;
}
