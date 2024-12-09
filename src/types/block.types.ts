import { HashCreationType } from './creation.types';
import { IBlockTransactionsManagement } from './management.types';
import { ITransaction } from './transaction.types';

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly transactions: ITransaction[];
  readonly blockTransactionsManagement: IBlockTransactionsManagement;
  getData(): string;
}

export type BlockMiningType = {
  mine(blockData: string, target: string, hashCreation: HashCreationType): MineResultsType;
};

export type MineResultsType = {
  calculatedHash: string;
  foundNonce: number;
};
