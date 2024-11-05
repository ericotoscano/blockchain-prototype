import { Request, Response, NextFunction } from 'express';

import { TransactionsPostRequest, TransactionsPatchRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';

import { checkNewTransactionDataFormat, checkNewTransactionFormat } from '../helpers/middlewares.helpers';
import { isValidTimestamp, isValidHex64String, isValidHex40String } from '../utils/validation.utils';

const checkNewTransactionData = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;

    const { result, message } = checkNewTransactionDataFormat(sender, recipient, amount, fee);

    if (!result) {
      res.status(400).send({
        message: 'Transaction Request Body Error',
        data: { code: 11, message },
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkNewTransaction = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { result, message } = checkNewTransactionFormat(newTransaction);

    if (!result) {
      res.status(400).send({
        message: 'Transaction Request Body Error',
        data: { code: 11, message },
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkNewTransactionAddresses = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { sender, recipient } = req.body;

    if (!isValidHex40String(sender) || !isValidHex40String(recipient)) {
      res
        .status(400)
        .send({ message: 'Transaction Request Body Error', data: { code: 10, message: 'The transaction sender address or the transaction recipient address is not a valid hex 40 string.' } });
      return;
    }

    if (sender === recipient) {
      res.status(400).send({ message: 'Transaction Request Body Error', data: { code: 10, message: 'The transaction sender address and the transaction recipient address are the same.' } });
      return;
    }
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkNewTransactionValues = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { amount, fee } = req.body;

    if (amount < 0 || fee < 0) {
      res.status(400).send({ message: 'Transaction Request Body Error', data: { code: 10, message: 'The transaction amount or the transaction fee is a negative number.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkNewTransactionStatus = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { status } = newTransaction;

    if (!status || status !== 'Pending') {
      res.status(400).send({ message: 'Transaction Request Body Error', data: { code: 10, message: "The transaction status was not provided or is not valid(should be 'Pending')." } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkNewTransactionTimestamp = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { timestamp } = newTransaction;

    if (!timestamp || !isValidTimestamp(timestamp)) {
      res.status(400).send({ message: 'Transaction Request Body Error', data: { code: 10, message: 'The transaction timestamp was not provided or is not valid.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkNewTransactionTxId = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { txId } = newTransaction;

    if (!txId || !isValidHex64String(txId)) {
      res.status(400).send({ message: 'Transaction Request Body Error', data: { code: 10, message: 'The transaction txId was not provided or is not valid.' } });
      return;
    }

    if (!global.blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== txId)) {
      res.status(400).send({ message: 'Transaction Request Body Error', data: { code: 10, message: 'The transaction is already on the blockchain mempool.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

export default {
  checkNewTransactionData,
  checkNewTransaction,
  checkNewTransactionAddresses,
  checkNewTransactionValues,
  checkNewTransactionStatus,
  checkNewTransactionTimestamp,
  checkNewTransactionTxId,
};
