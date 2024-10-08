import { Router } from 'express';

import transactionsController from '../controllers/transactions.controller';

const { create } = transactionsController;

const router: Router = Router();

router.route('/').post(create);

export default router;
