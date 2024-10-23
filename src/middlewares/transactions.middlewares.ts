import { Request, Response, NextFunction } from 'express';

import { MineNextBlockRequest, RegisterTransactionInMempoolRequest } from '../types/request.types';

const validatePendingTransactions = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      return res.status(200).send({ message: 'There are no pending transactions on mempool.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateTransactionsPerBlock = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { nextBlockTransactions }: MineNextBlockRequest = req.body;
    const { blockchain } = global;

    if (nextBlockTransactions.length !== blockchain.maxTransactionsPerBlock - 1) {
      return res.status(200).send({
        message: "Considering the miner's reward transaction, the number of transactions sent must be equal to the maximum number of transactions per block minus one.",
        data: { maxTransacionsPerBlock: blockchain.maxTransactionsPerBlock },
      });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateNewTransactionRegistration = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction }: RegisterTransactionInMempoolRequest = req.body;
    const { blockchain } = global;

    if (!blockchain.checkTransactionId(transaction)) {
      return res.status(200).send({
        message: 'This transaction is already on the mempool of the current node.',
        data: { mempool: blockchain.mempool },
      });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default { validatePendingTransactions, validateTransactionsPerBlock, validateNewTransactionRegistration };
