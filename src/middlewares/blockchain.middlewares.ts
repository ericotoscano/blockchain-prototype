import { Request, Response, NextFunction } from 'express';

import { NewNodeRequest, UpdateConnectedNodesRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { validateNewNodeFormat } from '../helpers/middlewares.helpers';

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

const validateNewNode = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    const { result, message } = validateNewNodeFormat(nodeUrl);

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

const validateNewNodeUrlOption = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;
    const { blockchain } = global;

    const { result, message } = blockchain.checkNodeUrlOptionFormat(nodeUrl);

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

const validateNewNodeConnection = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;
    const { blockchain } = global;

    const { result, message } = blockchain.checkNodeConnection(nodeUrl);

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

const validateNewConnectedNodes = async (req: Request<{}, {}, UpdateConnectedNodesRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
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

const validatePendingTransactions = async (req: Request, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { blockchain } = global;

    const { result, message } = blockchain.checkPendingTransactions();

    if (!result) {
      res.status(400).send({ message });
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
  }
};

export default {
  validateBlockchain,
  validateNewNode,
  validateNewNodeUrlOption,
  validateNewNodeConnection,
  validateNewConnectedNodes,
  validatePendingTransactions,
};
