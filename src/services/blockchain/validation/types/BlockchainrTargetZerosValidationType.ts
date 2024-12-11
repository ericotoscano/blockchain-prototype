import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockchainTargetZerosValidationType = {
  validateFormat(targetZeros: number): ValidationDTO;
};
