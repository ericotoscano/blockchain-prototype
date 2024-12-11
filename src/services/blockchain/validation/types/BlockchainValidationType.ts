import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockchainValidation = {
  validateFormat(): ValidationDTO;
};
