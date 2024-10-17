import { Router } from 'express';

import nodesController from '../controllers/nodes.controller';

const { getNodes, registerNode, connectNodes, updateNetworkNodes } = nodesController;

const router: Router = Router();

router.route('/').get(getNodes).post(registerNode).put(connectNodes).patch(updateNetworkNodes);

export default router;
