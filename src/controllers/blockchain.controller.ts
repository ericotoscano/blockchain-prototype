import { Request, Response } from 'express';

import '../global';

const get = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;
    
    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    res.status(200).send({
      message: 'Blockchain found.',
      data: {
        blockchain,
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

const mineNextBlock = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nextBlockTransactions } = req.body;
    const { blockchain } = global;

    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    res.status(200).send({
      message: 'Block mined.',
      data: {
        block: nextBlock,
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

export default { get, mineNextBlock };
