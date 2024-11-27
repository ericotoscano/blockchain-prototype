import { ec as EC } from 'elliptic';

import { BlockchainInputType, IBlockchain } from './blockchain.types';
import { INode } from './node.types';
import { BlockInputType, BlockMiningType, IBlock } from './block.types';
import { ITransaction } from './transaction.types';
import { TargetManagementType } from './management.types';

export type BlockchainCreationType = {
  create(input: BlockchainInputType, node: INode, targetManagement: TargetManagementType, hashCreation: HashCreationType, blockMining: BlockMiningType, blockCreation: BlockCreationType): IBlockchain;
};

export interface INodeAddressCreation {
  create(data: string): string;
}

export type NodeUrlCreationType = {
  create(): string;
};

export type BlockCreationType = {
  create(input: BlockInputType, target: string, blockMining: BlockMiningType, hashCreation: HashCreationType): IBlock;
};

export type TransactionIdCreationType = {
  create(data: string, hashCreation: HashCreationType): string;
};

export interface IRewardTransactionCreation {
  create(): ITransaction;
}

export type HashCreationType = {
  hash(data: string): string;
};

export interface IKeyCreation {
  createKeyPair(hashedData: string): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
}
