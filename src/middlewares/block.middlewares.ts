import { Request, Response, NextFunction } from 'express';

import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';

import { BlockDTO, ErrorDTO, ValidationDTO } from '../types/dto.types';
import { BlockDTOValidation } from '../services/validation/block/BlockDTOValidation';

const validateBlockDTO = async (req: Request<{}, {}, BlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const block: BlockDTO = req.body;

    const data = BlockDTOValidation.validateFormat(block);

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
  validateBlockDTO,
  validateBlockHeight,
  validateBlockNonce,
  validateBlockHash,
  validateBlockPreviousHash,
  validateBlockTransactions,
  validateNextBlockTransactionsMinFee,
  validateBlockTimestamp,
};
