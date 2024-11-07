import { Request, Response, NextFunction } from 'express';

import { BlockchainPatchRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';
import { CheckerFunction } from '../types/check.types';

import {
  checkBlockchainFormat,
  checkNextBlockFormat,
  checkNextBlockHeigth,
  checkNextBlockNonce,
  checkNextBlockHash,
  checkNextBlockPreviousHash,
  checkNextBlockTransactions,
} from '../helpers/blockchain.middlewares.helpers';
import { checkAll } from '../helpers/checkers.helpers';

const checkBlockchainData = async (req: Request, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { blockchain } = global;

    const checkers: CheckerFunction[] = [() => checkBlockchainFormat(blockchain)];

    const { result, message } = checkAll(checkers);

    if (!result) {
      res.status(404).send({
        message: 'Blockchain Error',
        data: { code: 10, message },
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

const checkAddNextBlockData = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { height, nonce, hash, previousHash, transactions } = nextBlock;

    const checkers: CheckerFunction[] = [
      () => checkNextBlockFormat(nextBlock),
      () => checkNextBlockHeigth(height),
      () => checkNextBlockNonce(nonce),
      () => checkNextBlockHash(height, nonce, hash, previousHash, transactions),
      () => checkNextBlockPreviousHash(previousHash),
      () => checkNextBlockTransactions(transactions),
    ];

    const { result, message } = checkAll(checkers);
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
  checkBlockchainData,
  checkAddNextBlockData,
};
