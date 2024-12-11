import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockNonceValidation = {
  validateFormat(nonce: number): ValidationDTO;
};
