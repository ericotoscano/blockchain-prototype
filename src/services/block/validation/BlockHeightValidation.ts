import { ValidationDTO } from '../../../types/dto.types';

export class BlockHeightValidation {
  static validateFormat(height: number): ValidationDTO {
    const TYPE: string = 'Block Height Format Validation';

    const result: boolean = typeof height === 'number' && Number.isInteger(height) && height > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block height format is valid.' : 'The block height format is invalid.',
    };
  }
}
