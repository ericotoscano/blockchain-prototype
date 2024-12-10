import { IBlockchain } from '../../../types/IBlockchain';
import { KeyDependenciesType, MiningDependenciesType, NodeDependenciesType, TransactionDependenciesType } from '../../../helpers/dependencies/types/DependenciesTypes';
import { BlockConversionType } from '../../block/conversion/types/BlockConversionType';
import { BlockDTO } from '../../block/conversion/types/BlockDTO';
import { NodeConversionType } from '../../node/conversion/types/NodeConversionType';
import { NodeDTO } from '../../node/conversion/types/NodeDTO';
import { TransactionConversionType } from '../../transaction/conversion/types/TransactionConversionType';
import { TransactionDTO } from '../../transaction/conversion/types/TransactionDTO';

import { BlockchainCreation } from '../creation/BlockchainCreation';
import { BlockchainDTOInput, BlockchainDTOOutput } from './types/BlockchainDTO';

export class BlockchainConversion {
  static convertToClass(
    blockchainDTOInput: BlockchainDTOInput,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionConversion' | 'transactionCreation'>
  ): IBlockchain {
    return BlockchainCreation.create(blockchainDTOInput, nodeDependencies, keyDependencies, miningDependencies, transactionDependencies);
  }

  static convertToDTO(blockchain: IBlockchain, nodeConversion: NodeConversionType, blockConversion: BlockConversionType, transactionConversion: TransactionConversionType): BlockchainDTOOutput {
    const { target, reward, maxTransactionsPerBlock, node, mempool, blocks } = blockchain;

    const nodeDTO: NodeDTO = nodeConversion.convertToDTO(node);

    const mempoolTransactionsDTO: TransactionDTO[] = transactionConversion.convertAllToDTO(mempool);

    const blocksDTO: BlockDTO[] = blockConversion.convertAllToDTO(blocks, transactionConversion);

    return {
      target,
      reward,
      maxTransactionsPerBlock,
      node: nodeDTO,
      mempool: mempoolTransactionsDTO,
      blocks: blocksDTO,
    };
  }
}
