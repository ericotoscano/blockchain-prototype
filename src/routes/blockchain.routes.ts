import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

const { get, mineNextBlock } = blockchainController;

const router: Router = Router();

router.route('/').get(get);

router.route('/next-block').post(mineNextBlock);

export default router;
