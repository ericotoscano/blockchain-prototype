import { ITransaction } from '../../domain/types/ITransaction';
import { SubmitTransactionOutputDTO } from '../dtos/transaction/SubmitTransactionOutputDTO';

export class TransactionMapper {
  /*   static toDomain(transactionDTO: TransactionDTO, transactionIdCreation: TransactionIdCreationType, hashCreation: HashCreationType): ITransaction {
    const { sender, recipient, amount, fee, txId, status, timestamp } = transactionDTO;

    return TransactionCreation.create(sender, recipient, amount, fee, transactionIdCreation, hashCreation, txId, status, timestamp);
  } */

  // Converte uma lista de DTOs para uma lista de entidades de domínio
  /*   static toDomainList(transactionsDTO: TransactionDTO[], transactionIdCreation: TransactionIdCreationType, hashCreation: HashCreationType): ITransaction[] {
    return transactionsDTO.map((transaction) => TransactionConversion.toDomain(transaction, transactionIdCreation, hashCreation));
  }*/

  // Converte uma entidade de domínio para DTO
  static toSubmitTransactionOutputDTO(transaction: ITransaction): SubmitTransactionOutputDTO {
    return {
      sender: transaction.sender,
      recipient: transaction.recipient,
      amount: transaction.amount,
      fee: transaction.fee,
      txId: transaction.txId.getValue(),
      status: transaction.getStatus(),
      timestamp: transaction.timestamp.getValue(),
    };
  }

  // Converte uma lista de entidades de domínio para uma lista de DTOs
  /*   static toDTOList(transactions: ITransaction[]): TransactionDTO[] {
    return transactions.map((transaction) => TransactionConversion.toDTO(transaction));
  } */
}
