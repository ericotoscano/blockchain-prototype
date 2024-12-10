import { ValidationDTO } from '../../../types/ResponseDTO';
import { DTOKeysValidation } from '../../../utils/validation/DTOValidation';
import { BlockchainDTOInput } from '../conversion/types/BlockchainDTO';

export class BlockchainDTOInputValidation {
  static validateKeys(blockchainDTOInput: BlockchainDTOInput): ValidationDTO {
    const TYPE: string = 'Blockchain DTO Keys Validation';

    const requiredKeys: string[] = ['targetZeros', 'reward', 'maxTransactionsPerBlock'];

    const result: boolean = DTOKeysValidation.validate(blockchainDTOInput, requiredKeys);

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain DTO keys are valid.' : 'The blockchain DTO keys are invalid.',
    };
  }
}
