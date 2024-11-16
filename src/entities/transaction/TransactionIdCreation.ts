import { IHashCreation } from '../../utils/HashCreation';

export interface ITransactionIdCreation {
  create(data: string): string;
}

export class TransactionIdCreation implements ITransactionIdCreation {
  constructor(private readonly hashCreation: IHashCreation) {}

  create(data: string): string {
    return this.hashCreation.hash(data);
  }
}
