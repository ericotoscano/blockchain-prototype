import { CreateBlockchainDTO, ValidationDTO } from '../../../types/dto.types';
import { DTOKeysValidation } from '../../../utils/validation/DTOKeysValidation';

export class BlockchainDTOValidation {
  static validateKeys(blockchainDTO: CreateBlockchainDTO): ValidationDTO {
    const TYPE: string = 'Blockchain DTO Format Validation';

    const requiredKeys: string[] = ['targetZeros', 'reward', 'maxTransactionsPerBlock'];

    const result: boolean = DTOKeysValidation.validate(blockchainDTO, requiredKeys);

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain DTO keys are valid.' : 'The blockchain DTO keys are invalid.',
    };
  }
}
