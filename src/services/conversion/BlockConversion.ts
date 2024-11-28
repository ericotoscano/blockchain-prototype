import { IBlock } from '../../types/block.types';
import { TransactionConversionType } from '../../types/conversion.types';
import { BlockDTO, TransactionDTO } from '../../types/dto.types';
import { ITransaction } from '../../types/transaction.types';
import { Sha256HashCreation } from '../../utils/creation/Sha256HashCreation';
import { BlockCreation } from '../creation/BlockCreation';
import { GlobalManagement } from '../management/GlobalManagement';
import { BlockMining } from '../mining/BlockMining';

export class BlockConversion {
  static convertToClass(blockDTO: BlockDTO, transactionConversion: TransactionConversionType): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = blockDTO;

    const convertedTransactions: ITransaction[] = transactionConversion.convertAllToClasses(transactions);

    const target: string = GlobalManagement.getBlockchain().getTarget();

    return BlockCreation.create(height, previousHash, convertedTransactions, target, BlockMining, Sha256HashCreation, nonce, hash, timestamp);
  }

  static convertAllToClasses(blocksDTO: BlockDTO[], transactionConversion: TransactionConversionType): IBlock[] {
    const blocks: IBlock[] = [];

    for (const block of blocksDTO) {
      blocks.push(BlockConversion.convertToClass(block, transactionConversion));
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
