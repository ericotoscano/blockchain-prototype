import { Blockchain } from '../../models/Blockchain';
import { MempoolManagement } from '../management/MempoolManagement';
import { BlocksManagement } from '../management/BlocksManagement';
import { NodeManagement } from '../management/NodeManagement';
import { BlockchainInputType, IBlockchain } from '../../types/blockchain.types';
import { BlockMiningType, IBlock } from '../../types/block.types';
import { INode } from '../../types/node.types';
import { ITransaction } from '../../types/transaction.types';
import { BlockCreationType, HashCreationType } from '../../types/creation.types';
import { TargetManagementType } from '../../types/management.types';

export class BlockchainCreation {
  static create(
    input: BlockchainInputType,
    node: INode,
    targetManagement: TargetManagementType,
    hashCreation: HashCreationType,
    blockMining: BlockMiningType,
    blockCreation: BlockCreationType
  ): IBlockchain {
    const mempool: ITransaction[] = [];
    const blocks: IBlock[] = [];

    const nodeManagement = new NodeManagement(node);
    const mempoolManagement = new MempoolManagement(mempool);
    const blocksManagement = new BlocksManagement(blocks);

    const target = targetManagement.calculate(input.targetZeros);

    const genesisBlock = blockCreation.create({ height: 0, previousHash: '0'.repeat(64), transactions: [] }, target, blockMining, hashCreation);

    blocksManagement.addBlock(genesisBlock);

    return new Blockchain(input, node, mempool, blocks, target, nodeManagement, mempoolManagement, blocksManagement);
  }
}
