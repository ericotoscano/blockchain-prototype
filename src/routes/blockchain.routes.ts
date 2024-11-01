import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';

const { getBlockchain, sendNextBlock, updateBlockchain, connectNodes, registerNewNode, updateConnectedNodes, broadcastNewTransaction, registerNewTransaction } = blockchainController;

const { validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, validateNewConnectedNodes, validateFeeFormat, validatePendingTransactions } =
  blockchainMiddlewares;

const {
  validateNextBlockData,
  validateNextBlockHeight,
  validateNextBlockNonce,
  validateNextBlockHash,
  validateNextBlockPreviousHash,
  validateNextBlockTransactions,
  validateTransactionsIds,
  validateTransactionsStatus,
  validateTransactionsPerBlock,
} = blocksMiddlewares;

const { validateNewTransactionData, validateNewTransactionAddresses, validateNewTransactionValues, validateNewTransactionStatus, validateNewTransactionTimestamp, validateNewTransactionTxId } =
  transactionsMiddlewares;

const router: Router = Router();

router.route('/').get(validateBlockchain, getBlockchain).put(validateBlockchain, updateBlockchain); //consenso

router
  .route('/next-block')
  .post(validateBlockchain, validateFeeFormat, validatePendingTransactions, sendNextBlock)
  .patch(
    validateBlockchain,
    validateNextBlockData,
    validateNextBlockHeight,
    validateNextBlockNonce,
    validateNextBlockHash,
    validateNextBlockPreviousHash,
    validateNextBlockTransactions,
    validateTransactionsIds,
    validateTransactionsStatus,
    validateTransactionsPerBlock,
    updateBlockchain
  );

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, connectNodes)
  .put(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, registerNewNode)
  .patch(validateBlockchain, validateNewConnectedNodes, updateConnectedNodes);

router
  .route('/transactions')
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

export default router;
