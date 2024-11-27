import { Request, Response, NextFunction } from 'express';

import { BlockchainStructureValidation } from '../../helpers/validation/blockchain/BlockchainStructureValidation';
import { MempoolTransactionsValidation } from '../../helpers/validation/blockchain/MempoolTransactionsValidation';
import { MempoolTransactionsSelection } from '../../helpers/selection/blockchain/MempoolTransactionsSelection';

import { ResponseBaseType } from '../../types/response/response.types';
import { ValidationResponseType } from '../../types/response/ValidationResponseType';
import { TransactionDataType } from '../../types/transactions/TransactionDataType';
import { MineBlockDTO } from '../types/dto.types';

const validateBlockchainStructure = async (req: Request, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const data = BlockchainStructureValidation.validate();

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

const validateMempoolTransactionsByMinFee = async (req: Request<{}, {}, MineBlockDTO>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const { minFee } = req.body;

    const data = MempoolTransactionsValidation.validateByFee(minFee);

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

const selectMempoolTransactionsByMinFee = async (req: Request<{}, {}, MineBlockDTO>, res: Response<ResponseBaseType>, next: NextFunction): Promise<void> => {
  try {
    const { minFee } = req.body;

    const selectedTransactions = MempoolTransactionsSelection.selectMempoolTransactionsByFee(minFee);

    req.body.selectedTransactions = selectedTransactions;

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({ type: 'Server Error', code: 50, message: errorMessage });
    return;
  }
};

export default {
  validateBlockchainStructure,
  validateMempoolTransactionsByMinFee,
  selectMempoolTransactionsByMinFee,
};
