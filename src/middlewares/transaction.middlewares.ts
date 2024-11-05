import { Request, Response, NextFunction } from 'express';

import { TransactionsPostRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';

import { checkNewTransactionDataFormat } from '../helpers/middlewares.helpers';
import { isValidHex40String } from '../utils/validation.utils';

const checkNewTransactionData = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;

    const { result, message } = checkNewTransactionDataFormat(sender, recipient, amount, fee);

    if (!result) {
      res.status(400).send({
        message: 'Client Error',
        data: { code: 11, message },
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
  }
};

const checkNewTransactionAddresses = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { sender, recipient } = req.body;

    if (!isValidHex40String(sender) || !isValidHex40String(recipient)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The transaction sender address or the transaction recipient address is not a valid hex string.' } });
      return;
    }

    if (sender === recipient) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The transaction sender address and the transaction recipient address are the same.' } });
      return;
    }

    /*     if (
      blockchain.getNode(sender).address === "" &&
      blockchain.getUser(sender).address === ""
    ) {
      res.status(400).send({message: 'Client Error', data: { code: 10,
        message:
          "The transaction sender address is not a blockchain registered user or a blockchain registered node.",
      }});
      return;
    }

    if (
      blockchain.getNode(recipient).address === "" &&
      blockchain.getUser(recipient).address === ""
    ) {
      res.status(400).send({message: 'Client Error', data: { code: 10,
        message:
          "The transaction recipient address is not a blockchain registered user or a blockchain registered node.",
      }});
      return;
    } */

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

const checkNewTransactionValues = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { amount, fee } = req.body;

    if (amount < 0 || fee < 0) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The transaction amount or the transaction fee is a negative number.' } });
      return;
    }

    /*     const value = amount + fee;
    const senderBalance = blockchain.getBalance(sender);

    if (senderBalance < value) {
      res.status(400).send({
        message: `The sender's balance (${senderBalance}) is less than the transaction value (amount + fee = ${value}).`,
      });
      return;
    } */

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

export default {
  checkNewTransactionData,
  checkNewTransactionAddresses,
  checkNewTransactionValues,
};
