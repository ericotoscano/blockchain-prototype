import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockPreviousHashValidation = {
  validateAll(previousHash: string): ValidationDTO;
  validateFormat(previousHash: string): ValidationDTO;
  validateExpectedPreviousHash(previousHash: string): ValidationDTO;
};
