import { TimestampFormatValidation } from '../../../utils/validation/DateValidation';
import { ValidationDTO } from '../../../types/dto.types';

export class BlockTimestampValidation {
  static validateFormat(timestamp: number): ValidationDTO {
    const TYPE: string = 'Block Timestamp Format Validation';

    const result: boolean = typeof timestamp === 'number' && TimestampFormatValidation.validate(timestamp);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block timestamp format is valid.' : 'The block timestamp is missing or has an invalid format.',
    };
  }
}
