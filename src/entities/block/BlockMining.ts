import { HashCreationType } from '../../utils/HashCreation';

export interface IMineResults {
  hash: string;
  nonce: number;
}

export interface IBlockMining {
  mine(data: string, target: string): IMineResults;
}

export class BlockMining {
  constructor(private readonly hashCreation: HashCreationType) {}

  mine(data: string, target: string): IMineResults {
    let hash = this.hashCreation.hash(data);
    let nonce = 0;

    while (BigInt('0x' + hash) >= BigInt('0x' + target)) {
      nonce += 1;
      hash = this.hashCreation.hash(`${data}${nonce.toString()}`);
    }

    return { hash, nonce };
  }
}
