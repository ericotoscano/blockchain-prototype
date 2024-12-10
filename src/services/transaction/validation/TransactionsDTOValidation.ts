import { IBlockchain } from '../../../types/IBlockchain';
import { ValidationDTO } from '../../../types/ResponseDTO';
import { BlockchainManagement } from '../../blockchain/management/BlockchainManagement';
import { TransactionDTO } from '../conversion/types/TransactionDTO';
import { TransactionDTOValidation } from './TransactionDTOValidation';

export class TransactionsDTOValidation {
  static validateStructure(transactionsDTO: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Transactions DTO Structure Validation';

    const result: boolean = Array.isArray(transactionsDTO);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The transactions DTO structure is valid.' : 'The transactions DTO structure is invalid.',
    };
  }

  static validateStructureLength(transactionsDTO: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Transactions DTO Structure Length Validation';

    const { maxTransactionsPerBlock }: IBlockchain = BlockchainManagement.getBlockchain();

    const result: boolean = transactionsDTO.length > 0 && transactionsDTO.length < maxTransactionsPerBlock;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The transactions DTO structure length is valid.' : 'The transactions DTO structure length is invalid.',
    };
  }

  static validateAll(transactionsDTO: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Transactions DTO Validation';

    for (const transactionDTO of transactionsDTO) {
      const allValidationData: ValidationDTO[] = [
        TransactionDTOValidation.validateKeys(transactionDTO),
        TransactionDTOValidation.validateSenderFormat(transactionDTO),
        TransactionDTOValidation.validateRecipientFormat(transactionDTO),
        TransactionDTOValidation.validateAddressesMismatch(transactionDTO),
        TransactionDTOValidation.validateAmountFormat(transactionDTO),
        TransactionDTOValidation.validateFeeFormat(transactionDTO),
        TransactionDTOValidation.validateStatusFormat(transactionDTO),
        TransactionDTOValidation.validateTimestampFormat(transactionDTO),
        TransactionDTOValidation.validateTxIdFormat(transactionDTO),
        TransactionDTOValidation.validateInMempool(transactionDTO),
      ];

      for (const data of allValidationData) {
        if (!data.result) {
          return data;
        }
      }
    }

    return {
      type: TYPE,
      result: true,
      code: 13,
      message: 'The transactions DTO are valid.',
    };
  }
}
