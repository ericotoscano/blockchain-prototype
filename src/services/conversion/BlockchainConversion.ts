import { IBlockchain } from '../../types/blockchain.types';
import { BlockConversionType, NodeConversionType, TransactionConversionType } from '../../types/conversion.types';
import { CreateBlockchainDependenciesType } from '../../types/dependencies.types';
import { BlockDTO, CreateBlockchainDTO, BlockchainDTO, NodeDTO, TransactionDTO } from '../../types/dto.types';
import { BlockchainCreation } from '../creation/BlockchainCreation';

export class BlockchainConversion {
  static convertToClass(createBlockchainDTO: CreateBlockchainDTO, dependencies: CreateBlockchainDependenciesType): IBlockchain {
    const { targetZeros, reward, maxTransactionsPerBlock } = createBlockchainDTO;

    return BlockchainCreation.create(targetZeros, reward, maxTransactionsPerBlock, dependencies);
  }
//ARRUMAR ESSE NEGOCIO DE DEPENDENCIES
  static convertToDTO(
    blockchain: IBlockchain,
    dependencies: { nodeConversion: NodeConversionType; blockConversion: BlockConversionType; transactionConversion: TransactionConversionType }
  ): BlockchainDTO {
    const { target, reward, maxTransactionsPerBlock, node, mempool, blocks } = blockchain;
    const { nodeConversion, blockConversion, transactionConversion } = dependencies;

    const nodeDTO: NodeDTO = nodeConversion.convertToDTO(node);

    const mempoolTransactionsDTO: TransactionDTO[] = transactionConversion.convertAllToDTO(mempool);

    const blocksDTO: BlockDTO[] = blockConversion.convertAllToDTO(blocks, transactionConversion);

    return { target, reward, maxTransactionsPerBlock, node: nodeDTO, mempool: mempoolTransactionsDTO, blocks: blocksDTO };
  }
}
