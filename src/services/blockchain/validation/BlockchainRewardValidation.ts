import { ValidationDTO } from '../../../shared/types/ResponseDTO';

export class BlockchainRewardValidation {
  static validateFormat(reward: number): ValidationDTO {
    const TYPE: string = 'Blockchain Reward Format Validation';

    const result: boolean = typeof reward === 'number' && reward > 0;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain reward format is valid.' : 'The blockchain reward format is invalid.',
    };
  }
}
