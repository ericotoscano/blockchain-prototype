import { Request, Response } from 'express';
import axios from 'axios';

import '../global';

import { Transaction } from '../models/Transaction';

import { NextBlockPostRequest, NextBlockPatchRequest, NodesPostRequest, NodesPutRequest, TransactionsPostRequest, TransactionsPatchRequest } from '../types/request.types';

import {
  CustomResponse,
  ErrorDataResponse,
  BlockchainDataGetResponse,
  TransactionsPostResponseData,
  NextBlockDataPostResponse,
  NodesDataPatchResponse,
  NodesDataPutResponse,
  NodesDataPostResponse,
} from '../types/response.types';

const getBlockchain = async (req: Request, res: Response<CustomResponse<BlockchainDataGetResponse | ErrorDataResponse>>): Promise<void> => {
  try {
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

const sendNextBlock = async (req: Request<{}, {}, NextBlockPostRequest>, res: Response<CustomResponse<NextBlockDataPostResponse | ErrorDataResponse>>): Promise<void> => {
  try {
    const { minFee } = req.body;

    const nextBlockTransactions = blockchain.getNextBlockTransactionsByFee(minFee);

    if (nextBlockTransactions.length === 0) {
      res.status(400).send({
        message: 'An error ocurred.',
        data: {
          code: 101,
          message: 'There are no pending transactions in the mempool with a fee greater than or equal to the minimum fee.',
        },
      });
      return;
    }

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    blockchain.addBlock(nextBlock);

    const updateBlockchainPromises: Promise<CustomResponse<NextBlockDataPostResponse | ErrorDataResponse>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const updateBlockchainPromise = axios
        .patch<CustomResponse<NextBlockDataPostResponse | ErrorDataResponse>>(`${connectedNode}/blockchain/next-block`, { nextBlock })
        .then((response) => response.data);

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

const addNextBlock = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<NextBlockDataPostResponse | ErrorDataResponse>>): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { transactions } = nextBlock;

    const checkedNextBlock = blockchain.createNextBlock(transactions);

    blockchain.addBlock(checkedNextBlock);

    res.status(200).send({
      message: 'Next block added.',
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

const sendNewNode = async (req: Request<{}, {}, NodesPostRequest>, res: Response<CustomResponse<NodesDataPostResponse | ErrorDataResponse>>): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    blockchain.addNode(nodeUrl);

    let addNewNodePromise: Promise<CustomResponse<NodesDataPatchResponse | ErrorDataResponse>>;

    const addNewNodePromises: Promise<CustomResponse<NodesDataPatchResponse | ErrorDataResponse>>[] = [];

    for (const connectedNodeUrl of blockchain.connectedNodes) {
      if (nodeUrl !== connectedNodeUrl) {
        addNewNodePromise = axios.patch<CustomResponse<NodesDataPatchResponse | ErrorDataResponse>>(`${connectedNodeUrl}/blockchain/nodes`, { nodeUrl }).then((response) => response.data);
      } else {
        addNewNodePromise = Promise.resolve({
          message: 'No added: same node.',
          data: { addedNode: nodeUrl, addedIn: blockchain.nodeUrl },
        });
      }

      addNewNodePromises.push(addNewNodePromise);
    }

    await Promise.all(addNewNodePromises);

    const connectedNodes = blockchain.broadcastNodesTo(nodeUrl);

    axios.put<CustomResponse<NodesDataPutResponse | ErrorDataResponse>>(`${nodeUrl}/blockchain/nodes`, { connectedNodes });

    res.status(201).send({
      message: 'A new node has been connected.',
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

const addNewNode = async (req: Request<{}, {}, NodesPostRequest>, res: Response<CustomResponse<NodesDataPatchResponse | ErrorDataResponse>>): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    blockchain.addNode(nodeUrl);

    res.status(200).send({
      message: 'New node added.',
      data: { addedNode: nodeUrl, addedIn: blockchain.nodeUrl },
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

const updateConnectedNodes = async (req: Request<{}, {}, NodesPutRequest>, res: Response<CustomResponse<NodesDataPutResponse | ErrorDataResponse>>): Promise<void> => {
  try {
    const { connectedNodes } = req.body;

    blockchain.setConnectedNodes(connectedNodes);

    res.status(200).send({
      message: 'Connected nodes updated.',
      data: {
        nodeUrl: blockchain.nodeUrl,
        connectedNodes: blockchain.connectedNodes.sort(),
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

const sendNewTransaction = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<CustomResponse<TransactionsPostResponseData | ErrorDataResponse>>): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;

    const newTransaction = new Transaction(sender, recipient, amount, fee);

    const { txId } = newTransaction;

    if (!blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== txId)) {
      res.status(400).send({
        message: 'An error ocurred.',
        data: {
          code: 201,
          message: 'The new transaction is already on the blockchain mempool.',
        },
      });
      return;
    }

    blockchain.addTransactionToMempool(newTransaction);

    const addTransactionPromises: Promise<CustomResponse<TransactionsPostResponseData | ErrorDataResponse>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const addTransactionPromise = axios
        .patch<CustomResponse<TransactionsPostResponseData | ErrorDataResponse>>(`${connectedNode}/blockchain/transactions`, { newTransaction })
        .then((response) => response.data);

      addTransactionPromises.push(addTransactionPromise);
    }

    await Promise.all(addTransactionPromises);

    res.status(201).send({
      message: "The new transaction was added in the node's mempool and sent to the connected node's mempool.",
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

const addNewTransaction = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<CustomResponse<TransactionsPostResponseData | ErrorDataResponse>>): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    blockchain.addTransactionToMempool(newTransaction);

    res.status(200).send({
      message: 'New transaction added.',
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
  addNextBlock,
  sendNewNode,
  addNewNode,
  updateConnectedNodes,
  sendNewTransaction,
  addNewTransaction,
};
