import { Block } from '../../models/Block';
import { BlockMiningType, IBlock, MineBlockResultsType } from '../../types/block.types';
import { HashCreationType } from '../../types/creation.types';
import { ITransaction } from '../../types/transaction.types';

export class BlockCreation {
  static create(
    height: number,
    previousHash: string,
    transactions: ITransaction[],
    target: string,
    blockMining: BlockMiningType,
    hashCreation: HashCreationType,
    nonce?: number,
    hash?: string,
    timestamp?: number
  ): IBlock {
    const blockNonce: number = nonce ?? 0;

    const blockHash: string = hash ?? '';

    const blockTimestamp: number = timestamp ?? Date.now();

    const block: IBlock = new Block(height, previousHash, blockNonce, blockHash, blockTimestamp, transactions);

    const blockData: string = block.getData();

    const { calculatedHash, foundNonce }: MineBlockResultsType = blockMining.mine(blockData, target, hashCreation);

    block.setHash(calculatedHash);
    block.setNonce(foundNonce);

    return block;
  }
}
