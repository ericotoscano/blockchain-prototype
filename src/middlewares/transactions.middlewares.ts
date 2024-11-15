import { Request, Response, NextFunction } from 'express';

import { TransactionsPostRequest, TransactionsPatchRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';
import { CheckerFunction } from '../types/check.types';

import {
  checkNewPreTransactionFormat,
  checkNewPreTransactionAddresses,
  checkNewPreTransactionValues,
  checkNewTransactionStatus,
  checkNewTransactionTimestamp,
  checkNewTransactionTxId,
} from '../helpers/transactions.middlewares.helpers';
import { checkAll } from '../helpers/validation.helpers';

const checkSendNewTransactionData = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { newPreTransaction } = req.body;
    const { sender, recipient, amount, fee } = newPreTransaction;

    const checkers: CheckerFunction[] = [
      () => checkNewPreTransactionFormat(newPreTransaction),
      () => checkNewPreTransactionAddresses(sender, recipient),
      () => checkNewPreTransactionValues(amount, fee),
    ];

    const { result, message } = checkAll(checkers);

    if (!result) {
      res.status(400).send({
        message: 'New Transaction Error',
        data: { code: 40, message },
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

const checkAddNewTransactionData = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { newTransaction } = req.body;
    const { status, timestamp, txId } = newTransaction;

    const checkers: CheckerFunction[] = [() => checkNewTransactionStatus(status), () => checkNewTransactionTimestamp(timestamp), () => checkNewTransactionTxId(txId)];

    const { result, message } = checkAll(checkers);

    if (!result) {
      res.status(400).send({
        message: 'New Transaction Error',
        data: { code: 40, message },
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

export default {
  checkSendNewTransactionData,
  checkAddNewTransactionData,
};
