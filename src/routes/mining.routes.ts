import { Router } from 'express';

import miningMiddlewares from '../middlewares/mining.middlewares';

import miningController from '../controllers/mining.controller';

const { validateTransactionsDTO, validateTransactionsDTOLength, validateEachTransactionDTO } = miningMiddlewares;

const { mineBlock } = miningController;

const router: Router = Router();

router.route('/').post(validateTransactionsDTO, validateTransactionsDTOLength, validateEachTransactionDTO, mineBlock);

export default router;
