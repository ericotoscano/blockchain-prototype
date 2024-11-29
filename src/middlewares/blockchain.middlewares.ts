import { Request, Response, NextFunction } from 'express';

import { CreateBlockchainDTO, ErrorDTO, ValidationDTO } from '../types/dto.types';

import { BlockchainValidation } from '../services/validation/blockchain/BlockchainValidation';
import { BlockchainDTOValidation } from '../services/validation/blockchain/BlockchainDTOValidation';
import { BlockchainTargetZerosValidation } from '../services/validation/blockchain/BlockchainTargetZerosValidation';
import { BlockchainRewardValidation } from '../services/validation/blockchain/BlockchainRewardValidation';
import { BlockchainMaxTransactionsPerBlockValidation } from '../services/validation/blockchain/BlockchainMaxTransactionsPerBlockValidation';

const validateBlockchainDTO = async (req: Request<{}, {}, CreateBlockchainDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const data = BlockchainDTOValidation.validateKeys(req.body);

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

const validateTargetZeros = async (req: Request<{}, {}, CreateBlockchainDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { targetZeros } = req.body;

    const data = BlockchainTargetZerosValidation.validateFormat(targetZeros);

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

const validateReward = async (req: Request<{}, {}, CreateBlockchainDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { reward } = req.body;

    const data = BlockchainRewardValidation.validateFormat(reward);

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

const validateMaxTransactionsPerBlock = async (req: Request<{}, {}, CreateBlockchainDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { maxTransactionsPerBlock } = req.body;

    const data = BlockchainMaxTransactionsPerBlockValidation.validateFormat(maxTransactionsPerBlock);

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

const validateBlockchain = async (req: Request, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const data: ValidationDTO = BlockchainValidation.validateFormat();

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
  validateBlockchainDTO,
  validateTargetZeros,
  validateReward,
  validateMaxTransactionsPerBlock,
  validateBlockchain,
};
