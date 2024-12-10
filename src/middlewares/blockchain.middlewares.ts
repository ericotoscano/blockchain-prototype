import { Request, Response, NextFunction } from 'express';

import { ErrorDTO, ValidationDTO } from '../types/ResponseDTO';
import { BlockchainValidation } from '../services/blockchain/validation/BlockchainValidation';
import { BlockchainDTOInputValidation } from '../services/blockchain/validation/BlockchainDTOInputValidation';
import { BlockchainTargetZerosValidation } from '../services/blockchain/validation/BlockchainTargetZerosValidation';
import { BlockchainRewardValidation } from '../services/blockchain/validation/BlockchainRewardValidation';
import { BlockchainMaxTransactionsPerBlockValidation } from '../services/blockchain/validation/BlockchainMaxTransactionsPerBlockValidation';
import { BlockchainDTOInput } from '../services/blockchain/conversion/types/BlockchainDTO';

const validateBlockchainDTO = async (req: Request<{}, {}, BlockchainDTOInput>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const data: ValidationDTO = BlockchainDTOInputValidation.validateKeys(req.body);

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

const validateTargetZeros = async (req: Request<{}, {}, BlockchainDTOInput>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { targetZeros }: BlockchainDTOInput = req.body;

    const data: ValidationDTO = BlockchainTargetZerosValidation.validateFormat(targetZeros);

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

const validateReward = async (req: Request<{}, {}, BlockchainDTOInput>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { reward }: BlockchainDTOInput = req.body;

    const data: ValidationDTO = BlockchainRewardValidation.validateFormat(reward);

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

const validateMaxTransactionsPerBlock = async (req: Request<{}, {}, BlockchainDTOInput>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const { maxTransactionsPerBlock }: BlockchainDTOInput = req.body;

    const data: ValidationDTO = BlockchainMaxTransactionsPerBlockValidation.validateFormat(maxTransactionsPerBlock);

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
