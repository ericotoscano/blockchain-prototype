import { ValidationDTO } from '../../../shared/types/ResponseDTO';

export class BlockchainTargetZerosValidation {
  static validateFormat(targetZeros: number): ValidationDTO {
    const TYPE: string = 'Blockchain Target Zeros Format Validation';

    const result: boolean = typeof targetZeros === 'number' && Number.isInteger(targetZeros) && targetZeros > 0;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain target zeros format is valid.' : 'The blockchain target zeros is invalid.',
    };
  }
}
