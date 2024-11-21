import { Block } from '../../../entities/block/Block';

import { BlockDataType, IBlock, NewBlockInputType } from '../../../types/block.types';
import { ITransaction, TransactionIdCreationType, TransactionDataType } from '../../../types/transaction.types';
import { TransactionDataConversionType } from '../../../types/conversion.types';
import { HashCreationType } from '../../../types/crypto.types';

export class BlockDataConversion {
  static convert(data: BlockDataType, hashCreation: HashCreationType, transactionIdCreation: TransactionIdCreationType, transactionDataConversion: TransactionDataConversionType): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = data;

    const convertedTransactions: ITransaction[] = transactions.map((transaction) => {
      return transactionDataConversion.convert(transaction, hashCreation, transactionIdCreation);
    });

    const input: NewBlockInputType = { height, previousHash, transactions: convertedTransactions };

    return new Block(input, nonce, hash, timestamp);
  }
}
