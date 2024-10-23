import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import '../global';

import {
  MineNextBlockRequest,
  UpdateNetworkNodesRequest,
  ConnectNodeRequest,
  SendTransactionToMempoolRequest,
  RegisterTransactionInMempoolRequest,
  BroadcastMinedBlockRequest,
} from '../types/request.types';

import { RegisterNodeResponse, UpdateNetworkNodesResponse, BroadcastTransactionResponse, BroadcastMinedBlockResponse } from '../types/response.types';

import { Transactions } from '../models/Transactions';

const getBlockchain = async (req: Request, res: Response): Promise<any> => {
  try {
    const { blockchain } = global;

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

    let broadcastMinedBlockPromise: Promise<BroadcastMinedBlockResponse>;
    const broadcastMinedBlockPromises: Promise<BroadcastMinedBlockResponse>[] = [];

    const nextBlock = blockchain.mineNextBlock(nextBlockTransactions);
    const previousBlock = blockchain.getPreviousBlock();

    if (nextBlock.previousHash === previousBlock.hash) {
      blockchain.addBlock(nextBlock);
    } else {
      return res.status(200).send({
        message: 'This block is not valid.',
        data: { lastBlockHash: previousBlock.hash, nextBlockPreviousHash: nextBlock.previousHash },
      });
    }

    const origin = blockchain.nodes.currentNodeUrl;

    for (const networkNode of blockchain.nodes.networkNodes) {
      broadcastMinedBlockPromise = axios
        .put<BroadcastMinedBlockResponse>(`${networkNode}/blockchain`, { nextBlock, origin })
        .then((response: AxiosResponse<BroadcastMinedBlockResponse>) => response.data);

      broadcastMinedBlockPromises.push(broadcastMinedBlockPromise);
    }

    Promise.all(broadcastMinedBlockPromises).then((responses: BroadcastMinedBlockResponse[]) => {
      return res.status(201).send({
        message: 'A new block was mined.',
        data: {
          block: {
            height: nextBlock.height,
            nonce: nextBlock.nonce,
            hash: nextBlock.hash,
            previousHash: nextBlock.previousHash,
            transactions: nextBlock.transactions,
          },
        },
      });
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

const registerMinedBlock = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nextBlock, origin }: BroadcastMinedBlockRequest = req.body;
    const { blockchain } = global;

    blockchain.addBlock(nextBlock);

    res.status(201).send({
      message: 'Registered.',
      data: {
        block: nextBlock,
        origin,
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

const updateBlockchain = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nextBlockTransactions }: MineNextBlockRequest = req.body;
    const { blockchain } = global;

    const nextBlock = blockchain.mineNextBlock(nextBlockTransactions);

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

const sendTransactionToMempool = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to, amount, fee }: SendTransactionToMempoolRequest = req.body;
    const { blockchain } = global;

    let transactionPromise: Promise<BroadcastTransactionResponse>;
    const transactionPromises: Promise<BroadcastTransactionResponse>[] = [];

    const transaction = new Transactions(from, to, amount, fee);

    if (blockchain.checkTransactionId(transaction)) {
      blockchain.addTransactionToMempool(transaction);
    } else {
      return res.status(200).send({
        message: 'This transaction is already on the mempool.',
        data: { mempool: blockchain.mempool },
      });
    }

    for (const networkNode of blockchain.nodes.networkNodes) {
      transactionPromise = axios
        .put<BroadcastTransactionResponse>(`${networkNode}/blockchain/transactions`, { transaction, originNode: blockchain.nodes.currentNodeUrl })
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

const registerTransactionInMempool = async (req: Request, res: Response): Promise<any> => {
  try {
    const { transaction, originNode }: RegisterTransactionInMempoolRequest = req.body;
    const { blockchain } = global;

    blockchain.addTransactionToMempool(transaction);

    res.status(200).send({
      message: 'Registered.',
      data: {
        transaction,
        from: originNode,
        to: blockchain.nodes.currentNodeUrl,
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

const connectNodes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { newNodeUrl }: ConnectNodeRequest = req.body;
    const { blockchain } = global;

    let registerPromise: Promise<RegisterNodeResponse>;
    const registerPromises: Promise<RegisterNodeResponse>[] = [];

    blockchain.nodes.addNode(newNodeUrl);

    for (const networkNode of blockchain.nodes.networkNodes) {
      registerPromise = axios.put<RegisterNodeResponse>(`${networkNode}/blockchain/nodes`, { newNodeUrl }).then((response: AxiosResponse<RegisterNodeResponse>) => response.data);

      registerPromises.push(registerPromise);
    }

    Promise.all(registerPromises).then((responses: RegisterNodeResponse[]) => {
      const networkNodes = blockchain.nodes.broadcastNodesTo(newNodeUrl);

      axios.patch<UpdateNetworkNodesResponse>(`${newNodeUrl}/blockchain/nodes`, { networkNodes });

      return res.status(201).send({
        message: 'A new node has been connected.',
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
    const { newNodeUrl }: ConnectNodeRequest = req.body;
    const { blockchain } = global;

    blockchain.nodes.addNode(newNodeUrl);

    return res.status(200).send({
      message: 'Registered.',
      data: { registeredNode: newNodeUrl, registeredIn: blockchain.nodes.currentNodeUrl },
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

    return res.status(200).send({
      message: 'Updated.',
      data: { currentNodeUrl: blockchain.nodes.currentNodeUrl, networkNodes: blockchain.nodes.networkNodes.sort() },
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

export default {
  getBlockchain,
  registerMinedBlock,
  mineNextBlock,
  updateBlockchain,
  getAllPendingTransactions,
  registerTransactionInMempool,
  sendTransactionToMempool,
  registerNode,
  updateNetworkNodes,
  connectNodes,
};
