import { BlockDTO, BlockchainDTO, NodeDTO, TransactionDTO } from '../../types/dto.types';

export class BlockchainDTOCreation {
  static createBlockchainDTO(): BlockchainDTO {
    const nodeDTO: NodeDTO = nodeConversion.convertToDTO(node);

    const mempoolTransactionsDTO: TransactionDTO[] = transactionConversion.convertAllToDTO(mempool);

    const blocksDTO: BlockDTO[] = blockConversion.convertAllToDTO(blocks, transactionConversion);

    return { target, reward, maxTransactionsPerBlock, node: nodeDTO, mempool: mempoolTransactionsDTO, blocks: blocksDTO };
  }
}
