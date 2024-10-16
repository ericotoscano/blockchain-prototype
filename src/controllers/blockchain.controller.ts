import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import '../global';

import { ConnectNodeRequest, RegisterNodeRequest, MineNextBlockRequest, CreateTransactionRequest, UpdateNetworkNodesRequest } from '../types/request.types';

import { RegisterNodeResponse, UpdateNetworkNodesResponse } from '../types/response.types';

import { Transaction } from '../models/Transaction';

const getBlockchain = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    res.status(200).send({
      message: 'Blockchain found.',
      data: {
        blockchain,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const mineNextBlock = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nextBlockTransactions }: MineNextBlockRequest = req.body;
    const { blockchain } = global;

    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

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
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const getAllPendingTransactions = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      return res.status(400).send({ message: 'There are no pending transactions on mempool.' });
    }

    const pendingTransactions = blockchain.getPendingTransactions();

    res.status(200).send({
      message: 'There are pending transactions on mempool.',
      data: {
        pendingTransactions,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const createTransaction = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to, amount, fee }: CreateTransactionRequest = req.body;
    const { blockchain } = global;

    const transaction = new Transaction(from, to, amount, fee);

    blockchain.addTransactionToMempool(transaction);

    res.status(201).send({
      message: 'A new transaction was sent to mempool.',
      data: {
        transaction: {
          txId: transaction.txId,
          status: transaction.status,
          from: transaction.from,
          to: transaction.to,
          amount: transaction.amount,
          fee: transaction.fee,
          timestamp: transaction.timestamp,
        },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
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
    const { blockchain } = global;

    const registerPromises: Promise<RegisterNodeResponse>[] = [];

    if (!blockchain.nodes.connectedNodes.includes(newNodeUrl)) {
      blockchain.addNode(newNodeUrl);
    }

    for (const networkNode of blockchain.nodes.connectedNodes) {
      const promise = axios
        .post<RegisterNodeResponse>(networkNode + '/blockchain/nodes', { origin: newNodeUrl, target: blockchain.nodes.currentNodeUrl })
        .then((response: AxiosResponse<RegisterNodeResponse>) => {
          return response.data;
        });

      registerPromises.push(promise);
    }

    Promise.all(registerPromises).then(() => {
      const nodesExceptNewOne = blockchain.nodes.connectedNodes.filter((node) => node !== newNodeUrl);

      const connectedNodes = [...nodesExceptNewOne, blockchain.nodes.currentNodeUrl];

      axios.patch(newNodeUrl + '/blockchain/nodes', { connectedNodes });
    });

    res.status(201).send({
      message: 'A new node has been registered.',
      data: { nodeUrl: newNodeUrl },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const registerNode = async (req: Request, res: Response): Promise<any> => {
  try {
    const { origin, target }: RegisterNodeRequest = req.body;
    const { blockchain } = global;

    if (!blockchain.nodes.connectedNodes.includes(origin) && blockchain.nodes.currentNodeUrl !== origin) {
      blockchain.addNode(origin);
    }

    res.send({
      message: 'New network connection!',
      data: { origin, target },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const updateNetworkNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { connectedNodes }: UpdateNetworkNodesRequest = req.body;
    const { blockchain } = global;

    blockchain.nodes.connectedNodes = structuredClone(connectedNodes);

    res.status(201).send({
      message: 'Done.',
      data: { allNetworkNodes: blockchain.nodes.connectedNodes },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default { getBlockchain, mineNextBlock, getAllPendingTransactions, createTransaction, registerNode, connectNodes, updateNetworkNodes };
