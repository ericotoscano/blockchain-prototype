import { Request, Response, NextFunction } from "express";

import { BlockchainPatchRequest } from "../types/request.types";
import { ValidationData, ErrorData } from "../types/response.types";

import { Sha256HashCreation } from "../utils/HashCreation";

import { BlockValidation } from "../helpers/validation/block/BlockValidation";
import { BlockHeightValidation } from "../helpers/validation/block/BlockHeightValidation";
import { BlockHashValidation } from "../helpers/validation/block/BlockHashValidation";
import { BlockPreviousHashValidation } from "../helpers/validation/block/BlockPreviousHash";
import { BlockTransactionsValidation } from "../helpers/validation/block/BlockTransactionsValidation";
import { BlockTimestampValidation } from "../helpers/validation/block/BlockTimestampValidation";

const validateBlockFormat = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const data = BlockValidation.validateFormat(nextBlock);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

const validateBlockHeight = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { height } = nextBlock;

    const data = BlockHeightValidation.validateFormat(height);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

const validateBlockNonce = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { height } = nextBlock;

    const data = BlockHeightValidation.validateFormat(height);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

const validateBlockHash = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { hash } = nextBlock;

    const allValidationData: ValidationData[] = [
      BlockHashValidation.validateFormat(hash),
      BlockHashValidation.validateExpectedHash(
        nextBlock,
        global.blockchain.target,
        Sha256HashCreation
      ),
    ];

    for (const data of allValidationData) {
      if (!data.result) {
        res.status(400).send(data);
        return;
      }
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

const validateBlockPreviousHash = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { previousHash } = nextBlock;

    const allValidationData: ValidationData[] = [
      BlockPreviousHashValidation.validateFormat(previousHash),
      BlockPreviousHashValidation.validateExpectedPreviousHash(
        previousHash,
        global.blockchain.blocks.getPreviousBlock().hash
      ),
    ];

    for (const data of allValidationData) {
      if (!data.result) {
        res.status(400).send(data);
        return;
      }
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTransactions = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { transactions } = nextBlock;

    const data = BlockTransactionsValidation.validateFormat(transactions);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTimestamp = async (
  req: Request<{}, {}, BlockchainPatchRequest>,
  res: Response<ValidationData | ErrorData>,
  next: NextFunction
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { timestamp } = nextBlock;

    const data = BlockTimestampValidation.validateFormat(timestamp);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res
      .status(500)
      .send({ type: "Server Error", code: 50, message: errorMessage });
    return;
  }
};

export default {
  validateBlockFormat,
  validateBlockHeight,
  validateBlockNonce,
  validateBlockHash,
  validateBlockPreviousHash,
  validateBlockTransactions,
  validateBlockTimestamp,
};
