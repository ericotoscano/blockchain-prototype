import { Request, Response, NextFunction } from 'express';

import { ValidationData, ErrorData } from '../types/response.types';

import { BlockchainValidation } from '../helpers/blockchain.middlewares.helpers';

const validateBlockchainCreation = async (req: Request, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
  try {
    const data = BlockchainValidation.validateBlockchainCreation();

    if (!data.result) {
      res.status(404).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

export default {
  validateBlockchainCreation,
};
