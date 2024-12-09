import { Request, Response, NextFunction } from 'express';

import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';

import { BlockDTO, ErrorDTO, ValidationDTO } from '../types/dto.types';
import { BlockDTOValidation } from '../services/block/validation/BlockDTOValidation';
import { BlockHeightValidation } from '../services/block/validation/BlockHeightValidation';
import { BlockHashValidation } from '../services/block/validation/BlockHashValidation';
import { BlockPreviousHashValidation } from '../services/block/validation/BlockPreviousHashValidation';
import { BlockTransactionsValidation } from '../services/block/validation/BlockTransactionsValidation';
import { BlockTimestampValidation } from '../services/block/validation/BlockTimestampValidation';
import { BlockMiningValidation } from '../services/validation/block/BlockMiningValidation';

const validateBlockDTO = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const blockDTO: BlockDTO = req.body;

    const data: ValidationDTO = BlockDTOValidation.validateKeys(blockDTO);

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

const validateBlockTransactionsMinFee = async (req: Request<{}, {}, MineBlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { minFee }: MineBlockDTO = req.body;

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

const validateMempoolTransactions = async (req: Request<{}, {}, MineBlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { minFee }: MineBlockDTO = req.body;

    const data = BlockMiningValidation.validateMempoolTransactionsByFee(minFee);

    if (!data.result) {
      res.status(404).send(data);
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
};
