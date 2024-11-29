import { HashCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { ITransaction, TransactionCalculationType } from '../../types/transaction.types';
import { GlobalManagement } from '../management/GlobalManagement';
import { TransactionCreation } from './TransactionCreation';

export class RewardTransactionCreation {
  static create(blockTransactions: ITransaction[], transactionCalculation: TransactionCalculationType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType): ITransaction {
    const { node, reward } = GlobalManagement.getBlockchain();

    const sender: string = '0'.repeat(40);

    const recipient: string = node.nodeAddress;

    const transactionsTotalFee: number = transactionCalculation.getTotalFee(blockTransactions);

    const amount: number = reward + transactionsTotalFee;

    const fee: number = 0;

    return TransactionCreation.create(sender, recipient, amount, fee, hashCreation, transactionIdCreation);
  }
}
