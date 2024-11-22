import { HashCreationType } from '../../../types/creation/HashCreationType';
import { MineBlockResultsType } from '../../../types/results/MineBlockResultsType';

export class BlockMining {
  static mine(data: string, target: string, hashCreation: HashCreationType): MineBlockResultsType {
    let hash: string = hashCreation.hash(data);
    let nonce: number = 0;

    while (BigInt('0x' + hash) >= BigInt('0x' + target)) {
      nonce += 1;
      hash = hashCreation.hash(`${data}${nonce.toString()}`);
    }

    return { hash, nonce };
  }
}
