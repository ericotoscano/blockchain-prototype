import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockchainRewardValidationType = {
  validateFormat(reward: number): ValidationDTO;
};
