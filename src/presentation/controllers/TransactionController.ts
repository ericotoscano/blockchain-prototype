import { Request, Response } from 'express';
import axios from 'axios';
import { ISubmitTransactionUseCase } from '../../application/use-cases/submit-transaction/ISubmitTransactionUseCase';
import { SubmitTransactionInputDTO } from '../../application/dtos/transaction/SubmitTransactionInputDTO';
import { SubmitTransactionOutputDTO } from '../../application/dtos/transaction/SubmitTransactionOutputDTO';
import { ITransaction } from '../../domain/types/ITransaction';
import { TransactionMapper } from '../../application/mappers/TransactionMapper';

export class TransactionController {
  constructor(private readonly submitTransactionUseCase: ISubmitTransactionUseCase) {}

  submitTransaction(req: Request<{}, {}, SubmitTransactionInputDTO>, res: Response): Response {
    try {
      const { sender, recipient, amount, fee }: SubmitTransactionInputDTO = req.body;

      const transaction: ITransaction = this.submitTransactionUseCase.execute(sender, recipient, amount, fee);

      const submitTransactionOutputDTO: SubmitTransactionOutputDTO = TransactionMapper.toSubmitTransactionOutputDTO(transaction);

      return res.status(201).json({
        type: 'Submit Transaction',
        code: 1100,
        message: 'Transaction submitted and added to the blockchain mempool.',
        data: {
          submitTransactionOutputDTO,
        },
      });
    } catch (error) {
      return res.status(500).json({
        type: 'Server Error',
        code: 9999,
        message: 'An error occurred while processing the transaction.',
        data: null,
      });
    }
  }
}

/* const sendNewTransaction = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>): Promise<void> => {
  try {
    const { newPreTransaction } = req.body;
    const { sender, recipient, amount, fee } = newPreTransaction;

    const newTransaction = new Transaction(sender, recipient, amount, fee);

    const { txId } = newTransaction;

    if (!blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== txId)) {
      res.status(400).send({
        message: 'New Transaction Error',
        data: {
          code: 40,
          message: 'The new transaction is already on the blockchain mempool.',
        },
      });
      return;
    }

    blockchain.addTransactionToMempool(newTransaction);

    const addTransactionPromises: Promise<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const addTransactionPromise = axios
        .patch<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>(`${connectedNode}/blockchain/transactions`, { newTransaction })
        .then((response) => response.data);

      addTransactionPromises.push(addTransactionPromise);
    }

    await Promise.all(addTransactionPromises);

    res.status(201).send({
      message: "The new transaction was added in the node's mempool and sent to the connected node's mempool.",
      data: {
        newTransaction,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

const addNewTransaction = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    blockchain.addTransactionToMempool(newTransaction);

    res.status(200).send({
      message: 'New transaction added.',
      data: {
        newTransaction,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

export default {
  sendNewTransaction,
  addNewTransaction,
};
 */