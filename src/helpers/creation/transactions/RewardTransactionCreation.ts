import { Transaction } from '../../../entities/transaction/Transaction';

import { IRewardTransactionCreation } from '../../../interfaces/creation/IRewardTransactionCreation';
import { ITransaction } from '../../../interfaces/transactions/ITransaction';

import { TransactionCalculationType } from '../../../types/calculation/TransactionCalculationType';
import { HashCreationType } from '../../../types/creation/HashCreationType';
import { TransactionIdCreationType } from '../../../types/creation/TransactionIdCreationType';

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

    const input = { sender: '0'.repeat(40), recipient: this.nodeAddress, amount: this.reward + totalFee, fee: 0 };

    return new Transaction(input, this.hashCreation, this.transactionIdCreation);
  }
}
