import { IBlock } from '../../../domain/types/IBlock';
import { IBlockchain } from '../../../domain/types/IBlockchain';
import { ValidationDTO } from '../../../shared/types/ResponseDTO';
import { HexStringValidation } from '../../../shared/utils/HexStringValidation';
import { BlockchainManagement } from '../../blockchain/management/BlockchainManagement';

export class BlockPreviousHashValidation {
  static validateAll(previousHash: string): ValidationDTO {
    const TYPE: string = 'Block Previous Hash All Validation';

    const allValidationData: ValidationDTO[] = [BlockPreviousHashValidation.validateFormat(previousHash), BlockPreviousHashValidation.validateExpectedPreviousHash(previousHash)];

    for (const data of allValidationData) {
      if (!data.result) {
        return data;
      }
    }

    return {
      type: TYPE,
      result: true,
      code: 13,
      message: 'The block previous hash is valid.',
    };
  }

  static validateFormat(previousHash: string): ValidationDTO {
    const TYPE: string = 'Block Previous Hash Format Validation';

    const result: boolean = typeof previousHash === 'string' && HexStringValidation.validateFormat(previousHash, 64);

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block previous hash format is valid.' : 'The block previous hash format is invalid.',
    };
  }

  static validateExpectedPreviousHash(previousHash: string): ValidationDTO {
    const TYPE: string = 'Block Expected Previous Hash Validation';

    const blockchain: IBlockchain = BlockchainManagement.getBlockchain();

    const { hash }: IBlock = blockchain.blocksManagement.getPreviousBlock();

    const result: boolean = previousHash === hash;

    return {
      type: TYPE,
      result,
      code: 13,
      message: result ? 'The block previous hash matches with last valid block hash in blockchain.' : 'The block previous hash does not match with the last valid block hash in blockchain.',
    };
  }
}
