import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

import blockchainController from '../controllers/blockchain.controller';

const { checkBlockchainData, checkAddNextBlockData } = blockchainMiddlewares;
const { checkNewNodeData, checkConnectedNodesData } = nodesMiddlewares;
const { checkSendNextBlockData } = blocksMiddlewares;
const { checkSendNewTransactionData, checkAddNewTransactionData } = transactionsMiddlewares;

const { getBlockchain, sendNextBlock, addNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

const router: Router = Router();

router.route('/').get(checkBlockchainData, getBlockchain).patch(checkBlockchainData, checkAddNextBlockData, addNextBlock);

router
  .route('/nodes')
  .post(checkBlockchainData, checkNewNodeData, sendNewNode)
  .patch(checkBlockchainData, checkNewNodeData, addNewNode)
  .put(checkBlockchainData, checkConnectedNodesData, updateConnectedNodes);

router.route('/next-block').post(checkBlockchainData, checkSendNextBlockData, sendNextBlock);

router.route('/transactions').post(checkBlockchainData, checkSendNewTransactionData, sendNewTransaction).patch(checkBlockchainData, checkAddNewTransactionData, addNewTransaction);

export default router;
