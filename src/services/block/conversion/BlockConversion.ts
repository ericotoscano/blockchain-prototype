import { IBlock } from '../../../domain/types/IBlock';
import { ITransaction } from '../../../domain/types/ITransaction';
import { MiningDependenciesType, TransactionDependenciesType } from '../../../shared/helpers/DependenciesTypes';
import { BlockCreation } from '../creation/BlockCreation';
import { BlockchainManagement } from '../../blockchain/management/BlockchainManagement';
import { IBlockchain } from '../../../domain/types/IBlockchain';
import { TransactionConversionType } from '../../transaction/conversion/types/TransactionConversionType';
import { TransactionDTO } from '../../transaction/conversion/types/TransactionDTO';
import { BlockDTO } from './types/BlockDTO';

export class BlockConversion {
  static convertToClass(
    blockDTO: BlockDTO,
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = blockDTO;
    const { transactionConversion, transactionIdCreation } = transactionDependencies;
    const { hashCreation } = miningDependencies;

    const convertedTransactions: ITransaction[] = transactionConversion.convertAllToClass(transactions, transactionIdCreation, hashCreation);

    const { target }: IBlockchain = BlockchainManagement.getBlockchain();

    return BlockCreation.create(height, previousHash, convertedTransactions, target, transactionDependencies, miningDependencies, nonce, hash, timestamp);
  }

  static convertAllToClass(
    blocksDTO: BlockDTO[],
    transactionDependencies: Omit<TransactionDependenciesType, 'transactionCreation'>,
    miningDependencies: Omit<MiningDependenciesType, 'targetManagement' | 'blockCreation'>
  ): IBlock[] {
    const blocks: IBlock[] = [];

    for (const block of blocksDTO) {
      blocks.push(BlockConversion.convertToClass(block, transactionDependencies, miningDependencies));
    }

    return blocks;
  }

  static convertToDTO(block: IBlock, transactionConversion: TransactionConversionType): BlockDTO {
    const { transactions } = block;

    const convertedTransactions: TransactionDTO[] = transactionConversion.convertAllToDTO(transactions);

    return {
      height: block.height,
      nonce: block.nonce,
      hash: block.hash,
      previousHash: block.previousHash,
      timestamp: block.timestamp,
      transactions: convertedTransactions,
    };
  }

  static convertAllToDTO(blocks: IBlock[], transactionConversion: TransactionConversionType): BlockDTO[] {
    const blocksDTO: BlockDTO[] = [];

    for (const block of blocks) {
      blocksDTO.push(BlockConversion.convertToDTO(block, transactionConversion));
    }

    return blocksDTO;
  }
}
