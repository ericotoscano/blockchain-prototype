import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';

const {
  connectNodes,
  registerNewNode,
  updateConnectedNodes,
  getAllPendingTransactions,
  broadcastNewTransaction,
  registerNewTransaction,
  getBlockchain,
  registerNextBlock,
  broadcastNextBlock,
  updateBlockchain,
} = blockchainController;

const { validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, validateNewConnectedNodes, validatePendingTransactions } = blockchainMiddlewares;

const {
  validateNextBlockData,
  validateNextBlockHeight,
  validateNextBlockNonce,
  validateNextBlockHash,
  validateNextBlockPreviousHash,
  validateNextBlockTransactions,
  validateTransactionsId,
  validateTransactionsStatus,
  validateTransactionsPerBlock,
} = blocksMiddlewares;

const { validateNewTransactionData, validateNewTransactionAddresses, validateNewTransactionValues, validateNewTransactionStatus, validateNewTransactionTimestamp, validateNewTransactionTxId } =
  transactionsMiddlewares;

const router: Router = Router();

router
  .route('/')
  .get(validateBlockchain, getBlockchain)
  .post(validateBlockchain, validateTransactionsId, validateTransactionsStatus, validateTransactionsPerBlock, broadcastNextBlock)
  .put(
    validateBlockchain,
    validateNextBlockData,
    validateNextBlockHeight,
    validateNextBlockNonce,
    validateNextBlockHash,
    validateNextBlockPreviousHash,
    validateNextBlockTransactions,
    registerNextBlock
  )
  .patch(validateBlockchain, updateBlockchain); //consenso

router
  .route('/transactions')
  .get(validateBlockchain, validatePendingTransactions, getAllPendingTransactions)
  .post(
    validateBlockchain,
    validateNewTransactionData,
    validateNewTransactionAddresses,
    validateNewTransactionValues,
    validateNewTransactionStatus,
    validateNewTransactionTimestamp,
    validateNewTransactionTxId,
    broadcastNewTransaction
  )
  .put(
    validateNewTransactionData,
    validateNewTransactionAddresses,
    validateNewTransactionValues,
    validateNewTransactionStatus,
    validateNewTransactionTimestamp,
    validateNewTransactionTxId,
    registerNewTransaction
  );
//.delete transações que forem incluidas no bloco

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, connectNodes)
  .put(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, registerNewNode)
  .patch(validateBlockchain, validateNewConnectedNodes, updateConnectedNodes);

export default router;
