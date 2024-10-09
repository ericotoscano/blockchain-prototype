import { Router } from 'express';

import transactionsController from '../controllers/transactions.controller';

const { create, getAllPending } = transactionsController;

const router: Router = Router();

router.route('/').post(create);

router.route('/').get(getAllPending);

export default router;
