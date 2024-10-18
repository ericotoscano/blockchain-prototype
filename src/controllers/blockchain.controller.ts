import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import '../global';

import { MineNextBlockRequest, RegisterNodeRequest, UpdateNetworkNodesRequest, ConnectNodeRequest, CreateTransactionRequest, BroadcastTransactionRequest } from '../types/request.types';

import { RegisterNodeResponse, UpdateNetworkNodesResponse, BroadcastTransactionResponse } from '../types/response.types';

import { Transactions } from '../models/Transactions';

const getBlockchain = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain) {
      return res.status(400).send({ message: 'There is no blockchain created yet.' });
    }

    blockchain.nodes.networkNodes.sort();

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

const broadcastTransaction = async (req: Request, res: Response): Promise<any> => {
  try {
    const { transaction, origin }: BroadcastTransactionRequest = req.body;
    const { blockchain } = global;

    blockchain.addTransactionToMempool(transaction);

    const to = blockchain.nodes.currentNodeUrl;

    res.send({
      message: 'Broadcasted.',
      data: {
        transaction,
        origin,
        to,
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

const addTransactionToMempool = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to, amount, fee }: CreateTransactionRequest = req.body;
    const { blockchain } = global;

    let transactionPromise: Promise<BroadcastTransactionResponse>;
    const transactionPromises: Promise<BroadcastTransactionResponse>[] = [];

    if (blockchain.checkMempoolLength()) {
      const transaction = new Transactions(from, to, amount, fee);

      if (blockchain.checkTransactionId(transaction)) {
        blockchain.addTransactionToMempool(transaction);
      } else {
        return res.status(200).send({
          message: 'This transaction is already on the mempool.',
          data: { mempool: blockchain.mempool },
        });
      }

      const origin = blockchain.nodes.currentNodeUrl;

      for (const networkNode of blockchain.nodes.networkNodes) {
        transactionPromise = axios
          .post<BroadcastTransactionResponse>(`${networkNode}/blockchain/transactions`, { transaction, origin })
          .then((response: AxiosResponse<BroadcastTransactionResponse>) => response.data);

        transactionPromises.push(transactionPromise);
      }

      Promise.all(transactionPromises).then((responses: BroadcastTransactionResponse[]) => {
        return res.status(201).send({
          message: 'A new transaction was sent to mempool.',
          data: {
            transaction: {
              txId: transaction.txId,
              status: transaction.status,
              timestamp: transaction.timestamp,
              from: transaction.from,
              to: transaction.to,
              amount: transaction.amount,
              fee: transaction.fee,
            },
          },
        });
      });
    } else {
      return res.status(200).send({
        message: 'The mempool has reached the maximum number of transactions for the next block.',
        data: { maxTransactionsPerBlock: blockchain.maxTransactionsPerBlock },
      });
    }
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
    const { from, to }: RegisterNodeRequest = req.body;
    const { blockchain } = global;

    if (!blockchain.nodes.networkNodes.includes(from)) {
      blockchain.nodes.addNode(from);
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
    const { blockchain } = global;

    blockchain.setNetworkNodes(networkNodes);

    return res.end();
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

const connectNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { newNodeUrl }: ConnectNodeRequest = req.body;
    const { blockchain } = global;

    let registerPromise: Promise<RegisterNodeResponse>;
    const registerPromises: Promise<RegisterNodeResponse>[] = [];

    if (!blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      blockchain.nodes.addNode(newNodeUrl);
    } else {
      return res.status(200).send({
        message: 'The node is already connected.',
        data: { currentNodeNetwork: blockchain.nodes.networkNodes.sort() },
      });
    }

    for (const networkNode of blockchain.nodes.networkNodes) {
      if (newNodeUrl !== networkNode) {
        registerPromise = axios
          .post<RegisterNodeResponse>(`${networkNode}/blockchain/nodes`, { from: newNodeUrl, to: networkNode })
          .then((response: AxiosResponse<RegisterNodeResponse>) => response.data);
      } else {
        registerPromise = Promise.resolve({ message: 'Matches.', data: { from: newNodeUrl, to: networkNode } });
      }

      registerPromises.push(registerPromise);
    }

    Promise.all(registerPromises).then((responses: RegisterNodeResponse[]) => {
      const networkNodes = blockchain.nodes.broadcastNodesTo(newNodeUrl);

      axios.patch<UpdateNetworkNodesResponse>(`${newNodeUrl}/blockchain/nodes`, { networkNodes });

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

export default { getBlockchain, mineNextBlock, getAllPendingTransactions, broadcastTransaction, addTransactionToMempool, registerNode, updateNetworkNodes, connectNodes };
