import { ValidationDTO } from '../../../types/ResponseDTO';
import { TimestampValidation } from '../../../utils/validation/TimestampValidation';

export class BlockTimestampValidation {
  static validateFormat(timestamp: number): ValidationDTO {
    const TYPE: string = 'Block Timestamp Format Validation';

    const result: boolean = typeof timestamp === 'number' && TimestampValidation.validateFormat(timestamp);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block timestamp format is valid.' : 'The block timestamp format is invalid.',
    };
  }
}
