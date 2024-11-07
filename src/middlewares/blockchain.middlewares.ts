import { Request, Response, NextFunction } from 'express';

import { CustomResponse, ErrorDataResponse } from '../types/response.types';
import { CheckerFunction } from '../types/check.types';

import { checkBlockchainFormat } from '../helpers/middlewares.helpers';
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

export default {
  checkBlockchainData,
};
