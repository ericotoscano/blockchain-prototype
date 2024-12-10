import { HashCreationType } from '../../../../utils/creation/types/HashCreationType';

export type TransactionIdCreationType = {
  create(data: string, hashCreation: HashCreationType): string;
};
