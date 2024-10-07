import { Router } from 'express';

import nodesController from '../controllers/nodes.controller';

const { create } = nodesController;

const router: Router = Router();

router.route('/').post(create);

export default router;
