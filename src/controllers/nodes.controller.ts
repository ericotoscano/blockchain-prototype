import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import '../global';

import { ConnectNodeRequest, RegisterNodeRequest, UpdateNetworkNodesRequest } from '../types/request.types';

import { RegisterNodeResponse, UpdateNetworkNodesResponse } from '../types/response.types';

const getNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nodes } = global;

    if (!nodes) {
      return res.status(400).send({ message: 'There is no nodes in the network.' });
    }

    nodes.networkNodes.sort();

    res.status(200).send({
      message: 'Nodes found in the network.',
      data: {
        nodes,
      },
    });
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

const connectNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { newNodeUrl }: ConnectNodeRequest = req.body;
    const { nodes } = global;

    let registerPromise: Promise<RegisterNodeResponse>;
    const registerPromises: Promise<RegisterNodeResponse>[] = [];

    if (!nodes.networkNodes.includes(newNodeUrl)) {
      nodes.addNode(newNodeUrl);
    } else {
      return res.status(200).send({
        message: 'The node is already connected.',
        data: { currentNodeNetwork: nodes.networkNodes.sort() },
      });
    }

    for (const networkNode of nodes.networkNodes) {
      if (newNodeUrl !== networkNode) {
        registerPromise = axios.post<RegisterNodeResponse>(`${networkNode}/nodes`, { from: newNodeUrl, to: networkNode }).then((response: AxiosResponse<RegisterNodeResponse>) => response.data);
      } else {
        registerPromise = Promise.resolve({ message: 'Matches.', data: { from: newNodeUrl, to: networkNode } });
      }

      registerPromises.push(registerPromise);
    }

    Promise.all(registerPromises).then((responses: RegisterNodeResponse[]) => {
      const networkNodes = nodes.broadcastNodesTo(newNodeUrl);

      axios.patch<UpdateNetworkNodesResponse>(`${newNodeUrl}/nodes`, { networkNodes });

      return res.status(201).send({
        message: 'A new node has been registered.',
        data: { connectedTo: networkNodes.sort() },
      });
    });
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

const registerNode = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to }: RegisterNodeRequest = req.body;
    const { nodes } = global;

    if (!nodes.networkNodes.includes(from)) {
      nodes.addNode(from);
    }
    return res.send({
      message: 'Registered.',
      data: { from, to },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const updateNetworkNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { networkNodes }: UpdateNetworkNodesRequest = req.body;
    const { nodes } = global;

    nodes.networkNodes = structuredClone(networkNodes);

    return res.send({
      message: 'Done.',
      data: { networkNodes: nodes.networkNodes },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default { getNodes, registerNode, connectNodes, updateNetworkNodes };
