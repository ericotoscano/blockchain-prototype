import { Blockchain } from '../../../models/Blockchain';
import { ValidationDTO } from '../../../types/dto.types';

export class BlockchainStructureValidation {
  static validate(): ValidationDTO {
    const TYPE: string = 'Blockchain Structure Validation';

    const result: boolean = global.blockchain && global.blockchain instanceof Blockchain;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain stucture is valid.' : 'The blockchain structure is missing or is invalid.',
    };
  }
}
