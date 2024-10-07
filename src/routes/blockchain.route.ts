import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

const { create } = blockchainController;

const router: Router = Router();

router.route('/').post(create);

export default router;
