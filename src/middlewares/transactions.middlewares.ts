import { Request, Response, NextFunction } from 'express';

import { Transactions } from '../models/Transactions';

import { NewTransactionRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { formatNewTransactionRequest, checkNewTransactionDataFormat } from '../helpers/middlewares.helpers';
import { isValidHexString, isValidTimestamp } from '../utils/validation.utils';

const validateNewTransactionData = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { sender, recipient, amount, fee, newTransaction } = req.body;

    if (!newTransaction) {
      const { result, message } = checkNewTransactionDataFormat(sender, recipient, amount, fee);

      if (!result) {
        res.status(400).send({ message });
        return;
      }

      req.body.newTransaction = new Transactions(sender, recipient, amount, fee);
    }

    formatNewTransactionRequest(req.body);

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

const validateNewTransactionAddresses = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { sender, recipient } = newTransaction;

    if (!isValidHexString(sender) || !isValidHexString(recipient)) {
      res.status(400).send({ message: 'The transaction sender address or the transaction recipient address is not a valid hex string.' });
      return;
    }

    if (sender === recipient) {
      res.status(400).send({ message: 'The transaction sender address and the transaction recipient address are the same.' });
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
  }
};

const validateNewTransactionValues = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { amount, fee } = newTransaction;

    if (amount < 0 || fee < 0) {
      res.status(400).send({ message: 'The transaction amount or the transaction fee is a negative number.' });
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
  }
};

const validateNewTransactionStatus = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { status } = newTransaction;

    if (!status) {
      res.status(400).send({ message: 'The transaction status was not provided.' });
      return;
    }

    if (status !== 'Pending') {
      res.status(400).send({ message: "The transaction status is not valid (must be 'Pending')." });
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

const validateNewTransactionTimestamp = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { timestamp } = newTransaction;

    if (!timestamp || !isValidTimestamp(timestamp)) {
      res.status(400).send({ message: 'The transaction timestamp was not provided or is not valid.' });
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

const validateNewTransactionTxId = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { txId } = newTransaction;

    if (!txId || !isValidHexString(txId)) {
      res.status(400).send({ message: 'The transaction txId was not provided or is not valid.' });
      return;
    }

    if (!global.blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== txId)) {
      res.status(400).send({ message: 'The transaction is already on the blockchain mempool.' });
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
  validateNewTransactionData,
  validateNewTransactionAddresses,
  validateNewTransactionValues,
  validateNewTransactionStatus,
  validateNewTransactionTimestamp,
  validateNewTransactionTxId,
};
