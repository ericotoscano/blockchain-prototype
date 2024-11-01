import { Request, Response } from 'express';
import axios from 'axios';

import '../global';

import { SendNextBlockRequest, UpdateBlockchainRequest, NewNodeRequest, UpdateConnectedNodesRequest, NewTransactionRequest, RemoveTransactionRequest } from '../types/request.types';

import {
  CustomResponse,
  NewTransactionData,
  NextBlockData,
  ErrorData,
  RegisterNodeData,
  UpdateConnectedNodesData,
  ConnectNodesData,
  GetBlockchainData,
  RemoveTransactionsData,
} from '../types/response.types';

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

const sendNextBlock = async (req: Request<{}, {}, SendNextBlockRequest>, res: Response<CustomResponse<NextBlockData | RemoveTransactionsData | ErrorData>>): Promise<void> => {
  try {
    const { minFee } = req.body;

    const nextBlockTransactions = blockchain.getNextBlockTransactionsByFee(minFee);

    if (nextBlockTransactions.length === 0) {
      res.status(400).send({ message: 'An error ocurred.', data: { code: 101, message: 'There are no pending transactions in the mempool with a fee greater than or equal to the minimum fee.' } });
      return;
    }

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    blockchain.addBlock(nextBlock);

    const updateBlockchainPromises: Promise<CustomResponse<NextBlockData | ErrorData>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const updateBlockchainPromise = axios.patch<CustomResponse<NextBlockData | ErrorData>>(`${connectedNode}/blockchain/next-block`, { nextBlock }).then((response) => response.data);

      updateBlockchainPromises.push(updateBlockchainPromise);
    }

    await Promise.all(updateBlockchainPromises);

    res.status(201).send({
      message: 'The next block was mined by the node and sent to his connected nodes.',
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

const updateBlockchain = async (req: Request<{}, {}, UpdateBlockchainRequest>, res: Response<CustomResponse<NextBlockData | ErrorData>>): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    blockchain.addBlock(nextBlock);

    res.status(200).send({
      message: 'Updated.',
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

export default {
  getBlockchain,
  sendNextBlock,
  updateBlockchain,
  connectNodes,
  registerNewNode,
  updateConnectedNodes,
  broadcastNewTransaction,
  registerNewTransaction,
};
