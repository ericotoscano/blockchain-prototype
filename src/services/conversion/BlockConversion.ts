import { BlockMiningType, IBlock } from '../../types/block.types';
import { IBlockchain } from '../../types/blockchain.types';
import { TransactionConversionType } from '../../types/conversion.types';
import { HashCreationType, RewardTransactionCreationType, TransactionIdCreationType } from '../../types/creation.types';
import { BlockDTO, TransactionDTO } from '../../types/dto.types';
import { ITransaction, TransactionCalculationType } from '../../types/transaction.types';
import { BlockCreation } from '../creation/BlockCreation';
import { GlobalManagement } from '../management/GlobalManagement';

export class BlockConversion {
  static convertToClass(
    blockDTO: BlockDTO,
    dependencies: {
      transactionConversion: TransactionConversionType;
      transactionCalculation: TransactionCalculationType;
      transactionIdCreation: TransactionIdCreationType;
      rewardTransactionCreation: RewardTransactionCreationType;
      blockMining: BlockMiningType;
      hashCreation: HashCreationType;
    }
  ): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = blockDTO;
    const { transactionConversion, transactionIdCreation, hashCreation } = dependencies;

    const creationDependencies = { hashCreation, transactionIdCreation };

    const convertedTransactions: ITransaction[] = transactionConversion.convertAllToClass(transactions, creationDependencies);

    const { target }: IBlockchain = GlobalManagement.getBlockchain();

    return BlockCreation.create(height, previousHash, convertedTransactions, target, dependencies, nonce, hash, timestamp);
  }

  static convertAllToClass(
    blocksDTO: BlockDTO[],
    dependencies: {
      transactionConversion: TransactionConversionType;
      transactionCalculation: TransactionCalculationType;
      transactionIdCreation: TransactionIdCreationType;
      rewardTransactionCreation: RewardTransactionCreationType;
      blockMining: BlockMiningType;
      hashCreation: HashCreationType;
    }
  ): IBlock[] {
    const blocks: IBlock[] = [];

    for (const block of blocksDTO) {
      blocks.push(BlockConversion.convertToClass(block, dependencies));
    }

    return blocks;
  }

  static convertToDTO(block: IBlock, transactionConversion: TransactionConversionType): BlockDTO {
    const { transactions } = block;

    const convertedTransactions: TransactionDTO[] = transactionConversion.convertAllToDTO(transactions);

    return { height: block.height, nonce: block.nonce, hash: block.hash, previousHash: block.previousHash, timestamp: block.timestamp, transactions: convertedTransactions };
  }

  static convertAllToDTO(blocks: IBlock[], transactionConversion: TransactionConversionType): BlockDTO[] {
    const blocksDTO: BlockDTO[] = [];

    for (const block of blocks) {
      blocksDTO.push(BlockConversion.convertToDTO(block, transactionConversion));
    }

    return blocksDTO;
  }
}
