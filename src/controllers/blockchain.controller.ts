import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import '../global';

import {
  NewNodeRequest,
  UpdateNetworkNodesRequest,
  MineNextBlockRequest,
  SendTransactionToMempoolRequest,
  RegisterTransactionInMempoolRequest,
  BroadcastMinedBlockRequest,
} from '../types/request.types';

import {
  RegisterNodeResponse,
  UpdateNetworkNodesResponse,
  ConnectNodesResponse,
  RegisterTransactionInMempoolResponse,
  BroadcastMinedBlockResponse,
  SendTransactionToMempoolResponse,
  getAllPendingTransactionsResponse,
} from '../types/response.types';

import { Transactions } from '../models/Transactions';

const connectNodes = async (req: Request<{}, {}, NewNodeRequest>, res: Response<ConnectNodesResponse>): Promise<void> => {
  try {
    const { newNodeUrl } = req.body;
    const { blockchain } = global;

    blockchain.nodes.addNode(newNodeUrl);

    const registerPromises: Promise<RegisterNodeResponse>[] = [];

    for (const networkNode of blockchain.nodes.networkNodes) {
      const registerPromise = axios.put<RegisterNodeResponse>(`${networkNode}/blockchain/nodes`, { newNodeUrl }).then((response) => response.data);

      registerPromises.push(registerPromise);
    }

    await Promise.all(registerPromises);

    const networkNodes = blockchain.nodes.broadcastNodesTo(newNodeUrl);

    axios.patch<UpdateNetworkNodesResponse>(`${newNodeUrl}/blockchain/nodes`, { networkNodes });

    res.status(201).send({
      message: 'A new node has been connected.',
      data: { connectedTo: networkNodes.sort() },
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

const registerNode = async (req: Request<{}, {}, NewNodeRequest>, res: Response<RegisterNodeResponse>): Promise<void> => {
  try {
    const { newNodeUrl } = req.body;
    const { blockchain } = global;

    blockchain.nodes.addNode(newNodeUrl);

    res.status(200).send({
      message: 'Registered.',
      data: { registeredNode: newNodeUrl, registeredIn: blockchain.nodes.currentNodeUrl },
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

const updateNetworkNodes = async (req: Request<{}, {}, UpdateNetworkNodesRequest>, res: Response<UpdateNetworkNodesResponse>): Promise<void> => {
  try {
    const { networkNodes } = req.body;
    const { blockchain } = global;

    blockchain.setNetworkNodes(networkNodes);

    res.status(200).send({
      message: 'Updated.',
      data: { currentNodeUrl: blockchain.nodes.currentNodeUrl, networkNodes: blockchain.nodes.networkNodes.sort() },
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

const sendTransactionToMempool = async (req: Request<{}, {}, SendTransactionToMempoolRequest>, res: Response<SendTransactionToMempoolResponse>): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;
    const { blockchain } = global;

    const transaction = new Transactions(sender, recipient, amount, fee);

    blockchain.addTransactionToMempool(transaction);

    const transactionPromises: Promise<RegisterTransactionInMempoolResponse>[] = [];

    for (const networkNode of blockchain.nodes.networkNodes) {
      const transactionPromise = axios
        .put<RegisterTransactionInMempoolResponse>(`${networkNode}/blockchain/transactions`, { transaction })
        .then((response: AxiosResponse<RegisterTransactionInMempoolResponse>) => response.data);

      transactionPromises.push(transactionPromise);
    }
    //futuramente, pensar em alguma checagem dessas promises(erro na requisicao de cima)
    await Promise.all(transactionPromises);

    res.status(201).send({
      message: 'A new transaction was sent to mempool.',
      data: {
        transaction: {
          txId: transaction.txId,
          status: transaction.status,
          timestamp: transaction.timestamp,
          sender: transaction.sender,
          recipient: transaction.recipient,
          amount: transaction.amount,
          fee: transaction.fee,
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

const registerTransactionInMempool = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response<RegisterTransactionInMempoolResponse>): Promise<void> => {
  try {
    const { transaction } = req.body;
    const { blockchain } = global;

    blockchain.addTransactionToMempool(transaction);

    res.status(200).send({
      message: 'Registered.',
      data: {
        transaction,
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

const getAllPendingTransactions = async (req: Request, res: Response<getAllPendingTransactionsResponse>): Promise<void> => {
  try {
    const { blockchain } = global;

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

const getBlockchain = async (req: Request, res: Response): Promise<void> => {
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

export default {
  connectNodes,
  registerNode,
  updateNetworkNodes,
  getBlockchain,
  registerMinedBlock,
  mineNextBlock,
  updateBlockchain,
  getAllPendingTransactions,
  registerTransactionInMempool,
  sendTransactionToMempool,
};
