import { ValidationResponseType } from '../../../types/response.types';

import { TimestampFormatValidation } from '../../../utils/DateFomatValidation';

export class BlockTimestampValidation {
  static validateFormat(timestamp: number): ValidationResponseType {
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
