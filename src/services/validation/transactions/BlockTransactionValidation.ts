import { TimestampFormatValidation } from '../../../utils/validation/DateValidation';
import { HexStringFormatValidation } from '../../../utils/validation/HexStringValidation';
import { TransactionStatusType } from '../../../types/transaction.types';
import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';

export class BlockTransactionValidation {
  static validateStructure(transaction: TransactionDTO, transactionIndex: number): ValidationDTO {
    const TYPE: string = 'Block Individual Transaction Structure Format Validation';

    const result: boolean = transaction && typeof transaction === 'object' && !Array.isArray(transaction);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result
        ? 'All block transactions have a valid structure format.'
        : `At index ${transactionIndex} in the block's transactions, the transaction structure is missing or has an invalid format.`,
    };
  }

  static validateSenderFormat(sender: string, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Sender Format Validation';

    const result: boolean = typeof sender == 'string' && HexStringFormatValidation.validate(sender, 40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a valid sender address format.' : `In transaction ${txId}, the sender address is missing or has an invalid format.`,
    };
  }

  static validateRecipientFormat(recipient: string, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Recipient Format Validation';

    const result: boolean = typeof recipient == 'string' && HexStringFormatValidation.validate(recipient, 40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a valid recipient address format.' : `In transaction ${txId}, the recipient address is missing or has an invalid format.`,
    };
  }

  static validateAddressMismatch(sender: string, recipient: string, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Address Mismatch Validation';

    const result: boolean = sender === recipient;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have matching sender and recipient addresses.' : `In transaction ${txId}, the sender and recipient addresses do not match.`,
    };
  }

  static validateAmountFormat(amount: number, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Amount Format Validation';

    const result: boolean = typeof amount === 'number' && amount > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a valid amount format.' : `In transaction ${txId}, the amount is missing or has an invalid format.`,
    };
  }

  static validateFeeFormat(fee: number, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Fee Format Validation';

    const result: boolean = typeof fee === 'number' && fee >= 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a valid fee format.' : `In transaction ${txId}, the fee is missing or has an invalid format.`,
    };
  }

  static validateStatusFormat(status: TransactionStatusType, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Status Format Validation';

    const result: boolean = typeof status === 'string' && status === 'Pending';

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All next block transactions have a valid status format.' : `In transaction ${txId}, the status is missing or has an invalid format.`,
    };
  }

  static validateTxIdFormat(txId: string, transactionIndex: number): ValidationDTO {
    const TYPE: string = 'Block Transaction TxId Format Validation';

    const result: boolean = typeof txId == 'string' && HexStringFormatValidation.validate(txId, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a valid txId format.' : `At index ${transactionIndex} in the block's transactions, the txId is missing or has an invalid format.`,
    };
  }

  static validateTimestampFormat(timestamp: number, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Timestamp Format Validation';

    const result: boolean = typeof timestamp === 'number' && TimestampFormatValidation.validate(timestamp);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a valid timestamp format.' : `In transaction ${txId}, the timestamp is missing or has an invalid format.`,
    };
  }

  static validateTransactionUniqueness(transaction: TransactionDTO, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Uniqueness Validation';

    const allConfirmedTransactions = global.blockchain.blocksManagement.getAllBlocksTransactions();

    const isDuplicate = allConfirmedTransactions.some((confirmedTransaction) => confirmedTransaction.txId === transaction.txId);

    const result: boolean = !isDuplicate;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a unique txId.' : `Transaction ${txId} has the same txId as another transaction in the blockchain.`,
    };
  }
}
