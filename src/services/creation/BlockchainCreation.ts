import { Blockchain } from '../../models/Blockchain';
import { MempoolManagement } from '../management/MempoolManagement';
import { BlocksManagement } from '../management/BlocksManagement';
import { NodeManagement } from '../management/NodeManagement';
import { IBlockchain } from '../../types/blockchain.types';
import { BlockMiningType, IBlock } from '../../types/block.types';
import { ITransaction } from '../../types/transaction.types';
import { BlockCreationType, HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType } from '../../types/creation.types';
import { TargetManagementType } from '../../types/management.types';
import { NodeCreation } from './NodeCreation';

export class BlockchainCreation {
  static create(
    targetZeros: number,
    targetManagement: TargetManagementType,
    reward: number,
    maxTransactionsPerBlock: number,
    blockMining: BlockMiningType,
    blockCreation: BlockCreationType,
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    addressHashCreation: HashCreationType
  ): IBlockchain {
    const mempool: ITransaction[] = [];
    const blocks: IBlock[] = [];

    const node = NodeCreation.create(nodeUrlCreation, nodeAddressCreation, keyCurveOption, keyCreation, mainHashCreation, addressHashCreation);

    const nodeManagement = new NodeManagement(node);
    const mempoolManagement = new MempoolManagement(mempool);
    const blocksManagement = new BlocksManagement(blocks);

    const target = targetManagement.calculate(targetZeros);

    const genesisBlock = blockCreation.create({ height: 0, previousHash: '0'.repeat(64), transactions: [] }, target, blockMining, mainHashCreation);

    blocksManagement.addBlock(genesisBlock);

    return new Blockchain(target, reward, maxTransactionsPerBlock, node, mempool, blocks, nodeManagement, mempoolManagement, blocksManagement);
  }
}
