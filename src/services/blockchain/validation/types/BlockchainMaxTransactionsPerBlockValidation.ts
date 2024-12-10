import { ValidationDTO } from '../../../../types/ResponseDTO';

export type BlockchainMaxTransactionsPerBlockValidationType = {
  validateFormat(maxTransactionsPerBlock: number): ValidationDTO;
};
