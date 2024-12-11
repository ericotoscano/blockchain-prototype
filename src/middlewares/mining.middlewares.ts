import { Request, Response, NextFunction } from 'express';

import { ErrorDTO, ValidationDTO } from '../shared/types/ResponseDTO';
import { TransactionsDTOValidation } from '../services/transaction/validation/TransactionsDTOValidation';
import { TransactionDTO } from '../services/transaction/conversion/types/TransactionDTO';

const validateTransactionsDTO = async (req: Request<{}, {}, TransactionDTO[]>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const transactionsDTO: TransactionDTO[] = req.body;

    const data: ValidationDTO = TransactionsDTOValidation.validateStructure(transactionsDTO);

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

const validateTransactionsDTOLength = async (req: Request<{}, {}, TransactionDTO[]>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const transactionsDTO: TransactionDTO[] = req.body;

    const data: ValidationDTO = TransactionsDTOValidation.validateStructureLength(transactionsDTO);

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

const validateEachTransactionDTO = async (req: Request<{}, {}, TransactionDTO[]>, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
  try {
    const transactionsDTO: TransactionDTO[] = req.body;

    const data: ValidationDTO = TransactionsDTOValidation.validateAll(transactionsDTO);

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
  validateTransactionsDTO,
  validateTransactionsDTOLength,
  validateEachTransactionDTO,
};
