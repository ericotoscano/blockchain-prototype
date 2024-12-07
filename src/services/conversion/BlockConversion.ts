import { IBlockchain } from "../../types/blockchain.types";
import { IBlock } from "../../types/block.types";
import { ITransaction } from "../../types/transaction.types";
import { BlockDTO, TransactionDTO } from "../../types/dto.types";
import { TransactionConversionType } from "../../types/conversion.types";
import {
  MiningDependenciesType,
  TransactionDependenciesType,
} from "../../types/dependencies.types";
import { BlockCreation } from "../creation/BlockCreation";
import { GlobalManagement } from "../management/GlobalManagement";

export class BlockConversion {
  static convertToClass(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionCreation"
    >,
    miningDependencies: Omit<
      MiningDependenciesType,
      "targetManagement" | "blockCreation"
    >
  ): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } =
      blockDTO;
    const { transactionConversion, transactionIdCreation } =
      transactionDependencies;
    const { hashCreation } = miningDependencies;

    const convertedTransactions: ITransaction[] =
      transactionConversion.convertAllToClass(
        transactions,
        transactionIdCreation,
        hashCreation
      );

    const { target }: IBlockchain = GlobalManagement.getBlockchain();

    return BlockCreation.create(
      height,
      previousHash,
      convertedTransactions,
      target,
      transactionDependencies,
      miningDependencies,
      nonce,
      hash,
      timestamp
    );
  }

  static convertAllToClass(
    blocksDTO: BlockDTO[],
    miningDependencies: Omit<
      MiningDependenciesType,
      "targetManagement" | "blockCreation"
    >,
    transactionDependencies: Omit<
      TransactionDependenciesType,
      "transactionCreation"
    >
  ): IBlock[] {
    const blocks: IBlock[] = [];

    for (const block of blocksDTO) {
      blocks.push(
        BlockConversion.convertToClass(
          block,
          transactionDependencies,
          miningDependencies
        )
      );
    }

    return blocks;
  }

  static convertToDTO(
    block: IBlock,
    transactionConversion: TransactionConversionType
  ): BlockDTO {
    const { transactions } = block;

    const convertedTransactions: TransactionDTO[] =
      transactionConversion.convertAllToDTO(transactions);

    return {
      height: block.height,
      nonce: block.nonce,
      hash: block.hash,
      previousHash: block.previousHash,
      timestamp: block.timestamp,
      transactions: convertedTransactions,
    };
  }

  static convertAllToDTO(
    blocks: IBlock[],
    transactionConversion: TransactionConversionType
  ): BlockDTO[] {
    const blocksDTO: BlockDTO[] = [];

    for (const block of blocks) {
      blocksDTO.push(
        BlockConversion.convertToDTO(block, transactionConversion)
      );
    }

    return blocksDTO;
  }
}
