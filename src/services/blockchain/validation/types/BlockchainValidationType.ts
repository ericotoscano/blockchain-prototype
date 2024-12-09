import { ValidationDTO } from '../../../../types/dto.types';

export type BlockchainValidation = {
  validateFormat(): ValidationDTO;
};
