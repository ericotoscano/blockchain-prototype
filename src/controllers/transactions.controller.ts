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
          timestamp: transaction.timestamp,
          from: transaction.from,
          to: transaction.to,
          amount: transaction.amount,
          fee: transaction.fee,
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

export default { create };
