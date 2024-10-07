import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

const { create, find } = blockchainController;

const router: Router = Router();

router.route('/').post(create).get(find);

export default router;
