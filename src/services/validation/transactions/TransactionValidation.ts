import { TransactionStatusType } from '../../../types/transaction.types';
import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';
import { TransactionDTOValidation } from './TransactionDTOValidation';
import { HexStringValidation } from '../../../utils/validation/HexStringValidation';
import { TimestampValidation } from '../../../utils/validation/TimestampValidation';
import { IBlockchain } from '../../../types/blockchain.types';
import { GlobalManagement } from '../../management/GlobalManagement';

export class TransactionValidation {
  static validateAll(transactions: TransactionDTO[]): ValidationDTO {
    const TYPE: string = 'All Transactions Validation';

    for (let i = 1; i < transactions.length; i++) {
      const { sender, recipient, amount, fee, status, timestamp, txId } = transactions[i];

      const allValidationData: ValidationDTO[] = [
        TransactionDTOValidation.validateKeys(transactions[i]),
        TransactionValidation.validateSenderFormat(sender, txId),
        TransactionValidation.validateRecipientFormat(recipient, txId),
        TransactionValidation.validateAddressMismatch(sender, recipient, txId),
        TransactionValidation.validateAmountFormat(amount, txId),
        TransactionValidation.validateFeeFormat(fee, txId),
        TransactionValidation.validateStatusFormat(status, txId),
        TransactionValidation.validateTxIdFormat(txId),
        TransactionValidation.validateTransactionUniqueness(txId),
        TransactionValidation.validateTimestampFormat(timestamp, txId),
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
      message: 'All transactions are valid.',
    };
  }

  static validateSenderFormat(sender: string, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Sender Format Validation';

    const result: boolean = typeof sender == 'string' && HexStringValidation.validateFormat(sender, 40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions sender address format are valid.' : `In transaction ${txId}, the sender address format is invalid.`,
    };
  }

  static validateRecipientFormat(recipient: string, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Recipient Format Validation';

    const result: boolean = typeof recipient == 'string' && HexStringValidation.validateFormat(recipient, 40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions recipient address format are valid.' : `In transaction ${txId}, the recipient address format is invalid.`,
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
      message: result ? 'All block transactions amount format are valid.' : `In transaction ${txId}, the amount format is invalid.`,
    };
  }

  static validateFeeFormat(fee: number, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Fee Format Validation';

    const result: boolean = typeof fee === 'number' && fee > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions fee format are valid.' : `In transaction ${txId}, the fee format is invalid.`,
    };
  }

  static validateStatusFormat(status: TransactionStatusType, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Status Format Validation';

    const result: boolean = typeof status === 'string' && status === 'Pending';

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All next block transactions status format are valid.' : `In transaction ${txId}, the status format is invalid.`,
    };
  }

  static validateTxIdFormat(txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction TxId Format Validation';

    const result: boolean = typeof txId == 'string' && HexStringValidation.validateFormat(txId, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions txId format are valid.' : `In transaction ${txId}, the txId format is invalid.`,
    };
  }

  static validateTimestampFormat(timestamp: number, txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Timestamp Format Validation';

    const result: boolean = typeof timestamp === 'number' && TimestampValidation.validateFormat(timestamp);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions timestamp format are valid.' : `In transaction ${txId}, the timestamp format is invalid.`,
    };
  }

  static validateTransactionUniqueness(txId: string): ValidationDTO {
    const TYPE: string = 'Block Transaction Uniqueness Validation';

    const blockchain: IBlockchain = GlobalManagement.getBlockchain();

    const allConfirmedTransactions = blockchain.blocksManagement.getAllBlocksTransactions();

    const isDuplicate = allConfirmedTransactions.some((confirmedTransaction) => confirmedTransaction.txId === txId);

    const result: boolean = !isDuplicate;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'All block transactions have a unique txId.' : `Transaction ${txId} has the same txId as one confirmed transaction in the blockchain.`,
    };
  }
}
