import { Block } from '../../../entities/block/Block';
import { IBlock, IBlockMining, MineBlockResultsType } from '../../../types/block.types';
import { IGenesisBlockCreation } from '../../../types/blockchain.types';

export class GenesisBlockCreation implements IGenesisBlockCreation {
  constructor(private readonly blockMining: IBlockMining) {}

  create(target: string): IBlock {
    const input = { height: 0, previousHash: '0'.repeat(64), transactions: [] };

    const genesisBlock: IBlock = new Block(input);

    const data: string = genesisBlock.getData();

    const { hash, nonce }: MineBlockResultsType = this.blockMining.mine(data, target);

    genesisBlock.hash = hash;
    genesisBlock.nonce = nonce;

    return genesisBlock;
  }
}
