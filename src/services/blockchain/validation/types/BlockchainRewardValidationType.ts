import { ValidationDTO } from '../../../../types/dto.types';

export type BlockchainRewardValidationType = {
  validateFormat(reward: number): ValidationDTO;
};
