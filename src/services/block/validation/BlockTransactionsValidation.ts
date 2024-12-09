import { IBlockchain } from '../../../types/blockchain.types';
import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';
import { GlobalManagement } from '../../management/GlobalManagement';
import { TransactionValidation } from '../../transaction/validation/TransactionDTOValidation';
import { RewardTransactionValidation } from '../../transaction/validation/RewardTransactionValidation';

export class BlockTransactionsValidation {
  static validateAll(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Block Transactions All Validation';

    const rewardTransaction: TransactionDTO = transactions[0];

    const allValidationData: ValidationDTO[] = [
      BlockTransactionsValidation.validateStructure(transactions),
      BlockTransactionsValidation.validateStructureLength(transactions),
      RewardTransactionValidation.validateAll(rewardTransaction),
      TransactionValidation.validateAll(transactions),
    ];

    for (const data of allValidationData) {
      if (!data.result) {
        return data;
      }
    }

    return {
      type: TYPE,
      result: true,
      code: 13,
      message: 'The block transactions are valid.',
    };
  }

  static validateStructure(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Block Transactions Structure Validation';

    const result: boolean = Array.isArray(transactions) && transactions.length > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block transactions structure is valid.' : 'The block transactions structure is invalid.',
    };
  }

  static validateStructureLength(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Block Transactions Structure Length Validation';

    const { maxTransactionsPerBlock }: IBlockchain = GlobalManagement.getBlockchain();

    const result: boolean = transactions.length > maxTransactionsPerBlock;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block transactions structure length is valid.' : 'The block transactions structure length is invalid.',
    };
  }
}
