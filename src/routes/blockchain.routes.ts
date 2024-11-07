import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

import blockchainController from '../controllers/blockchain.controller';

const { checkBlockchainData } = blockchainMiddlewares;
const { checkNewNodeData, checkNewConnectedNodesData } = nodesMiddlewares;
const { checkNextBlockData, checkMinFeeFormat } = blocksMiddlewares;
const {
  checkNewTransactionData,
  checkNewTransaction,
  checkNewTransactionAddresses,
  checkNewTransactionValues,
  checkNewTransactionStatus,
  checkNewTransactionTimestamp,
  checkNewTransactionTxId,
  checkMempoolPendingTransactions,
} = transactionsMiddlewares;

const { getBlockchain, sendNextBlock, addNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

const router: Router = Router();

router.route('/').get(checkBlockchainData, getBlockchain).patch(checkBlockchainData, checkNextBlockData, addNextBlock);

router.route('/nodes').post(checkBlockchainData, checkNewNodeData, sendNewNode).patch(checkBlockchainData, checkNewNodeData, addNewNode).put(checkBlockchainData, checkNewConnectedNodesData, updateConnectedNodes);
//seguir padrao de checkers
router.route('/next-block').post(checkBlockchainData, checkMinFeeFormat, checkMempoolPendingTransactions, sendNextBlock);
//seguir padrao de checkers
router
  .route('/transactions')
  .post(checkBlockchainData, checkNewTransactionData, checkNewTransactionAddresses, checkNewTransactionValues, sendNewTransaction)
  .patch(checkBlockchainData, checkNewTransaction, checkNewTransactionStatus, checkNewTransactionTimestamp, checkNewTransactionTxId, addNewTransaction);

export default router;
