import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

const { getBlockchain, mineNextBlock, getAllPendingTransactions, broadcastTransaction, addTransactionToMempool, registerNode, connectNodes, updateNetworkNodes } = blockchainController;

const router: Router = Router();

router.route('/').get(getBlockchain);
router.route('/next-block').post(mineNextBlock);
router.route('/transactions').get(getAllPendingTransactions).post(broadcastTransaction).put(addTransactionToMempool);
router.route('/nodes').post(registerNode).put(connectNodes).patch(updateNetworkNodes);

export default router;
