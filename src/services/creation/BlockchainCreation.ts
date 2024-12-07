import { Blockchain } from "../../models/Blockchain";
import { MempoolManagement } from "../management/MempoolManagement";
import { BlocksManagement } from "../management/BlocksManagement";
import { NodeManagement } from "../management/NodeManagement";
import { IBlockchain } from "../../types/blockchain.types";
import { IBlock } from "../../types/block.types";
import { ITransaction } from "../../types/transaction.types";
import { NodeCreation } from "./NodeCreation";
import {
  KeyDependenciesType,
  MiningDependenciesType,
  NodeDependenciesType,
  TransactionDependenciesType,
} from "../../types/dependencies.types";
import { CreateBlockchainDTO } from "../../types/dto.types";

export class BlockchainCreation {
  static create(
    createBlockchainDTO: CreateBlockchainDTO,
    nodeDependencies: NodeDependenciesType,
    keyDependencies: KeyDependenciesType,
    miningDependencies: MiningDependenciesType,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionConversion" | "transactionCreation"
    >
  ): IBlockchain {
    const { targetZeros, reward, maxTransactionsPerBlock } =
      createBlockchainDTO;
    const { targetManagement, blockCreation, blockMining, hashCreation } =
      miningDependencies;

    const mempool: ITransaction[] = [];
    const blocks: IBlock[] = [];

    const node = NodeCreation.create(keyDependencies, nodeDependencies);

    const nodeManagement = new NodeManagement(node);
    const mempoolManagement = new MempoolManagement(mempool);
    const blocksManagement = new BlocksManagement(blocks);

    const target = targetManagement.calculate(targetZeros);

    const genesisBlock = blockCreation.create(
      0,
      "0".repeat(64),
      [],
      target,
      transactionDependencies,
      { blockMining, hashCreation }
    );

    blocksManagement.addBlock(genesisBlock);

    return new Blockchain(
      target,
      reward,
      maxTransactionsPerBlock,
      node,
      mempool,
      blocks,
      nodeManagement,
      mempoolManagement,
      blocksManagement
    );
  }
}
