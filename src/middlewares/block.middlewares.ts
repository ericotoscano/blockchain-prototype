import { Request, Response, NextFunction } from 'express';

import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';

import { BlockDTO, ErrorDTO, GetTransactionsToMineBlockDTO, ValidationDTO } from '../types/dto.types';
import { BlockDTOValidation } from '../services/validation/block/BlockDTOValidation';
import { BlockHeightValidation } from '../services/validation/block/BlockHeightValidation';
import { BlockHashValidation } from '../services/validation/block/BlockHashValidation';
import { BlockPreviousHashValidation } from '../services/validation/block/BlockPreviousHashValidation';
import { BlockTransactionsValidation } from '../services/validation/block/BlockTransactionsValidation';
import { BlockTimestampValidation } from '../services/validation/block/BlockTimestampValidation';
import { BlockMiningValidation } from '../services/validation/block/BlockMiningValidation';

const validateBlockDTO = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const block: BlockDTO = req.body;

    const data: ValidationDTO = BlockDTOValidation.validateKeys(block);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockHeight = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { height }: BlockDTO = req.body;

    const data: ValidationDTO = BlockHeightValidation.validateFormat(height);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockNonce = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { nonce }: BlockDTO = req.body;

    const data: ValidationDTO = BlockHeightValidation.validateFormat(nonce);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockHash = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const block: BlockDTO = req.body;

    const { hash }: BlockDTO = block;

    const data: ValidationDTO = BlockHashValidation.validateAll(block, hash, Sha256HashCreation);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockPreviousHash = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { previousHash }: BlockDTO = req.body;

    const data: ValidationDTO = BlockPreviousHashValidation.validateAll(previousHash);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTimestamp = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { timestamp }: BlockDTO = req.body;

    const data: ValidationDTO = BlockTimestampValidation.validateFormat(timestamp);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTransactions = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { transactions }: BlockDTO = req.body;

    const data: ValidationDTO = BlockTransactionsValidation.validateAll(transactions);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTransactionsMinFee = async (req: Request<{}, {}, GetTransactionsToMineBlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { minFee }: GetTransactionsToMineBlockDTO = req.body;

    const data = BlockMiningValidation.validateMinFeeFormat(minFee);

    if (!data.result) {
      res.status(400).send(data);
      return;
    }

    next();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

export default {
  validateBlockDTO,
  validateBlockHeight,
  validateBlockNonce,
  validateBlockHash,
  validateBlockPreviousHash,
  validateBlockTimestamp,
  validateBlockTransactions,
  validateBlockTransactionsMinFee,
};
