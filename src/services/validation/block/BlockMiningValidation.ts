import { ValidationDTO } from '../../../types/dto.types';

export class BlockMiningValidation {
  static validateMinFeeFormat(minFee: number): ValidationDTO {
    const TYPE: string = 'Block Transactions Minimum Fee Format Validation';

    const result: boolean = typeof minFee === 'number' && minFee >= 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block transactions min fee format is valid.' : 'The block transactions min fee format is invalid.',
    };
  }
}
