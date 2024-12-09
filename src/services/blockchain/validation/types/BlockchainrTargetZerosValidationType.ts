import { ValidationDTO } from '../../../../types/dto.types';

export type BlockchainTargetZerosValidationType = {
  validateFormat(targetZeros: number): ValidationDTO;
};
