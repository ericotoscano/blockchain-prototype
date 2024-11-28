import { Transaction } from '../../models/Transaction';
import { HashCreationType, IRewardTransactionCreation, TransactionIdCreationType } from '../../types/creation.types';
import { ITransaction, TransactionCalculationType } from '../../types/transaction.types';

export class RewardTransactionCreation implements IRewardTransactionCreation {
  constructor(
    private readonly blockTransactions: ITransaction[],
    private readonly nodeAddress: string,
    private readonly reward: number,
    private readonly feeCalculation: TransactionCalculationType,
    private readonly transactionIdCreation: TransactionIdCreationType,
    private readonly hashCreation: HashCreationType
  ) {}

  create(): ITransaction {
    const totalFee: number = this.feeCalculation.getTotalFee(this.blockTransactions);
    //usar TrasnactionCreation COMECAR DAQUI
    return new Transaction('0'.repeat(40), this.nodeAddress, this.reward + totalFee, 0, this.hashCreation, this.transactionIdCreation);
  }
}
