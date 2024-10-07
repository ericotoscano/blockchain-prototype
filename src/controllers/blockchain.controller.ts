import { Request, Response } from 'express';

import '../global';

import { Blockchain } from '../models/Blockchain';

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { difficultyLevel, maxTransactionsPerBlock } = req.body;

    if(global.blockchain) {
      return res.status(400).send({message: 'There is already a blockchain created in memory.'});
    }

    global.blockchain = new Blockchain(difficultyLevel, maxTransactionsPerBlock);

    res.set('Location', `http://localhost:${process.env.PORT}/blockchain/`);

    res.status(201).send({
      message: 'Blockchain successfully created.',
      data: {
        chain: global.blockchain.chain,
        targetDifficulty: global.blockchain.targetDifficulty,
        maxTransactionsPerBlock: global.blockchain.maxTransactionsPerBlock,
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

const find = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!global.blockchain) {
      return res.status(400).send({message: 'There is no blockchain created yet.'});
    }

    res.status(200).send({
      message: 'Blockchain finded.',
      data: {
        chain: global.blockchain.chain,
        targetDifficulty: global.blockchain.targetDifficulty,
        maxTransactionsPerBlock: global.blockchain.maxTransactionsPerBlock,
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

export default { create, find };
