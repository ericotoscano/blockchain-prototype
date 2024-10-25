import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

const {
  connectNodes,
  registerNode,
  updateNetworkNodes,
  getAllPendingTransactions,
  sendTransactionToMempool,
  registerTransactionInMempool,
  getBlockchain,
  registerCreatedBlock,
  createNextBlock,
  updateBlockchain,
} = blockchainController;

const { validateBlockchain, validateNextBlock, validateHeightOfBlock, validateHashOfBlock, validatePreviousHashOfBlock, validateTransactionsOfBlock, validateNonceOfBlock } = blockchainMiddlewares;

const { validateNewNodeUrl, validateNewNodeConnection, validateNewNodeRegistration, validateNetworkNodesUpdate } = nodesMiddlewares;

const {
  validatePendingTransactions,
  validateAddressesForANewTransaction,
  validateValuesForANewTransaction,
  validateTransaction,
  validateAddressesOfTransaction,
  validateValuesOfTransaction,
  validateStatusOfTransaction,
  validateTimestampOfTransaction,
  validateTxIdOfTransaction,
  validateTransactionsPerBlock,
} = transactionsMiddlewares;

const router: Router = Router();

//organizar a rota '/' de acordo com o padrão das outras

router
  .route('/')
  .get(validateBlockchain, getBlockchain)
  .post(validateBlockchain, validateTransactionsPerBlock, createNextBlock)
  .put(validateBlockchain, validateNextBlock, validateHeightOfBlock, validateHashOfBlock, validatePreviousHashOfBlock, validateTransactionsOfBlock, validateNonceOfBlock, registerCreatedBlock)
  .patch(validateBlockchain, updateBlockchain); //consenso

router
  .route('/transactions')
  .get(validateBlockchain, validatePendingTransactions, getAllPendingTransactions)
  .post(validateBlockchain, validateAddressesForANewTransaction, validateValuesForANewTransaction, sendTransactionToMempool)
  .put(
    validateBlockchain,
    validateTransaction,
    validateAddressesOfTransaction,
    validateValuesOfTransaction,
    validateStatusOfTransaction,
    validateTimestampOfTransaction,
    validateTxIdOfTransaction,
    registerTransactionInMempool
  );
//.delete transações que forem incluidas no bloco

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNodeUrl, validateNewNodeConnection, connectNodes)
  .put(validateBlockchain, validateNewNodeUrl, validateNewNodeRegistration, registerNode)
  .patch(validateBlockchain, validateNetworkNodesUpdate, updateNetworkNodes);

export default router;
