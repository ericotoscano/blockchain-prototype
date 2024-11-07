import { Request, Response, NextFunction } from 'express';

import { NextBlockPostRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';
import { CheckerFunction } from '../types/check.types';

import { checkMinFeeFormat, checkMempoolPendingTransactions } from '../helpers/middlewares.helpers';
import { checkAll } from '../helpers/checkers.helpers';

const checkSendNextBlockData = async (req: Request<{}, {}, NextBlockPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { minFee } = req.body;

    const checkers: CheckerFunction[] = [() => checkMinFeeFormat(minFee), () => checkMempoolPendingTransactions()];

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

export default {
  checkSendNextBlockData,
};
