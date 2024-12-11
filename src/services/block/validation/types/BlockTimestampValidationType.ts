import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockTimestampValidation = {
  validateFormat(timestamp: number): ValidationDTO;
};
