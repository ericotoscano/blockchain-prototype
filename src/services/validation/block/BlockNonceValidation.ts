import { ValidationDTO } from '../../../types/dto.types';

export class BlockNonceValidation {
  static validateFormat(nonce: number): ValidationDTO {
    const TYPE: string = 'Block Nonce Format Validation';

    const result: boolean = typeof nonce === 'number' && Number.isInteger(nonce) && nonce >= 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block nonce format is valid.' : 'The block nonce format is invalid.',
    };
  }
}
