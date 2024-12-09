import { BlockchainDTOInput, ValidationDTO } from '../../../../types/dto.types';

export type BlockchainDTOInputValidation = {
  validateKeys(blockchainDTOInput: BlockchainDTOInput): ValidationDTO;
};
