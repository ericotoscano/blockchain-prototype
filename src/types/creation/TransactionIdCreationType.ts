import { HashCreationType } from './HashCreationType';

export type TransactionIdCreationType = {
  create(data: string, hashCreation: HashCreationType): string;
};
