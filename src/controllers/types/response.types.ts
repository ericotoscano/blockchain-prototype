import { BlockType } from '../../models/types/block.types';

export interface CreateBlockchainResponse {
  message: string;
  data?: {
    targetDifficulty: string;
    maxTransactionsPerBlock: number;
    chain: BlockType[];
  };
  error?: {
    code: number;
    message: string;
  };
}
