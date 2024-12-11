import { Blockchain } from '../../../domain/entities/Blockchain';
import { MempoolManagement } from '../mempool/management/MempoolManagement';

import { BlocksManagement } from '../../../domain/services/BlocksService';
import { NodeManagement } from '../../node/management/NodeManagement';
import { IBlock } from '../../../domain/types/IBlock';
import { ITransaction } from '../../../domain/types/ITransaction';
import { NodeCreation } from '../../node/creation/NodeCreation';
import { KeyDependenciesType, MiningDependenciesType, NodeDependenciesType, TransactionDependenciesType } from '../../../helpers/dependencies/types/DependenciesTypes';
import { IBlockchain } from '../../../domain/types/IBlockchain';
import { BlockchainDTOInput } from '../conversion/types/BlockchainDTO';

export class BlockchainCreation {
  static create(
    blockchainDTOInput: BlockchainDTOInput,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>
  ): IBlockchain {
    const { targetZeros, reward, maxTransactionsPerBlock } = blockchainDTOInput;
    const { targetManagement, blockCreation, blockMining, hashCreation } = miningDependencies;

    const mempool: ITransaction[] = [];
    const blocks: IBlock[] = [];

    const node = NodeCreation.create(keyDependencies, nodeDependencies);

    const nodeManagement = new NodeManagement(node);
    const mempoolManagement = new MempoolManagement(mempool);
    const blocksManagement = new BlocksManagement(blocks);

    const target = targetManagement.calculate(targetZeros);

    const genesisBlock = blockCreation.create(0, '0'.repeat(64), [], target, transactionDependencies, { blockMining, hashCreation });

    blocksManagement.addBlock(genesisBlock);

    return new Blockchain(target, reward, maxTransactionsPerBlock, node, mempool, blocks, nodeManagement, mempoolManagement, blocksManagement);
  }
}
