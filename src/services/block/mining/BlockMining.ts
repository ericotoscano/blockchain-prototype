import { HashCreationType } from '../../../shared/utils/HashCreationType';
import { MineResultsType } from './types/BlockMiningType';

export class BlockMining {
  static mine(blockData: string, target: string, hashCreation: HashCreationType): MineResultsType {
    let calculatedHash: string = hashCreation.hash(blockData);
    let foundNonce: number = 0;

    while (BigInt('0x' + calculatedHash) >= BigInt('0x' + target)) {
      foundNonce += 1;
      calculatedHash = hashCreation.hash(`${blockData}${foundNonce.toString()}`);
    }

    return { calculatedHash, foundNonce };
  }
}
