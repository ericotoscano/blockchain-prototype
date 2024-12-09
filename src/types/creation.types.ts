import { ec as EC } from 'elliptic';

import { IBlock } from './block.types';
import { ITransaction, TransactionCalculationType, TransactionStatusType } from './transaction.types';
import { INode } from './node.types';
import { AddBlockDTO } from './dto.types';
import { KeyDependenciesType, MiningDependenciesType, NodeDependenciesType, TransactionDependenciesType } from './dependencies.types';

export type TransactionCreationType = {
  create(
    sender: string,
    recipient: string,
    amount: number,
    fee: number,
    transactionIdCreation: TransactionIdCreationType,
    hashCreation: HashCreationType,
    txId?: string,
    status?: TransactionStatusType,
    timestamp?: number
  ): ITransaction;
};

export type NodeCreationType = {
  create(keyDependencies: KeyDependenciesType, nodeDependencies: NodeDependenciesType): INode;
};

export type NodeAddressCreationType = {
  create(data: string, keyDependencies: KeyDependenciesType): string;
};

export type NodeUrlCreationType = {
  create(): string;
};

export type BlockCreationType = {
  create(
    height: number,
    previousHash: string,
    transactions: ITransaction[],
    target: string,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock;
};

export type BlockDTOCreation = {
  createAddBlockDTO(chainLength: number): AddBlockDTO;
};

export type TransactionIdCreationType = {
  create(data: string, hashCreation: HashCreationType): string;
};

export type RewardTransactionCreationType = {
  create(blockTransactions: ITransaction[], transactionIdCreation: TransactionIdCreationType, transactionCalculation: TransactionCalculationType, hashCreation: HashCreationType): ITransaction;
};

export type HashCreationType = {
  hash(data: string): string;
};

export type KeyCreationType = {
  createKeyPair(hashedData: string, curve: EC): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
};
