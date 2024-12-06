import { Blockchain } from '../../models/Blockchain';
import { MempoolManagement } from '../management/MempoolManagement';
import { BlocksManagement } from '../management/BlocksManagement';
import { NodeManagement } from '../management/NodeManagement';
import { IBlockchain } from '../../types/blockchain.types';
import { IBlock } from '../../types/block.types';
import { ITransaction } from '../../types/transaction.types';
import { NodeCreation } from './NodeCreation';
import { CreateBlockchainDependenciesType } from '../../types/dependencies.types';

export class BlockchainCreation {
  static create(targetZeros: number, reward: number, maxTransactionsPerBlock: number, dependencies: CreateBlockchainDependenciesType): IBlockchain {
    const {
      targetManagement,
      keyCurveOption,
      keyCreation,
      mainHashCreation,
      secondHashCreation,
      nodeUrlCreation,
      nodeAddressCreation,
      blockMining,
      blockCreation,
      transactionCalculation,
      transactionIdCreation,
      rewardTransactionCreation,
    } = dependencies;

    const mempool: ITransaction[] = [];
    const blocks: IBlock[] = [];

    const node = NodeCreation.create(nodeUrlCreation, nodeAddressCreation, keyCurveOption, keyCreation, mainHashCreation, secondHashCreation);

    const nodeManagement = new NodeManagement(node);
    const mempoolManagement = new MempoolManagement(mempool);
    const blocksManagement = new BlocksManagement(blocks);

    const target = targetManagement.calculate(targetZeros);

    const genesisBlock = blockCreation.create(0, '0'.repeat(64), [], transactionCalculation, transactionIdCreation, rewardTransactionCreation, target, blockMining, mainHashCreation);

    blocksManagement.addBlock(genesisBlock);

    return new Blockchain(target, reward, maxTransactionsPerBlock, node, mempool, blocks, nodeManagement, mempoolManagement, blocksManagement);
  }
}
