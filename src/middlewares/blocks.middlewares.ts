import { Request, Response, NextFunction } from 'express';

import { NextBlockPostRequest, NextBlockPatchRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';
import { CheckerFunction } from '../types/check.types';

import { checkNextBlockFormat, checkNextBlockHeigth, checkNextBlockNonce, checkNextBlockHash, checkNextBlockPreviousHash, checkNextBlockTransactions } from '../helpers/middlewares.helpers';
import { checkAll } from '../helpers/checkers.helpers';

const checkNextBlockData = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
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

const checkMinFeeFormat = async (req: Request<{}, {}, NextBlockPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { minFee } = req.body;

    if (!minFee || typeof minFee !== 'number') {
      res.status(400).send({ message: 'Next Block Request Body Error', data: { code: 20, message: 'The minFee is not a positive number or was not provided.' } });
      return;
    }

    if (minFee < 0) {
      res.status(400).send({ message: 'Next Block Request Body Error', data: { code: 21, message: 'The minFee is a negative number.' } });
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
  }
};

export default {
  checkNextBlockData,
  checkMinFeeFormat,
};
