import { ValidationResponseType } from '../../../types/response.types';

import { HexStringFormatValidation } from '../../../utils/validation/HexStringFormatValidation';

export class BlockPreviousHashValidation {
  static validateFormat(previousHash: string): ValidationResponseType {
    const TYPE: string = 'Block Previous Hash Format Validation';

    const result: boolean = typeof previousHash === 'string' && HexStringFormatValidation.validate(previousHash, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block previous hash format is valid.' : 'The block previous hash is missing or has an invalid format.',
    };
  }

  static validateExpectedPreviousHash(previousHash: string, expectedPreviousHash: string): ValidationResponseType {
    const TYPE: string = 'Block Expected Previous Hash Validation';

    const result: boolean = previousHash !== expectedPreviousHash;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block previous hash matches with last valid block hash in blockchain.' : 'The block previous hash does not match with the last valid block hash in blockchain.',
    };
  }
}
