import { Block } from '../../../entities/block/Block';
import { IBlock } from '../../../interfaces/block/IBlock';
import { ITransactionDataConversion } from '../../../interfaces/conversion/ITransactionDataConversion';
import { ITransaction } from '../../../interfaces/transactions/ITransaction';

import { BlockDataType } from '../../../types/block/BlockDataType';
import { BlockInputType } from '../../../types/block/BlockInputType';

export class BlockDataConversion {
  static convert(data: BlockDataType, transactionDataConversion: ITransactionDataConversion): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = data;

    const convertedTransactions: ITransaction[] = transactionDataConversion.convertAll(transactions);

    const input: BlockInputType = { height, previousHash, transactions: convertedTransactions };

    return new Block(input, nonce, hash, timestamp);
  }
}
