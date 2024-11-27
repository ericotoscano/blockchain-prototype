import { Request, Response, NextFunction } from 'express';

import { BlockStructureValidation } from '../../helpers/validation/block/BlockStructureValidation';
import { BlockHeightValidation } from '../../helpers/validation/block/BlockHeightValidation';
import { BlockHashValidation } from '../../helpers/validation/block/BlockHashValidation';
import { BlockPreviousHashValidation } from '../../helpers/validation/block/BlockPreviousHash';
import { BlockTransactionsValidation } from '../../helpers/validation/block/BlockTransactionsValidation';
import { BlockTimestampValidation } from '../../helpers/validation/block/BlockTimestampValidation';
import { BlockMiningValidation } from '../../helpers/validation/block/BlockMiningValidation';

import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';

import { BlockDataType } from '../types/dto.types';
import { ResponseBaseType } from '../../types/response/response.types';
import { ValidationResponseType } from '../../types/response/ValidationResponseType';

const validateBlockStructure = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const block = req.body;

    const data = BlockStructureValidation.validate(block);

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

const validateBlockHeight = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const nextBlock = req.body;

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

const validateBlockNonce = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const nextBlock = req.body;

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

const validateBlockHash = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const nextBlock = req.body;

    const { hash } = nextBlock;

    const allValidationData: ValidationResponseType[] = [
      BlockHashValidation.validateFormat(hash),
      BlockHashValidation.validateDifficulty(hash, global.blockchain.target),
      BlockHashValidation.validateExpectedHash(nextBlock, Sha256HashCreation),
    ];

    for (const data of allValidationData) {
      if (!data.result) {
        res.status(400).send(data);
        return;
      }
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockPreviousHash = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const nextBlock = req.body;

    const { previousHash } = nextBlock;

    const allValidationData: ValidationResponseType[] = [
      BlockPreviousHashValidation.validateFormat(previousHash),
      BlockPreviousHashValidation.validateExpectedPreviousHash(previousHash, global.blockchain.blocksManagement.getPreviousBlock().hash),
    ];

    for (const data of allValidationData) {
      if (!data.result) {
        res.status(400).send(data);
        return;
      }
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateBlockTransactions = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const nextBlock = req.body;

    const { transactions } = nextBlock;

    const allValidationData: ValidationResponseType[] = [
      BlockTransactionsValidation.validateStructure(transactions),
      BlockTransactionsValidation.validateLength(transactions, global.blockchain.maxTransactionsPerBlock),
      BlockTransactionsValidation.validateRewardTransactionFormat(transactions, global.blockchain.reward),
      BlockTransactionsValidation.validateAllTransactions(transactions),
    ];

    for (const data of allValidationData) {
      if (!data.result) {
        res.status(400).send(data);
        return;
      }
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

const validateNextBlockTransactionsMinFee = async (req: Request<{}, {}, { minFee: number }>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const { minFee } = req.body;

    const data = BlockMiningValidation.validateMinFeeFormat(minFee);

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

const validateBlockTimestamp = async (req: Request<{}, {}, BlockDataType>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const nextBlock = req.body;

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
  validateBlockStructure,
  validateBlockHeight,
  validateBlockNonce,
  validateBlockHash,
  validateBlockPreviousHash,
  validateBlockTransactions,
  validateNextBlockTransactionsMinFee,
  validateBlockTimestamp,
};
