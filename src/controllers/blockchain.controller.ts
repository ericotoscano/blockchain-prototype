import { Request, Response } from 'express';

import '../global';

const find = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!global.blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    res.status(200).send({
      message: 'Blockchain found.',
      data: {
        chain: global.blockchain.chain,
        targetDifficulty: global.blockchain.targetDifficulty,
        maxTransactionsPerBlock: global.blockchain.maxTransactionsPerBlock,
        mempool: global.blockchain.mempool,
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

export default { find };
