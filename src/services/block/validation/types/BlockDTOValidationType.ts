import { ValidationDTO } from '../../../../shared/types/ResponseDTO';
import { BlockDTO } from '../../conversion/types/BlockDTO';

export type BlockDTOValidation = {
  validateKeys(blockDTO: BlockDTO): ValidationDTO;
};
