import { IBlockchain } from '../../../types/BlockchainType';
import { NodeConversionType, BlockConversionType, TransactionConversionType } from '../../../types/conversion.types';
import { KeyDependenciesType, MiningDependenciesType, NodeDependenciesType, TransactionDependenciesType } from '../../../types/dependencies.types';
import { BlockDTO, BlockchainDTOInput, BlockchainDTOOutput, NodeDTO, TransactionDTO } from '../../../types/dto.types';
import { BlockchainCreation } from '../creation/BlockchainCreation';

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
