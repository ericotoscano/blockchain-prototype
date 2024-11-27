import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';
import { BlockTransactionValidation } from '../transactions/BlockTransactionValidation';

export class BlockTransactionsValidation {
  static validateStructure(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Block Transactions Stucture Format Validation';

    const result: boolean = Array.isArray(transactions) && transactions.length > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block transactions structure has a valid format.' : 'The block transactions structure is missing or has an invalid format.',
    };
  }

  static validateLength(transactions: TransactionDTO[], maxTransactionsPerBlock: number): ValidationDTO {
    const TYPE: string = 'Block Transactions Structure Length Validation';

    const result: boolean = transactions.length > maxTransactionsPerBlock;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result
        ? 'The block transactions structure has a valid length.'
        : "The number of transactions in the block exceeds the allowed limit (it should be less than or equal to the maximum number of transactions per block, accounting for the miner's reward transaction).",
    };
  }

  static validateRewardTransactionFormat(transactions: TransactionDTO[], reward: number): ValidationDTO {
    const TYPE: string = 'Block Reward Transaction Format Validation';

    const { sender, amount, fee } = transactions[0];

    const result: boolean = sender === '0'.repeat(40) && amount >= reward && fee === 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block reward transaction has a valid format.' : `The block reward transaction has an invalid format.`,
    };
  }

  static validateAllTransactions(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'Block All Transactions Validation';

    for (let i = 0; i < transactions.length - 1; i++) {
      const { sender, recipient, amount, fee, status, timestamp, txId } = transactions[i];

      const allValidationData: ValidationDTO[] = [
        BlockTransactionValidation.validateStructure(transactions[i], i),
        BlockTransactionValidation.validateSenderFormat(sender, txId),
        BlockTransactionValidation.validateRecipientFormat(recipient, txId),
        BlockTransactionValidation.validateAddressMismatch(sender, recipient, txId),
        BlockTransactionValidation.validateAmountFormat(amount, txId),
        BlockTransactionValidation.validateFeeFormat(fee, txId),
        BlockTransactionValidation.validateStatusFormat(status, txId),
        BlockTransactionValidation.validateTxIdFormat(txId, i),
        BlockTransactionValidation.validateTransactionUniqueness(transactions[i], txId),
        BlockTransactionValidation.validateTimestampFormat(timestamp, txId),
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
      message: 'All block transactions are valid.',
    };
  }
}
