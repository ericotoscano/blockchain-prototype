import { Request, Response, NextFunction } from 'express';

import { NodesPostRequest, NodesPutRequest } from '../../types/creation/NodeUrlCreationType';
import { CustomResponse, ErrorDataResponse } from '../../types/response/ValidationResponseType';
import { CheckerFunction } from '../types/check.types';

import { checkNewNodeFormat, checkNewNodeUrlOption, checkNewNodeConnections, checkNewConnectedNodes, checkNewConnectedNodesFormat } from '../../helpers/nodes.middlewares.helpers';
import { checkAll } from '../helpers/validation.helpers';

const checkNewNodeData = async (req: Request<{}, {}, NodesPostRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    const checkers: CheckerFunction[] = [() => checkNewNodeFormat(nodeUrl), () => checkNewNodeUrlOption(nodeUrl), () => checkNewNodeConnections(nodeUrl)];

    const { result, message } = checkAll(checkers);

    if (!result) {
      res.status(400).send({
        message: 'New Node Error',
        data: { code: 30, message },
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

const checkConnectedNodesData = async (req: Request<{}, {}, NodesPutRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { connectedNodes } = req.body;

    const checkers: CheckerFunction[] = [() => checkNewConnectedNodesFormat(connectedNodes), () => checkNewConnectedNodes(connectedNodes)];

    const { result, message } = checkAll(checkers);

    if (!result) {
      res.status(400).send({
        message: 'New Connected Nodes Error',
        data: { code: 30, message },
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
    return;
  }
};

export default {
  checkNewNodeData,
  checkConnectedNodesData,
};
