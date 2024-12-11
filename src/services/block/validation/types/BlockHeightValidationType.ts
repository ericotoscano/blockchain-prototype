import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockHeightValidation = {
  validateFormat(height: number): ValidationDTO;
};
