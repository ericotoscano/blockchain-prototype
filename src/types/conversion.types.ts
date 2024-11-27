import { IBlock } from './block.types';
import { ITransaction } from './transaction.types';
import { BlockDTO, NodeDTO, TransactionDTO } from './dto.types';
import { HashCreationType, TransactionIdCreationType } from './creation.types';
import { INode } from './node.types';

export type BlockDataConversionType = {
  convert(data: BlockDTO, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType, transactionDataConversion: ITransactionDataConversion): IBlock;
};

export type NodeDataConversionType = {
  convert(data: NodeDTO): INode;
};

export interface ITransactionDataConversion {
  readonly hashCreation: HashCreationType;
  readonly transactionIdCreation: TransactionIdCreationType;
  convert(data: TransactionDTO): ITransaction;
  convertAll(data: TransactionDTO[]): ITransaction[];
}
