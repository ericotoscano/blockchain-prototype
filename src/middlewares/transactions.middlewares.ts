import { Request, Response, NextFunction } from 'express';

import { CreateNextBlockRequest, SendTransactionToMempoolRequest, RegisterTransactionInMempoolRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { isValidTimestamp, isValidHexString } from '../utils/time.utils';

const validatePendingTransactions = async (req: Request, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { blockchain } = global;

    if (!blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      res.status(404).send({ message: 'There are no pending transactions on mempool.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateAddressesForANewTransaction = async (
  req: Request<{}, {}, SendTransactionToMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { sender, recipient } = req.body;

    if (!sender || !recipient) {
      res.status(400).send({ message: 'Some of the addresses (sender and recipient) sent are not valid or were not provided.' });
    }

    //quando introduzir endereços, não esquecer de validar os endereços em 'sender' e 'recipient'

    if (sender === recipient) {
      res.status(400).send({ message: 'The sender and the recipient addresses sent are the same.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateValuesForANewTransaction = async (
  req: Request<{}, {}, SendTransactionToMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { amount, fee } = req.body;

    if (!amount || amount < 0) {
      res.status(400).send({ message: 'The amount sent is not valid or was not provided.' });
    }

    if (!fee || fee < 0) {
      res.status(400).send({ message: 'The fee sent is not valid or was not provided.' });
    }

    //amount e fee são valores que batem com o saldo do endereço do sender

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { transaction } = req.body;

    if (!transaction) {
      res.status(400).send({ message: 'The transaction was not provided.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateAddressesOfTransaction = async (
  req: Request<{}, {}, RegisterTransactionInMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { transaction } = req.body;

    const { sender, recipient } = transaction;

    if (!sender || !recipient) {
      res.status(400).send({ message: 'Some of the addresses (sender and recipient) in the sent transaction are not valid or were not provided.' });
      return;
    }

    //quando introduzir endereços, não esquecer de validar os endereços em 'sender' e 'recipient'

    if (sender === recipient) {
      res.status(400).send({ message: 'The sender and the recipient addresses in the sent transaction are the same.' });
      return;
    }
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateValuesOfTransaction = async (
  req: Request<{}, {}, RegisterTransactionInMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { transaction } = req.body;

    const { amount, fee } = transaction;

    if (!amount || amount < 0) {
      res.status(400).send({ message: 'The amount in the sent transaction is not valid or was not provided.' });
      return;
    }

    if (!fee || fee < 0) {
      res.status(400).send({ message: 'The fee in the sent transaction is not valid or was not provided.' });
      return;
    }

    //amount e fee são valores que batem com o saldo do endereço do sender

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateStatusOfTransaction = async (
  req: Request<{}, {}, RegisterTransactionInMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { transaction } = req.body;

    const { status } = transaction;

    if (!status) {
      res.status(400).send({ message: 'The status of the sent transaction was not provided.' });
      return;
    }

    if (status !== 'Pending') {
      res.status(400).send({ message: "The status of the sent transaction is not valid (must be 'Pending')." });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateTimestampOfTransaction = async (
  req: Request<{}, {}, RegisterTransactionInMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { transaction } = req.body;

    const { timestamp } = transaction;

    if (!timestamp) {
      res.status(400).send({ message: 'The timestamp of the sent transaction was not provided.' });
      return;
    }

    if (!isValidTimestamp(timestamp)) {
      res.status(400).send({ message: 'The timestamp of the sent transaction is not valid.' });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateTxIdOfTransaction = async (
  req: Request<{}, {}, RegisterTransactionInMempoolRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { transaction } = req.body;
    const { txId } = transaction;
    const { blockchain } = global;

    if (!txId) {
      res.status(400).send({ message: 'The txId of the sent transaction was not provided.' });
      return;
    }

    if (!isValidHexString(txId)) {
      res.status(400).send({ message: 'The txId of the sent transaction is not valid.' });
      return;
    }

    if (!blockchain.checkTransactionIsNotInMempool(transaction)) {
      res.status(400).send({
        message: 'The sent transaction is already on the mempool.',
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateTransactionsPerBlock = async (req: Request<{}, {}, CreateNextBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlockTransactions } = req.body;
    const { blockchain } = global;

    if (nextBlockTransactions.length !== blockchain.maxTransactionsPerBlock - 1) {
      res.status(400).send({
        message: "Considering the miner's reward transaction, the number of transactions sent must be equal recipient the maximum number of transactions per block minus one.",
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

export default {
  validatePendingTransactions,
  validateAddressesForANewTransaction,
  validateValuesForANewTransaction,
  validateTransaction,
  validateAddressesOfTransaction,
  validateValuesOfTransaction,
  validateStatusOfTransaction,
  validateTimestampOfTransaction,
  validateTxIdOfTransaction,
  validateTransactionsPerBlock,
};
