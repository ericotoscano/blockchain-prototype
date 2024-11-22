import { HashCreationType } from '../../../types/creation/HashCreationType';

export class TransactionIdCreation {
  static create(data: string, hashCreation: HashCreationType): string {
    return hashCreation.hash(data);
  }
}
