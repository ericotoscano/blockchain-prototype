import { MineBlockResultsType } from '../../types/block.types';
import { HashCreationType } from '../../types/creation.types';

export class BlockMining {
  static mine(data: string, target: string, hashCreation: HashCreationType): MineBlockResultsType {
    let calculatedHash: string = hashCreation.hash(data);
    let foundNonce: number = 0;

    while (BigInt('0x' + calculatedHash) >= BigInt('0x' + target)) {
      foundNonce += 1;
      calculatedHash = hashCreation.hash(`${data}${foundNonce.toString()}`);
    }

    return { calculatedHash, foundNonce };
  }
}
