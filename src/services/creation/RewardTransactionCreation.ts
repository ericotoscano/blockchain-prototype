import {
  HashCreationType,
  TransactionIdCreationType,
} from "../../types/creation.types";
import {
  ITransaction,
  TransactionCalculationType,
} from "../../types/transaction.types";
import { BlockchainManagement } from "../management/BlockchainManagement";
import { TransactionCreation } from "./TransactionCreation";

export class RewardTransactionCreation {
  static create(
    blockTransactions: ITransaction[],
    transactionIdCreation: TransactionIdCreationType,
    transactionCalculation: TransactionCalculationType,
    hashCreation: HashCreationType
  ): ITransaction {
    const { node, reward } = BlockchainManagement.getBlockchain();

    const sender: string = "0".repeat(40);

    const recipient: string = node.nodeAddress;

    const transactionsTotalFee: number =
      transactionCalculation.getTotalFee(blockTransactions);

    const amount: number = reward + transactionsTotalFee;

    const fee: number = 0;

    return TransactionCreation.create(
      sender,
      recipient,
      amount,
      fee,
      transactionIdCreation,
      hashCreation
    );
  }
}
