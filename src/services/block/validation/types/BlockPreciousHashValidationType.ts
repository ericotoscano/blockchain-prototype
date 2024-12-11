import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockPreviousHashValidation = {
  validateAll(previousHash: string): ValidationDTO;
  validateFormat(previousHash: string): ValidationDTO;
  validateExpectedPreviousHash(previousHash: string): ValidationDTO;
};
