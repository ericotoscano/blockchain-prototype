import { Block } from '../../models/Block';
import { BlockInputType, IBlock } from '../../types/block.types';
import { ITransactionDataConversion } from '../../types/conversion.types';
import { BlockDTO } from '../../types/dto.types';
import { ITransaction } from '../../types/transaction.types';

export class BlockDataConversion {
  static convert(data: BlockDTO, transactionDataConversion: ITransactionDataConversion): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = data;

    const convertedTransactions: ITransaction[] = transactionDataConversion.convertAll(transactions);

    const input: BlockInputType = { height, previousHash, transactions: convertedTransactions };

    return new Block(input, nonce, hash, timestamp);
  }
}
