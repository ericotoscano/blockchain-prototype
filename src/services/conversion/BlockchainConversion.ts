import { IBlockchain } from '../../types/blockchain.types';
import { BlockchainConversionDependenciesType, CreateBlockchainDependenciesType } from '../../types/dependencies.types';
import { BlockDTO, CreateBlockchainDTO, BlockchainDTO, NodeDTO, TransactionDTO } from '../../types/dto.types';
import { BlockchainCreation } from '../creation/BlockchainCreation';

export class BlockchainConversion {
  static convertToClass(createBlockchainDTO: CreateBlockchainDTO, createBlockchainDependencies: CreateBlockchainDependenciesType): IBlockchain {
    const { targetZeros, reward, maxTransactionsPerBlock } = createBlockchainDTO;

    return BlockchainCreation.create(targetZeros, reward, maxTransactionsPerBlock, createBlockchainDependencies);
  }

  static convertToDTO(blockchain: IBlockchain, blockchainConversionDependencies: BlockchainConversionDependenciesType): BlockchainDTO {
    const { target, reward, maxTransactionsPerBlock, node, mempool, blocks } = blockchain;
    
    const { nodeConversion, blockConversion, transactionConversion } = blockchainConversionDependencies;

    const nodeDTO: NodeDTO = nodeConversion.convertToDTO(node);
    
    const mempoolTransactionsDTO: TransactionDTO[] = transactionConversion.convertAllToDTO(mempool);
    
    const blocksDTO: BlockDTO[] = blockConversion.convertAllToDTO(blocks, transactionConversion);

    return { target, reward, maxTransactionsPerBlock, node: nodeDTO, mempool: mempoolTransactionsDTO, blocks: blocksDTO };
  }
}
