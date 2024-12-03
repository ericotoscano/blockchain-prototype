import { IBlockchain } from '../../../types/blockchain.types';
import { TransactionDTO, ValidationDTO } from '../../../types/dto.types';
import { GlobalManagement } from '../../management/GlobalManagement';
import { TransactionDTOValidation } from './TransactionDTOValidation';

export class RewardTransactionValidation {
  static validateAll(rewardtransaction: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Reward Transaction All Validation';

    const allValidationData: ValidationDTO[] = [
      TransactionDTOValidation.validateKeys(rewardtransaction),
      RewardTransactionValidation.validateSender(rewardtransaction),
      RewardTransactionValidation.validateAmount(rewardtransaction),
      RewardTransactionValidation.validateFee(rewardtransaction),
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
      message: 'The reward transaction is valid.',
    };
  }
  //começar daqui, reorganizar textos etc
  static validateSender(rewardTransaction: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Block Reward Transaction Sender Validation';

    const { sender }: TransactionDTO = rewardTransaction;

    const result: boolean = sender === '0'.repeat(40);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block reward transaction sender is valid.' : `The block reward transaction sender is invalid.`,
    };
  }

  static validateAmount(rewardTransaction: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Block Reward Transaction Amount Validation';

    const { amount }: TransactionDTO = rewardTransaction;

    const { reward }: IBlockchain = GlobalManagement.getBlockchain();

    const result: boolean = amount >= reward;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block reward transaction amount is valid.' : `The block reward transaction amount is invalid.`,
    };
  }

  static validateFee(rewardTransaction: TransactionDTO): ValidationDTO {
    const TYPE: string = 'Block Reward Transaction Fee Validation';

    const { fee }: TransactionDTO = rewardTransaction;

    const result: boolean = fee === 0;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block reward transaction fee is valid.' : `The block reward transaction fee is invalid.`,
    };
  }
}
