import { Request, Response, NextFunction } from 'express';

import { ConnectNodeRequest, UpdateNetworkNodesRequest } from '../types/request.types';

import { getNodesUrlOptions } from '../helpers/ports.helpers';

const validateNewNodeUrl = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { newNodeUrl }: ConnectNodeRequest = req.body;

    const nodeUrlOptions = getNodesUrlOptions();

    if (!newNodeUrl) {
      return res.status(200).send({
        message: 'The node url was not sent.',
        data: { nodeUrlOptions },
      });
    }

    if (!nodeUrlOptions.includes(newNodeUrl)) {
      return res.status(200).send({
        message: 'The sent node url does not contain one of the available port numbers in the .env file.',
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
        message: 'The sent node is already connected to the current node.',
        data: { currentNodeNetwork: blockchain.nodes.networkNodes.sort() },
      });
    }

    if (blockchain.nodes.currentNodeUrl === newNodeUrl) {
      return res.status(200).send({
        message: 'The sent node is the current node.',
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
    const { newNodeUrl }: ConnectNodeRequest = req.body;
    const { blockchain } = global;

    if (blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      return res.status(200).send({
        message: 'The sent node is already registered in the current node network.',
        data: { currentNodeNetwork: blockchain.nodes.networkNodes.sort() },
      });
    }

    if (blockchain.nodes.currentNodeUrl === newNodeUrl) {
      return res.status(200).send({
        message: 'The sent node is the current node.',
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

const validateNetworkNodesUpdate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { networkNodes }: UpdateNetworkNodesRequest = req.body;
    const { blockchain } = global;

    const nodeUrlOptions = getNodesUrlOptions();

    if (networkNodes.includes(blockchain.nodes.currentNodeUrl)) {
      return res.status(200).send({
        message: 'The sent network nodes contain the current node url.',
        data: { currentNodeUrl: blockchain.nodes.currentNodeUrl },
      });
    }
    const invalidNodeUrl = networkNodes.filter((nodeUrl) => !nodeUrlOptions.includes(nodeUrl));

    if (invalidNodeUrl.length !== 0) {
      return res.status(200).send({
        message: "The sent network nodes contain one or more invalid node url's.",
        data: { invalidNodeUrl },
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

export default { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration, validateNetworkNodesUpdate };
