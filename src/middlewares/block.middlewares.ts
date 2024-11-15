import { Request, Response, NextFunction } from 'express';

import { BlockchainPatchRequest } from '../types/request.types';
import { ValidationData, ErrorData } from '../types/response.types';

import { BlockValidation, BlockHeightValidation, BlockHashValidation, BlockPreviousHashValidation, BlockTransactionsValidation, BlockTimestampValidation } from '../helpers/block.middlewares.helpers';

const validateBlockFormat = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const data = BlockValidation.validateFormat(nextBlock);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockHeight = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
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
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockNonce = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
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
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockHash = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { hash } = nextBlock;

    const data = BlockHashValidation.validateFormat(hash);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockPreviousHash = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { previousHash } = nextBlock;

    const data = BlockPreviousHashValidation.validateFormat(previousHash);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTransactions = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
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
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTimestamp = async (req: Request<{}, {}, BlockchainPatchRequest>, res: Response<ValidationData | ErrorData>, next: NextFunction): Promise<void> => {
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
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
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
