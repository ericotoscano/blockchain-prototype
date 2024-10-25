import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import '../global';

import {
  NewNodeRequest,
  UpdateNetworkNodesRequest,
  CreateNextBlockRequest,
  SendTransactionToMempoolRequest,
  RegisterTransactionInMempoolRequest,
  RegisterCreatedBlockRequest,
} from '../types/request.types';

import {
  CustomResponse,
  RegisterTransactionInMempoolData,
  RegisterCreatedBlockData,
  SendTransactionToMempoolData,
  GetAllPendingTransactionsData,
  ErrorData,
  RegisterNodeData,
  UpdateNetworkNodesData,
  ConnectNodesData,
  GetBlockchainData,
  CreateNextBlockData,
} from '../types/response.types';

import { Transactions } from '../models/Transactions';

const connectNodes = async (req: Request<{}, {}, NewNodeRequest>, res: Response<CustomResponse<ConnectNodesData | ErrorData>>): Promise<void> => {
  try {
    const { newNodeUrl } = req.body;
    const { blockchain } = global;

    blockchain.nodes.addNode(newNodeUrl);

    const registerNodePromises: Promise<CustomResponse<RegisterNodeData | ErrorData>>[] = [];

    for (const networkNode of blockchain.nodes.networkNodes) {
      const registerNodePromise = axios.put<CustomResponse<RegisterNodeData | ErrorData>>(`${networkNode}/blockchain/nodes`, { newNodeUrl }).then((response) => response.data);

      registerNodePromises.push(registerNodePromise);
    }

    await Promise.all(registerNodePromises);

    const networkNodes = blockchain.nodes.broadcastNodesTo(newNodeUrl);

    axios.patch<CustomResponse<UpdateNetworkNodesData | ErrorData>>(`${newNodeUrl}/blockchain/nodes`, { networkNodes });

    res.status(201).send({
      message: 'A new node has been connected.',
      data: { connectedTo: networkNodes.sort() },
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

const registerNode = async (req: Request<{}, {}, NewNodeRequest>, res: Response<CustomResponse<RegisterNodeData | ErrorData>>): Promise<void> => {
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
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const updateNetworkNodes = async (req: Request<{}, {}, UpdateNetworkNodesRequest>, res: Response<CustomResponse<UpdateNetworkNodesData | ErrorData>>): Promise<void> => {
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

const sendTransactionToMempool = async (req: Request<{}, {}, SendTransactionToMempoolRequest>, res: Response<CustomResponse<SendTransactionToMempoolData | ErrorData>>): Promise<void> => {
  try {
    const { sender, recipient, amount, fee } = req.body;
    const { blockchain } = global;

    const transaction = new Transactions(sender, recipient, amount, fee);

    blockchain.addTransactionToMempool(transaction);

    const registerTransactionPromises: Promise<CustomResponse<RegisterTransactionInMempoolData | ErrorData>>[] = [];

    for (const networkNode of blockchain.nodes.networkNodes) {
      const registerTransactionPromise = axios
        .put<CustomResponse<RegisterTransactionInMempoolData | ErrorData>>(`${networkNode}/blockchain/transactions`, { transaction })
        .then((response: AxiosResponse<CustomResponse<RegisterTransactionInMempoolData | ErrorData>>) => response.data);

      registerTransactionPromises.push(registerTransactionPromise);
    }
    //futuramente, pensar em alguma checagem dessas promises(erro na requisicao de cima)
    await Promise.all(registerTransactionPromises);

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
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const registerTransactionInMempool = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response<CustomResponse<RegisterTransactionInMempoolData | ErrorData>>): Promise<void> => {
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
      data: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const createNextBlock = async (req: Request<{}, {}, CreateNextBlockRequest>, res: Response<CustomResponse<CreateNextBlockData | ErrorData>>): Promise<void> => {
  try {
    const { nextBlockTransactions } = req.body;
    const { blockchain } = global;

    const nextBlock = blockchain.createNextBlock(nextBlockTransactions);

    blockchain.addBlock(nextBlock);

    const registerCreatedBlockPromises: Promise<CustomResponse<RegisterCreatedBlockData | ErrorData>>[] = [];

    for (const networkNode of blockchain.nodes.networkNodes) {
      const registerCreatedBlockPromise = axios
        .put<CustomResponse<RegisterCreatedBlockData | ErrorData>>(`${networkNode}/blockchain`, { nextBlock })
        .then((response: AxiosResponse<CustomResponse<RegisterCreatedBlockData | ErrorData>>) => response.data);

      registerCreatedBlockPromises.push(registerCreatedBlockPromise);
    }

    await Promise.all(registerCreatedBlockPromises);

    res.status(201).send({
      message: 'A new block was mined.',
      data: {
        block: {
          height: nextBlock.height,
          hash: nextBlock.hash,
          previousHash: nextBlock.previousHash,
          transactions: nextBlock.transactions,
          nonce: nextBlock.nonce,
        },
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

const registerCreatedBlock = async (req: Request<{}, {}, RegisterCreatedBlockRequest>, res: Response<CustomResponse<RegisterCreatedBlockData | ErrorData>>): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { blockchain } = global;

    blockchain.addBlock(nextBlock);

    res.status(200).send({
      message: 'Registered.',
      data: {
        block: nextBlock,
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

const updateBlockchain = async (req: Request<{}, {}, CreateNextBlockRequest>, res: Response): Promise<void> => {
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
  registerNode,
  updateNetworkNodes,
  getAllPendingTransactions,
  sendTransactionToMempool,
  registerTransactionInMempool,
  getBlockchain,
  registerCreatedBlock,
  createNextBlock,
  updateBlockchain,
};
