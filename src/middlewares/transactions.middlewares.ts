import { Request, Response, NextFunction } from "express";

import { SendNewTransactionRequest } from "../types/request.types";
import {
  CustomResponse,
  ErrorData,
  MiddlewareResponse,
} from "../types/response.types";

import { checkNewTransactionDataFormat } from "../helpers/middlewares.helpers";
import { isValidHex40String } from "../utils/validation.utils";

const validateNewTransactionData = async (
  req: Request<{}, {}, SendNewTransactionRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;

    const { result, message } = checkNewTransactionDataFormat(
      sender,
      recipient,
      amount,
      fee
    );

    if (!result) {
      res.status(400).send({ message });
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateNewTransactionAddresses = async (
  req: Request<{}, {}, SendNewTransactionRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { sender, recipient } = req.body;

    if (!isValidHex40String(sender) || !isValidHex40String(recipient)) {
      res.status(400).send({
        message:
          "The transaction sender address or the transaction recipient address is not a valid hex string.",
      });
      return;
    }

    if (sender === recipient) {
      res.status(400).send({
        message:
          "The transaction sender address and the transaction recipient address are the same.",
      });
      return;
    }

    if (
      blockchain.getNode(sender).address === "" &&
      blockchain.getUser(sender).address === ""
    ) {
      res.status(400).send({
        message:
          "The transaction sender address is not a blockchain registered user or a blockchain registered node.",
      });
      return;
    }

    if (
      blockchain.getNode(recipient).address === "" &&
      blockchain.getUser(recipient).address === ""
    ) {
      res.status(400).send({
        message:
          "The transaction recipient address is not a blockchain registered user or a blockchain registered node.",
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateNewTransactionValues = async (
  req: Request<{}, {}, SendNewTransactionRequest>,
  res: Response<MiddlewareResponse | CustomResponse<ErrorData>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { sender, amount, fee } = req.body;

    if (amount < 0 || fee < 0) {
      res.status(400).send({
        message:
          "The transaction amount or the transaction fee is a negative number.",
      });
      return;
    }

    const value = amount + fee;
    const senderBalance = blockchain.getBalance(sender);

    if (senderBalance < value) {
      res.status(400).send({
        message: `The sender's balance (${senderBalance}) is less than the transaction value (amount + fee = ${value}).`,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default {
  validateNewTransactionData,
  validateNewTransactionAddresses,
  validateNewTransactionValues,
};
