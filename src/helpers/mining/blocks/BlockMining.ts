import { IBlockMining, MineBlockResultsType } from '../../../types/block.types';
import { HashCreationType } from '../../../types/crypto.types';

export class BlockMining implements IBlockMining {
  constructor(private readonly hashCreation: HashCreationType) {}

  mine(data: string, target: string): MineBlockResultsType {
    let hash: string = this.hashCreation.hash(data);
    let nonce: number = 0;

    while (BigInt('0x' + hash) >= BigInt('0x' + target)) {
      nonce += 1;
      hash = this.hashCreation.hash(`${data}${nonce.toString()}`);
    }

    return { hash, nonce };
  }
}
