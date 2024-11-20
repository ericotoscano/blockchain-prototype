import { HashCreationType } from '../../types/crypto.types';

export class TransactionIdCreation {
  static create(data: string, hashCreation: HashCreationType): string {
    return hashCreation.hash(data);
  }
}
