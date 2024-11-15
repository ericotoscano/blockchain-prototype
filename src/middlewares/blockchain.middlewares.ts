import { Request, Response, NextFunction } from 'express';

import { BlockchainPatchRequest } from '../types/request.types';
import { CheckerFunction } from '../types/check.types';

import {
  checkNextBlockFormat,
  checkNextBlockHeigth,
  checkNextBlockNonce,
  checkNextBlockHash,
  checkNextBlockPreviousHash,
  checkNextBlockTransactions,
  FormatValidation,
  FormatValidationErrorData,
  ValidationData,
  ErrorData,
} from '../helpers/blockchain.middlewares.helpers';
import { checkAll } from '../helpers/checkers.helpers';
import { Block } from '../entities/block/Block';

const validateBlockchainFormat = async (req: Request, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
  try {
    const { blockchain } = global;

    const data = FormatValidation.validateBlockchain(blockchain);

    if (!data.result) {
      res.status(404).send(data);
      return;
    }

    next();
  } catch (error) {
    //arrumar depois
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const checkAddNextBlockData = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { height, nonce, hash, previousHash, transactions, timestamp } = nextBlock;

    const validators: ValidationData[] = [FormatValidation.validateNextBlock(nextBlock), FormatValidation.validateNextBlockHeight(height), FormatValidation.validateNextBlockNonce(nonce)];

    const { result, message } = checkAll(validators);
    console.log(result, message);

    if (!result) {
      res.status(400).send({
        message: 'Next Block Error',
        data: { code: 20, message },
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: { code: 50, message: errorMessage },
    });
    return;
  }
};

export default {
  validateBlockchainFormat,
  checkAddNextBlockData,
};
