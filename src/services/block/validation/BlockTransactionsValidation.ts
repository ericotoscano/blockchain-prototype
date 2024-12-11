import { ValidationDTO } from '../../../shared/types/ResponseDTO';
import { TransactionsDTOValidation } from '../../transaction/validation/TransactionsDTOValidation';
import { RewardTransactionValidation } from '../../transaction/validation/RewardTransactionValidation';
import { IBlockchain } from '../../../domain/types/IBlockchain';
import { BlockchainManagement } from '../../blockchain/management/BlockchainManagement';
import { TransactionDTO } from '../../transaction/conversion/types/TransactionDTO';

export class BlockTransactionsValidation {
  static validateAll(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Block Transactions All Validation';

    const rewardTransaction: TransactionDTO = transactions[0];

    const allValidationData: ValidationDTO[] = [
      BlockTransactionsValidation.validateStructure(transactions),
      BlockTransactionsValidation.validateStructureLength(transactions),
      RewardTransactionValidation.validateAll(rewardTransaction),
      TransactionsDTOValidation.validateAll(transactions),
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

    const { maxTransactionsPerBlock }: IBlockchain = BlockchainManagement.getBlockchain();

    const result: boolean = transactions.length > maxTransactionsPerBlock;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block transactions structure length is valid.' : 'The block transactions structure length is invalid.',
    };
  }
}
