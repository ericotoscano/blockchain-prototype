import { BlockDataType } from '../../../types/block.types';
import { ValidationResponseType } from '../../../types/response.types';

export class BlockStructureValidation {
  static validate(block: BlockDataType): ValidationResponseType {
    const TYPE: string = 'Block Structure Validation';

    const result: boolean = block && typeof block === 'object' && !Array.isArray(block);

    return {
      type: TYPE,
      result,
      code: 12,
      message: result ? 'The block structure is valid.' : 'The block structure is missing or is invalid.',
    };
  }
}
