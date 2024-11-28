import { ValidationDTO } from '../../../types/dto.types';

export class BlockchainMaxTransactionsPerBlockValidation {
  static validateFormat(maxTransactionsPerBlock: number): ValidationDTO {
    const TYPE: string = 'Blockchain Maximum Transactions Per Block Format Validation';

    const result: boolean = typeof maxTransactionsPerBlock === 'number' && Number.isInteger(maxTransactionsPerBlock) && maxTransactionsPerBlock > 0 && maxTransactionsPerBlock <= 20;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain maximum transactions per block format is valid.' : 'The blockchain maximum transactions per block format is invalid.',
    };
  }
}
