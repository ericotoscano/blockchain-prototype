import { Request, Response } from 'express';
import axios from 'axios';

import '../global';

import { NewNodeRequest, UpdateConnectedNodesRequest, BroadcastNextBlockRequest, NewTransactionRequest, NextBlockRequest } from '../types/request.types';

import {
  CustomResponse,
  NewTransactionData,
  NextBlockData,
  GetAllPendingTransactionsData,
  ErrorData,
  RegisterNodeData,
  UpdateConnectedNodesData,
  ConnectNodesData,
  GetBlockchainData,
} from '../types/response.types';

const connectNodes = async (req: Request<{}, {}, NewNodeRequest>, res: Response<CustomResponse<ConnectNodesData | ErrorData>>): Promise<void> => {
  try {
    const { nodeUrl } = req.body;
    const { blockchain } = global;

    blockchain.addNode(nodeUrl);

    let registerNodePromise: Promise<CustomResponse<RegisterNodeData | ErrorData>>;
    const registerNodePromises: Promise<CustomResponse<RegisterNodeData | ErrorData>>[] = [];

    for (const connectedNodeUrl of blockchain.connectedNodes) {
      if (nodeUrl !== connectedNodeUrl) {
        registerNodePromise = axios.put<CustomResponse<RegisterNodeData | ErrorData>>(`${connectedNodeUrl}/blockchain/nodes`, { nodeUrl }).then((response) => response.data);
      } else {
        registerNodePromise = Promise.resolve({ message: 'Matches.', data: { registeredNode: nodeUrl, registeredIn: blockchain.nodeUrl } });
      }

      registerNodePromises.push(registerNodePromise);
    }

    await Promise.all(registerNodePromises);

    const connectedNodes = blockchain.broadcastNodesTo(nodeUrl);

    axios.patch<CustomResponse<UpdateConnectedNodesData | ErrorData>>(`${nodeUrl}/blockchain/nodes`, { connectedNodes });

    res.status(201).send({
      message: 'A new nodeUrl has been connected.',
      data: { connectedTo: connectedNodes.sort() },
    });
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

const registerNewNode = async (req: Request<{}, {}, NewNodeRequest>, res: Response<CustomResponse<RegisterNodeData | ErrorData>>): Promise<void> => {
  try {
    const { nodeUrl } = req.body;
    const { blockchain } = global;

    blockchain.addNode(nodeUrl);

    res.status(200).send({
      message: 'Registered.',
      data: { registeredNode: nodeUrl, registeredIn: blockchain.nodeUrl },
    });
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

const updateConnectedNodes = async (req: Request<{}, {}, UpdateConnectedNodesRequest>, res: Response<CustomResponse<UpdateConnectedNodesData | ErrorData>>): Promise<void> => {
  try {
    const { connectedNodes } = req.body;
    const { blockchain } = global;

    blockchain.setConnectedNodes(connectedNodes);

    res.status(200).send({
      message: 'Updated.',
      data: { nodeUrl: blockchain.nodeUrl, connectedNodes: blockchain.connectedNodes.sort() },
    });
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

const broadcastNewTransaction = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<CustomResponse<NewTransactionData | ErrorData>>): Promise<void> => {
  try {
    const { newTransaction } = req.body;
    const { blockchain } = global;

    blockchain.addTransactionToMempool(newTransaction);

    const registerTransactionPromises: Promise<CustomResponse<NewTransactionData | ErrorData>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const registerTransactionPromise = axios.put<CustomResponse<NewTransactionData | ErrorData>>(`${connectedNode}/blockchain/transactions`, { newTransaction }).then((response) => response.data);

      registerTransactionPromises.push(registerTransactionPromise);
    }

    await Promise.all(registerTransactionPromises);

    res.status(201).send({
      message: "The new transaction was registered in the node's mempool and sent to the connected node's mempool.",
      data: {
        newTransaction,
      },
    });
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

const registerNewTransaction = async (req: Request<{}, {}, NewTransactionRequest>, res: Response<CustomResponse<NewTransactionData | ErrorData>>): Promise<void> => {
  try {
    const { newTransaction } = req.body;
    const { blockchain } = global;

    blockchain.addTransactionToMempool(newTransaction);

    res.status(200).send({
      message: 'Registered.',
      data: {
        newTransaction,
      },
    });
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

const getAllPendingTransactions = async (req: Request, res: Response<CustomResponse<GetAllPendingTransactionsData | ErrorData>>): Promise<void> => {
  try {
    const { blockchain } = global;

    const pendingTransactions = blockchain.getPendingTransactions();

    res.status(200).send({
      message: 'There are pending transactions on mempool.',
      data: { pendingTransactions },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const getBlockchain = async (req: Request, res: Response<CustomResponse<GetBlockchainData | ErrorData>>): Promise<void> => {
  try {
    const { blockchain } = global;

    blockchain.connectedNodes.sort();

    res.status(200).send({
      message: 'The blockchain has been found.',
      data: {
        blockchain,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const broadcastNextBlock = async (req: Request<{}, {}, BroadcastNextBlockRequest>, res: Response<CustomResponse<NextBlockData | ErrorData>>): Promise<void> => {
  try {
    const { nextBlockTransactions } = req.body;
    const { blockchain } = global;

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    blockchain.addBlock(nextBlock);

    const registerBlockPromises: Promise<CustomResponse<NextBlockData | ErrorData>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const registerBlockPromise = axios.put<CustomResponse<NextBlockData | ErrorData>>(`${connectedNode}/blockchain`, { nextBlock }).then((response) => response.data);

      registerBlockPromises.push(registerBlockPromise);
    }

    await Promise.all(registerBlockPromises);

    res.status(201).send({
      message: 'The next block was mined by the node and sent to connected nodes.',
      data: {
        nextBlock,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const registerNextBlock = async (req: Request<{}, {}, NextBlockRequest>, res: Response<CustomResponse<NextBlockData | ErrorData>>): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { blockchain } = global;

    blockchain.addBlock(nextBlock);

    res.status(200).send({
      message: 'Registered.',
      data: {
        nextBlock,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const updateBlockchain = async (req: Request<{}, {}, BroadcastNextBlockRequest>, res: Response): Promise<void> => {
  try {
    const { nextBlockTransactions } = req.body;
    const { blockchain } = global;

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    res.status(201).send({
      message: 'Block mined.',
      data: {
        block: nextBlock,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      data: {
        error: {
          code: 500,
          message: errorMessage,
        },
      },
    });
  }
};

export default {
  connectNodes,
  registerNewNode,
  updateConnectedNodes,
  getAllPendingTransactions,
  broadcastNewTransaction,
  registerNewTransaction,
  getBlockchain,
  registerNextBlock,
  broadcastNextBlock,
  updateBlockchain,
};
