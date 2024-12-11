import { ValidationDTO } from '../../../../shared/types/ResponseDTO';
import { TransactionDTO } from '../../../transaction/conversion/types/TransactionDTO';

export type BlockTransactionsValidation = {
  validateAll(transactions: TransactionDTO[]): ValidationDTO;
  validateStructure(transactions: TransactionDTO[]): ValidationDTO;
  validateStructureLength(transactions: TransactionDTO[]): ValidationDTO;
};
