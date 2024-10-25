import { Request, Response, NextFunction } from 'express';

import { RegisterCreatedBlockRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { isValidHexString } from '../utils/time.utils';

const validateBlockchain = async (req: Request, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { blockchain } = global;

    if (!blockchain) {
      res.status(404).send({ message: 'There is no blockchain created yet.' });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const validateNextBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    if (!nextBlock) {
      res.status(400).send({ message: 'The next block was not provided.' });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const validateHeightOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { height } = nextBlock;

    const { blockchain } = global;

    if (!height || height < 0 || !Number.isInteger(height)) {
      res.status(400).send({ message: 'The height of the sent block is not valid or was not provided.' });
      return;
    }

    if (height !== blockchain.blocks.length) {
      res.status(400).send({ message: 'The height of sent block is not the right next block height in blockchain.' });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const validateHashOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { hash } = nextBlock;

    const { blockchain } = global;

    if (!hash || !isValidHexString(hash)) {
      res.status(400).send({ message: 'The hash of the sent block is not valid or was not provided.' });
      return;
    }

    //verificar se o hash bate com o hash esperado

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const validatePreviousHashOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { previousHash } = nextBlock;

    const { blockchain } = global;

    if (!previousHash || !isValidHexString(previousHash)) {
      res.status(400).send({ message: 'The previous hash of the sent block is not valid or was not provided.' });
      return;
    }

    if (blockchain.getPreviousBlock().hash !== previousHash) {
      res.status(400).send({ message: 'The previous hash of the sent block and the hash of the last block valid in blockchain.' });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const validateTransactionsOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { transactions } = nextBlock;

    if (!transactions || transactions.length === 0) {
      res.status(400).send({ message: 'The transactions in the sent block are empty or was not provided.' });
      return;
    }

    //verificar se cada transação esta validada

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const validateNonceOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { nonce } = nextBlock;

    if (!nonce || nonce < 0 || !Number.isInteger(nonce)) {
      res.status(400).send({ message: 'The nonce of the sent block is not valid or was not provided.' });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

export default { validateBlockchain, validateNextBlock, validateHeightOfBlock, validateHashOfBlock, validatePreviousHashOfBlock, validateTransactionsOfBlock, validateNonceOfBlock };
