import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockHeightValidation = {
  validateFormat(height: number): ValidationDTO;
};
