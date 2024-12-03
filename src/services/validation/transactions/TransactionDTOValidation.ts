import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';
import { DTOKeysValidation } from '../../../utils/validation/DTOKeysValidation';

export class TransactionDTOValidation {
  static validateKeys(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Keys Validation';

    const { txId }: TransactionDTO = transactionDTO;

    const requiredKeys: string[] = ['sender', 'recipient', 'amount', 'fee', 'txId', 'status', 'timestamp'];

    const result: boolean = DTOKeysValidation.validate(transactionDTO, requiredKeys);

    return {
      type: TYPE,
      result,
      code: 12,
      message: result ? `The transaction DTO keys are valid.` : `In transaction ${txId}, the transaction DTO keys are invalid.`,
    };
  }
}
