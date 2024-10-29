import { Request, Response, NextFunction } from 'express';

import { NewNodeRequest, UpdateConnectedNodesRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { validateNewNodeFormat } from '../helpers/middlewares.helpers';
import { getNodesUrlOptions } from '../helpers/ports.helpers';

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

const validateNewNodeData = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
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

    const nodeUrlOptions = getNodesUrlOptions();

    if (!nodeUrlOptions.includes(nodeUrl)) {
      res.status(400).send({ message: 'The node url does not include one of the available port numbers in the .env file.' });
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

    if (global.blockchain.connectedNodes.includes(nodeUrl)) {
      res.status(400).send({ message: 'The node is already connected to the target node.' });
      return;
    }

    if (global.blockchain.nodeUrl === nodeUrl) {
      res.status(400).send({ message: 'The node is the target node.' });
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

    const nodeUrlOptions = getNodesUrlOptions();

    const invalidNodeUrl = connectedNodes.filter((connectedNodeUrl) => !nodeUrlOptions.includes(connectedNodeUrl));

    if (invalidNodeUrl.length !== 0) {
      res.status(400).send({ message: 'The connected nodes include one or more invalid nodes.' });
      return;
    }

    if (connectedNodes.includes(global.blockchain.nodeUrl)) {
      res.status(400).send({ message: 'The connected nodes include the target node.' });
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
    if (!global.blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      res.status(400).send({ message: 'There are no pending transactions on mempool.' });
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
  validateNewNodeData,
  validateNewNodeUrlOption,
  validateNewNodeConnection,
  validateNewConnectedNodes,
  validatePendingTransactions,
};
