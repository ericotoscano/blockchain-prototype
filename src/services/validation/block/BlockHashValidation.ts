import { HashCreationType } from '../../../types/creation.types';
import { BlockDTO, ValidationDTO } from '../../../types/dto.types';
import { HexStringFormatValidation } from '../../../utils/validation/HexStringFormatValidation';

export class BlockHashValidation {
  static validateFormat(hash: string): ValidationDTO {
    const TYPE: string = 'Block Hash Format Validation';

    const result: boolean = typeof hash === 'string' && HexStringFormatValidation.validate(hash, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block hash format is valid.' : 'The block hash is missing or has an invalid format.',
    };
  }

  static validateDifficulty(hash: string, target: string) {
    const TYPE: string = 'Block Hash Difficulty Validation';

    const hashValue: bigint = BigInt('0x' + hash);
    const targetValue: bigint = BigInt('0x' + target);

    const result: boolean = hashValue < targetValue;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block hash matches with the required blockchain target difficulty.' : 'The block hash does not match with the required blockchain target difficulty.',
    };
  }

  static validateExpectedHash(block: BlockDTO, hashCreation: HashCreationType) {
    const TYPE: string = 'Block Expected Hash Validation';

    const { height, nonce, hash, previousHash, transactions, timestamp } = block;

    const expectedHash: string = hashCreation.hash(`${height}${nonce}${previousHash}${JSON.stringify(transactions)}${timestamp}`);

    const result: boolean = expectedHash !== hash;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block hash matches with the expected hash.' : 'The block hash does not match with the expected hash.',
    };
  }
}
