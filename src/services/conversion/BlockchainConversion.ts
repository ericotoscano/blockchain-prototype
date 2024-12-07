import { IBlockchain } from "../../types/blockchain.types";
import {
  BlockchainConversionDependenciesType,
  KeyDependenciesType,
  MiningDependenciesType,
  NodeDependenciesType,
  TransactionDependenciesType,
} from "../../types/dependencies.types";
import {
  BlockDTO,
  CreateBlockchainDTO,
  BlockchainDTO,
  NodeDTO,
  TransactionDTO,
} from "../../types/dto.types";
import { BlockchainCreation } from "../creation/BlockchainCreation";

export class BlockchainConversion {
  static convertToClass(
    createBlockchainDTO: CreateBlockchainDTO,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionConversion" | "transactionCreation"
    >
  ): IBlockchain {
    return BlockchainCreation.create(
      createBlockchainDTO,
      nodeDependencies,
      keyDependencies,
      miningDependencies,
      transactionDependencies
    );
  }

  static convertToDTO(
    blockchain: IBlockchain,
    blockchainConversionDependencies: BlockchainConversionDependenciesType
  ): BlockchainDTO {
    const { target, reward, maxTransactionsPerBlock, node, mempool, blocks } =
      blockchain;

    const { nodeConversion, blockConversion, transactionConversion } =
      blockchainConversionDependencies;

    const nodeDTO: NodeDTO = nodeConversion.convertToDTO(node);

    const mempoolTransactionsDTO: TransactionDTO[] =
      transactionConversion.convertAllToDTO(mempool);

    const blocksDTO: BlockDTO[] = blockConversion.convertAllToDTO(
      blocks,
      transactionConversion
    );

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
