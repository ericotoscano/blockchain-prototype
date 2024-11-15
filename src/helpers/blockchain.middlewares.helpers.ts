import { Blockchain } from '../entities/blockchain/Blockchain';
import { ValidationData } from '../types/response.types';

export class BlockchainValidation {
  static validateBlockchainCreation(): ValidationData {
    if (!global.blockchain || global.blockchain instanceof Blockchain) {
      const failData = { title: 'Blockchain Creation Validation', result: false, type: 'Creation Fail', code: 11, message: 'The blockchain creation was unsuccessful.' };

      return failData;
    }

    const successData = { title: 'Blockchain Creation Validation', result: true, type: 'Creation Success', code: 10, message: 'The blockchain creation was successful.' };

    return successData;
  }
}
