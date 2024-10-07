import { Request, Response } from 'express';

import { CreateBlockchainRequest } from '../controllers/types/request.types';
import { CreateBlockchainResponse } from '../controllers/types/response.types';

import { Blockchain } from '../models/Blockchain';

const create = async (req: Request<{}, {}, CreateBlockchainRequest>, res: Response<CreateBlockchainResponse>): Promise<void> => {
  try {
    const { difficultyLevel, maxTransactionsPerBlock } = req.body;

    const blockchain: Blockchain = new Blockchain(difficultyLevel, maxTransactionsPerBlock);

    res.set('Location', `http://localhost:${process.env.PORT}/blockchain/`);

    res.status(201).send({
      message: 'Blockchain successfully created.',
      data: {
        chain: blockchain.chain,
        targetDifficulty: blockchain.targetDifficulty,
        maxTransactionsPerBlock: blockchain.maxTransactionsPerBlock,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};


export default { create };
