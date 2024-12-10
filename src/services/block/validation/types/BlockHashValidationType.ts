import { ValidationDTO } from '../../../../types/ResponseDTO';
import { HashCreationType } from '../../../../utils/creation/types/HashCreationType';
import { BlockDTO } from '../../conversion/types/BlockDTO';

export type BlockHashValidation = {
  validateAll(block: BlockDTO, hash: string, hashCreation: HashCreationType): ValidationDTO;
  validateFormat(hash: string): ValidationDTO;
  validateDifficulty(hash: string): ValidationDTO;
  validateExpectedHash(block: BlockDTO, hashCreation: HashCreationType): ValidationDTO;
};
