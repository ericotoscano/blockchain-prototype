import { Request, Response, NextFunction } from 'express';

import { ValidationResponseType, ResponseBaseType } from '../../types/response.types';

import { BlockchainStructureValidation } from '../../helpers/validation/blockchain/BlockchainStructureValidation';
import { MempoolTransactionsValidation } from '../../helpers/validation/blockchain/MempoolTransactionsValidation';

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

const validateMempoolTransactionsByMinFee = async (req: Request<{}, {}, { minFee: number }>, res: Response<ValidationResponseType | ResponseBaseType>, next: NextFunction): Promise<void> => {
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

//const validateMaxBlockTransactions => recebera as transacoes para o bloco, respeitando o limite maximo e passara por req.

export default {
  validateBlockchainStructure,
  validateMempoolTransactionsByMinFee,
};
