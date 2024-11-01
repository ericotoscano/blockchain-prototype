import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';

const { getBlockchain, sendNextBlock, addNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

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

router.route('/').get(validateBlockchain, getBlockchain);

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
    addNextBlock
  );

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, sendNewNode)
  .patch(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, addNewNode)
  .put(validateBlockchain, validateNewConnectedNodes, updateConnectedNodes);

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
    sendNewTransaction
  )
  .patch(
    validateNewTransactionData,
    validateNewTransactionAddresses,
    validateNewTransactionValues,
    validateNewTransactionStatus,
    validateNewTransactionTimestamp,
    validateNewTransactionTxId,
    addNewTransaction
  );

export default router;
