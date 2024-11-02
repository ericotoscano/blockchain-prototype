import { Request, Response } from "express";
import axios from "axios";

import "../global";

import { Transactions } from "../models/Transactions";

import {
  SendNextBlockRequest,
  UpdateBlockchainRequest,
  SendNewNodeRequest,
  UpdateConnectedNodesRequest,
  SendNewTransactionRequest,
  AddNewTransactionRequest,
} from "../types/request.types";

import {
  CustomResponse,
  NewTransactionData,
  NextBlockData,
  ErrorData,
  AddNewNodeData,
  UpdateConnectedNodesData,
  ConnectNodesData,
  GetBlockchainData,
  RemoveTransactionsData,
} from "../types/response.types";

const getBlockchain = async (
  req: Request,
  res: Response<CustomResponse<GetBlockchainData | ErrorData>>
): Promise<void> => {
  try {
    blockchain.connectedNodes.sort();

    res.status(200).send({
      message: "The blockchain has been found.",
      data: {
        blockchain,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error ocurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const sendNextBlock = async (
  req: Request<{}, {}, SendNextBlockRequest>,
  res: Response<
    CustomResponse<NextBlockData | RemoveTransactionsData | ErrorData>
  >
): Promise<void> => {
  try {
    const { minFee } = req.body;

    const nextBlockTransactions =
      blockchain.getNextBlockTransactionsByFee(minFee);

    if (nextBlockTransactions.length === 0) {
      res.status(400).send({
        message: "An error ocurred.",
        data: {
          code: 101,
          message:
            "There are no pending transactions in the mempool with a fee greater than or equal to the minimum fee.",
        },
      });
      return;
    }

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    blockchain.addBlock(nextBlock);

    const updateBlockchainPromises: Promise<
      CustomResponse<NextBlockData | ErrorData>
    >[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const updateBlockchainPromise = axios
        .patch<CustomResponse<NextBlockData | ErrorData>>(
          `${connectedNode}/blockchain/next-block`,
          { nextBlock }
        )
        .then((response) => response.data);

      updateBlockchainPromises.push(updateBlockchainPromise);
    }

    await Promise.all(updateBlockchainPromises);

    res.status(201).send({
      message:
        "The next block was mined by the node and sent to his connected nodes.",
      data: {
        nextBlock,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error ocurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const addNextBlock = async (
  req: Request<{}, {}, UpdateBlockchainRequest>,
  res: Response<CustomResponse<NextBlockData | ErrorData>>
): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    blockchain.addBlock(nextBlock);

    res.status(200).send({
      message: "Next block added.",
      data: {
        nextBlock,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error ocurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const sendNewNode = async (
  req: Request<{}, {}, SendNewNodeRequest>,
  res: Response<CustomResponse<ConnectNodesData | ErrorData>>
): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    blockchain.addNode(nodeUrl);

    let addNewNodePromise: Promise<CustomResponse<AddNewNodeData | ErrorData>>;

    const addNewNodePromises: Promise<
      CustomResponse<AddNewNodeData | ErrorData>
    >[] = [];

    for (const connectedNodeUrl of blockchain.connectedNodes) {
      if (nodeUrl !== connectedNodeUrl) {
        addNewNodePromise = axios
          .patch<CustomResponse<AddNewNodeData | ErrorData>>(
            `${connectedNodeUrl}/blockchain/nodes`,
            { nodeUrl }
          )
          .then((response) => response.data);
      } else {
        addNewNodePromise = Promise.resolve({
          message: "No added: same node.",
          data: { addedNode: nodeUrl, addedIn: blockchain.nodeUrl },
        });
      }

      addNewNodePromises.push(addNewNodePromise);
    }

    await Promise.all(addNewNodePromises);

    const connectedNodes = blockchain.broadcastNodesTo(nodeUrl);

    axios.put<CustomResponse<UpdateConnectedNodesData | ErrorData>>(
      `${nodeUrl}/blockchain/nodes`,
      { connectedNodes }
    );

    res.status(201).send({
      message: "A new node has been connected.",
      data: { connectedTo: connectedNodes.sort() },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const addNewNode = async (
  req: Request<{}, {}, SendNewNodeRequest>,
  res: Response<CustomResponse<AddNewNodeData | ErrorData>>
): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    blockchain.addNode(nodeUrl);

    res.status(200).send({
      message: "New node added.",
      data: { addedNode: nodeUrl, addedIn: blockchain.nodeUrl },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const updateConnectedNodes = async (
  req: Request<{}, {}, UpdateConnectedNodesRequest>,
  res: Response<CustomResponse<UpdateConnectedNodesData | ErrorData>>
): Promise<void> => {
  try {
    const { connectedNodes } = req.body;

    blockchain.setConnectedNodes(connectedNodes);

    res.status(200).send({
      message: "Connected nodes updated.",
      data: {
        nodeUrl: blockchain.nodeUrl,
        connectedNodes: blockchain.connectedNodes.sort(),
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const sendNewTransaction = async (
  req: Request<{}, {}, SendNewTransactionRequest>,
  res: Response<CustomResponse<NewTransactionData | ErrorData>>
): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;

    const newTransaction = new Transactions(sender, recipient, amount, fee);

    const { txId } = newTransaction;

    if (
      !blockchain.mempool.every(
        (mempoolTransaction) => mempoolTransaction.txId !== txId
      )
    ) {
      res.status(400).send({
        message: "An error ocurred.",
        data: {
          code: 201,
          message: "The new transaction is already on the blockchain mempool.",
        },
      });
      return;
    }

    blockchain.addTransactionToMempool(newTransaction);

    const addTransactionPromises: Promise<
      CustomResponse<NewTransactionData | ErrorData>
    >[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const addTransactionPromise = axios
        .patch<CustomResponse<NewTransactionData | ErrorData>>(
          `${connectedNode}/blockchain/transactions`,
          { newTransaction }
        )
        .then((response) => response.data);

      addTransactionPromises.push(addTransactionPromise);
    }

    await Promise.all(addTransactionPromises);

    res.status(201).send({
      message:
        "The new transaction was added in the node's mempool and sent to the connected node's mempool.",
      data: {
        newTransaction,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const addNewTransaction = async (
  req: Request<{}, {}, AddNewTransactionRequest>,
  res: Response<CustomResponse<NewTransactionData | ErrorData>>
): Promise<void> => {
  try {
    const { newTransaction } = req.body;

    blockchain.addTransactionToMempool(newTransaction);

    res.status(200).send({
      message: "New transaction added.",
      data: {
        newTransaction,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error.";

    res.status(500).send({
      message: "An error occurred.",
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
