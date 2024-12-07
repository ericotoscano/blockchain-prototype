import { IBlock } from "../../types/block.types";
import { IBlockchain } from "../../types/blockchain.types";
import {
  MiningDependenciesType,
  TransactionDependenciesType,
} from "../../types/dependencies.types";
import { BlockDTO } from "../../types/dto.types";
import { BlockConversion } from "../conversion/BlockConversion";

export class BlockchainManagement {
  static getBlockchain(): IBlockchain {
    return global.blockchain;
  }

  static setBlockchain(blockchain: IBlockchain): void {
    global.blockchain = blockchain;
  }

  static addBlock(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionCreation"
    >,
    miningDependencies: Omit<
      MiningDependenciesType,
      "targetManagement" | "blockCreation"
    >
  ): void {
    const block: IBlock = BlockConversion.convertToClass(
      blockDTO,
      transactionDependencies,
      miningDependencies
    );

    global.blockchain.blocksManagement.addBlock(block);
  }
}
