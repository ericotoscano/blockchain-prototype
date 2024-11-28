import { BlockMiningType, IBlock } from './block.types';
import { ITransaction } from './transaction.types';
import { BlockDTO, CreateBlockchainRequestDTO, CreateBlockchainResponseDTO, NodeDTO, TransactionDTO } from './dto.types';
import { INode } from './node.types';
import { TargetManagementType } from './management.types';
import { BlockCreationType, HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType, TransactionIdCreationType } from './creation.types';
import { IBlockchain } from './blockchain.types';

export type BlockchainConversionType = {
  convertToClass(
    blockchainDTO: CreateBlockchainRequestDTO,
    targetManagement: TargetManagementType,
    blockMining: BlockMiningType,
    blockCreation: BlockCreationType,
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    secondHashCreation: HashCreationType
  ): IBlockchain;
  convertToDTO(blockchain: IBlockchain, blockConversion: BlockConversionType, transactionConversion: TransactionConversionType): CreateBlockchainResponseDTO;
};

export type BlockConversionType = {
  convertToClass(blockDTO: BlockDTO, transactionConversion: TransactionConversionType): IBlock;
  convertAllToClasses(blocksDTO: BlockDTO[], transactionConversion: TransactionConversionType): IBlock[];
  convertToDTO(block: IBlock, transactionConversion: TransactionConversionType): BlockDTO;
  convertAllToDTO(blocks: IBlock[], transactionConversion: TransactionConversionType): BlockDTO[];
};

export type NodeConversionType = {
  convertToDTO(node: INode): NodeDTO;
};

export type TransactionConversionType = {
  convertToClass(transactionDTO: TransactionDTO, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType): ITransaction;
  convertAllToClasses(transactionsDTO: TransactionDTO[]): ITransaction[];
  convertToDTO(transaction: ITransaction): TransactionDTO;
  convertAllToDTO(transactions: ITransaction[]): TransactionDTO[];
};
