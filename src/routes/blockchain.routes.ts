import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

const {
  getBlockchain,
  registerMinedBlock,
  mineNextBlock,
  updateBlockchain,
  getAllPendingTransactions,
  registerTransactionInMempool,
  sendTransactionToMempool,
  registerNode,
  connectNodes,
  updateNetworkNodes,
} = blockchainController;

const { validateBlockchainExistance } = blockchainMiddlewares;

const { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration, validateNetworkNodesUpdate } = nodesMiddlewares;

const { validatePendingTransactions, validateTransactionsPerBlock, validateNewTransactionRegistration } = transactionsMiddlewares;

const router: Router = Router();

router
  .route('/')
  .get(validateBlockchainExistance, getBlockchain)
  .post(validateBlockchainExistance, validateTransactionsPerBlock, mineNextBlock)
  .put(validateBlockchainExistance, registerMinedBlock)
  .patch(validateBlockchainExistance, updateBlockchain); //consensus

router
  .route('/transactions')
  .get(validateBlockchainExistance, getAllPendingTransactions)
  .post(validateBlockchainExistance, sendTransactionToMempool)
  .put(validateBlockchainExistance, validateNewTransactionRegistration, registerTransactionInMempool);

router
  .route('/nodes')
  .post(validateBlockchainExistance, validateNewNodeUrl, validateNewNodeConnection, connectNodes)
  .put(validateBlockchainExistance, validateNewNodeUrl, validateNewNodeRegistration, registerNode)
  .patch(validateBlockchainExistance, validateNetworkNodesUpdate, updateNetworkNodes);

export default router;

//revisar /transactions e / tendo o /nodes como padrao de middlewares e controller
