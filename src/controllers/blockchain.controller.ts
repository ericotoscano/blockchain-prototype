import { Request, Response } from 'express';

import '../global';

import { RegisterNodeRequest, MineNextBlockRequest, CreateTransactionRequest } from '../types/request.types';

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
//put: broadcast newNode to another nodes in networkNodes
//post: register newNode
//update: devolve pra o newNode o array com todos os nos que receberam o newNode

const connectNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { newNodeUrl }: RegisterNodeRequest = req.body;
    const { blockchain } = global;

    if (!blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      blockchain.addNode(newNodeUrl);
    }

    for (const networkNode of blockchain.nodes.networkNodes) {
      await fetch(`${networkNode}/blockchain/nodes`, {
        method: 'POST',
        body: JSON.stringify({ newNodeUrl: newNodeUrl }),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    res.status(201).send({
      message: 'A new node has been registered.',
      data: { nodeUrl: blockchain.nodes.networkNodes[blockchain.nodes.networkNodes.indexOf(newNodeUrl)] },
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
    const { newNodeUrl }: RegisterNodeRequest = req.body;
    const { blockchain } = global;

    if (!blockchain.nodes.networkNodes.includes(newNodeUrl) && blockchain.nodes.currentNodeUrl !== newNodeUrl) {
      blockchain.addNode(newNodeUrl);
    }

    res.status(201).send({
      message: 'A new node has been registered.',
      data: { nodeUrl: blockchain.nodes.networkNodes[blockchain.nodes.networkNodes.indexOf(newNodeUrl)] },
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
    const { newNodeUrl }: RegisterNodeRequest = req.body;
    const { blockchain } = global;

    if (blockchain.nodes.networkNodes.includes(newNodeUrl)) {
      return res.status(400).send({ message: 'This node has already been registered.' });
    }

    blockchain.addNode(newNodeUrl);

    /*     for (const networkNode of blockchain.nodes.networkNodes) {
      const response = await fetch(`${networkNode} + /blockchain/register-node`, {
        method: 'post',
        body: JSON.stringify({ newNodeUrl: newNodeUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseJson = await response.json();
    } */

    res.status(201).send({
      message: 'A new node has been registered.',
      data: { nodeUrl: blockchain.nodes.networkNodes[blockchain.nodes.networkNodes.indexOf(newNodeUrl)] },
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
