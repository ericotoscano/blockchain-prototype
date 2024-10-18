import { Request, Response, NextFunction } from 'express';

import { MineNextBlockRequest, RegisterNodeRequest, UpdateNetworkNodesRequest, ConnectNodeRequest, CreateTransactionRequest, BroadcastTransactionRequest } from '../types/request.types';

import { getNodesUrlOptions } from '../helpers/ports.helpers';

const validateNewNodeUrl = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { newNodeUrl }: ConnectNodeRequest = req.body;

    const nodeUrlOptions = getNodesUrlOptions();

    if (!newNodeUrl) {
      return res.status(200).send({
        message: 'The node url was not provided.',
        data: { nodeUrlOptions },
      });
    }

    if (nodeUrlOptions.length === 0) {
      return res.status(200).send({
        message: 'No port number specified in the .env file.',
        data: { nodeUrlOptions },
      });
    }

    if (!nodeUrlOptions.includes(newNodeUrl)) {
      return res.status(200).send({
        message: 'The node URL does not contain one of the available ports numbers in the .env file.',
        data: { nodeUrlOptions },
      });
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

const validateNewNodeConnection = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { newNodeUrl }: ConnectNodeRequest = req.body;
    const { blockchain } = global;

    if (blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      return res.status(200).send({
        message: 'The node is already connected to the current node.',
        data: { currentNodeNetwork: blockchain.nodes.networkNodes.sort() },
      });
    }

    if (blockchain.nodes.currentNodeUrl === newNodeUrl) {
      return res.status(200).send({
        message: 'The node is the current node.',
        data: { currentNode: blockchain.nodes.currentNodeUrl },
      });
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

const validateNewNodeRegistration = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { from, to }: RegisterNodeRequest = req.body;
    const { blockchain } = global;

    if (blockchain.nodes.networkNodes.includes(from)) {
      return res.status(200).send({
        message: 'In registration request, "from" and "to" nodes are the same.',
        data: { registration: { from, to } },
      });
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

export default { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration };
