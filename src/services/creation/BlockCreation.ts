import { Block } from "../../models/Block";
import { ITransaction } from "../../types/transaction.types";
import { IBlock, MineBlockResultsType } from "../../types/block.types";
import {
  MiningDependenciesType,
  TransactionDependenciesType,
} from "../../types/dependencies.types";
import { BlockTransactionsManagement } from "../management/BlockTransactionsManagement";

export class BlockCreation {
  static create(
    height: number,
    previousHash: string,
    transactions: ITransaction[],
    target: string,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionConversion" | "transactionCreation"
    >,
    miningDependencies: Omit<
      MiningDependenciesType,
      "targetManagement" | "blockCreation"
    >,
    nonce?: number,
    hash?: string,
    timestamp?: number
  ): IBlock {
    const {
      transactionCalculation,
      transactionIdCreation,
      rewardTransactionCreation,
    } = transactionDependencies;
    const { blockMining, hashCreation } = miningDependencies;

    const blockNonce: number = nonce ?? 0;
    const blockHash: string = hash ?? "";
    const blockTimestamp: number = timestamp ?? Date.now();

    const blockTransactionsManagement = new BlockTransactionsManagement(
      transactions
    );

    const blockRewardTransaction: ITransaction =
      rewardTransactionCreation.create(
        transactions,
        transactionIdCreation,
        transactionCalculation,
        hashCreation
      );

    blockTransactionsManagement.addRewardTransaction(blockRewardTransaction);

    const block: IBlock = new Block(
      height,
      previousHash,
      blockNonce,
      blockHash,
      blockTimestamp,
      transactions,
      blockTransactionsManagement
    );

    const blockData: string = block.getData();

    const { calculatedHash, foundNonce }: MineBlockResultsType =
      blockMining.mine(blockData, target, hashCreation);

    block.hash = calculatedHash;
    block.nonce = foundNonce;

    return block;
  }
}
