import { Block } from '../../../entities/block/Block';
import { Transaction } from '../../../entities/transaction/Transaction';
import { BlockDataType, IBlock } from '../../../types/block.types';
import { ITransaction, TransactionIdCreationType, TransactionDataType } from '../../../types/transaction.types';
import { TransactionDataConversionType } from '../../../types/helpers.types';

export class BlockDataConversion {
  static convert(data: BlockDataType, transactionDataConversion: TransactionDataConversionType, transactionIdCreation: TransactionIdCreationType): IBlock {
    const { height, nonce, hash, previousHash, timestamp, transactions } = data;

    const convertedTransactions: ITransaction[] = transactions.map((transaction) => {
      return transactionDataConversion.convert(transaction, transactionIdCreation);
    });

    return new Block({ height, previousHash, transactions: convertedTransactions }, nonce, hash, timestamp);
  }
}

export class TransactionDataConversion {
  static convert(data: TransactionDataType, transactionIdCreation: TransactionIdCreationType): ITransaction {
    const { sender, recipient, amount, fee, status, timestamp, txId } = data;

    return new Transaction({ sender, recipient, amount, fee }, transactionIdCreation, txId, status, timestamp);
  }
}
