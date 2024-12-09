import { ValidationDTO } from "../../../../types/dto.types";

export type BlockchainMaxTransactionsPerBlockValidationType = {
  validateFormat(maxTransactionsPerBlock: number): ValidationDTO;
};
