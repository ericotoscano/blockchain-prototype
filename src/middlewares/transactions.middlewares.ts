import { Request, Response, NextFunction } from 'express';

import { Transactions } from '../models/Transactions';

import { NewTransactionRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { validateNewTransactionFormat } from '../helpers/middlewares.helpers';

const validateNewTransaction = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;

    const { result, message } = validateNewTransactionFormat(sender, recipient, amount, fee);

    if (!result) {
      res.status(400).send({ message });
      return;
    }

    const validTransaction = new Transactions(sender, recipient, amount, fee);

    req.body.newTransaction = validTransaction;

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

    const { result, message } = newTransaction.checkAddressesFormat();

    if (!result) {
      res.status(400).send({ message });
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

    const { result, message } = newTransaction.checkValuesFormat();

    if (!result) {
      res.status(400).send({ message });
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

const validateNewTransactionStatus = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    const { result, message } = newTransaction.checkStatusFormat();

    if (!result) {
      res.status(400).send({ message });
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

    const { result, message } = newTransaction.checkTimestampFormat();

    if (!result) {
      res.status(400).send({ message });
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

    const { result, message } = newTransaction.checkTxIdFormat();

    if (!result) {
      res.status(400).send({ message });
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
  validateNewTransaction,
  validateNewTransactionAddresses,
  validateNewTransactionValues,
  validateNewTransactionStatus,
  validateNewTransactionTimestamp,
  validateNewTransactionTxId,
};
