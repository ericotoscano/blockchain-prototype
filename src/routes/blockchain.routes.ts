import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';
import nodesMiddlewares from '../middlewares/nodes.middlewares';

const { getBlockchain, mineNextBlock, getAllPendingTransactions, broadcastTransaction, addTransactionToMempool, registerNode, connectNodes, updateNetworkNodes } = blockchainController;

const { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration } = nodesMiddlewares;

const router: Router = Router();

router.route('/').get(getBlockchain);
router.route('/next-block').post(mineNextBlock);
router.route('/transactions').get(getAllPendingTransactions).post(broadcastTransaction).put(addTransactionToMempool);
router.route('/nodes').post(validateNewNodeRegistration, registerNode).put(validateNewNodeUrl, validateNewNodeConnection, connectNodes).patch(updateNetworkNodes);

export default router;
