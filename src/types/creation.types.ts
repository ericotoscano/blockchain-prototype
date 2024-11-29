import { ec as EC } from 'elliptic';

import { IBlockchain } from './blockchain.types';
import { BlockMiningType, IBlock } from './block.types';
import { ITransaction, TransactionCalculationType } from './transaction.types';
import { TargetManagementType } from './management.types';
import { INode } from './node.types';

export type BlockchainCreationType = {
  create(
    targetZeros: number,
    targetManagement: TargetManagementType,
    reward: number,
    maxTransactionsPerBlock: number,
    blockMining: BlockMiningType,
    blockCreation: BlockCreationType,
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    addressHashCreation: HashCreationType
  ): IBlockchain;
};

export type NodeCreationType = {
  create(
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    addressHashCreation: HashCreationType
  ): INode;
};

export type NodeAddressCreationType = {
  create(data: string, keyCurveOption: string, keyCreation: KeyCreationType, mainHashCreation: HashCreationType, finalHashCreation: HashCreationType): string;
};

export type NodeUrlCreationType = {
  create(): string;
};

export type BlockCreationType = {
  create(
    height: number,
    previousHash: string,
    transactions: ITransaction[],
    transactionCalculation: TransactionCalculationType,
    transactionIdCreation: TransactionIdCreationType,
    rewardTransactionCreation: RewardTransactionCreationType,
    target: string,
    blockMining: BlockMiningType,
    hashCreation: HashCreationType
  ): IBlock;
};

export type TransactionIdCreationType = {
  create(data: string, hashCreation: HashCreationType): string;
};

export type RewardTransactionCreationType = {
  create(blockTransactions: ITransaction[], transactionCalculation: TransactionCalculationType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType): ITransaction;
};

export type HashCreationType = {
  hash(data: string): string;
};

export type KeyCreationType = {
  createKeyPair(hashedData: string, curve: EC): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
};
