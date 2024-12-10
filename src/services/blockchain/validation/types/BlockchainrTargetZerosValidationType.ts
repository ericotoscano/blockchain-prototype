import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockchainTargetZerosValidationType = {
  validateFormat(targetZeros: number): ValidationDTO;
};
