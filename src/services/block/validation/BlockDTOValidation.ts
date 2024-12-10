import { ValidationDTO } from '../../../types/ResponseDTO';
import { DTOKeysValidation } from '../../../utils/validation/DTOValidation';
import { BlockDTO } from '../conversion/types/BlockDTO';

export class BlockDTOValidation {
  static validateKeys(blockDTO: BlockDTO): ValidationDTO {
    const TYPE: string = 'Block DTO Keys Validation';

    const requiredKeys: string[] = ['height', 'nonce', 'hash', 'previousHash', 'transactions', 'timestamp'];

    const result: boolean = DTOKeysValidation.validate(blockDTO, requiredKeys);

    return {
      type: TYPE,
      result,
      code: 12,
      message: result ? 'The block DTO keys are valid.' : 'The block DTO keys are invalid.',
    };
  }
}
