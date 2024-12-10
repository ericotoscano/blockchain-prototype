import { BlockDTO } from '../../../block/conversion/types/BlockDTO';
import { NodeDTO } from '../../../node/conversion/types/NodeDTO';
import { TransactionDTO } from '../../../transaction/conversion/types/TransactionDTO';

export type BlockchainDTOInput = {
  targetZeros: number;
  reward: number;
  maxTransactionsPerBlock: number;
};

export type BlockchainDTOOutput = {
  target: string;
  reward: number;
  maxTransactionsPerBlock: number;
  node: NodeDTO;
  mempool: TransactionDTO[];
  blocks: BlockDTO[];
};
