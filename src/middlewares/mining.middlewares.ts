import { Request, Response, NextFunction } from 'express';
import { MempoolTransactionsValidation } from '../services/validation/blockchain/MempoolTransactionsValidation';
import { MempoolTransactionsSelection } from '../services/selection/MempoolTransactionsSelection';
import { ErrorDTO, MineBlockDTO, ValidationDTO } from '../types/dto.types';

const validateMempoolTransactionsByMinFee = async (req: Request<{}, {}, MineBlockDTO>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
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

const selectMempoolTransactionsByMinFee = async (req: Request<{}, {}, MineBlockDTO>, res: Response<>, next: NextFunction): Promise<void> => {
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
  validateMempoolTransactionsByMinFee,
  selectMempoolTransactionsByMinFee,
};
