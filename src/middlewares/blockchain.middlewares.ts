import { Request, Response, NextFunction } from 'express';

const validateBlockchain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { blockchain } = global;

    if (!blockchain) {
      res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default { validateBlockchain };
