import { HashCreationType } from './creation.types';
import { ITransaction } from './transaction.types';

export interface IBlock {
  readonly height: number;
  nonce: number;
  hash: string;
  readonly previousHash: string;
  readonly timestamp: number;
  transactions: ITransaction[];
  getData(): string;
}

export type BlockInputType = {
  height: number;
  previousHash: string;
  transactions: ITransaction[];
};

export type BlockMiningType = {
  mine(data: string, target: string, hashCreation: HashCreationType): MineBlockResultsType;
};

export type MineBlockResultsType = {
  hash: string;
  nonce: number;
};
