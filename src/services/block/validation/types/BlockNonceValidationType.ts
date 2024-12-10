import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockNonceValidation = {
  validateFormat(nonce: number): ValidationDTO;
};
