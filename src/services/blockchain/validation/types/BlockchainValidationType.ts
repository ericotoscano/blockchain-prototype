import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockchainValidation = {
  validateFormat(): ValidationDTO;
};
