import { BlockMiningType, IBlock } from './block.types';
import { ITransaction, TransactionCalculationType } from './transaction.types';
import { BlockDTO, BlockchainDTO, CreateBlockchainDTO, NodeDTO, TransactionDTO } from './dto.types';
import { INode } from './node.types';
import { TargetManagementType } from './management.types';
import { BlockCreationType, HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType, RewardTransactionCreationType, TransactionIdCreationType } from './creation.types';
import { IBlockchain } from './blockchain.types';

export type BlockchainConversionType = {
  convertToClass(
    createBlockchainDTO: CreateBlockchainDTO,
    targetManagement: TargetManagementType,
    keyDependencies: { keyCurveOption: string; keyCreation: KeyCreationType; mainHashCreation: HashCreationType; secondHashCreation: HashCreationType },
    nodeDependencies: { nodeUrlCreation: NodeUrlCreationType; nodeAddressCreation: NodeAddressCreationType },
    blockDependencies: { blockMining: BlockMiningType; blockCreation: BlockCreationType },
    transactionDependencies: { transactionCalculation: TransactionCalculationType; transactionIdCreation: TransactionIdCreationType; rewardTransactionCreation: RewardTransactionCreationType }
  ): IBlockchain;
  convertToDTO(
    blockchain: IBlockchain,
    conversionDependencies: { nodeConversion: NodeConversionType; blockConversion: BlockConversionType; transactionConversion: TransactionConversionType }
  ): BlockchainDTO;
};

export type BlockConversionType = {
  convertToClass(
    blockDTO: BlockDTO,
    transactionDependencies: {
      transactionConversion: TransactionConversionType;
      transactionCalculation: TransactionCalculationType;
      transactionIdCreation: TransactionIdCreationType;
      rewardTransactionCreation: RewardTransactionCreationType;
    },
    miningDependencies: {
      blockMining: BlockMiningType;
      hashCreation: HashCreationType;
    }
  ): IBlock;
  convertAllToClass(
    blocksDTO: BlockDTO[],
    transactionDependencies: {
      transactionConversion: TransactionConversionType;
      transactionCalculation: TransactionCalculationType;
      transactionIdCreation: TransactionIdCreationType;
      rewardTransactionCreation: RewardTransactionCreationType;
    },
    miningDependencies: {
      blockMining: BlockMiningType;
      hashCreation: HashCreationType;
    }
  ): IBlock[];
  convertToDTO(block: IBlock, transactionConversion: TransactionConversionType): BlockDTO;
  convertAllToDTO(blocks: IBlock[], transactionConversion: TransactionConversionType): BlockDTO[];
};

export type NodeConversionType = {
  convertToDTO(node: INode): NodeDTO;
};

export type TransactionConversionType = {
  convertToClass(transactionDTO: TransactionDTO, creationDependencies: { hashCreation: HashCreationType; transactionIdCreation: TransactionIdCreationType }): ITransaction;
  convertAllToClass(transactionsDTO: TransactionDTO[], creationDependencies: { hashCreation: HashCreationType; transactionIdCreation: TransactionIdCreationType }): ITransaction[];
  convertToDTO(transaction: ITransaction): TransactionDTO;
  convertAllToDTO(transactions: ITransaction[]): TransactionDTO[];
};
