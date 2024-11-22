import { ValidationResponseType } from '../../../types/response/ValidationResponseType';

export class BlockHeightValidation {
  static validateFormat(height: number): ValidationResponseType {
    const TYPE: string = 'Block Height Format Validation';

    const result: boolean = typeof height === 'number' && Number.isInteger(height) && height >= 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block height format is valid.' : 'The block height is missing or has an invalid format.',
    };
  }
}
