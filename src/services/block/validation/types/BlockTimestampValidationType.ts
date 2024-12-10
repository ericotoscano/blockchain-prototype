import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockTimestampValidation = {
  validateFormat(timestamp: number): ValidationDTO;
};
