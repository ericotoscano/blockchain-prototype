import { Request, Response } from 'express';

import '../global';

import { Transaction } from '../models/Transaction';

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to, amount, fee } = req.body;

    const transaction = new Transaction(from, to, amount, fee);

    global.blockchain.mempool.push(transaction);

    res.status(201).send({
      message: 'A new transaction was sent to mempool.',
      data: {
        transaction: {
          txId: transaction.txId,
          status: transaction.status,
          from: transaction.from,
          to: transaction.to,
          amount: transaction.amount,
          fee: transaction.fee,
          timestamp: transaction.timestamp,
        },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const getAllPending = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!global.blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      return res.status(400).send({ message: 'There are no pending transactions on mempool.' });
    }

    const pendingTransactions = global.blockchain.mempool.filter((transaction) => transaction.status === 'Pending').map((transaction) => ({ ...transaction }));

    res.status(201).send({
      message: 'There are pending transactions on mempool.',
      data: {
        pendingTransactions,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default { create, getAllPending };
