import { IBlockchain } from '../../../types/blockchain.types';
import { HashCreationType } from '../../../types/creation.types';
import { BlockDTO, ValidationDTO } from '../../../types/dto.types';
import { HexStringValidation } from '../../../utils/validation/HexStringValidation';
import { GlobalManagement } from '../../management/GlobalManagement';

export class BlockHashValidation {
  static validateAll(block: BlockDTO, hash: string, hashCreation: HashCreationType): ValidationDTO {
    const TYPE: string = 'Block Hash All Validation';

    const allValidationData: ValidationDTO[] = [BlockHashValidation.validateFormat(hash), BlockHashValidation.validateDifficulty(hash), BlockHashValidation.validateExpectedHash(block, hashCreation)];

    for (const data of allValidationData) {
      if (!data.result) {
        return data;
      }
    }

    return {
      type: TYPE,
      result: true,
      code: 13,
      message: 'The block hash is valid.',
    };
  }

  static validateFormat(hash: string): ValidationDTO {
    const TYPE: string = 'Block Hash Format Validation';

    const result: boolean = typeof hash === 'string' && HexStringValidation.validateFormat(hash, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block hash format is valid.' : 'The block hash format is invalid.',
    };
  }

  static validateDifficulty(hash: string) {
    const TYPE: string = 'Block Hash Difficulty Validation';

    const hashValue: bigint = BigInt('0x' + hash);

    const { target }: IBlockchain = GlobalManagement.getBlockchain();

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
