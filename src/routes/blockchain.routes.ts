import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import transactionsMiddlewares from '../middlewares/transaction.middlewares';
import blocksMiddlewares from '../middlewares/block.middlewares';

const { getBlockchain, sendNextBlock, addNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

const { checkBlockchain, checkNewNodeData, checkNewNodeUrlOption, checkNewNodeConnection, checkNewConnectedNodes, checkFeeFormat, checkPendingTransactions } =
  blockchainMiddlewares;

const {
  checkNextBlockData,
  checkNextBlockHeight,
  checkNextBlockNonce,
  checkNextBlockHash,
  checkNextBlockPreviousHash,
  checkNextBlockTransactions,
  /*   validateTransactionsIds,
  validateTransactionsStatus, */
  checkTransactionsPerBlock,
} = blocksMiddlewares;

const { checkNewTransactionData, checkNewTransactionAddresses, checkNewTransactionValues } = transactionsMiddlewares;

const router: Router = Router();

router.route('/').get(checkBlockchain, getBlockchain);

router.route('/next-block').post(checkBlockchain, checkFeeFormat, checkPendingTransactions, sendNextBlock).patch(
  checkBlockchain,
  checkNextBlockData,
  checkNextBlockHeight,
  checkNextBlockNonce,
  checkNextBlockHash,
  checkNextBlockPreviousHash,
  checkNextBlockTransactions,
  /*     validateTransactionsIds,
    validateTransactionsStatus, */
  checkTransactionsPerBlock,
  addNextBlock
);

router
  .route('/nodes')
  .post(checkBlockchain, checkNewNodeData, checkNewNodeUrlOption, checkNewNodeConnection, sendNewNode)
  .patch(checkBlockchain, addNewNode)
  .put(checkBlockchain, checkNewConnectedNodes, updateConnectedNodes);

router.route('/transactions').post(checkBlockchain, checkNewTransactionData, checkNewTransactionAddresses, checkNewTransactionValues, sendNewTransaction).patch(addNewTransaction);

export default router;
