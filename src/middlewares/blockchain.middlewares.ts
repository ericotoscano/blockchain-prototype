import { Request, Response, NextFunction } from 'express';

import { NodesPostRequest, NextBlockPostRequest, NodesPutRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';

import { checkNewNodeDataFormat } from '../helpers/middlewares.helpers';
import { getNodesUrlOptions } from '../helpers/ports.helpers';

const checkBlockchain = async (req: Request, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    if (!blockchain) {
      res.status(404).send({ message: 'Client Error', data: { code: 10, message: 'There is no blockchain.' } });
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

const checkNewNodeData = async (req: Request<{}, {}, NodesPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    const { result, message } = checkNewNodeDataFormat(nodeUrl);

    if (!result) {
      res.status(400).send({
        message: 'Client Error',
        data: { code: 11, message },
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

const checkNewNodeUrlOption = async (req: Request<{}, {}, NodesPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    const nodeUrlOptions = getNodesUrlOptions();

    if (!nodeUrlOptions.includes(nodeUrl)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The node url does not include one of the available ports in the .env file.' } });
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

const checkNewNodeConnection = async (req: Request<{}, {}, NodesPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    if (blockchain.connectedNodes.includes(nodeUrl)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The node is already connected to the target node.' } });
      return;
    }

    if (blockchain.nodeUrl === nodeUrl) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The node is the target node.' } });
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

const checkNewConnectedNodes = async (req: Request<{}, {}, NodesPutRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { connectedNodes } = req.body;

    const nodeUrlOptions = getNodesUrlOptions();

    const invalidNodeUrl = connectedNodes.filter((connectedNodeUrl) => !nodeUrlOptions.includes(connectedNodeUrl));

    if (invalidNodeUrl.length !== 0) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The connected nodes include one or more invalid nodes.' } });
      return;
    }

    if (connectedNodes.includes(blockchain.nodeUrl)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The connected nodes include the target node.' } });
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

const checkFeeFormat = async (req: Request<{}, {}, NextBlockPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { minFee } = req.body;

    if (!minFee || typeof minFee !== 'number') {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The minFee is not a positive number or was not provided.' } });
      return;
    }

    if (minFee < 0) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The minFee is a negative number.' } });
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

const checkPendingTransactions = async (req: Request, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    if (blockchain.mempool.every((transaction) => transaction.status !== 'Pending')) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'There are no pending transactions on mempool.' } });
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
  checkBlockchain,
  checkNewNodeData,
  checkNewNodeUrlOption,
  checkNewNodeConnection,
  checkNewConnectedNodes,
  checkFeeFormat,
  checkPendingTransactions,
};
