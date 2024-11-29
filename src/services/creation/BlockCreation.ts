import { Block } from '../../models/Block';
import { BlockMiningType, IBlock, MineBlockResultsType } from '../../types/block.types';
import { HashCreationType, RewardTransactionCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { ITransaction, TransactionCalculationType } from '../../types/transaction.types';
import { BlockTransactionsManagement } from '../management/BlockTransactionsManagement';

export class BlockCreation {
  static create(
    height: number,
    previousHash: string,
    transactions: ITransaction[],
    transactionCalculation: TransactionCalculationType,
    transactionIdCreation: TransactionIdCreationType,
    rewardTransactionCreation: RewardTransactionCreationType,
    target: string,
    blockMining: BlockMiningType,
    hashCreation: HashCreationType,
    nonce?: number,
    hash?: string,
    timestamp?: number
  ): IBlock {
    const blockNonce: number = nonce ?? 0;
    const blockHash: string = hash ?? '';
    const blockTimestamp: number = timestamp ?? Date.now();

    const blockTransactionsManagement = new BlockTransactionsManagement(transactions);

    const blockRewardTransaction: ITransaction = rewardTransactionCreation.create(transactions, transactionCalculation, hashCreation, transactionIdCreation);

    blockTransactionsManagement.addRewardTransaction(blockRewardTransaction);

    const block: IBlock = new Block(height, previousHash, blockNonce, blockHash, blockTimestamp, transactions, blockTransactionsManagement);

    const blockData: string = block.getData();

    const { calculatedHash, foundNonce }: MineBlockResultsType = blockMining.mine(blockData, target, hashCreation);

    block.hash = calculatedHash;
    block.nonce = foundNonce;

    return block;
  }
}
