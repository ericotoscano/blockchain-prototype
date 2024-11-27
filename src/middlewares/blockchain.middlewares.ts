import { Request, Response, NextFunction } from 'express';
import { BlockchainStructureValidation } from '../services/validation/blockchain/BlockchainStructureValidation';
import { ErrorDTO, ValidationDTO } from '../types/dto.types';

const validateBlockchainStructure = async (req: Request, res: Response<ValidationDTO | ErrorDTO>, next: NextFunction): Promise<void> => {
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

export default {
  validateBlockchainStructure,
};
