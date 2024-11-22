import { Request, Response } from 'express';
import axios from 'axios';

import '../global';

import { Transaction } from '../entities/transaction/Transaction';

import { IBlock } from '../interfaces/block/IBlock';

import { TransactionIdCreation } from '../helpers/creation/transactions/TransactionIdCreation';
import { BlockDataConversion } from '../helpers/conversion/block/BlockDataConversion';
import { TransactionDataConversion } from '../helpers/conversion/transactions/TransactionDataConversion';
import { BlockCreation } from '../helpers/creation/blocks/BlockCreation';
import { BlockMining } from '../helpers/mining/block/BlockMining';

import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';

import { ResponseBaseType } from '../types/response/ResponseBaseType';
import { BlockchainResponseType } from '../types/response/BlockchainResponseType';
import { NextBlockResponseType } from '../types/response/NextBlockResponseType';
import { BlockDataType } from '../types/block/BlockDataType';
import { TransactionDataType } from '../types/transactions/TransactionDataType';

const getBlockchain = async (req: Request, res: Response<BlockchainResponseType | ResponseBaseType>): Promise<void> => {
  try {
    global.blockchain.nodeManagement.SortConnectedNodes();

    res.status(200).send({
      type: 'Blockchain Get Response',
      code: 10,
      message: 'The blockchain has been found.',
      data: {
        blockchain: global.blockchain,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Server Error',
      code: 50,
      message: errorMessage,
    });
    return;
  }
};

const addNextBlock = async (req: Request<{}, {}, BlockDataType>, res: Response<NextBlockResponseType | ResponseBaseType>): Promise<void> => {
  try {
    const nextBlock: BlockDataType = req.body;

    const transactionDataConversion = new TransactionDataConversion(Sha256HashCreation, TransactionIdCreation);

    const block: IBlock = BlockDataConversion.convert(nextBlock, transactionDataConversion);

    global.blockchain.blocksManagement.addBlock(block);

    res.status(200).send({
      type: 'Blockchain Patch Response',
      code: 10,
      message: 'The next block has been added.',
      data: {
        nextBlock,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Server Error',
      code: 50,
      message: errorMessage,
    });
    return;
  }
};

const mineNextBlock = async (req: Request<{}, {}, { minFee: number; data: TransactionDataType[] }>, res: Response<NextBlockResponseType | ResponseBaseType>): Promise<void> => {
  try {
    const { data }: { data: TransactionDataType[] } = req.body;

    const transactionDataConversion = new TransactionDataConversion(Sha256HashCreation, TransactionIdCreation);

    const transactions = transactionDataConversion.convertAll(data);

    const input = { height: global.blockchain.blocks.length, previousHash: global.blockchain.blocksManagement.getPreviousBlock().hash, transactions };

    const nextBlock = BlockCreation.create(input, global.blockchain.target, BlockMining);

    global.blockchain.blocksManagement.addBlock(nextBlock);

    res.status(201).send({
      type: 'Next Block Post Response',
      code: 10,
      message: 'The next block has been mined and is ready to be sent for validation by other nodes.',
      data: {
        nextBlock,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Server Error',
      code: 50,
      message: errorMessage,
    });
  }
};

const sendNextBlock = async (req: Request<{}, {}, NextBlockPostRequest>, res: Response<ResponseDataType<NextBlockDataPostResponse | ErrorDataType>>): Promise<void> => {
  try {
    const updateBlockchainPromises: Promise<ResponseDataType<NextBlockDataPostResponse | ErrorDataType>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const updateBlockchainPromise = axios.patch<ResponseDataType<NextBlockDataPostResponse | ErrorDataType>>(`${connectedNode}/blockchain`, { nextBlock }).then((response) => response.data);

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
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

const sendNewNode = async (req: Request<{}, {}, NodesPostRequest>, res: Response<ResponseDataType<NodesDataPostResponse | ErrorDataType>>): Promise<void> => {
  try {
    const { nodeUrl } = req.body;

    blockchain.addNode(nodeUrl);

    let addNewNodePromise: Promise<ResponseDataType<NodesDataPatchResponse | ErrorDataType>>;

    const addNewNodePromises: Promise<ResponseDataType<NodesDataPatchResponse | ErrorDataType>>[] = [];

    for (const connectedNodeUrl of blockchain.connectedNodes) {
      if (nodeUrl !== connectedNodeUrl) {
        addNewNodePromise = axios.patch<ResponseDataType<NodesDataPatchResponse | ErrorDataType>>(`${connectedNodeUrl}/blockchain/nodes`, { nodeUrl }).then((response) => response.data);
      } else {
        addNewNodePromise = Promise.resolve({
          message: ' Error',
          data: { code: 928, message: 'No added: same node.' },
        });
      }

      addNewNodePromises.push(addNewNodePromise);
    }

    await Promise.all(addNewNodePromises);

    const connectedNodes = blockchain.broadcastNodesTo(nodeUrl);

    axios.put<ResponseDataType<NodesDataPutResponse | ErrorDataType>>(`${nodeUrl}/blockchain/nodes`, { connectedNodes });

    res.status(201).send({
      message: 'A new node has been connected.',
      data: { connectedTo: connectedNodes.sort() },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

const addNewNode = async (req: Request<{}, {}, NodesPostRequest>, res: Response<ResponseDataType<NodesDataPatchResponse | ErrorDataType>>): Promise<void> => {
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
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

const updateConnectedNodes = async (req: Request<{}, {}, NodesPutRequest>, res: Response<ResponseDataType<NodesDataPutResponse | ErrorDataType>>): Promise<void> => {
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
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

const sendNewTransaction = async (req: Request<{}, {}, TransactionsPostRequest>, res: Response<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>): Promise<void> => {
  try {
    const { newPreTransaction } = req.body;
    const { sender, recipient, amount, fee } = newPreTransaction;

    const newTransaction = new Transaction(sender, recipient, amount, fee);

    const { txId } = newTransaction;

    if (!blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.txId !== txId)) {
      res.status(400).send({
        message: 'New Transaction Error',
        data: {
          code: 40,
          message: 'The new transaction is already on the blockchain mempool.',
        },
      });
      return;
    }

    blockchain.addTransactionToMempool(newTransaction);

    const addTransactionPromises: Promise<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>[] = [];

    for (const connectedNode of blockchain.connectedNodes) {
      const addTransactionPromise = axios
        .patch<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>(`${connectedNode}/blockchain/transactions`, { newTransaction })
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
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

const addNewTransaction = async (req: Request<{}, {}, TransactionsPatchRequest>, res: Response<ResponseDataType<TransactionsPostResponseData | ErrorDataType>>): Promise<void> => {
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
      message: 'Server Error',
      data: {
        code: 50,
        message: errorMessage,
      },
    });
  }
};

export default {
  getBlockchain,
  addNextBlock,
  mineNextBlock,
  sendNextBlock,
  sendNewNode,
  addNewNode,
  updateConnectedNodes,
  sendNewTransaction,
  addNewTransaction,
};
