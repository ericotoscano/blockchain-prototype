import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';
import { HexStringValidation } from '../../../utils/validation/HexStringValidation';
import { TimestampValidation } from '../../../utils/validation/TimestampValidation';
import { IBlockchain } from '../../../types/blockchain.types';
import { GlobalManagement } from '../../management/GlobalManagement';
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
      message: result ? `In transaction DTO ${txId}, the keys are valid.` : `In transaction DTO ${txId}, the keys are invalid.`,
    };
  }

  static validateSenderFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Sender Format Validation';

    const { sender, txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof sender == 'string' && HexStringValidation.validateFormat(sender, 40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction DTO ${txId}, the sender address format is valid.` : `In transaction ${txId}, the sender address format is invalid.`,
    };
  }

  static validateRecipientFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Recipient Format Validation';

    const { recipient, txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof recipient == 'string' && HexStringValidation.validateFormat(recipient, 40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the recipient address format is valid.` : `In transaction ${txId}, the recipient address format is invalid.`,
    };
  }

  static validateAddressesMismatch(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Address Mismatch Validation';

    const { sender, recipient, txId }: TransactionDTO = transactionDTO;

    const result: boolean = sender !== recipient;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the sender and recipient addresses mismatch.` : `In transaction ${txId}, the sender and recipient addresses match.`,
    };
  }

  static validateAmountFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Amount Format Validation';

    const { amount, txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof amount === 'number' && amount > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the amount format is valid.` : `In transaction ${txId}, the amount format is invalid.`,
    };
  }

  static validateFeeFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Fee Format Validation';

    const { fee, txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof fee === 'number' && fee > 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the fee format is valid.` : `In transaction ${txId}, the fee format is invalid.`,
    };
  }

  static validateStatusFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Status Format Validation';

    const { status, txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof status === 'string' && status === 'Pending';

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the status format is valid.` : `In transaction ${txId}, the status format is invalid.`,
    };
  }

  static validateTimestampFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO Timestamp Format Validation';

    const { timestamp, txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof timestamp === 'number' && TimestampValidation.validateFormat(timestamp);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the timestamp format is valid.` : `In transaction ${txId}, the timestamp format is invalid.`,
    };
  }

  static validateTxIdFormat(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO TxId Format Validation';

    const { txId }: TransactionDTO = transactionDTO;

    const result: boolean = typeof txId == 'string' && HexStringValidation.validateFormat(txId, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `In transaction ${txId}, the txId format is valid.` : `In transaction ${txId}, the txId format is invalid.`,
    };
  }

  static validateInMempool(transactionDTO: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Transaction DTO In Mempool Validation';

    const { txId }: TransactionDTO = transactionDTO;

    const { mempool }: IBlockchain = GlobalManagement.getBlockchain();

    const result: boolean = mempool.some((mempoolTransaction) => mempoolTransaction.txId === txId);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? `Transaction ${txId} is in mempool.` : `Transaction ${txId} is not in mempool.`,
    };
  }
}
