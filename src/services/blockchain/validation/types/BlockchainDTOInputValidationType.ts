import { ValidationDTO } from '../../../../shared/types/ResponseDTO';
import { BlockchainDTOInput } from '../../conversion/types/BlockchainDTO';

export type BlockchainDTOInputValidation = {
  validateKeys(blockchainDTOInput: BlockchainDTOInput): ValidationDTO;
};
