import { CreateBlockchainDTO, ValidationDTO } from '../../../types/dto.types';

export class BlockchainDTOValidation {
  static validateFormat(blockchainDTO: CreateBlockchainDTO): ValidationDTO {
    const TYPE: string = 'Blockchain DTO Format Validation';

    const requiredKeys: string[] = ['targetZeros', 'reward', 'maxTransactionsPerBlock'];

    const hasAllRequiredKeys: boolean = requiredKeys.every((key) => key in blockchainDTO);

    const hasNoExtraKeys: boolean = Object.keys(blockchainDTO).every((key) => requiredKeys.includes(key));

    const result: boolean = hasAllRequiredKeys && hasNoExtraKeys;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain DTO format is valid.' : 'The blockchain DTO format is invalid.',
    };
  }
}
