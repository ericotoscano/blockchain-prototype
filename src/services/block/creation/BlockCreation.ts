import { Block } from '../../../domain/entities/Block';
import { ITransaction } from '../../../types/ITransaction';
import { IBlock } from '../../../types/IBlock';
import { MiningDependenciesType, TransactionDependenciesType } from '../../../helpers/dependencies/types/DependenciesTypes';
import { BlockTransactionsManagement } from '../management/BlockTransactionsManagement';
import { MineResultsType } from '../mining/types/BlockMiningType';

export class BlockCreation {
  static create(
    height: number,
    previousHash: string,
    target: string,
    transactions: ITransaction[],
    transactionsDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>,
    nonce?: number,
    hash?: string,
    timestamp?: number
  ): IBlock {
    const { transactionCalculation, transactionIdCreation, rewardTransactionCreation } = transactionsDependencies;
    const { blockMining, hashCreation } = miningDependencies;

    const blockNonce: number = nonce ?? 0;
    const blockHash: string = hash ?? '';
    const blockTimestamp: number = timestamp ?? Date.now();

    const blockTransactionsManagement = new BlockTransactionsManagement(transactions);

    const blockRewardTransaction: ITransaction = rewardTransactionCreation.create(transactions, transactionIdCreation, transactionCalculation, hashCreation);

    blockTransactionsManagement.addRewardTransaction(blockRewardTransaction);

    const block: IBlock = new Block(height, previousHash, blockNonce, blockHash, blockTimestamp, transactions, blockTransactionsManagement);

    const blockData: string = block.getData();

    const { calculatedHash, foundNonce }: MineResultsType = blockMining.mine(blockData, target, hashCreation);

    block.hash = calculatedHash;
    block.nonce = foundNonce;

    return block;
  }
}
