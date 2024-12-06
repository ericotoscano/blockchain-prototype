import { BlockMiningType, IBlock } from './block.types';
import { ITransaction, TransactionCalculationType } from './transaction.types';
import { BlockDTO, BlockchainDTO, CreateBlockchainDTO, NodeDTO, TransactionDTO } from './dto.types';
import { INode } from './node.types';
import { HashCreationType, RewardTransactionCreationType, TransactionIdCreationType } from './creation.types';
import { IBlockchain } from './blockchain.types';
import { BlockchainConversionDependenciesType, CreateBlockchainDependenciesType } from './dependencies.types';

export type BlockchainConversionType = {
  convertToClass(createBlockchainDTO: CreateBlockchainDTO, createBlockchainDependencies: CreateBlockchainDependenciesType): IBlockchain;
  convertToDTO(blockchain: IBlockchain, blockchainConversionDependencies: BlockchainConversionDependenciesType): BlockchainDTO;
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
