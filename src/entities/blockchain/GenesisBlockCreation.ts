import { IBlock, Block } from '../block/Block';
import { IBlockMining } from '../block/BlockMining';

export interface IGenesisBlockCreation {
  create(target: string): IBlock;
}

export class GenesisBlockCreation implements IGenesisBlockCreation {
  constructor(private readonly blockMining: IBlockMining) {}

  create(target: string): IBlock {
    const props = { height: 0, previousHash: '0'.repeat(64), transactions: [] };

    const genesisBlock = new Block(props);

    const data = genesisBlock.getData();

    const { hash, nonce } = this.blockMining.mine(data, target);

    genesisBlock.hash = hash;
    genesisBlock.nonce = nonce;

    return genesisBlock;
  }
}
