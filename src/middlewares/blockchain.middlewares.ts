import { Request, Response, NextFunction } from 'express';

import { Blocks } from '../models/Blocks';

import { RegisterCreatedBlockRequest, NewNodeRequest, UpdateConnectedNodesRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { validateNextBlockFormat, validateNewNodeFormat } from '../helpers/middlewares.helpers';

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

    const { result, message } = validateNextBlockFormat(nextBlock);

    if (!result) {
      res.status(400).send({ message });
      return;
    }

    const { height, nonce, hash, previousHash, transactions } = nextBlock;

    const validBlock = new Blocks(height, nonce, hash, previousHash, transactions);

    req.body.nextBlock = validBlock;

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

    const { result, message } = nextBlock.checkHeightFormat();

    if (!result) {
      res.status(400).send({ message });
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

const validateNonceOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { result, message } = nextBlock.checkNonceFormat();

    if (!result) {
      res.status(400).send({ message });
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

    const { result, message } = nextBlock.checkHashFormat();

    if (!result) {
      res.status(400).send({ message });
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

const validatePreviousHashOfBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { result, message } = nextBlock.checkPreviousHashFormat();

    if (!result) {
      res.status(400).send({ message });
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

    const { result, message } = nextBlock.checkTransactionsFormat();

    if (!result) {
      res.status(400).send({ message });
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

const validateNewNode = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { node } = req.body;

    const { result, message } = validateNewNodeFormat(node);

    if (!result) {
      res.status(400).send({
        message,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateNodeUrlOption = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { node } = req.body;
    const { blockchain } = global;

    const { result, message } = blockchain.checkNodeUrlOptionFormat(node);

    if (!result) {
      res.status(400).send({
        message,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateNodeConnection = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { node } = req.body;
    const { blockchain } = global;

    const { result, message } = blockchain.checkNodeConnection(node);

    if (!result) {
      res.status(400).send({
        message,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateNodeRegistration = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { node } = req.body;
    const { blockchain } = global;

    const { result, message } = blockchain.checkNodeRegistration(node);

    if (!result) {
      res.status(400).send({
        message,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateConnectedNodes = async (req: Request<{}, {}, UpdateConnectedNodesRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { connectedNodes } = req.body;
    const { blockchain } = global;

    const { result, message } = blockchain.checkConnectedNodes(connectedNodes);

    if (!result) {
      res.status(400).send({
        message,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

export default {
  validateBlockchain,
  validateNextBlock,
  validateHeightOfBlock,
  validateHashOfBlock,
  validatePreviousHashOfBlock,
  validateTransactionsOfBlock,
  validateNonceOfBlock,
  validateNewNode,
  validateNodeUrlOption,
  validateNodeConnection,
  validateNodeRegistration,
  validateConnectedNodes,
};
