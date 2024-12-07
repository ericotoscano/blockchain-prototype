import { IBlockchain } from "./blockchain.types";
import { INode } from "./node.types";
import { IBlock } from "./block.types";
import { ITransaction } from "./transaction.types";
import {
  BlockDTO,
  BlockchainDTO,
  CreateBlockchainDTO,
  NodeDTO,
  TransactionDTO,
} from "./dto.types";
import { HashCreationType, TransactionIdCreationType } from "./creation.types";
import {
  BlockchainConversionDependenciesType,
  KeyDependenciesType,
  MiningDependenciesType,
  NodeDependenciesType,
  TransactionDependenciesType,
} from "./dependencies.types";

export type BlockchainConversionType = {
  convertToClass(
    createBlockchainDTO: CreateBlockchainDTO,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionConversion" | "transactionCreation"
    >
  ): IBlockchain;
  convertToDTO(
    blockchain: IBlockchain,
    blockchainConversionDependencies: BlockchainConversionDependenciesType
  ): BlockchainDTO;
};

export type BlockConversionType = {
  convertToClass(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionCreation"
    >,
    miningDependencies: Omit<
      MiningDependenciesType,
      "targetManagement" | "blockCreation"
    >
  ): IBlock;
  convertAllToClass(
    blocksDTO: BlockDTO[],
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionCreation"
    >,
    miningDependencies: Omit<
      MiningDependenciesType,
      "targetManagement" | "blockCreation"
    >
  ): IBlock[];
  convertToDTO(
    block: IBlock,
    transactionConversion: TransactionConversionType
  ): BlockDTO;
  convertAllToDTO(
    blocks: IBlock[],
    transactionConversion: TransactionConversionType
  ): BlockDTO[];
};

export type NodeConversionType = {
  convertToDTO(node: INode): NodeDTO;
};

export type TransactionConversionType = {
  convertToClass(
    transactionDTO: TransactionDTO,
    transactionIdCreation: TransactionIdCreationType,
    hashCreation: HashCreationType
  ): ITransaction;
  convertAllToClass(
    transactionsDTO: TransactionDTO[],
    transactionIdCreation: TransactionIdCreationType,
    hashCreation: HashCreationType
  ): ITransaction[];
  convertToDTO(transaction: ITransaction): TransactionDTO;
  convertAllToDTO(transactions: ITransaction[]): TransactionDTO[];
};
