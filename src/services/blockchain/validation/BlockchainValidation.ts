import { Blockchain } from '../../../models/Blockchain';
import { IBlockchain } from '../../../types/IBlockchain';
import { ValidationDTO } from '../../../types/ResponseDTO';
import { BlockchainManagement } from '../management/BlockchainManagement';

export class BlockchainValidation {
  static validateFormat(): ValidationDTO {
    const TYPE: string = 'Blockchain Format Validation';

    const blockchain: IBlockchain = BlockchainManagement.getBlockchain();

    const result: boolean = blockchain && blockchain instanceof Blockchain;

    return {
      type: TYPE,
      result,
      code: result ? 10 : 11,
      message: result ? 'The blockchain format is valid.' : 'The blockchain format is invalid.',
    };
  }
}
