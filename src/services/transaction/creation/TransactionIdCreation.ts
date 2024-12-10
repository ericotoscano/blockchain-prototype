import { HashCreationType } from '../../../utils/creation/types/HashCreationType';

export class TransactionIdCreation {
  static create(transactionData: string, hashCreation: HashCreationType): string {
    return hashCreation.hash(transactionData);
  }
}
