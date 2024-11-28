import { HashCreationType } from '../../types/creation.types';

export class TransactionIdCreation {
  static create(transactionData: string, hashCreation: HashCreationType): string {
    return hashCreation.hash(transactionData);
  }
}
