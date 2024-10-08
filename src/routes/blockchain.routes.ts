import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

const { find} = blockchainController;

const router: Router = Router();

router.route('/').get(find);

export default router;
