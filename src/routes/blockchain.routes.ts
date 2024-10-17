import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

const { getBlockchain, mineNextBlock, getAllPendingTransactions, createTransaction } = blockchainController;

const router: Router = Router();

router.route('/').get(getBlockchain);
router.route('/next-block').post(mineNextBlock);
router.route('/transactions').get(getAllPendingTransactions).post(createTransaction);

export default router;
