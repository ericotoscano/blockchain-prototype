import { Request, Response, NextFunction } from 'express';

import { NewNodeRequest, UpdateNetworkNodesRequest } from '../types/request.types';
import { CustomResponse, ErrorData, MiddlewareResponse } from '../types/response.types';

import { getNodesUrlOptions } from '../helpers/ports.helpers';

const validateNewNodeUrl = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newNodeUrl } = req.body;

    const nodeUrlOptions = getNodesUrlOptions();

    if (!newNodeUrl) {
      res.status(400).send({
        message: 'The node url was not sent.',
      });
      return;
    }

    if (!nodeUrlOptions.includes(newNodeUrl)) {
      res.status(400).send({
        message: 'The sent node url does not contain one of the available port numbers in the .env file.',
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
    const { newNodeUrl } = req.body;
    const { blockchain } = global;

    if (blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      res.status(400).send({
        message: 'The sent node is already connected to the current node.',
      });
      return;
    }

    if (blockchain.nodes.currentNodeUrl === newNodeUrl) {
      res.status(400).send({
        message: 'The sent node is the current node.',
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

const validateNewNodeRegistration = async (req: Request<{}, {}, NewNodeRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { newNodeUrl } = req.body;
    const { blockchain } = global;

    if (blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      res.status(400).send({
        message: 'The sent node is already registered in the current node network.',
      });
      return;
    }

    if (blockchain.nodes.currentNodeUrl === newNodeUrl) {
      res.status(400).send({
        message: 'The sent node is the current node.',
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

const validateNetworkNodesUpdate = async (req: Request<{}, {}, UpdateNetworkNodesRequest>, res: Response<MiddlewareResponse | CustomResponse<ErrorData>>, next: NextFunction): Promise<void> => {
  try {
    const { networkNodes } = req.body;
    const { blockchain } = global;

    const nodeUrlOptions = getNodesUrlOptions();

    if (networkNodes.includes(blockchain.nodes.currentNodeUrl)) {
      res.status(400).send({
        message: 'The sent network nodes contain the current node url.',
      });
      return;
    }
    const invalidNodeUrl = networkNodes.filter((nodeUrl) => !nodeUrlOptions.includes(nodeUrl));

    if (invalidNodeUrl.length !== 0) {
      res.status(400).send({
        message: "The sent network nodes contain one or more invalid node url's.",
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

export default { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration, validateNetworkNodesUpdate };
