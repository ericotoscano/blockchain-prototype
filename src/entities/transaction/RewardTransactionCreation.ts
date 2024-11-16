import { ITransaction, Transaction } from './Transaction';
import { ITransactionIdCreation } from './TransactionIdCreation';
import { FeeCalculationType } from './FeeCalculation';

export interface IRewardTransactionCreation {
  create(): ITransaction;
}

export class RewardTransactionCreation implements IRewardTransactionCreation {
  constructor(
    private readonly blockTransactions: ITransaction[],
    private readonly nodeAddress: string,
    private readonly reward: number,
    private readonly feeCalculation: FeeCalculationType,
    private readonly transactionIdCreation: ITransactionIdCreation
  ) {}

  create(): ITransaction {
    const totalFee = this.feeCalculation.getTotalFee(this.blockTransactions);

    const props = { sender: '0'.repeat(40), recipient: this.nodeAddress, amount: this.reward + totalFee, fee: 0 };

    return new Transaction(props, this.transactionIdCreation);
  }
}
