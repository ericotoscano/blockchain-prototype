import { Request, Response } from 'express';

import '../global';

import { MineNextBlockRequest, CreateTransactionRequest } from '../types/request.types';

import { Transactions } from '../models/Transactions';

const getBlockchain = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    res.status(200).send({
      message: 'Blockchain found.',
      data: {
        blockchain,
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

const mineNextBlock = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nextBlockTransactions }: MineNextBlockRequest = req.body;
    const { blockchain } = global;

    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    res.status(201).send({
      message: 'Block mined.',
      data: {
        block: nextBlock,
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

const getAllPendingTransactions = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      return res.status(400).send({ message: 'There are no pending transactions on mempool.' });
    }

    const pendingTransactions = blockchain.getPendingTransactions();

    res.status(200).send({
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

const createTransaction = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to, amount, fee }: CreateTransactionRequest = req.body;
    const { blockchain } = global;

    const transaction = new Transactions(from, to, amount, fee);

    blockchain.addTransactionToMempool(transaction);

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

export default { getBlockchain, mineNextBlock, getAllPendingTransactions, createTransaction };
