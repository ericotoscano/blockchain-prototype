import { ITransaction } from '../../../../types/ITransaction';
import { TransactionIdCreationType } from '../../../../types/creation.types';
import { HashCreationType } from '../../../../utils/creation/types/HashCreationType';
import { TransactionCalculationType } from '../../calculation/types/TransactionCalculationType';

export type RewardTransactionCreationType = {
  create(blockTransactions: ITransaction[], transactionIdCreation: TransactionIdCreationType, transactionCalculation: TransactionCalculationType, hashCreation: HashCreationType): ITransaction;
};
