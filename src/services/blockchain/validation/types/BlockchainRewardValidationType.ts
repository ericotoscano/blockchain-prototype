import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockchainRewardValidationType = {
  validateFormat(reward: number): ValidationDTO;
};
