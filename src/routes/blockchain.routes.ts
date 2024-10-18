import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';
import nodesMiddlewares from '../middlewares/nodes.middlewares';

const { getBlockchain, broadcastMinedBlock, mineNextBlock, updateBlockchain, getAllPendingTransactions, broadcastTransaction, addTransactionToMempool, registerNode, connectNodes, updateNetworkNodes } = blockchainController;

const { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration } = nodesMiddlewares;

const router: Router = Router();

router.route('/').get(getBlockchain).post(broadcastMinedBlock).put(mineNextBlock).patch(updateBlockchain);
router.route('/transactions').get(getAllPendingTransactions).post(broadcastTransaction).put(addTransactionToMempool);
router.route('/nodes').post(validateNewNodeRegistration, registerNode).put(validateNewNodeUrl, validateNewNodeConnection, connectNodes).patch(updateNetworkNodes);

export default router;
