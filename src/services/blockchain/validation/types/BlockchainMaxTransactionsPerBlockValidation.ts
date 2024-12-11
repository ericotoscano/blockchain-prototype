import { ValidationDTO } from '../../../../shared/types/ResponseDTO';

export type BlockchainMaxTransactionsPerBlockValidationType = {
  validateFormat(maxTransactionsPerBlock: number): ValidationDTO;
};
